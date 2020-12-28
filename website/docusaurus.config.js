const baseUrl = process.env.BASE_URL || '/';
const trackingID = process.env.GA_TRACKING_ID || '';

module.exports = {
  title: "I18n Components",
  tagline: "Internationalize Components",
  url: "https://i18n-components.github.io/i18n-components/",
  baseUrl,
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "i18n-components", // Usually your GitHub org/user name.
  projectName: "i18n-components", // Usually your repo name.
  themeConfig: {
    googleAnalytics: {
      trackingID,
      // Optional fields.
      anonymizeIP: true, // Should IPs be anonymized?
    },
    navbar: {
      title: "I18n Components",
      logo: {
        alt: "I18n Components",
        src: "img/logo.svg",
      },
      items: [
        {
          to: "docs/",
          activeBasePath: "docs",
          label: "Docs",
          position: "right",
        },
        // {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: "https://github.com/i18n-components/i18n-components",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href:
                "https://stackoverflow.com/questions/tagged/i18n-components",
            },
            {
              label: "Gitter",
              href: "https://gitter.im/I18n-Component/community",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/ComponentsI18n",
            },
          ],
        },
        {
          title: "More",
          items: [
            // {
            //   label: 'Blog',
            //   to: 'blog/',
            // },
            {
              label: "GitHub",
              href: "https://github.com/i18n-components/i18n-components",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} I18n Components.`,
    },
  },
  plugins: ["docusaurus-plugin-sass"],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/facebook/docusaurus/edit/master/website/",
          remarkPlugins: [[require("remark-codesandbox"), { mode: "iframe" }]],
        },
        theme: {
          customCss: [require.resolve("./styles/main.scss")],
        },
      },
    ],
  ],
};
