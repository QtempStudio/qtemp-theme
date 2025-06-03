# QtempHost Theme Components

This document describes how to style components using the QtempHost theme system.

## Available Components

### Buttons

```tsx
// Primary Button
<button className="btn-primary">
    Create Server
</button>

// Secondary Button
<button className="btn-secondary">
    Cancel
</button>

// With Icon
<button className="btn-primary">
    <svg>...</svg>
    Create Server
</button>
```

### Cards

```tsx
// Basic Card
<div className="card">
    <h3>Server Details</h3>
    <p>Content goes here</p>
</div>

// With Hover Effect
<div className="card hover">
    <h3>Minecraft Server</h3>
    <p>Status: Online</p>
</div>
```

### Status Indicators

```tsx
// Success Status
<span className="status-success">Online</span>

// Error Status
<span className="status-error">Offline</span>

// Warning Status
<span className="status-warning">Restarting</span>

// Info Status
<span className="status-info">Updating</span>
```

### Inputs

```tsx
// Text Input
<input 
    type="text"
    className="input"
    placeholder="Server Name"
/>

// With Label
<div className="input-group">
    <label>Server Name</label>
    <input type="text" className="input" />
</div>
```

### Headers

```tsx
// Section Header
<div className="header">
    <h2>My Servers</h2>
    <button className="btn-primary">Create New</button>
</div>

// With Subtitle
<div className="header">
    <div>
        <h1>Welcome</h1>
        <p className="text-secondary">Manage your servers</p>
    </div>
    <div className="actions">...</div>
</div>
```

### Containers

```tsx
// Basic Container
<div className="container">
    <p>Content goes here</p>
</div>

// With Header
<div className="container">
    <div className="header">
        <h3>Server Settings</h3>
    </div>
    <div className="content">
        ...
    </div>
</div>
```

## Animations

The theme includes built-in animations that can be applied to any element:

```tsx
// Fade In
<div className="fade-in">
    Content fades in
</div>

// Slide In
<div className="slide-in">
    Content slides up while fading in
</div>
```

## CSS Variables

You can access theme variables in your custom styles:

```css
.custom-element {
    background: var(--container-background);
    color: var(--default-text-color);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    transition: all var(--transition-speed) var(--transition-easing);
}

.custom-element:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-large);
}
```

## Theme Variants

The theme supports three variants:
- Default (Purple QtempHost)
- Dark
- Light

To change the variant, edit `THEME_VARIANT` in `index.ts`:

```ts
const THEME_VARIANT: 'default' | 'dark' | 'light' = 'default';
```

## Best Practices

1. Use semantic class names that describe the component's purpose
2. Leverage existing theme variables for consistency
3. Follow the component hierarchy for proper styling inheritance
4. Use animations sparingly to enhance UX
5. Ensure responsive design using theme spacing variables
6. Maintain accessibility with proper contrast ratios
7. Keep component styles modular and reusable 