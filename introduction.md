# AMP Manager

Desktop app for local development. Docker-based stack with a click-and-run GUI.   
No terminal required. Extendable and Open Source.


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

## Prerequisites

- Windows 10/11
- Docker Desktop installed and running


## First Run Setup

1. **Install Docker Desktop** - Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. **Install AMP Manager** - Download the latest [release to your drive](https://github.com/Amp-Manager/amp-manager/releases)


### Run Docker and Amp Manager

1. **Start Docker Desktop** - Ensure Docker is running (check system tray icon)
2. **Initialize containers** - Open a terminal in the AMP Manager folder and run:
   ```
   docker compose up -d
   ```
3. **Launch AMP Manager**
4. **Install Root CA**

The dashboard will show all systems as "Healthy"

<Badge type="info" text="System Checks" />

> Docker must be running whenever you use AMP Manager. The Dashboard's System Checks section displays the current status. You can also use AMP Manager to launch and control Docker.

### Creating Your First Domain

1. Open AMP Manager
2. Click "Add Domain"
3. Enter domain name (e.g., `myproject`)
4. Click Create

Your domain is now available at `https://myproject.local` with automatic SSL!



## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS, DaisyUI |
| Backend | Neutralino.js 6.5, Windows Batch (amp-tasks.bat) |
| Storage | JSON Files (users/ folder), Web Crypto for encryption |
| Containers | Docker Compose (Angie, PHP, MariaDB) |

### Development

1. Clone or download AMP Manager
2. Open terminal in the project folder
3. Run: `docker compose up -d`
4. Run: `npm run build:app`
5. Run: `post-build.bat`
6. Launch `amp-manager.exe`

<Badge type="warning" text="IMPORTANT" />

> After running `npm run build:app`, you MUST run `post-build.bat` to apply the UAC manifest. Without this, the app runs without admin privileges and cannot install SSL certificates or modify the hosts file.


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
- **Mailpit** - Mail


### Encryption

Sensitive data (credentials, notes, settings, workflows, site configs) is encrypted using AES-256-GCM with keys derived from your password.


## Documentation

| Document | Description |
|----------|-------------|
| [Core Concepts](./core-concepts) | How AMP works |
| [For Users](./for-users) | Step-by-step for beginners |
| [For Developers](./for-developers) | Quick start for devs |
| [Architecture](./architecture) | System design |
| [Amp Tasks Reference](./amp-tasks-reference) | Batch commands |
| [API Reference](./api-reference) | AMPBridge API |
| [Component Reference](./component-reference) | UI components |
| [User Interface](./user-interface) | UI tech stack |
| [Security](./security) | Security model |
| [Workflows](./workflows-deployment) | Deployment guides |
| [Tunneling](./local-tunneling) | Tunnel services |
| [Contributing](./contributing) | Developer guide |
| [Troubleshooting](./troubleshooting) | Common issues |
| [Glossary](./glossary) | Terms explained |


## Support

- Issues: [GitHub Issues](https://github.com/amp-manager/amp-manager/issues)
- Troubleshooting: [GitHub Discussions](./troubleshooting)



## License

AMP Manager is released under the MIT License.
