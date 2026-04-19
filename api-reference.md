# API Reference

Complete reference for the AMPBridge service and backend communication.


## AMPBridge Service

Central hub for all communication with the Neutralino.js backend.


### Import

```typescript
import { ampBridge } from '@/services/AMPBridge';
```

### Singleton Access

```typescript
// No need to instantiate - use the exported singleton
const bridge = ampBridge;
```


## System APIs

### `ampBridge.version()`

Get AMP Manager version info.

**Returns:**   

```typescript
{
  status: string;
  version: string;
  build: string;
  engine: string;
}
```

**Example:**   

```typescript
const info = await ampBridge.version();
// { status: 'ok', version: '1.0.0', build: '2026-03-07', engine: 'amp-manager-batch' }
```


### `ampBridge.isAvailable()`

Check if the AMP backend is available (running in Neutralino).

**Returns:** `boolean`

**Example:**   

```typescript
if (ampBridge.isAvailable()) {
  const status = await ampBridge.status();
} else {
  console.log('Running in browser dev mode');
}
```


### `ampBridge.isDevMode()`

Check if running in development mode (browser localhost).

**Returns:** `boolean`

**Example:**   

```typescript
if (ampBridge.isDevMode()) {
  console.log('Dev mode - some features disabled');
}
```


### `ampBridge.status()`

Get overall system status.

**Returns:** `AmpResponse`



### `ampBridge.runtimeStatus()`

Get runtime status including Docker containers.

**Returns:** `AmpResponse`



### `ampBridge.envCheck()`

Verify environment and get project root.

**Returns:**   

```typescript
{
  status: string;
  project_root: string;
  [key: string]: any;
}
```

**Example:**   

```typescript
const env = await ampBridge.envCheck();
// { status: 'ok', project_root: 'C:\\amp' }
```


### `ampBridge.clearCache()`

Clear application cache.

**Returns:** `AmpResponse`


### `ampBridge.clearLogs()`

Clear log files.

**Returns:** `AmpResponse`


## Domain APIs

### `ampBridge.scanDomains()`

Scan Windows hosts file for domain entries.

**Returns:** `AmpResponse`


### `ampBridge.listDomains()`

List all configured domains.

**Returns:** `AmpResponse`


### `ampBridge.createDomain(name, options?)`

Create a new local domain.

**Parameters:**   

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` | Domain name (without .local) |
| `options` | `{ scaffold?: boolean }` | Create scaffold files |

**Returns:** `AmpResponse`

**Example:**   

```typescript
const result = await ampBridge.createDomain('myproject', { scaffold: true });
```



### `ampBridge.removeDomain(name)`

Remove a domain.

**Parameters:**   

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` | Domain name to remove |

**Returns:** `AmpResponse`


### `ampBridge.generateConfig(domain)`

Regenerate domain configuration.

**Parameters:**   

| Name | Type | Description |
|------|------|-------------|
| `domain` | `string` | Domain name |

**Returns:** `AmpResponse`


## Database APIs

### `ampBridge.dbQuery(query)`

Execute database query via amp-tasks.bat.

**Parameters:**   

| Name | Type | Description |
|------|------|-------------|
| `query` | `string` | Query string (e.g., "LIST", "createDB") |

**Returns:** `AmpResponse`

**Example:**   

```typescript
// List databases
const dbs = await ampBridge.dbQuery('LIST');

// Create database
await ampBridge.dbQuery('mydb|||user|||password');

// Delete database
await ampBridge.dbQuery('deletemydb');
```


## Certificate APIs (CA)

### `ampBridge.caStatus()`

Check Certificate Authority status.

**Returns:** `AmpResponse`


### `ampBridge.caReset()`

Reset/reinstall CA certificate.

**Returns:** `AmpResponse`


### `ampBridge.caUninstall()`

Uninstall CA certificate.

**Returns:** `AmpResponse`


### `ampBridge.regenerateSsl(domain)`

Regenerate SSL for a domain.

**Parameters:**   

| Name | Type | Description |
|------|------|-------------|
| `domain` | `string` | Domain name |

**Returns:** `AmpResponse`


### `ampBridge.regenerateAllSsl()`

Regenerate SSL for all domains.

**Returns:** `AmpResponse`


## SSH Key APIs

### `ampBridge.sshKeyStatus()`

Check SSH key status.

**Returns:**   

```typescript
AmpResponse & {
  key_exists: boolean;
  fingerprint?: string;
  public_key?: string;
  key_path?: string;
}
```


### `ampBridge.sshKeyGenerate(username)`

Generate new SSH key pair.

**Parameters:**    

| Name | Type | Description |
|------|------|-------------|
| `username` | `string` | Username for key comment |

**Returns:**   

```typescript
AmpResponse & {
  key_path?: string;
  fingerprint?: string;
  public_key?: string;
}
```


## OS APIs

### `ampBridge.os`

Operating system operations.

```typescript
ampBridge.os.open(url: string): Promise<void>
ampBridge.os.execCommand(command: string): Promise<{ exitCode: number; stdOut: string; stdErr: string }>
ampBridge.os.spawnProcess(command: string, options?: { cwd?: string; envs?: Record<string, string> }): Promise<{ id: number; pid: number }>
ampBridge.os.updateSpawnedProcess(id: number, action: string, data?: string): Promise<{ status: string }>
ampBridge.os.getSpawnedProcesses(): Promise<any[]>
ampBridge.os.getEnv(key: string): Promise<string>
ampBridge.os.getEnvs(): Promise<Record<string, string>>
ampBridge.os.showSaveDialog(title?: string, options?: any): Promise<string>
ampBridge.os.showOpenDialog(title?: string, options?: any): Promise<string[]>
ampBridge.os.showFolderDialog(title?: string, options?: any): Promise<string>
```


## Filesystem APIs

### `ampBridge.fs`

File system operations.

```typescript
ampBridge.fs.readTextFile(path: string): Promise<string>
ampBridge.fs.writeTextFile(path: string, content: string): Promise<void>
ampBridge.fs.copyFile(source: string, dest: string): Promise<void>
ampBridge.fs.deleteFile(path: string): Promise<void>
ampBridge.fs.readDirectory(path: string): Promise<any[]>
ampBridge.fs.getFolderSize(path: string): Promise<string>
ampBridge.fs.createDirectory(path: string): Promise<void>
ampBridge.fs.remove(path: string): Promise<void>
ampBridge.fs.getAbsolutePath(path: string): Promise<string>
```


## Angie APIs

### `ampBridge.angie`

Angie web server operations.

```typescript
ampBridge.angie.testConfig(): Promise<{ valid: boolean; output: string }>
ampBridge.angie.reload(): Promise<void>
ampBridge.angie.liveStatus(): Promise<AmpResponse>
```


## Docker APIs

### `ampBridge.docker`

Docker container operations.

```typescript
ampBridge.docker.stats(): Promise<DockerStat[]>
ampBridge.docker.disk(): Promise<DockerDisk[]>
ampBridge.docker.info(): Promise<any>
ampBridge.docker.envMetrics(): Promise<AmpResponse>
ampBridge.docker.launchDesktop(): Promise<AmpResponse>
ampBridge.docker.startContainers(): Promise<AmpResponse>
ampBridge.docker.stopContainers(): Promise<AmpResponse>
ampBridge.docker.restartAngie(): Promise<AmpResponse>
ampBridge.docker.restartRuntime(): Promise<AmpResponse>
ampBridge.docker.restartFullStack(): Promise<AmpResponse>
```


## Workflow APIs

### `ampBridge.workflow`

Workflow execution commands.

```typescript
ampBridge.workflow.npm(domain: string, cmd: string): Promise<AmpResponse>
ampBridge.workflow.node(domain: string, cmd: string): Promise<AmpResponse>
ampBridge.workflow.shell(domain: string, cmd: string): Promise<AmpResponse>
ampBridge.workflow.git(domain: string, cmd: string): Promise<AmpResponse>
ampBridge.workflow.sftpWithAmpKey(host: string, username: string, localPath: string, remotePath: string): Promise<AmpResponse>
ampBridge.workflow.sftpWithCustomKey(host: string, username: string, localPath: string, remotePath: string, keyContent: string): Promise<AmpResponse>
ampBridge.workflow.webhook(url: string, data: string): Promise<AmpResponse>
```


## Event APIs

### `ampBridge.events`

Neutralino event handling.

```typescript
ampBridge.events.on(event: string, handler: (data: any) => void): void
ampBridge.events.off(event: string, handler: (data: any) => void): void
ampBridge.events.dispatch(event: string, data?: any): void
```


## Window APIs

### `ampBridge.window`

Window management.

```typescript
ampBridge.window.minimize(): void
ampBridge.window.maximize(): void
ampBridge.window.unmaximize(): void
ampBridge.window.isMaximized(): void
ampBridge.window.close(): void
ampBridge.window.setDraggableRegion(id: string): void
```


## App APIs

### `ampBridge.app`

Application control.

```typescript
ampBridge.app.exit(): void
```


## Service Layer

### DatabaseService

```typescript
import { databaseService } from '@/services/DatabaseService';

const databases = await databaseService.listDatabases();
await databaseService.createDatabase('mydb|||user|||pass');
await databaseService.deleteDatabase('mydb');
await databaseService.launchTool('https://localhost:8080', 'url');
```


## Type Definitions


### AmpResponse

```typescript
interface AmpResponse {
  status: 'ok' | 'error';
  message?: string;
  details?: string;
  [key: string]: any;
}
```


### DockerStat

```typescript
interface DockerStat {
  name: string;
  cpu: string;
  memory: string;
  status: string;
}
```


### DockerDisk

```typescript
interface DockerDisk {
  name: string;
  size: string;
}
```


## Usage Examples

### Checking Backend Availability

```typescript
if (ampBridge.isAvailable()) {
  const status = await ampBridge.status();
} else {
  console.log('Running in browser mode');
}
```


### Running a Workflow Command

```typescript
const result = await ampBridge.workflow.shell('mydomain.local', 'npm install');
if (result.status === 'ok') {
  console.log(result.message);
}
```

### Reading a File

```typescript
const content = await ampBridge.fs.readTextFile('C:\\amp\\config\\app.conf');
```


## NeutralinoJS Freeze Prevention

AMP Manager includes safeguards against NeutralinoJS idle freezes:


### `startKeepalive(interval?)`

Starts a heartbeat to prevent the app from hanging during idle periods.

```typescript
import { startKeepalive } from '@/services/AMPBridge';

// Start heartbeat every 30 seconds (default)
startKeepalive(30000);
```

> **Note**: The keepalive pings silently fail. If the backend becomes unresponsive, the `serverOffline` event fires and triggers a navigation to the login screen.
>
> **Diagnostic**: Check browser console for `[AMP] Keepalive` logs to verify the heartbeat is firing.

### `serverOffline` Event

When the NeutralinoJS backend becomes unresponsive (freeze detection), the app automatically navigates to `/` which triggers the login modal. This ensures:

- User is prompted to re-authenticate after idle periods
- No duplicate error messages
- Clean session recovery

> **Diagnostic**: Check browser console for `[AMP] serverOffline event fired` when disconnect occurs.

### Troubleshooting Idle Freezes

If the app becomes unresponsive after idle:

1. Open browser DevTools (F12) -> Console tab
2. Look for `[AMP]` log messages:
   - `[AMP] Keepalive starting with 30000ms interval` - keepalive active
   - `[AMP] Keepalive ping #N failed` - backend not responding
   - `[AMP] serverOffline event fired` - critical disconnect detected
3. Check NeutralinoJS logs in app data folder

### `execWithTimeout(command, timeout?)`

Execute commands with automatic timeout to prevent hangs.

```typescript
import { execWithTimeout } from '@/services/AMPBridge';

// Execute with 30 second timeout
const result = await execWithTimeout('docker ps', 30000);
```

### `isDevMode()` 

- already documented above as `ampBridge.isDevMode()`

### `execWithRetry(fn, retries?, delayMs?)`

Execute a backend call with retry logic.

```typescript
import { execWithRetry } from '@/services/AMPBridge';

// Retry 3 times with exponential backoff
const result = await execWithRetry(() => ampBridge.status(), 3, 1000);
```


### `startKeepalive(intervalMs?)`

Start heartbeat to prevent Windows suspension.

```typescript
import { startKeepalive } from '@/services/AMPBridge';

startKeepalive(30000); // 30 second interval
```


### `stopKeepalive()`

Stop the heartbeat keepalive.

```typescript
import { stopKeepalive } from '@/services/AMPBridge';

stopKeepalive();
```


### `ampBridge.spawnWatchdog()`

Spawn watchdog for zombie app recovery.

```typescript
ampBridge.spawnWatchdog();
// Called automatically on app startup
```


## See Also

- [For Developers](./for-developers)
- [AMP Tasks Reference](./amp-tasks-reference)
- [Contributing](./contributing)
