---
layout: home

# Layout for the homepage. Options: 'home' | 'page' (default is 'page')

# Hero Section Configuration
hero:
  name: AMP Manager
  text: Local Web Development, Simplified.
  tagline: Docker-based stack with a click-and-run GUI. No terminal required.
  image:
    src: /amp-manager-512.png # Path to your logo (e.g., in docs/public folder)
    alt: AMP Manager Logo
  actions: # Buttons in the hero section
    - theme: brand # 'brand' or 'alt'
      text: Get Started for Students
      link: /for-students # Link to your student guide
    - theme: alt
      text: For Developers
      link: /for-developers # Link to your developer guide

# Features Section Configuration (These will render as cards)
features:
  - icon: 🚀
    title: Quick Setup
    details: Get a full local web development environment running in minutes, no Docker experience needed.
    link: /for-students # Link to a relevant page
    linkText: Learn More
  - icon: 🔒
    title: Automatic HTTPS/SSL
    details: Create local domains with green lock icons, securely testing your projects from day one.
    link: /security # Link to security features
    linkText: How it Works
  - icon: 🐳
    title: Intuitive Docker Control
    details: Manage your Angie, PHP, and MariaDB containers with a simple graphical interface.
    link: /architecture # Link to Docker control
    linkText: See Architecture
  - icon: 🛡️
    title: Secure Data Storage
    details: All sensitive data, like credentials and notes, is encrypted using AES-256-GCM.
    link: /state-management # Link to data storage
    linkText: Data Explained
  - icon: 🌐
    title: Local Domain Management
    details: Easily create, configure, and manage multiple local sites with hosts file integration.
    link: /how-to # Link to domain management
    linkText: Create a Site
  - icon: 🔗
    title: Tunnel Services
    details: Expose your local projects to the internet to share with clients or test webhooks.
    link: /local-tunneling # Link to tunnel services
    linkText: Share Your Work
  - icon: 💡
    title: Visual Workflows
    details: Automate tasks like Git operations, SFTP deployments, and shell commands with a visual builder.
    link: /workflows-deployment # Link to workflows
    linkText: Build Workflows
  - icon: 💻 
    title: Extendable & Open Source
    details: Designed for contributors, with a clear architecture and stability patterns for Neutralino.js.
    link: /contributing # Link to contributing guide
    linkText: Contribute
---

## Welcome to AMP Manager Documentation!

This is the central hub for learning everything about AMP Manager, from getting your first site up and running to contributing to its development.
