import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Drizzle Next",
  description: "Generate Next.js And Drizzle ORM Code",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Docs", link: "/introduction" },
      { text: "Demo", link: "https://demo.drizzle-next.com" },
    ],

    sidebar: [
      {
        // text: "Documentation",
        items: [
          // { text: "Markdown Examples", link: "/markdown-examples" },
          // { text: "Runtime API Examples", link: "/api-examples" },
          { text: "Introduction", link: "/introduction" },
          { text: "Installation", link: "/installation" },
          { text: "Guide", link: "/guide" },
          { text: "About", link: "/about" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/drizzle-next/drizzle-next" },
    ],

    search: {
      provider: "local",
    },
  },
  ignoreDeadLinks: true,
});
