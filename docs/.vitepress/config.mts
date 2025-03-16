import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Drizzle Next",
  description: "Generate Next.js And Drizzle ORM Code",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Drizzle Next", link: "/drizzle-next/" },
      { text: "Drizzle Admin", link: "/drizzle-admin/"},
      { text: "Drizzle UI", link: "/drizzle-ui/" },
      { text: "Demo", link: "https://demo.drizzle-next.com" },
    ],

    sidebar: [
      {
        // text: "Documentation",
        items: [
          // { text: "Markdown Examples", link: "/markdown-examples" },
          // { text: "Runtime API Examples", link: "/api-examples" },
          { text: "Drizzle Next", link: "/drizzle-next/", items: [
            { text: "Installation", link: "/drizzle-next/installation" },
            { text: "Guide", link: "/drizzle-next/guide" },
            { text: "About", link: "/drizzle-next/about" },
          ]},
          { text: "Drizzle Admin", link: "/drizzle-admin/", items: [
            { text: "Installation", link: "/drizzle-admin/installation"},
            { text: "Guide", link: "/drizzle-admin/guide"},
          ]},
          { text: "Drizzle UI", link: "/drizzle-ui/", items: [
            { text: "Installation", link: "/drizzle-ui/installation"},
            { text: "Guide", link: "/drizzle-ui/guide"}
          ]}
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/drizzle-next/drizzle-next" },
    ],

    search: {
      provider: "local",
    },

    footer: {
      message: "Released under the MIT License.",
      copyright:
        'Copyright © 2025-present <a href="https://x.com/TravisLuong">Travis Luong</a>',
    },
  },
  ignoreDeadLinks: true,
  head: [
    [
      "script",
      {
        async: "",
        src: "https://www.googletagmanager.com/gtag/js?id=G-FR34HJSEG9",
      },
    ],
    [
      "script",
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-FR34HJSEG9');`,
    ],
  ],
});
