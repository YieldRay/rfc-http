import { defineConfig } from "vitepress";
import { pagefindPlugin } from "vitepress-plugin-pagefind";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "RFC-HTTP",
  description: "HTTP相关RFC概述",
  lang: "zh-CN",
  locales: {
    root: {
      label: "简体中文",
      lang: "zh-CN",
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Start", link: "/start" },
      { text: "RFC4918", link: "https://rfc4918.488848.xyz/" },
    ],
    sidebar: [
      { text: "RFC2068", link: "/rfc2068" },
      { text: "RFC2616", link: "/rfc2616" },
      {
        text: "RFC7230-7235",
        items: Array.from({ length: 6 }, (_, i) => 7230 + i).map((id) => ({
          text: `RFC${id}`,
          link: `/rfc${id}`,
        })),
      },
      {
        text: "RFC9110-9112",
        items: Array.from({ length: 3 }, (_, i) => 9110 + i).map((id) => ({
          text: `RFC${id}`,
          link: `/rfc${id}`,
        })),
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/YieldRay/rfc-http" },
    ],
  },
  vite: {
    plugins: [
      // https://github.com/emersonbottero/vitepress-plugin-search
      pagefindPlugin({
        forceLanguage: "zh-cn",
        btnPlaceholder: "搜索文档",
        placeholder: "搜索文档",
        emptyText: "没有搜索历史",
        heading: "共: {{searchResult}} 条结果",
        customSearchQuery(input) {
          // 将搜索的每个中文单字两侧加上空格
          return input
            .replace(/[\u4E00-\u9FA5]/g, " $& ")
            .replace(/\s+/g, " ")
            .trim();
        },
      }),
    ],
    optimizeDeps: {
      exclude: ["@nolebase/vitepress-plugin-enhanced-readabilities/client"],
    },
    ssr: {
      noExternal: ["@nolebase/vitepress-plugin-enhanced-readabilities"],
    },
  },
});
