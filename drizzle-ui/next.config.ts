import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.DRIZZLE_UI_GITHUB_PAGES === "true";
const githubPagesBasePath = "/drizzle-next/ui";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  assetPrefix: isGitHubPagesBuild ? githubPagesBasePath : "",
  basePath: isGitHubPagesBuild ? githubPagesBasePath : ""
};

export default nextConfig;
