import { log } from "../lib/log";
import { dialectStrategyFactory } from "../lib/strategy-factory";
import {
  DbDialect,
  DrizzleNextProcessor,
  DrizzleNextConfig,
  DbDialectStrategy,
} from "../lib/types";
import {
  appendToEnvLocal,
  insertTextAfterIfNotExists,
  insertTextBeforeIfNotExists,
  renderTemplate,
} from "../lib/utils";
import {
  pkFunctionInvoke,
  pkStrategyImportTemplates,
} from "../lib/pk-strategy";
import { ScaffoldProcessor } from "./scaffold-processor";

export class StripeProcessor implements DrizzleNextProcessor {
  opts: DrizzleNextConfig;

  constructor(opts: DrizzleNextConfig) {
    this.dbDialectStrategy = dialectStrategyFactory(opts.dbDialect);
    this.opts = opts;
  }

  dependencies = ["@stripe/stripe-js", "stripe"];

  devDependencies = [];

  dbDialectStrategy: DbDialectStrategy;

  async init() {
    log.init("initializing stripe...");
    await this.render();
  }

  async render(): Promise<void> {
    this.addAccountPage();
    this.addPricingPage();
    this.appendStripeSecretsToEnvLocal();
    this.addCheckOutSessionsApiRoutes();
    this.addCustomerPortalApiRoute();
    this.addWebhookApiRoute();
    this.addConfirmationPage();
    this.addCreateProductScripts();
    this.scaffold();
    this.addLinkToPrivateSidebar();
    this.addStripeCustomerIdToUsersSchema();
  }

  addAccountPage() {
    renderTemplate({
      inputPath: "stripe-processor/app/(private)/account/page.tsx.hbs",
      outputPath: "app/(private)/account/page.tsx",
    });
  }

  addPricingPage() {
    renderTemplate({
      inputPath: "stripe-processor/app/(public)/pricing/page.tsx.hbs",
      outputPath: "app/(public)/pricing/page.tsx",
    });
  }

  appendStripeSecretsToEnvLocal() {
    appendToEnvLocal(
      "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
      "{NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}"
    );
    appendToEnvLocal("STRIPE_SECRET_KEY", "{STRIPE_SECRET_KEY}");
    appendToEnvLocal("STRIPE_WEBHOOK_SECRET", "{STRIPE_WEBHOOK_SECRET}");
  }

  addCheckOutSessionsApiRoutes() {
    renderTemplate({
      inputPath:
        "stripe-processor/app/api/checkout-sessions-dynamic/route.ts.hbs",
      outputPath: "app/api/checkout-sessions-dynamic/route.ts",
      data: {
        pkFunctionInvoke: pkFunctionInvoke[this.opts.pkStrategy],
        pkStrategyImport: pkStrategyImportTemplates[this.opts.pkStrategy],
      },
    });

    renderTemplate({
      inputPath:
        "stripe-processor/app/api/checkout-sessions-one-time/route.ts.hbs",
      outputPath: "app/api/checkout-sessions-one-time/route.ts",
      data: {
        pkFunctionInvoke: pkFunctionInvoke[this.opts.pkStrategy],
        pkStrategyImport: pkStrategyImportTemplates[this.opts.pkStrategy],
      },
    });

    renderTemplate({
      inputPath:
        "stripe-processor/app/api/checkout-sessions-subscription/route.ts.hbs",
      outputPath: "app/api/checkout-sessions-subscription/route.ts",
      data: {
        pkFunctionInvoke: pkFunctionInvoke[this.opts.pkStrategy],
        pkStrategyImport: pkStrategyImportTemplates[this.opts.pkStrategy],
      },
    });
  }

  addCustomerPortalApiRoute() {
    renderTemplate({
      inputPath: "stripe-processor/app/api/customer-portal/route.ts.hbs",
      outputPath: "app/api/customer-portal/route.ts",
    });
  }

  addWebhookApiRoute() {
    renderTemplate({
      inputPath: "stripe-processor/app/api/webhook/route.ts.hbs",
      outputPath: "app/api/webhook/route.ts",
    });
  }

  addConfirmationPage() {
    renderTemplate({
      inputPath: "stripe-processor/app/(public)/confirmation/page.tsx.hbs",
      outputPath: "app/(public)/confirmation/page.tsx",
    });
  }

  addCreateProductScripts() {
    renderTemplate({
      inputPath: "stripe-processor/scripts/create-dynamic-product.ts.hbs",
      outputPath: "scripts/create-dynamic-product.ts",
    });

    renderTemplate({
      inputPath: "stripe-processor/scripts/create-one-time-product.ts.hbs",
      outputPath: "scripts/create-one-time-product.ts",
    });

    renderTemplate({
      inputPath: "stripe-processor/scripts/create-dynamic-product.ts.hbs",
      outputPath: "scripts/create-subscription-product.ts",
    });
  }

  scaffold() {
    const stripeWebhooksColumns: Record<DbDialect, string[]> = {
      postgresql: ["payload:text"],
      mysql: ["payload:text"],
      sqlite: ["payload:text"],
    };
    const stripeWebhooksProcessor = new ScaffoldProcessor({
      ...this.opts,
      authorizationLevel: "admin",
      columns: stripeWebhooksColumns[this.opts.dbDialect],
      table: "stripe_webhooks",
      enableCompletionMessage: false,
      enableUiScaffold: true,
      enableDbScaffold: true,
    });
    stripeWebhooksProcessor.process();

    const productsColumns: Record<DbDialect, string[]> = {
      postgresql: [
        "slug:text",
        "stripe_product_id:text",
        "stripe_price_id:text",
        "stripe_mode:text",
        "name:text",
        "price:integer",
        "description:text",
      ],
      mysql: [
        "slug:varchar",
        "stripe_product_id:varchar",
        "stripe_price_id:varchar",
        "stripe_mode:varchar",
        "name:varchar",
        "price:int",
        "description:text",
      ],
      sqlite: [
        "slug:text",
        "stripe_product_id:text",
        "stripe_price_id:text",
        "stripe_mode:text",
        "name:text",
        "price:integer",
        "description:text",
      ],
    };
    const productsProcessor = new ScaffoldProcessor({
      ...this.opts,
      authorizationLevel: "admin",
      columns: productsColumns[this.opts.dbDialect],
      table: "products",
      enableCompletionMessage: false,
      enableUiScaffold: true,
      enableDbScaffold: true,
    });
    productsProcessor.process();

    const paymentsColumns: Record<DbDialect, string[]> = {
      postgresql: [
        "user_id:references",
        "product_id:references",
        "amount_total:integer",
      ],
      mysql: [
        "user_id:references",
        "product_id:references",
        "amount_total:int",
      ],
      sqlite: [
        "user_id:references",
        "product_id:references",
        "amount_total:integer",
      ],
    };
    const paymentsProcessor = new ScaffoldProcessor({
      ...this.opts,
      authorizationLevel: "admin",
      columns: paymentsColumns[this.opts.dbDialect],
      table: "payments",
      enableCompletionMessage: false,
      enableUiScaffold: true,
      enableDbScaffold: true,
    });
    paymentsProcessor.process();
  }

  addLinkToPrivateSidebar() {
    insertTextAfterIfNotExists(
      "components/private/private-sidebar.tsx",
      `"use client";`,
      `import { CreditCardIcon } from "lucide-react";`
    );

    insertTextBeforeIfNotExists(
      "components/private/private-sidebar.tsx",
      "// [CODE_MARK private-sidebar-items]",
      `  { title: "Account", url: "/account", icon: CreditCardIcon },`
    );
  }

  addStripeCustomerIdToUsersSchema() {
    const record: Record<DbDialect, string> = {
      postgresql: "text()",
      mysql: "varchar({ length: 255 })",
      sqlite: "text()",
    };

    insertTextBeforeIfNotExists(
      "schema/users.ts",
      "// [CODE_MARK users-table]",
      `stripeCustomerId: ${record[this.opts.dbDialect]},\n  `
    );
  }

  printCompletionMessage() {
    log.checklist("stripe checklist");

    log.task("stripe setup");
    log.subtask("go to stripe > developers > api keys");
    log.subtask("update NEXT_STRIPE_PUBLISHABLE_KEY in .env");
    log.subtask("update STRIPE_SECRET_KEY in .env");

    log.task("stripe webhook setup");
    log.subtask("go to stripe > developers > webhooks");
    log.subtask("update STRIPE_WEBHOOK_SECRET in .env");

    log.task("start local stripe listener");
    log.cmdsubtask("stripe login");
    log.cmdsubtask("stripe listen --forward-to localhost:3000/api/webhook");

    log.task("test stripe webhook");
    log.cmdsubtask("stripe trigger payment_intent.succeeded");
    log.cmdsubtask("stripe trigger --help");

    log.task("create products in stripe and db");
    log.cmdsubtask("npx tsx scripts/create-price.ts");

    log.task("save customer portal settings");
    log.subtask("https://dashboard.stripe.com/test/settings/billing/portal");
  }
}
