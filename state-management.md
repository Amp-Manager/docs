# State Management

## Overview

AMP Manager uses two storage systems:

| System | Purpose | Persists? |
|--------|---------|-----------|
| **JSON Files** (users/ folder) | User data, encrypted content | Yes |
| **Zustand** | UI state, real-time data | In-memory |


## JSON File Storage - Persistent User Data

### What It Stores (v1.0+)

> **IMPORTANT**: All user data is stored under `users/user_{username}/` folder. The `user_` prefix avoids conflicts with MariaDB databases.

| Category | File | Encrypted? |
|----------|------|-----------|
| User (auth) | `users/user_{username}/user.json` | No |
| Credentials | `users/user_{username}/credentials.json` | Yes |
| Notes | `users/user_{username}/notes.json` | Yes |
| Settings | `users/user_{username}/settings.json` | Yes |
| Sites/Domains | `users/user_{username}/sites.json` | No |
| Tags | `users/user_{username}/tags.json` | No |
| Tunnels | `users/user_{username}/tunnels.json` | No |
| Activity Logs | `users/user_{username}/activity_logs.json` | No |
| Workflows | `users/user_{username}/workflows.json` | Yes |
| Site Configs | `users/user_{username}/site_configs.json` | Yes |
| Domain Status | `users/user_{username}/domain_status.json` | No |
| Databases | `users/user_{username}/databases.json` | No |
| Databases Cache | `users/user_{username}/databases_cache.json` | No |
| App Config | `config.json` | No (lastUser only) |


### Folder Structure (v1.0+)

```
users/
|-- user_{username}/         # ALL user-specific data
|   |-- user.json           # UNENCRYPTED: salt + validation token
|   |-- credentials.json   # ENCRYPTED
|   |-- notes.json         # ENCRYPTED
|   |-- settings.json     # ENCRYPTED
|   |-- sites.json        # Plain text
|   |-- tags.json         # Plain text
|   |-- tunnels.json     # Plain text
|   |-- activity_logs.json  # Plain text
|   |-- workflows.json    # ENCRYPTED
|   |-- site_configs.json   # ENCRYPTED
|   |-- domain_status.json # Plain text
|   |-- databases.json     # Plain text
|   |-- databases_cache.json
|
|-- user_{another}/       # Another user

config.json              # Global app config (lastUser only)

mysql/    # MariaDB (unaffected)
ampdb/    # MariaDB database (unaffected)
{dbname}/ # User's MariaDB databases
```


#### Why `user_` Prefix?

The `user_` prefix (not `user-`) avoids conflicts with MariaDB databases:
- User registers as: `myproject`
- MariaDB creates: `/data/myproject/`
- AMP Manager creates: `/users/user_myproject/` (no conflict)

Also uses forward slashes for cross-platform path compatibility (Neutralino normalizes paths).


#### Security Model

The password is never stored. Instead, a validation token proves password knowledge:

1. **Registration:**
   - Generate random salt
   - Derive encryption key from password + salt
   - Encrypt "VALIDATION_CHECK" -> { iv, ciphertext }
   - Save to user.json: { salt, validation_iv, validation_ciphertext }

2. **Login:**
   - Read user.json (unencrypted)
   - Re-derive key: deriveKey(password, salt)
   - Decrypt validation token with key + iv
   - If result === "VALIDATION_CHECK" -> password correct

3. **After Login:**
   - Encryption key stored in memory (cleared on logout)
   - All encrypted files use this key


### Storage Location

- **Path**: `NL_PATH/data/` (app data folder)
- **Helper**: `src/lib/storage.ts` (low-level file operations)
- **High-level API**: `src/lib/db.ts` (JSON storage functions)


### JSON Storage Functions

Use functions from `src/lib/db.ts`:

| Function | Purpose |
|----------|---------|
| `loadSitesJSON()` / `saveSitesJSON()` | Sites/Domains |
| `loadTagsJSON()` / `saveTagsJSON()` | Tags |
| `loadNotesJSON()` / `saveNotesJSON()` | Notes (encrypted) |
| `loadCredentialsJSON()` / `saveCredentialsJSON()` | Credentials (encrypted) |
| `loadSettingsJSON()` / `saveSettingsJSON()` | User settings |
| `loadTunnelsJSON()` / `saveTunnelsJSON()` | Active tunnels |
| `loadActivityLogsJSON()` / `saveActivityLogsJSON()` | Activity history |
| `loadWorkflowsJSON()` / `saveWorkflowsJSON()` | Workflows |
| `loadSiteConfigsJSON()` / `saveSiteConfigsJSON()` | Config backups |
| `loadDomainStatusJSON()` / `saveDomainStatusJSON()` | Domain health |
| `loadDatabasesJSON()` / `saveDatabasesJSON()` | Database metadata |
| `logActivityJSON()` | Activity logging |
| `deleteUserData()` | Complete user data deletion |


### Accessing Data

```typescript
// Use high-level functions from db.ts
import { loadSitesJSON, saveSitesJSON, loadTagsJSON } from '@/lib/db';

// Load sites and tags
const [sites, tags] = await Promise.all([
  loadSitesJSON(),
  loadTagsJSON()
]);

// Save sites
sites.push(newSite);
await saveSitesJSON(sites);
```

**Encrypted data requires user and key:**

```typescript
import { loadNotesJSON, saveNotesJSON } from '@/lib/db';

const { user, encryptionKey } = useAuth();

// Load notes (key is optional - decrypts if provided)
const notes = await loadNotesJSON(user, encryptionKey || undefined);

// Save notes - only encrypt if toggle is enabled
await saveNotesJSON(user, notes, formData.is_encrypted ? encryptionKey : undefined);
```

**File**: `src/lib/db.ts` - JSON storage functions with encryption support


## Zustand - UI State

### What It Manages

| Store | Purpose | File |
|-------|---------|------|
| Docker Metrics | Real-time container stats | `src/stores/dockerMetricsStore.ts` |
| Docker Settings | Polling preferences | `src/stores/dockerSettings.ts` |
| Dashboard Settings | Dashboard preferences | `src/stores/dashboardSettings.ts` |


### Accessing a Store

```typescript
// Import the hook
import { useDockerMetricsStore } from '@/stores/dockerMetricsStore';

// In component
const { stats, loading, fetchMetrics } = useDockerMetricsStore();
```


## When to Use Which

```
Is the data...
+-- Created by the user? -> JSON files
+-- Needs encryption? -> JSON files (encrypted)
+-- Complex queries? -> In-memory after load
+-- Real-time / changes frequently? -> Zustand
+-- UI-only state (loading, toggles)? -> Zustand
+-- Simple preferences? -> Zustand or JSON
```

| Use Case | Storage | Why |
|----------|---------|-----|
| Notes, credentials | JSON (encrypted) | User data, encrypted |
| Docker metrics | Zustand | Real-time, transient |
| Tag list | JSON files | Persistent |
| Modal open/closed | Zustand | UI state |
| Polling interval | Zustand | Simple preference |


## Encryption Overview

Sensitive data (credentials, notes) is encrypted before storage:

```
Password + Salt -> AES Key (in memory) -> Encrypt/Decrypt -> JSON Files
```

**Key files**:
- `src/lib/crypto.ts` - Encryption utilities
- `src/context/AuthContext.tsx` - Key derivation


## Key Files Reference

| File | Purpose |
|------|---------|
| `src/lib/db.ts` | JSON storage functions |
| `src/lib/storage.ts` | Low-level file storage helper |
| `src/context/AuthContext.tsx` | User authentication & encryption |
| `src/stores/*.ts` | Zustand state stores |


## Common Patterns

### Saving Encrypted Data

```typescript
import { loadCredentialsJSON, saveCredentialsJSON } from '@/lib/db';

const { user, encryptionKey } = useAuth();

// Save encrypted credentials
const creds = await loadCredentialsJSON(user, encryptionKey);
creds.push(newCredential);
await saveCredentialsJSON(user, creds, encryptionKey);
```

### Explicit User Parameter for Async Operations

In async operations (like sync), always pass user explicitly to ensure data saves to the correct user's folder:

```typescript
import { saveDomainStatusJSON, saveSitesJSON, loadSettingsJSON, saveSettingsJSON } from '@/lib/db';

// In useProjectSync.ts - pass user explicitly
const existingStatuses = await loadDomainStatusJSON();
const allStatuses = [...existingStatuses, ...newStatuses];
await saveDomainStatusJSON(user, allStatuses);  // Explicit user

const settings = await loadSettingsJSON(user);
settings.lastSyncTimestamp = Date.now();
await saveSettingsJSON(user, settings);  // Explicit user

// Plain file saves also benefit from explicit user
await saveSitesJSON(user, filteredSites);  // Explicit user
```

**Key rule:** When in doubt, pass the user explicitly - it's safer than relying on global state.

### Reading Data

```typescript
import { loadSitesJSON, loadTagsJSON } from '@/lib/db';

// Load sites and tags
const [sites, tags] = await Promise.all([
  loadSitesJSON(),
  loadTagsJSON()
]);
```


### Deleting All User Data

```typescript
import { deleteUserData } from '@/lib/db';

const { user } = useAuth();

// Complete data wipe (use with caution!)
await deleteUserData(user);
```


## See Also

- [Security Documentation](./security) - Data encryption details
- [Architecture Overview](./architecture) - System architecture