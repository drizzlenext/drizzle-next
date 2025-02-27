const drizzleNextConfig = {
  "version": "0.0.5",
  "packageManager": "npm",
  "latest": false,
  "dbDialect": "sqlite",
  "dbPackage": "better-sqlite3",
  "pkStrategy": "uuidv4",
  "cssStrategy": "tailwind",
  "colorPalette": "slate",
  "authEnabled": true,
  "authSolution": "authjs",
  "authProviders": [
    "credentials"
  ],
  "adminEnabled": true,
  "install": true,
  "pluralizeEnabled": true
};

export default drizzleNextConfig;