module.exports = {
  docs: [
    'introduction', 'design-principles', 'contributing',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'doc2', 
        'doc3',
        {
          ["Input Number"]: ['doc2', 'doc3']
        }
      ],
    }
  ],
  // api: [
  //   'cli',
  //   'docusaurus-core',
  //   'api/docusaurus.config.js',
  //   'lifecycle-apis',
  //   'theme-classic',
  // ],
};