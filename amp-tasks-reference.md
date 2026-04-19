# AMP Tasks Command Reference

Complete reference for all commands available in the AMP Manager backend batch script `amp-tasks.bat`


## Usage

```bash
amp-tasks.bat <command> [arguments]
```

All commands return JSON output for parsing by the frontend.



## Domain Management

### new_domain

Create a new local domain with SSL certificate.

```bash
amp-tasks.bat new_domain <domain> [scaffold]
```

| Argument | Description |
|----------|-------------|
| `domain` | Project name (auto-converted to `name.local`) |
| `scaffold` | Optional: "scaffold" to copy template files |

**Output:**   

```json
{
  "status": "ok",
  "domain": "example.local",
  "folder": "D:\\path\\to\\www\\example.local",
  "config": "D:\\path\\to\\config\\angie-sites\\example.local.conf",
  "cert": "D:\\path\\to\\config\\certs\\example.local.pem",
  "key": "D:\\path\\to\\config\\certs\\example.local-key.pem",
  "hosts_added": true,
  "scaffolded": true,
  "steps": [...]
}
```

### remove_domain

Remove a domain and all associated files.

```bash
amp-tasks.bat remove_domain <domain>
```

| Argument | Description |
|----------|-------------|
| `domain` | Domain name (with or without `.local`) |

### generate_config

Regenerate SSL certificate and config for existing domain.

```bash
amp-tasks.bat generate_config <domain>
```

### scan_domains

Scan hosts file for all AMP-managed domains.

```bash
amp-tasks.bat scan_domains
```

### list_domains

List domains managed by AMP (with config/SSL status).

```bash
amp-tasks.bat list_domains
```


## Certificate Authority (SSL)

### ca_status

Check mkcert CA status.

```bash
amp-tasks.bat ca_status
```

### ca_reset

Reset and reinstall the local CA.

```bash
amp-tasks.bat ca_reset
```

### ca_uninstall

Uninstall the local CA.

```bash
amp-tasks.bat ca_uninstall
```

### regenerate_ssl

Regenerate SSL for a single domain.

```bash
amp-tasks.bat regenerate_ssl <domain>
```

### regenerate_all_ssl

Regenerate SSL for all domains.

```bash
amp-tasks.bat regenerate_all_ssl
```


## SSH Keys

### ssh_key_status

Check SSH key status.

```bash
amp-tasks.bat ssh_key_status
```

### ssh_key_generate

Generate SSH key pair.

```bash
amp-tasks.bat ssh_key_generate <username>
```


## Docker Control

### docker_up

Start all Docker containers.

```bash
amp-tasks.bat docker_up
```

### docker_stop

Stop all Docker containers.

```bash
amp-tasks.bat docker_stop
```

### docker_restart

Restart all Docker containers.

```bash
amp-tasks.bat docker_restart
```

### restart_angie

Restart only the Angie (nginx) container.

```bash
amp-tasks.bat restart_angie
```

### restart_runtime

Restart PHP and database containers.

```bash
amp-tasks.bat restart_runtime
```

### docker_desktop_launch

Launch Docker Desktop application.

```bash
amp-tasks.bat docker_desktop_launch
```


## Database

### db_query

Execute database query.

```bash
amp-tasks.bat db_query <query>
```

**Query Formats:**   

| Format | Example | Description |
|--------|---------|-------------|
| `LIST` | `db_query LIST` | Show all databases |
| `delete<name>` | `db_query deletemydb` | Delete database |
| `name\|\|user\|\|pass` | `db_query mydb\|\|myuser\|\|mypass` | Create database with user |


## Status & Health

### status

Check system status (Docker running, container count).

```bash
amp-tasks.bat status
```

### env_status

Check environment configuration status.

```bash
amp-tasks.bat env_status
```

Checks: docker-compose.yml, angie.conf, db-init, php.ini, data folder, www folder, certificates, mkcert, CA, Docker running.

### runtime_status

Check runtime container status.

```bash
amp-tasks.bat runtime_status
```

Returns: docker engine, angie, php, db running status.

### php_extensions

Get loaded PHP extensions.

```bash
amp-tasks.bat php_extensions
```

### docker_env_metrics

Get Docker metrics (info, disk usage, running containers).

```bash
amp-tasks.bat docker_env_metrics
```


## Workflows

### workflow_git

Execute git command in domain folder.

```bash
amp-tasks.bat workflow_git <domain> <command>
```

### workflow_sftp

Upload files via SFTP.

```bash
amp-tasks.bat workflow_sftp <host> <username> <localPath> <remotePath> <keyFile> <keyType>
```

| Argument | Description |
|----------|-------------|
| `host` | SFTP server address |
| `username` | SSH username |
| `localPath` | Local file/folder path |
| `remotePath` | Remote destination |
| `keyFile` | SSH private key path |
| `keyType` | "temp" or "permanent" |


### workflow_webhook

Send HTTP webhook request.

```bash
amp-tasks.bat workflow_webhook <url> <payload>
```

### workflow_action

Execute arbitrary command in domain folder.

```bash
amp-tasks.bat workflow_action <domain> <command>
```


## Maintenance

### clear_cache

Clear Angie cache folder.

```bash
amp-tasks.bat clear_cache
```

### clear_logs

Clear logs folder.

```bash
amp-tasks.bat clear_logs
```

### angie_live_status

Check Angie server live status (HTTP health check).

```bash
amp-tasks.bat angie_live_status
```

**Output:**
```json
{
  "status": "ok",
  "live": true,
  "url": "https://angie.local/",
  "responseTime": 15
}
```

| Field | Description |
|-------|-------------|
| `live` | true if server responds |
| `url` | Health check URL |
| `responseTime` | Response time in ms |



## Version

### version

Get AMP Manager version.

```bash
amp-tasks.bat version
```

Output:
```json
{
  "status": "ok",
  "version": "1.0.0",
  "build": "2026-03-07",
  "engine": "amp-manager-batch"
}
```


## Monitoring & Recovery

### watch

Start watchdog monitoring for zombie app recovery.

```bash
amp-tasks.bat watch
```

**Purpose:** Detached background process that monitors the AMP Manager app for hangs or freezes, and auto-restarts if needed.

**Configuration:**

| Setting | Default | Description |
|---------|---------|-------------|
| CHECK_INTERVAL | 30 | Seconds between checks |
| MAX_FAILURES | 2 | Failures before restart |

**How It Works:**

1. Reads `config.json` to get stored PID and port
2. Every 30 seconds:
   - Check 1: Is stored PID still running? (`tasklist /fi "PID eq ..."`)
   - Check 2: Is port responding? (`netstat`)
3. Increment failure count if check fails
4. If 2 failures in a row:
   - Kill the app (`taskkill /f /pid ...`)
   - Restart app (`start "" amp-manager-win_x64.exe`)
   - Reset failure count

**Check Output (logged):**
```
[AMP] Watchdog starting...
[AMP] Monitoring for zombie app recovery...
[AMP] PID 12345 is running
[AMP] Port 51717 is responding
```

**Started By:** `ampBridge.spawnWatchdog()` on app startup (see `src/services/AMPBridge.ts`)

**Location in batch:** `amp-tasks.bat:1514`

---

## Error Response Format

All errors return:

```json
{
  "status": "error",
  "message": "Error description"
}
```


## See Also

- [Workflows & Deployment](./workflows-deployment)
- [Security Model](./security)
