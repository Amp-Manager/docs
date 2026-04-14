import { withMermaid } from "vitepress-plugin-mermaid";

export default withMermaid({
  title: "AMP Manager Docs",
  description: "Documentation for AMP Manager",
  base: "/docs/",
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
  // head property to inject scripts
  head: [
    // Favicon
    ['link', { rel: 'icon', href: '/docs/favicon.ico' }],
    // Meta Description (SEO)
    ['meta', { name: 'description', content: 'Documentation for AMP Manager - Offline-first, eco-aware development environment for PHP, Node.js, and Python' }],
    // Meta Keywords (optional, low priority)
    ['meta', { name: 'keywords', content: 'AMP Manager, documentation, local development, PHP, Node.js, Python, offline-first, eco-aware, sustainable dev' }],
    
    // Open Graph / Facebook
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'AMP Manager Docs' }],
    ['meta', { property: 'og:description', content: 'Documentation for AMP Manager - Offline-first, eco-aware development environment' }],
    ['meta', { property: 'og:image', content: '/docs/images/amp-manager-512.png' }],
    ['meta', { property: 'og:url', content: 'https://amp-manager.github.io/docs/' }],
    
    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'AMP Manager Docs' }],
    ['meta', { name: 'twitter:description', content: 'Documentation for AMP Manager - Offline-first, eco-aware development environment' }],
    ['meta', { name: 'twitter:image', content: '/docs/images/amp-manager-512.png' }],
    
    // Canonical URL (helps SEO)
    ['link', { rel: 'canonical', href: 'https://amp-manager.github.io/docs/' }]
  ],
  lastUpdated: true,
  themeConfig: {
    logo: {
      // No prefix '/docs/'
      src: '/images/amp-manager-logo-32.png',
      alt: 'AMP Manager'
    },
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'GitHub', link: 'https://github.com/Amp-Manager' },
      { text: 'Config', link: '/config' },
      { text: 'Changelog', link: 'https://github.com/Amp-Manager/amp-manager/CHANGELOG.md' }
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
          { text: 'For Users', link: '/for-users' },
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
          { text: 'How To', link: '/how-to' },
          { text: 'Contributing', link: '/contributing' },
          { text: 'Troubleshooting Guide', link: '/troubleshooting' },
          { text: 'Glossary', link: '/glossary' }
        ]
      }
    ],
  },

});