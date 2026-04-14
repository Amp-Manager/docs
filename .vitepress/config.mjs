import { withMermaid } from "vitepress-plugin-mermaid";

export default withMermaid({
  title: "AMP Manager Docs",
  description: "Documentation for AMP Manager",
  base: "/docs/",
  // head property to inject scripts

  // Optional: Configure Mermaid.js options directly
  mermaid: {
    // Refer to https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults
    // For example:
    // theme: 'neutral',
    // securityLevel: 'loose'
  },
  // Optional: Configure vitepress-plugin-mermaid specific options
  mermaidPlugin: {
    // class: "mermaid my-class", // set additional css classes for parent container
    // lineNumbers: false // whether to show line numbers in mermaid code blocks (default: false)
  },
  head: [
    ['link', { rel: 'icon', href: '/docs/images/amp-manager-512.png' }],
    ['meta', { property: 'og:image', content: '/docs/images/amp-manager-512.png' }]
  ],
  lastUpdated: true,
  themeConfig: {
    logo: '/docs/images/amp-manager-logo-32.png',
    nav: [
      { text: 'Guide', link: '/guide' },
      { text: 'Config', link: '/config' },
      { text: 'Changelog', link: 'https://github.com/...' }
    ],
    editLink: {
      pattern: "https://github.com/amp-manager/docs/edit/main/:path",
      text: "Edit this page on GitHub"
    },
    // Sidebar configuration
    sidebar: [
      {
        text: 'Getting Started',
        collapsed: true,
        items: [
          { text: 'Introduction', link: '/introduction' }, // Assuming docs/introduction.md
          { text: 'For Students', link: '/for-students' },
          { text: 'For Developers', link: '/for-developers' }
        ]
      },
      {
        text: 'Fundamentals',
        items: [
          { text: 'Core Concepts', link: '/core-concepts' }
        ]
      },
      {
        text: 'Architecture & Internals',
        collapsed: true,
        items: [
          { text: 'Architecture Overview', link: '/architecture' },
          { text: 'State Management', link: '/state-management' }
        ]
      },
      {
        text: 'References',
        collapsed: true,
        items: [
          { text: 'AMP Tasks Reference', link: '/amp-tasks-reference' },
          { text: 'API Reference', link: '/api-reference' }
        ]
      },
      {
        text: 'User Interface',
        collapsed: true,
        items: [
          { text: 'User Interface Documentation', link: '/user-interface' },
          { text: 'Component Guide', link: '/component-reference' }
        ]
      },
      {
        text: 'Features & Guides',
        collapsed: true,
        items: [
          { text: 'Security & Safety Design', link: '/security' },
          { text: 'Workflows & Deployment', link: '/workflows-deployment' },
          { text: 'Local Tunneling', link: '/local-tunneling' } // This page is docs/10-Local-Tunneling.md
        ]
      },
      {
        text: 'Help & Contribution',
        collapsed: true,
        items: [
          { text: 'Contributing', link: '/contributing' },
          { text: 'Troubleshooting Guide', link: '/troubleshooting' },
          { text: 'Glossary', link: '/glossary' }
        ]
      }
    ],
  },

});