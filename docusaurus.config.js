// const path = require('path');
// const versions = require('./versions.json');

// const allDocHomesPaths = [
//   '/docs/',
//   '/docs/next/',
//   ...versions.slice(1).map((version) => `/docs/${version}/`),
// ];

// const isDev = process.env.NODE_ENV === 'development';

const baseUrl = process.env.BASE_URL || '/';
// // const isBootstrapPreset = process.env.DOCUSAURUS_PRESET === 'bootstrap';

// const isVersioningDisabled = !!process.env.DISABLE_VERSIONING;


module.exports = {
  title: 'I18n Components',
  tagline: 'Internationalize Components',
  url: 'https://i18n-components.github.io',
  baseUrl,
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
  plugins: ['docusaurus-plugin-sass'],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'documentation/docs',
          sidebarPath: require.resolve('./documentation/sidebars.js'),
          editUrl:
            'https://github.com/i18n-components/i18n-components/edit/main/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          remarkPlugins: [
            [require('remark-codesandbox'), {mode: 'iframe'}],
          ],
          // disableVersioning: isVersioningDisabled,
          // lastVersion: 'current',
          // onlyIncludeVersions:
          //   !isVersioningDisabled && (isDev)
          //     ? ['current', ...versions.slice(0, 2)]
          //     : undefined,
          // versions: {
          //   current: {
          //     label: `${versions[0]} (unreleased)`,
          //   },
          // },
        },
        // blog: {
        //   path: 'documentation/blog',
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   editUrl:
        //     'https://github.com/i18n-components/i18n-components/edit/main/',
        // },
        pages: {
          path: 'documentation/pages',
          remarkPlugins: [
            [require('remark-codesandbox'), {mode: 'iframe'}],
          ]
        },
        theme: {
          customCss: [require.resolve('./documentation/styles/main.scss')],
        },
      },
    ],
  ]
};
