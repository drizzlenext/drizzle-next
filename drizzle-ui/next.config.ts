import type { NextConfig } from "next";

const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const githubPagesBasePath = "/drizzle-next/ui";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  assetPrefix: isGitHubActions ? githubPagesBasePath : "",
  basePath: isGitHubActions ? githubPagesBasePath : ""
};

export default nextConfig;
