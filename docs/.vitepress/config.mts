import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Drizzle Next",
  description: "Generate Next.js And Drizzle ORM Code",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Docs", link: "/docs" },
    ],

    // sidebar: [
    //   {
    //     text: "Examples",
    //     items: [
    //       { text: "Markdown Examples", link: "/markdown-examples" },
    //       { text: "Runtime API Examples", link: "/api-examples" },
    //       { text: "Docs", link: "/docs" },
    //     ],
    //   },
    // ],

    socialLinks: [
      { icon: "github", link: "https://github.com/drizzle-next/drizzle-next" },
    ],
  },
  ignoreDeadLinks: true,
});
