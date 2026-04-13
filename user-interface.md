# User Interface Documentation

This document describes the UI architecture, components, and patterns used in AMP Manager.

## Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| Styling | Tailwind CSS | v4.1.14 |
| UI Components | daisyUI | v5.5.19 |
| Charts | Recharts | v3.7.0 |
| Workflow Canvas | @xyflow/react | v12.10.1 |
| Routing | React Router DOM | v7.13.1 |
| State Management | Zustand | v5.0.11 |
| Forms | React Hook Form | v7.71.2 |
| Validation | Zod | v4.3.6 |
| Icons | Lucide React | v0.546.0 |
| Animation | Motion | v12.23.24 |
| Terminal | @xterm/xterm | v6.0.0 |

## Project Structure

```
src/
|-- components/
|   |-- dashboard/        # Dashboard widgets & stats
|   |-- workflow/        # Workflow builder components
|   |   |-- nodes/       # React Flow custom nodes
|   |   |-- Inspector/   # Property inspector panel
|   |   |-- hooks/       # Workflow-specific hooks
|   |   |-- ...
|-- pages/               # Route pages
|-- context/             # React Context providers
|-- stores/              # Zustand stores
|-- services/            # OOP backend services
|-- types/               # TypeScript definitions
```

## Styling Patterns

### ClassName Composition

The project uses `clsx` + `tailwind-merge` for conditional class composition:

```tsx
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

// Usage
<div className={cn(
  "base-classes",
  isActive && "active-state",
  variant === 'primary' ? "bg-blue-500" : "bg-gray-500"
)} />
```

### daisyUI Components

Components use daisyUI with theme support via `data-theme` attribute:

```tsx
<div data-theme="dark">
  <button className="btn btn-primary">Primary</button>
  <button className="btn btn-secondary">Secondary</button>
  <div className="card bg-base-100 shadow-xl">
    <div className="card-body">
      <h2 className="card-title">Card Title</h2>
    </div>
  </div>
</div>
```

## Workflow Canvas

The workflow builder uses `@xyflow/react` (React Flow) for visual node-based workflows.

### Custom Nodes

Custom node components are located in `src/components/workflow/nodes/`:

| Node Type | File | Purpose |
|-----------|------|---------|
| Source | `SourceNode.tsx` | Repository/remote source |
| Bridge | `BridgeNode.tsx` | Connection/bridge point |
| Action | `ActionNode.tsx` | SFTP/SSH actions |

### Node Props Interface

```tsx
import { NodeProps, Handle, Position } from '@xyflow/react';

function MyCustomNode({ data, selected }: NodeProps) {
  return (
    <div className={selected ? 'ring-2 ring-primary' : ''}>
      <Handle type="target" position={Position.Left} />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
```

## Charts

Charts are implemented with Recharts. Example from `WorkflowStats.tsx`:

```tsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function WorkflowStats() {
  const data = [
    { name: 'Mon', workflows: 4 },
    { name: 'Tue', workflows: 7 },
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="workflows" fill="var(--color-primary)" />
      </BarChart>
    </ResponsiveContainer>
  );
}
```

## State Management

### Zustand Stores

State is managed via Zustand stores in `src/stores/`:

```tsx
import { create } from 'zustand';

interface AppState {
  count: number;
  increment: () => void;
}

const useAppStore = create<AppState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// Usage in component
const count = useAppStore((state) => state.count);
```

### React Context

Auth and session state use React Context in `src/context/`:

```tsx
import { createContext, useContext } from 'react';

const AuthContext = createContext<AuthState | null>(null);

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within provider');
  return context;
}
```

## Forms

Forms use React Hook Form with Zod validation:

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  url: z.string().url('Invalid URL'),
});

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} className="input input-bordered" />
      {errors.name && <span className="text-error">{errors.name.message}</span>}
    </form>
  );
}
```

## Animation

Motion (Framer Motion fork) provides animations:

```tsx
import { motion } from 'motion/react';

function AnimatedComponent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      Content
    </motion.div>
  );
}
```

## Icons

Lucide React icons are used throughout:

```tsx
import { Settings, Plus, Trash, RefreshCw } from 'lucide-react';

function MyComponent() {
  return (
    <div className="flex gap-2">
      <Settings className="w-5 h-5" />
      <Plus className="w-5 h-5" />
    </div>
  );
}
```

## Terminal Integration

xterm.js provides terminal emulation:

```tsx
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';

function TerminalComponent() {
  const terminalRef = useRef<Terminal>(null);

  useEffect(() => {
    const terminal = new Terminal({ rows: 20 });
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.open(terminalRef.current!);
    fitAddon.fit();

    terminal.write('Hello from xterm.js\r\n');
  }, []);

  return <div ref={terminalRef} />;
}
```

## Common Patterns

### Loading States

```tsx
{isLoading ? (
  <span className="loading loading-spinner loading-md"></span>
) : (
  <Content />
)}
```

### Empty States

```tsx
{items.length === 0 ? (
  <div className="text-center py-8">
    <p className="text-base-content/60">No items found</p>
  </div>
) : (
  <ItemsList items={items} />
)}
```

### Error Handling

```tsx
{error && (
  <div className="alert alert-error">
    <span>{error.message}</span>
  </div>
)}
```

## Adding New Pages

1. Create page component in `src/pages/`
2. Add route in `src/App.tsx` or routing config
3. Use layout wrapper if needed

```tsx
// src/pages/NewPage.tsx
export default function NewPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Page Title</h1>
    </div>
  );
}
```

## Adding New Components

1. Create component in appropriate `src/components/` subdirectory
2. Use `cn()` utility for classes
3. Follow existing component patterns

```tsx
// src/components/MyComponent.tsx
import { cn } from '@/lib/utils';

interface MyComponentProps {
  className?: string;
  variant?: 'primary' | 'secondary';
}

export function MyComponent({ className, variant = 'primary' }: MyComponentProps) {
  return (
    <div className={cn(
      "component-base",
      variant === 'primary' ? "bg-primary" : "bg-secondary",
      className
    )}>
      Content
    </div>
  );
}
```

## See Also

- [Component Reference](./06-Component-Reference) - Creating components
- [State Management](./state-management) - Data storage choices
- [API Reference](./api-reference) - Backend services