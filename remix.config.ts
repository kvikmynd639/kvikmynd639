import type { AppConfig } from "@remix-run/dev";

const config: AppConfig = {
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  serverBuildPath: "build/index.js",
  publicPath: "/build/", // If deploying to username-based GitHub Pages
};

export default config;
