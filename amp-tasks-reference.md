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
| CHECK_INTERVAL | 20 | Seconds between checks |
| MAX_FAILURES | 3 | Failures before restart |

**Lock File Mechanism:**

Prevents duplicate watchdogs from running simultaneously:

```bat
set "LOCK_FILE=%temp%\amp_watchdog.lock"

:: Exit if another watchdog is running
if exist "%LOCK_FILE%" (
    echo [AMP] Lock file exists - exiting
    exit /b 0
)

:: Acquire lock
type nul > "%LOCK_FILE%"
```

**How It Works:**

1. Reads `config.json` to get stored PID
2. Every 20 seconds:
   - **Check 1 (exitFlag):** Is user quitting? (`findstr` for `exitFlag:true`)
   - **Check 2 (PID):** Is stored PID still running? (`tasklist /fi "PID eq ..."`)
3. Increment failure count if PID check fails
4. If 3 failures in a row → restart app
5. On clean exit: cleanup lock file, exit

**Monitoring Loop:**

```batch
:WATCH_LOOP
timeout /t %CHECK_INTERVAL% /nobreak >nul

:: Check exitFlag FIRST
findstr /i "\"exitFlag\":true" "%CONFIG_FILE%" >nul 2>nul
if not errorlevel 1 (
    goto :CLEANUP
)

:: Get app PID from config
set "APP_PID="
for /f "tokens=2 delims=:" %%a in ('findstr /i "\"pid\"" "%CONFIG_FILE%"') do (
    set "RAW=%%~a"
    set "RAW=!RAW: =!"
    set "RAW=!RAW:,=!"
    set "RAW=!RAW:"=!"
    set "APP_PID=!RAW!"
)

if not defined APP_PID goto :WATCH_LOOP

:: Check if app PID is alive
tasklist /fi "PID eq !APP_PID!" 2>nul | findstr /i "!APP_PID!" >nul
if not errorlevel 1 (
    set "FAILURE_COUNT=0"
    goto :WATCH_LOOP
)

:: App dead
echo [AMP] App PID !APP_PID! NOT FOUND
set /a FAILURE_COUNT+=1

if %FAILURE_COUNT% GEQ %MAX_FAILURES% (
    tasklist /fi "imagename eq %EXE_NAME%" 2>nul | findstr /i "%EXE_NAME%" >nul
    if errorlevel 1 (
        start "" "%PROJECT_ROOT%%EXE_NAME%"
        timeout /t 15 /nobreak >nul
    )
    set "FAILURE_COUNT=0"
)

goto :WATCH_LOOP

:CLEANUP
:: DELETE LOCK FILE
del "%LOCK_FILE%" 2>nul
echo [AMP] Watchdog stopped
endlocal & exit /b 0
```

**Clean Close Flow:**

When user clicks X:
1. Frontend sets `exitFlag=true` in config.json
2. Frontend deletes `%temp%\amp_watchdog.lock`
3. App exits → watchdog sees exitFlag, cleans up lock, exits

**Key Difference: exitFlag vs crash**

| Scenario | exitFlag | PID Check | Action |
|----------|----------|-----------|--------|
| User clicks X | true | N/A | Cleanup & exit |
| App crash | false | fails 3x | Restart app |

**Started By:** `ampBridge.spawnWatchdog()` on app startup   
see `src/services/AMPBridge.ts:342`

**Location in batch:** `amp-tasks.bat:1505-1574`



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
