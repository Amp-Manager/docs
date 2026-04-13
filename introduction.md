# AMP Manager

Desktop app for local development. Docker-based stack with a click-and-run GUI. No terminal required.

---

<p align="center">
  <img src="https://raw.githubusercontent.com/Amp-Manager/media/refs/heads/main/screenshots/amp-manager-desktop-prototype.jpg" width="100%" height="auto" />
</p>

## Features

AMP Manager provides a unified interface for:

- Local domain management with automatic SSL certificates
- Docker container monitoring and control
- Encrypted credentials and notes storage
- Visual workflow automation
- Tunnel services integration (share local projects)

## Activity Timeline

<p align="center">
  <img src="https://raw.githubusercontent.com/Amp-Manager/media/refs/heads/main/screenshots/amp-manager-desktop-prototype-activity.jpg" width="100%" height="auto" />
</p>

## Docker Management

<p align="center">
  <img src="https://raw.githubusercontent.com/Amp-Manager/media/refs/heads/main/screenshots/amp-manager-desktop-prototype-docker.jpg" width="100%" height="auto" />
</p>

## First Run Setup

1. **Install Docker Desktop** - Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. **Install AMP Manager** - Download a release or clone to your drive

> **IMPORTANT**: After running `npm run build:app`, you MUST run `post-build.bat` to apply the UAC manifest. Without this, the app runs without admin privileges and cannot install SSL certificates or modify the hosts file.

### Run Docker and Amp Manager

1. **Start Docker Desktop** - Ensure Docker is running (check system tray icon)
2. **Initialize containers** - Open a terminal in the AMP Manager folder and run:
   ```
   docker compose up -d
   ```
3. **Launch AMP Manager** - The dashboard will show all systems as "Healthy"

> **Note:** Docker must be running whenever you use AMP Manager. The Dashboard's System Checks section displays the current status. You can also use AMP Manager to launch and control Docker.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS, DaisyUI |
| Backend | Neutralino.js 6.5, Windows Batch (amp-tasks.bat) |
| Storage | JSON Files (users/ folder), Web Crypto for encryption |
| Containers | Docker Compose (Angie, PHP, MariaDB) |

## Documentation

| Document | Description |
|----------|-------------|
| [Core Concepts](./01-Core-Concepts.md) | How AMP works |
| [For Students](./02-For-Students.md) | Step-by-step for beginners |
| [For Developers](./02-For-Developers.md) | Quick start for devs |
| [Architecture](./03-Architecture.md) | System design |
| [Amp Tasks Reference](./04-Amp-Tasks-Reference.md) | Batch commands |
| [API Reference](./05-API-Reference.md) | AMPBridge API |
| [Component Reference](./06-Component-Reference.md) | UI components |
| [User Interface](./07-User-Interface.md) | UI tech stack |
| [Security](./08-Security.md) | Security model |
| [Workflows](./09-Workflows-Deployment.md) | Deployment guides |
| [Tunneling](./10-Local-Tunneling.md) | Tunnel services |
| [Contributing](./11-Contributing.md) | Developer guide |
| [Troubleshooting](./12-Troubleshooting.md) | Common issues |
| [Glossary](./13-Glossary.md) | Terms explained |

---

## Quick Start

### Prerequisites

- Docker Desktop installed and running
- Windows 10/11

### Installation

1. Clone or download AMP Manager
2. Open terminal in the project folder
3. Run: `docker compose up -d`
4. Run: `npm run build:app`
5. Run: `post-build.bat`
6. Launch `amp-manager.exe`

### Creating Your First Domain

1. Open AMP Manager
2. Click "Add Domain"
3. Enter domain name (e.g., `mysite`)
4. Click Create

Your domain is now available at `http://mysite.local` with automatic SSL!

---

## Key Concepts

### Domains

Local domains with automatic SSL. Each domain gets:
- Auto-created folder in `www/`
- SSL certificate via mkcert
- Angie configuration
- Hosts file entry

### Containers

Docker containers managed by AMP:
- **Angie** - Web server
- **PHP** - PHP runtime
- **MariaDB** - Database

### Encryption

Sensitive data (credentials, notes, settings, workflows, site configs) is encrypted using AES-256-GCM with keys derived from your password.

---

## Support

- Issues: [GitHub Issues](https://github.com/amp-manager/amp-manager/issues)
- Discussions: [GitHub Discussions](https://github.com/amp-manager/amp-manager/discussions)

---

## License

MIT License - See LICENSE file for details.
