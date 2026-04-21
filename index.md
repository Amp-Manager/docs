---
layout: home

# Layout for the homepage. Options: 'home' | 'page' (default is 'page')

# Hero Section Configuration
hero:
  name: AMP Manager
  text: Local Web Development, Simplified.
  tagline: Docker-based stack with a click-and-run GUI. Extendable and Open Source.
  image:
    src: /images/amp-manager-512.png # Path to your logo (e.g., in docs/public folder)
    alt: AMP Manager Logo
  actions: # Buttons in the hero section
    - theme: brand # 'brand' or 'alt'
      text: Get Started For Users
      link: /for-users # Link to your student guide
    - theme: alt
      text: For Developers
      link: /for-developers # Link to your developer guide

# Features Section Configuration (These will render as cards)
features:
  - icon: ⚡
    title: Quick Setup
    details: Get a full local web development environment running in minutes, no Docker experience needed.
    link: /introduction # Link to a relevant page
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
  - icon: 💻
    title: Local Domain Management
    details: Easily create, configure, and manage multiple local sites with hosts file integration.
    link: /how-to # Link to domain management
    linkText: Create a Site
  - icon: 🌐
    title: Tunnel Services
    details: Expose your local projects to the internet to share with clients or test webhooks.
    link: /local-tunneling # Link to tunnel services
    linkText: Share Your Work
  - icon: 🖧
    title: Visual Workflows
    details: Automate tasks like Git operations, SFTP deployments, and shell commands with a visual builder.
    link: /workflows-deployment # Link to workflows
    linkText: Build Workflows
  - icon: 📦 
    title: Extendable & Open Source
    details: Designed for contributors, with a clear architecture and stability patterns for Neutralino.js
    link: /contributing # Link to contributing guide
    linkText: Contribute
---

<section class="odd">
  <article>
    <div class="screenshot">
      <img src="https://raw.githubusercontent.com/Amp-Manager/media/refs/heads/main/screenshots/amp-manager-desktop-prototype.jpg" width="100%" height="auto" alt="AMP Manager Dashboard" />
    </div>
  </article>
</section>

<section>
  <article class="flex">
    <div>
      <div class="txt-48">Monitor & Manage Your Stack</div>
      <p class="txt-24">
        Real-time visibility into containers, performance, and storage, with safe versioned configs.
      </p>
      <Badge type="info" text="Docker" />
      <ul>
        <li>Start, stop, or reload containers instantly </li>
        <li>Track CPU, memory, and disk usage in real time </li>
        <li>See exactly where your storage is used (databases, /www, binds) </li>
        <li>Backup and restore factory configs with version history </li>
      </ul>
    </div>
    <div>
      <p align="center">
        <img src="https://raw.githubusercontent.com/Amp-Manager/media/refs/heads/main/images/amp-manager-docker-screen.jpg" width="100%" height="auto" />
      </p>
    </div>
  </article>
</section>

<section>
  <article class="flex">
    <div>
      <p align="center">
        <img src="https://raw.githubusercontent.com/Amp-Manager/media/refs/heads/main/images/amp-manager-workflow-screen.jpg" width="100%" height="auto" />
      </p>
    </div>
    <div>
      <div class="txt-48">Build Workflows Visually</div>
      <p class="txt-24">
        Drag-and-drop node builder for local & remote synchronization. Push updates or pull repos with step-by-step workflows.
      </p>
      <Badge type="warning" text="Workflows" />
      <ul>
        <li>Drag & connect nodes to map your deployment pipeline </li>
        <li>Push local sites to remote servers (Git or SFTP)</li>
        <li>Pull remote repos directly to your local environment</li>
      </ul>
    </div>
  </article>
  <article>
    <p class="txt-24 center">
    This is the central hub for learning everything about AMP Manager, <br>
    from getting your first site up and running to contributing to its development.
    </p>
    <div class="flex cta">
      <div>
      <a class="btn-cta" href="/docs/for-users.html">Get Started For Users</a>
      </div>
      <div>
      <a class="btn-cta alt" href="/docs/for-developers.html">For Developers</a>
      </div>
    </div>
  </article>
</section>