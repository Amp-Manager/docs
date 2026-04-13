# Component Guide

How to create new pages, components, and features in AMP Manager.

---

## Project Structure

```
src/
|-- components/       # Reusable UI components
|   |-- layout/       # Layout, Sidebar, Header
|   |-- domains/      # Domain-related components
|   |-- databases/    # Database components
|   |-- settings/     # Settings panels
|   |-- workflow/     # Workflow editor nodes
|   |-- notes/        # Notes components
|-- pages/            # Route pages (also in components)
|-- services/         # Business logic (AMPBridge, DatabaseService)
|-- context/          # React contexts (Auth, Sync)
|-- hooks/            # Custom hooks (useProjectSync)
|-- stores/           # Zustand stores
|-- lib/              # Utilities (db, crypto)
|-- types/            # TypeScript definitions
```

---

## Creating a New Page

### Step 1: Create the Component

```typescript
// src/pages/MyNewPage.tsx
import React from 'react';

export function MyNewPage() {
  return (
    <div className="p-4">
      <h1>My New Page</h1>
      <p>Welcome to my new page!</p>
    </div>
  );
}
```

### Step 2: Add the Route

```typescript
// src/App.tsx
import { MyNewPage } from './pages/MyNewPage';

// In your Routes component:
<Route path="/my-new-page" element={<MyNewPage />} />
```

### Step 3: Add Navigation (Optional)

```typescript
// src/components/layout/Sidebar.tsx
<NavItem to="/my-new-page" icon={<Icon />}>
  My New Page
</NavItem>
```

---

## Creating a New Component

### Basic Component Pattern

```typescript
// src/components/my-feature/MyComponent.tsx
import React from 'react';

interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="card-actions justify-end">
          <button 
            className="btn btn-primary"
            onClick={onAction}
          >
            Action
          </button>
        </div>
      </div>
    </div>
  );
}
```

### Component with State

```typescript
import React, { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button 
        className="btn"
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>
    </div>
  );
}
```

---

## Using Existing Services

### Using AMPBridge

```typescript
import { ampBridge } from '@/services/AMPBridge';

async function fetchDomains() {
  try {
    const result = await ampBridge.listDomains();
    if (result.status === 'ok') {
      console.log(result.domains);
    }
  } catch (err) {
    console.error('Failed to fetch domains:', err);
  }
}
```

### Using DatabaseService

```typescript
import { databaseService } from '@/services/DatabaseService';

async function createDb(name: string) {
  try {
    await databaseService.createDatabase(`${name}|||user|||pass`);
  } catch (err) {
    console.error('Failed to create database:', err);
  }
}
```

### Using Context

```typescript
import { useAuth } from '@/context/AuthContext';

function MyComponent() {
  const { user, db } = useAuth();
  
  // Use user/db for data operations
}
```

---

## Creating a Custom Hook

### Basic Hook Pattern

```typescript
// src/hooks/useMyFeature.ts
import { useState, useCallback } from 'react';

export function useMyFeature() {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch data here
      setData(['item1', 'item2']);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    loading,
    fetchData
  };
}
```

### Using the Hook

```typescript
import { useMyFeature } from '@/hooks/useMyFeature';

function MyComponent() {
  const { data, loading, fetchData } = useMyFeature();
  
  return (
    <div>
      {loading ? <span>Loading...</span> : <pre>{JSON.stringify(data)}</pre>}
      <button onClick={fetchData}>Fetch</button>
    </div>
  );
}
```

---

## Creating a Zustand Store

### Store Pattern

```typescript
// src/stores/myStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MyStoreState {
  value: string;
  setValue: (value: string) => void;
}

export const useMyStore = create<MyStoreState>()(
  persist(
    (set) => ({
      value: 'default',
      setValue: (value) => set({ value }),
    }),
    {
      name: 'my-store-storage-key',
    }
  )
);
```

### Using the Store

```typescript
import { useMyStore } from '@/stores/myStore';

function MyComponent() {
  const { value, setValue } = useMyStore();
  
  return (
    <input 
      value={value} 
      onChange={(e) => setValue(e.target.value)} 
    />
  );
}
```

---

## Adding a Settings Panel

### Pattern

```typescript
// src/components/settings/SettingsMyFeature.tsx
import React from 'react';
import { useAuth } from '@/context/AuthContext';

export function SettingsMyFeature() {
  const { user } = useAuth();
  
  const handleSave = async () => {
    // Save to JSON files
  };
  
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">Setting Name</span>
      </label>
      <input 
        type="text" 
        className="input input-bordered" 
        placeholder="Enter value"
      />
      <button className="btn btn-primary mt-4" onClick={handleSave}>
        Save
      </button>
    </div>
  );
}
```

### Register in Settings Page

```typescript
// src/pages/Settings.tsx
import { SettingsMyFeature } from '@/components/settings/SettingsMyFeature';

// Add to settings tabs/sections:
<SettingsMyFeature />
```

---

## TypeScript Patterns

### Defining Types

```typescript
// src/types/myTypes.ts
export interface MyData {
  id: string;
  name: string;
  status: 'active' | 'inactive';
}

export interface MyFormData {
  name: string;
  tags: string[];
}
```

### Using Types

```typescript
import { MyData, MyFormData } from '@/types/myTypes';

function processData(data: MyData): MyFormData {
  return {
    name: data.name,
    tags: [data.status]
  };
}
```

---

## Error Handling Patterns

### Service Layer (throw Error)

```typescript
// In services
async function fetchData(): Promise<Data> {
  const result = await ampBridge.listDomains();
  if (result.status !== 'ok') {
    throw new Error(result.message || 'Failed to fetch');
  }
  return result;
}
```

### UI Layer (toast)

```typescript
// In components/hooks
import { toast } from '@/utils/toast';

async function handleAction() {
  try {
    await someService();
    toast.success('Action completed');
  } catch (err) {
    toast.error(err.message);
  }
}
```

---

## Styling with DaisyUI

AMP uses Tailwind CSS + DaisyUI. Use component classes:

### Common Patterns

```typescript
// Card
<div className="card bg-base-100 shadow">
  <div className="card-body">
    <h2 className="card-title">Title</h2>
    <p>Content</p>
  </div>
</div>

// Button
<button className="btn btn-primary">Primary</button>
<button className="btn btn-secondary">Secondary</button>
<button className="btn btn-ghost">Ghost</button>

// Input
<input className="input input-bordered" placeholder="Text" />

// Alert
<div className="alert alert-info">
  <span>Information message</span>
</div>

// Modal
<dialog className="modal">
  <div className="modal-box">
    <h3 className="font-bold">Title</h3>
    <p>Content</p>
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
```

---

## Testing Your Changes

### Development Mode

```bash
npm run dev
# Opens at http://localhost:3000
```

### Production Build

```bash
npm run build
# Runs type checking and builds to resources/
```

### Type Check

```bash
npm run lint
# Checks TypeScript errors
```

---

## Common Patterns Reference

| Pattern | When to Use |
|---------|-------------|
| Class + Singleton | Backend services (AMPBridge) |
| React Hook | Reusable stateful logic |
| Zustand Store | UI state, polling settings |
| React Context | Shared state (Auth, Sync) |
| JSON Storage | Persistent user data |

---

## See Also

- [Contributing](./contributing) - Code patterns
- [API Reference](./api-reference) - Full API docs
- [For Developers](./for-developers) - Architecture
- [State Management](./state-management) - State choices