


module.exports = {
  title: 'I18n Components',
  tagline: 'Internationalize Components',
  url: 'https://i18n-components.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'i18n-components', // Usually your GitHub org/user name.
  projectName: 'i18n-components', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'I18n Components',
      logo: {
        alt: 'I18n Components',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'right',
        },
        // {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/i18n-components/i18n-components',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/i18n-components',
            },
            {
              label: 'Gitter',
              href: 'https://gitter.im/I18n-Component/community',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/ComponentsI18n',
            },
          ],
        },
        {
          title: 'More',
          items: [
            // {
            //   label: 'Blog',
            //   to: 'blog/',
            // },
            {
              label: 'GitHub',
              href: 'https://github.com/i18n-components/i18n-components',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} I18n Components.`,
    },
  },
  themes: ['@docusaurus/theme-live-codeblock'],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'documentation/docs',
          sidebarPath: require.resolve('./documentation/sidebars.js'),
          editUrl:
            'https://github.com/i18n-components/i18n-components/edit/main/documentation/',
        },
        // blog: {
        //   path: 'documentation/blog',
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   editUrl:
        //     'https://github.com/i18n-components/i18n-components/edit/main/documentation/blog/',
        // },
        pages: {
          path: 'documentation/pages',
        },
      },
    ],
  ]
};
