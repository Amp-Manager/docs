# Glossary

Terms and concepts used in AMP Manager, explained in plain language.


## Core Concepts

### Domain

A local website address. Like `google.com` on the internet, but `.local` domains only work on your computer.

**Example:** `myproject.local`

**Related:** [Create a domain in AMP](./for-students#creating-your-first-site)


### SSL/TLS Certificate

A security certificate that enables HTTPS (secure connections). It proves your site is legitimate and encrypts data.

**Visual:**
```
http://mysite.local    ->  Unsecure (red warning)
https://mysite.local   ->  Secure (green lock)
```


### Sync

The process AMP runs on every login to verify your environment is working correctly.

**What it checks:**
1. Configuration files exist
2. Docker is running
3. SSL certificates are valid
4. Domains are registered
5. Database is up to date

**Why it runs every login:** See [Security Design](./security)


### Container (Docker)

A lightweight, isolated environment that runs a service (web server, database, etc.).

**AMP uses three containers:**
| Container | Service |
|-----------|---------|
| `angie_amp` | Web server (nginx replacement) |
| `php_amp` | PHP runtime |
| `db_amp` | MariaDB database |


### CA (Certificate Authority)

A "trusted issuer" that vouches for your SSL certificates. AMP uses `mkcert` to create a local CA.

**Why needed:** Without a CA, browsers won't trust your local SSL certificates.



## User-Facing Terms

### Workflow

A visual automation tool that lets you chain commands (Git, SFTP, npm) together.

**Use cases:**
- Deploy code to a server
- Pull latest changes from Git
- Sync files via SFTP


### Credential

A stored username/password or SSH key for external services.

**Types:**
- SSH Keys (for SFTP, Git)
- API Keys
- Database passwords

**Stored:** Encrypted in JSON files (`users/user_{username}/credentials.json`)



### Note

A text note in AMP, optionally encrypted for sensitive information.

**Features:**
- Plain text or encrypted
- Tag with sites
- Rich markdown support

**Stored:** Encrypted in JSON files (`users/user_{username}/notes.json`)



### Tag

A label you can add to sites, notes, databases for organization.

**Example:** `["portfolio", "client-work", "testing"]`

**Stored:** JSON file (`users/user_{username}/tags.json`)



## Technical Terms

### JSON Storage

AMP Manager's primary storage system using JSON files in the `users/user_{username}/` folder.

**Files in `users/user_{username}/`:**
| File | Purpose | Encrypted |
|------|---------|----------|
| `user.json` | Auth (salt + validation) | No |
| `sites.json` | Domain configurations | No |
| `notes.json` | Notes | Yes |
| `credentials.json` | SSH keys, passwords | Yes |
| `workflows.json` | Automation workflows | Yes |
| `settings.json` | User settings | Yes |
| `site_configs.json` | Config backups | Yes |
| `domain_status.json` | Domain health | No |
| `activity_logs.json` | Activity history | No |
| `tags.json` | Tags | No |
| `tunnels.json` | Active tunnels | No |
| `databases.json` | Database metadata | No |
| `databases_cache.json` | Database cache | No |

### Zustand

A state management library for React. Manages UI state that doesn't need to persist.

**Used in AMP for:**
- Docker metrics (real-time)
- UI toggles
- Polling settings



### Neutralino.js

The runtime that lets AMP run as a desktop app (instead of just a website).

**Why Neutralino:**
- Lightweight (no Electron overhead)
- Native Windows support
- Secure API allowlist



### amp-tasks.bat

The Windows batch script that handles all backend operations.

**What it does:**
- Creates domains
- Manages Docker
- Handles SSL certificates
- Manages databases



### hosts file

A Windows file that maps domain names to IP addresses.

**Location:** `C:\Windows\System32\drivers\etc\hosts`

**AMP adds entries like:**
```
127.0.0.1    myproject.local
```


### mkcert

A tool that creates locally-trusted SSL certificates.

**Used by AMP to:**
- Create a local Certificate Authority
- Generate certificates for `.local` domains


### Angie

The web server (nginx fork) that serves your local sites.

**Why Angie:**
- Modern nginx fork
- Better performance
- Active development


## Workflow/Deployment Terms

### SFTP

SSH File Transfer Protocol - secure file transfer using SSH keys.

**vs FTP:** SFTP is more secure and uses key-based auth.


### SSH Key

A pair of cryptographic keys (public + private) for secure authentication.

**Public key:** Shared with servers you want to access
**Private key:** Kept on your machine, never shared


### Deploy Key

An SSH key added to a Git repository for read/write access during deployment.


### Webhook

An HTTP POST request that triggers an action (like deploying code).

**Use in AMP:** Trigger deployments from external services


## Error Terms

### UAC

User Account Control - Windows security that prompts for admin permission.

**AMP needs admin because:**
- Modify hosts file
- Install SSL certificates
- Control Docker


### nativeAllowList

A security setting in Neutralino that controls which APIs JavaScript can call.

**Purpose:** If JS is compromised, limits damage by blocking unauthorized system calls


## Quick Reference Table

| Term | Simple Definition | Where to Learn |
|------|-------------------|----------------|
| Domain | Local website address | [For Students](./for-students) |
| SSL | Secure HTTPS | [For Students](./for-students) |
| Sync | Environment check | [Security Design](./security) |
| Container | Isolated service | [For Students](./for-students) |
| Workflow | Automation tool | [Workflows](./workflows-deployment) |
| Credential | Saved auth data | [Workflows](./workflows-deployment) |
| JSON Storage | File-based persistence | [State Management](./state-management) |
| Neutralino | Desktop runtime | [For Developers](./for-developers) |

---

## See Also

- [For Students](./for-students) - Beginner guide
- [For Developers](./for-developers) - Developer guide
- [Workflows & Deployment](./workflows-deployment) - Deployment workflows
- [Security Design](./security) - Security details
- [State Management](./state-management) - Data storage