import {
  appendToEnvLocal,
  compileTemplate,
  insertSchemaToSchemaIndex,
  renderTemplate,
  renderTemplateIfNotExists,
} from "../lib/utils";
import { log } from "../lib/log";
import {
  DbDialect,
  DbDialectStrategy,
  DrizzleNextConfig,
  DrizzleNextProcessor,
} from "../lib/types";
import {
  pkKeyValTemplates,
  pkStrategyImportTemplates,
} from "../lib/pk-strategy";
import { dialectStrategyFactory } from "../lib/strategy-factory";
import { caseFactory } from "../lib/case-utils";

interface AuthStrategy {
  appendPlaceholdersToEnvLocal: () => void;
  dependencies: string[];
  devDependencies: string[];
  textToSearchInEnv?: string;
  printCompletionMessage(): void;
}

interface AuthStrategyMap {
  github: AuthStrategy;
  google: AuthStrategy;
  credentials: AuthStrategy;
  postmark: AuthStrategy;
  nodemailer: AuthStrategy;
}

export const authStrategyMap: AuthStrategyMap = {
  github: {
    printCompletionMessage: function (): void {
      log.task("setup github provider");
      log.subtask(
        "go to github > settings > developer settings > oauth apps > new oauth app"
      );
      log.subtask("callback: http://localhost:3000/api/auth/callback/github");
      log.subtask("update AUTH_GITHUB_ID in .env");
      log.subtask("update AUTH_GITHUB_SECRET in .env");
    },
    textToSearchInEnv: "AUTH_GITHUB_ID",
    dependencies: [],
    devDependencies: [],
    appendPlaceholdersToEnvLocal: function (): void {
      appendToEnvLocal("AUTH_GITHUB_ID", "{AUTH_GITHUB_ID}");
      appendToEnvLocal("AUTH_GITHUB_SECRET", "{AUTH_GITHUB_SECRET}");
    },
  },
  google: {
    printCompletionMessage: function (): void {
      log.task("setup google provider");
      log.subtask(
        "go to console.cloud.google.com > new project > oauth consent screen + 2.0 client"
      );
      log.subtask("callback: http://localhost:3000/api/auth/callback/google");
      log.subtask("update AUTH_GOOGLE_ID in .env");
      log.subtask("update AUTH_GOOGLE_SECRET in .env");
    },
    textToSearchInEnv: "AUTH_GOOGLE_ID",
    dependencies: [],
    devDependencies: [],
    appendPlaceholdersToEnvLocal: function (): void {
      appendToEnvLocal("AUTH_GOOGLE_ID", "{AUTH_GOOGLE_ID}");
      appendToEnvLocal("AUTH_GOOGLE_SECRET", "{AUTH_GOOGLE_SECRET}");
    },
  },
  credentials: {
    dependencies: ["bcrypt"],
    devDependencies: ["@types/bcrypt"],
    printCompletionMessage: function (): void {
      log.task("create test user for credentials provider");
      log.cmdsubtask(
        "npx tsx scripts/create-user.ts user@example.com password123"
      );
    },
    textToSearchInEnv: undefined,
    appendPlaceholdersToEnvLocal: function (): void {},
  },
  postmark: {
    printCompletionMessage: function (): void {
      log.task("setup postmark provider");
      log.subtask("go to postmark > server > api tokens");
      log.subtask("generate token");
      log.subtask("change the from email in auth.ts");
      log.subtask("update AUTH_POSTMARK_KEY in .env");
    },
    textToSearchInEnv: "AUTH_POSTMARK_KEY",
    dependencies: [],
    devDependencies: [],
    appendPlaceholdersToEnvLocal: function (): void {
      appendToEnvLocal("AUTH_POSTMARK_KEY", "{AUTH_POSTMARK_KEY}");
    },
  },
  nodemailer: {
    dependencies: ["nodemailer"],
    printCompletionMessage: function (): void {
      log.task("setup nodemailer provider");
      log.subtask("update EMAIL_SERVER in .env");
      log.subtask("update EMAIL_FROM in .env");
    },
    textToSearchInEnv: "EMAIL_SERVER",
    devDependencies: [],
    appendPlaceholdersToEnvLocal: function (): void {
      appendToEnvLocal(
        "EMAIL_SERVER",
        "smtps://username:password@smtp.example.com:465"
      );
      appendToEnvLocal("EMAIL_FROM", "noreply@example.com");
    },
  },
};

interface AuthDbDialect {
  authSchemaTemplate: string;
  pkDataType: string;
}

const authDbDialectStrategy: Record<DbDialect, AuthDbDialect> = {
  postgresql: {
    authSchemaTemplate: "auth-processor/schema/auth-tables.ts.postgresql.hbs",
    pkDataType: "text",
  },
  mysql: {
    authSchemaTemplate: "auth-processor/schema/auth-tables.ts.mysql.hbs",
    pkDataType: "varchar",
  },
  sqlite: {
    authSchemaTemplate: "auth-processor/schema/auth-tables.ts.sqlite.hbs",
    pkDataType: "text",
  },
};

export class AuthProcessor implements DrizzleNextProcessor {
  constructor(public opts: DrizzleNextConfig) {
    this.dbDialectStrategy = dialectStrategyFactory(this.opts.dbDialect);
  }

  dependencies = ["next-auth", "@auth/drizzle-adapter"];

  devDependencies = [];

  dbDialectStrategy: DbDialectStrategy;

  async init() {
    log.init("initializing auth...");
    await this.render();
  }

  async render() {
    this.addAuthConfig();
    // this.addAuthMiddleware();
    this.appendSecretsToEnv();
    this.addLayout();
    this.addAuthSchema();
    this.addUserSchema();
    this.addLayout();

    renderTemplate({
      inputPath: "auth-processor/lib/auth-utils.ts.hbs",
      outputPath: "lib/auth-utils.ts",
    });
    renderTemplate({
      inputPath: "auth-processor/components/private/private-layout.tsx.hbs",
      outputPath: "components/private/private-layout.tsx",
    });
    renderTemplate({
      inputPath: "auth-processor/app/api/auth/[...nextauth]/route.ts.hbs",
      outputPath: "app/api/auth/[...nextauth]/route.ts",
    });
    renderTemplate({
      inputPath: "auth-processor/app/(private)/dashboard/page.tsx.hbs",
      outputPath: "app/(private)/dashboard/page.tsx",
    });
    renderTemplate({
      inputPath: "auth-processor/app/(auth)/signin/page.tsx.hbs",
      outputPath: "app/(auth)/signin/page.tsx",
    });
    renderTemplate({
      inputPath: "auth-processor/app/(private)/profile/page.tsx.hbs",
      outputPath: "app/(private)/profile/page.tsx",
    });
    renderTemplate({
      inputPath: "auth-processor/app/(auth)/signout/page.tsx.hbs",
      outputPath: "app/(auth)/signout/page.tsx",
    });
    renderTemplate({
      inputPath: "auth-processor/types/next-auth.d.ts.hbs",
      outputPath: "types/next-auth.d.ts",
    });
    renderTemplate({
      inputPath: "auth-processor/components/auth/signin-form.tsx.hbs",
      outputPath: "components/auth/signin-form.tsx",
    });
    renderTemplate({
      inputPath: "auth-processor/services/auth/signin-action.ts.hbs",
      outputPath: "services/auth/signin-action.ts",
    });
    appendToEnvLocal("AUTH_TRUST_HOST", "http://localhost:3000");
    appendToEnvLocal("AUTH_SECRET", "secret");
  }

  addAuthConfig() {
    renderTemplate({
      inputPath: "auth-processor/lib/auth.ts.hbs",
      outputPath: "lib/auth.ts",
      data: {
        pkStrategyImport: pkStrategyImportTemplates[this.opts.pkStrategy],
        pkKeyValTemplate: pkKeyValTemplates[this.opts.pkStrategy],
        userObj: caseFactory("user", { pluralize: this.opts.pluralizeEnabled }),
        accountObj: caseFactory("account", {
          pluralize: this.opts.pluralizeEnabled,
        }),
        sessionObj: caseFactory("session", {
          pluralize: this.opts.pluralizeEnabled,
        }),
        verificationTokenObj: caseFactory("verificationToken", {
          pluralize: this.opts.pluralizeEnabled,
        }),
      },
    });
  }

  appendSecretsToEnv() {
    for (const provider in authStrategyMap) {
      const strategy = authStrategyMap[provider as keyof AuthStrategyMap];
      strategy.appendPlaceholdersToEnvLocal();
    }
  }

  addLayout() {
    const userObj = caseFactory("user", {
      pluralize: this.opts.pluralizeEnabled,
    });
    renderTemplate({
      inputPath: "auth-processor/app/(private)/layout.tsx.hbs",
      outputPath: "app/(private)/layout.tsx",
      data: {
        userObj,
      },
    });
  }

  addAuthSchema() {
    const pkText =
      this.dbDialectStrategy.pkStrategyTemplates[this.opts.pkStrategy];
    const pkStrategyImport = pkStrategyImportTemplates[this.opts.pkStrategy];
    const pkStrategyDataType =
      this.dbDialectStrategy.pkStrategyDataTypes[this.opts.pkStrategy];
    const fkStrategyTemplate =
      this.dbDialectStrategy.fkStrategyTemplates[this.opts.pkStrategy];

    /**
     * special cases for uuid and auto increment
     */
    const fkDataTypeImport = {
      uuid: "uuid", // pg
      bigserial: "bigint", // pg
      bigint: "bigint", // mysql
    };

    const fkDataTypeImportCode =
      fkDataTypeImport[pkStrategyDataType as keyof typeof fkDataTypeImport];

    const userObj = caseFactory("user", {
      pluralize: this.opts.pluralizeEnabled,
    });
    renderTemplate({
      inputPath: authDbDialectStrategy[this.opts.dbDialect].authSchemaTemplate,
      outputPath: "schema/auth-tables.ts",
      data: {
        userObj,
        pkText: pkText,
        pkStrategyImport: pkStrategyImport,
        createdAtTemplate: this.dbDialectStrategy.createdAtTemplate,
        updatedAtTemplate: this.dbDialectStrategy.updatedAtTemplate,
        fkDataTypeImportCode: fkDataTypeImportCode,
        fkStrategyTemplate: fkStrategyTemplate,
        accountObj: caseFactory("account", {
          pluralize: this.opts.pluralizeEnabled,
        }),
        sessionObj: caseFactory("session", {
          pluralize: this.opts.pluralizeEnabled,
        }),
        verificationTokenObj: caseFactory("verificationToken", {
          pluralize: this.opts.pluralizeEnabled,
        }),
        authenticatorObj: caseFactory("authenticator", {
          pluralize: this.opts.pluralizeEnabled,
        }),
      },
    });

    insertSchemaToSchemaIndex("auth_tables", {
      pluralize: this.opts.pluralizeEnabled,
    });
  }

  addUserSchema() {
    const userSchemaStrategy: Record<DbDialect, string> = {
      postgresql: "auth-processor/schema/users.ts.postgresql.hbs",
      mysql: "auth-processor/schema/users.ts.mysql.hbs",
      sqlite: "auth-processor/schema/users.ts.sqlite.hbs",
    };
    const pkText =
      this.dbDialectStrategy.pkStrategyTemplates[this.opts.pkStrategy];
    const pkStrategyImport = pkStrategyImportTemplates[this.opts.pkStrategy];
    const pkStrategyDataType =
      this.dbDialectStrategy.pkStrategyDataTypes[this.opts.pkStrategy];
    const dataTypeImportsRecord: Record<DbDialect, Set<string>> = {
      postgresql: new Set(["timestamp", "text"]),
      mysql: new Set(["timestamp", "varchar"]),
      sqlite: new Set(["integer", "text"]),
    };

    const dataTypeImports = dataTypeImportsRecord[this.opts.dbDialect];

    dataTypeImports.add(pkStrategyDataType);

    let dataTypeImportsCode = "";
    for (const dataType of dataTypeImports) {
      dataTypeImportsCode += "  " + dataType + ",\n";
    }
    const userObj = caseFactory("user", {
      pluralize: this.opts.pluralizeEnabled,
    });
    renderTemplate({
      inputPath: userSchemaStrategy[this.opts.dbDialect],
      outputPath: this.opts.pluralizeEnabled
        ? "schema/users.ts"
        : "schema/user.ts",
      data: {
        userObj: userObj,
        pkText: pkText,
        pkStrategyImport: pkStrategyImport,
        pkStrategyDataType: pkStrategyDataType,
        dataTypeImports: dataTypeImportsCode,
        createdAtTemplate: this.dbDialectStrategy.createdAtTemplate,
        updatedAtTemplate: this.dbDialectStrategy.updatedAtTemplate,
      },
    });

    insertSchemaToSchemaIndex("user", {
      pluralize: this.opts.pluralizeEnabled,
    });
  }

  printCompletionMessage() {
    log.checklist("auth checklist");
    for (const provider in authStrategyMap) {
      const authStrategy = authStrategyMap[provider as keyof AuthStrategyMap];
      authStrategy.printCompletionMessage();
    }
  }
}
