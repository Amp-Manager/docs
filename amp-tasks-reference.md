# amp-tasks.bat Command Reference

Complete reference for all commands available in the AMP Manager backend batch script.

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


## Version

### version

Get AMP Manager version.

```bash
amp-tasks.bat version
```


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
