# QTemp Studio Theme for Pterodactyl Panel

A modern, responsive theme for Pterodactyl Panel featuring three variants: Dark, Light, and Default Purple.

```
 ██████╗ ████████╗███████╗███╗   ███╗██████╗     
██╔═══██╗╚══██╔══╝██╔════╝████╗ ████║██╔══██╗    
██║   ██║   ██║   █████╗  ██╔████╔██║██████╔╝    
██║▄▄ ██║   ██║   ██╔══╝  ██║╚██╔╝██║██╔═══╝     
╚██████╔╝   ██║   ███████╗██║ ╚═╝ ██║██║         
 ╚══▀▀═╝    ╚═╝   ╚══════╝╚═╝     ╚═╝╚═╝         
███████╗████████╗██╗   ██╗██████╗ ██╗ ██████╗     
██╔════╝╚══██╔══╝██║   ██║██╔══██╗██║██╔═══██╗    
███████╗   ██║   ██║   ██║██║  ██║██║██║   ██║    
╚════██║   ██║   ██║   ██║██║  ██║██║   ██║    
███████║   ██║   ╚██████╔╝██████╔╝██║╚██████╔╝    
╚══════╝   ╚═╝    ╚═════╝ ╚═════╝ ╚═╝ ╚═════╝     
```

## Features

- 🎨 Three theme variants (Dark, Light, Default Purple)
- 🎯 Modern UI with smooth animations
- 📱 Fully responsive design
- ⚡ Performance optimized
- 🛠️ Complete theme override for all panel pages
- 🔄 Preserves all Pterodactyl functionality
- 🎉 Beautiful hover effects and transitions

## Enhanced Features

### 1. Nebula Background Effect
The theme now includes a beautiful animated nebula background effect that adds depth and visual interest to your panel:

```tsx
import { NebulaBackground } from '@/themes/qtemp/components/NebulaBackground';

// Add to your layout
<NebulaBackground />
```

Configuration options:
```typescript
{
    enabled: true,
    density: 50,
    speed: 1,
    color: 'var(--nebula.color.primary)',
    opacity: 0.15,
    blur: '20px',
    scale: 1.5
}
```

### 2. Advanced Server Metrics
Enhanced server monitoring with animated metrics and real-time updates:

```tsx
import { ServerMetrics } from '@/themes/qtemp/components/ServerMetrics';

<ServerMetrics
    cpu={45}
    memory={60}
    disk={30}
    network={{
        up: 1024 * 1024, // 1MB/s
        down: 2048 * 1024 // 2MB/s
    }}
    uptime="2d 5h 30m"
/>
```

Features:
- Animated progress bars
- Real-time updates
- Resource usage alerts
- Network traffic monitoring
- Uptime tracking
- Status indicators

### 3. Animated Sidebar
Collapsible sidebar with smooth animations and hover effects:

```tsx
import { Sidebar } from '@/themes/qtemp/components/Sidebar';

<Sidebar activeRoute="/dashboard" />
```

Features:
- Smooth collapse/expand animation
- Active route highlighting
- Server status indicators
- Hover effects
- Custom scrollbar
- Nested navigation support

### 4. Theme Customization
Extended theme customization options:

```typescript
// In your theme configuration
const theme = {
    variables: {
        // Animation timings
        'animation.duration.fast': '150ms',
        'animation.duration.normal': '300ms',
        'animation.duration.slow': '500ms',
        
        // Animation easings
        'animation.easing.bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'animation.easing.smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'animation.easing.spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        
        // Nebula effect
        'nebula.opacity': '0.15',
        'nebula.color.primary': 'rgba(124, 58, 237, 0.5)',
        'nebula.color.secondary': 'rgba(139, 92, 246, 0.3)',
        'nebula.blur': '20px',
        'nebula.scale': '1.5',
        'nebula.speed': '10s',
    }
}
```

### 5. Performance Optimizations
The theme includes several performance optimizations:

- Code splitting for faster initial load
- Lazy loading of components
- Optimized animations using GPU acceleration
- Efficient resource usage monitoring
- Caching of frequently used assets
- Minified production builds

### 6. Development Tools
Enhanced development experience with:

```bash
# Start development server
yarn dev

# Run tests
yarn test

# Lint code
yarn lint

# Format code
yarn format

# Production build
yarn build:production
```

### 7. Browser Support
The theme is tested and optimized for:

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Opera 67+

### 8. Dependencies
New dependencies added for enhanced features:

```json
{
    "dependencies": {
        "framer-motion": "^6.0.0",
        "react-spring": "^9.4.0",
        "react-use-measure": "^2.1.1",
        "react-icons": "^4.3.1",
        "chart.js": "^3.7.0",
        "react-chartjs-2": "^4.0.0",
        "date-fns": "^2.28.0",
        "lodash": "^4.17.21"
    }
}
```

### 9. TypeScript Support
Enhanced TypeScript support with:

- Strict type checking
- Type declarations for all components
- Interface definitions for props
- Enum types for status values
- Generic types for reusable components

### 10. Accessibility
The theme follows WCAG 2.1 guidelines:

- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast mode support
- Screen reader compatibility
- Focus indicators
- Color contrast compliance

## Prerequisites

Before installation, ensure you have:

```bash
# For Ubuntu/Debian
sudo apt update
sudo apt install -y git curl wget php8.1-cli php8.1-common php8.1-fpm composer

# Install Node.js 16.x
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs

# Install Yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install -y yarn
```

## Installation

### Method 1: Automatic Installation (Recommended)

The easiest way to install the theme is using our automated installer:

```bash
# Download and run the installer
curl -sSL https://raw.githubusercontent.com/QtempStudio/qtemp-theme/main/install.sh | sudo bash
```

The installer will:
- Check system requirements
- Create automatic backups
- Install dependencies
- Set proper permissions
- Build and optimize assets
- Clear cache
- Show progress with visual indicators

### Method 2: Manual Installation

If you prefer to install manually:

1. Prepare your environment:
```bash
# Switch to root user
sudo su

# Navigate to panel directory
cd /var/www/pterodactyl

# Create backup
timestamp=$(date +%Y%m%d_%H%M%S)
mkdir -p resources/scripts/themes_backup_$timestamp
if [ -d "resources/scripts/themes" ]; then
    cp -r resources/scripts/themes/* resources/scripts/themes_backup_$timestamp/
fi
```

2. Download and install theme:
```bash
# Clone repository
git clone https://github.com/QtempStudio/qtemp-theme.git

# Create themes directory
mkdir -p resources/scripts/themes

# Copy theme files
cp -r qtemp-theme/theme/* resources/scripts/themes/

# Clean up
rm -rf qtemp-theme
```

3. Set permissions:
```bash
# Set ownership
chown -R www-data:www-data /var/www/pterodactyl/*

# Set file permissions
find /var/www/pterodactyl -type f -exec chmod 644 {} \;
find /var/www/pterodactyl -type d -exec chmod 755 {} \;
```

4. Install dependencies and build:
```bash
# Install dependencies
yarn install

# Build production assets
yarn build:production
```

5. Clear cache:
```bash
php artisan view:clear
php artisan cache:clear
```

### Post-Installation

After installation, you should:

1. Clear your browser cache
2. Refresh the panel page
3. If styles are missing:
```bash
cd /var/www/pterodactyl
yarn build:production
```

### Updating the Theme

To update to the latest version:

```bash
# Navigate to panel directory
cd /var/www/pterodactyl

# Create backup
timestamp=$(date +%Y%m%d_%H%M%S)
cp -r resources/scripts/themes themes_backup_$timestamp

# Download latest version
git clone https://github.com/QtempStudio/qtemp-theme.git
cp -r qtemp-theme/theme/* resources/scripts/themes/
rm -rf qtemp-theme

# Rebuild assets
yarn build:production

# Clear cache
php artisan view:clear
php artisan cache:clear
```

### Troubleshooting

If you encounter issues:

1. Check the logs:
```bash
tail -f /var/www/pterodactyl/storage/logs/laravel-*.log
```

2. Verify permissions:
```bash
chown -R www-data:www-data /var/www/pterodactyl/*
find /var/www/pterodactyl -type f -exec chmod 644 {} \;
find /var/www/pterodactyl -type d -exec chmod 755 {} \;
```

3. Rebuild assets:
```bash
cd /var/www/pterodactyl
yarn install
yarn build:production
```

4. Clear all caches:
```bash
php artisan view:clear
php artisan cache:clear
php artisan config:clear
```

5. Restore from backup:
```bash
# List backups
ls -l /var/www/pterodactyl/resources/scripts/themes_backup_*

# Restore specific backup
cp -r /var/www/pterodactyl/resources/scripts/themes_backup_TIMESTAMP/* /var/www/pterodactyl/resources/scripts/themes/
```

### Development Commands

For theme development:

```bash
# Start development server
yarn dev

# Run tests
yarn test

# Lint code
yarn lint

# Format code
yarn format

# Type check
yarn typecheck

# Build for production
yarn build:production
```

## Theme Variants

### Changing Theme Variant

1. Edit the theme variant in `/var/www/pterodactyl/resources/scripts/themes/qtemp/index.ts`:
```typescript
// Change this line to switch variants
const THEME_VARIANT: 'default' | 'dark' | 'light' = 'default';
```

2. Rebuild assets after changing:
```bash
cd /var/www/pterodactyl
yarn build:production
```

Available variants:
- `'default'` - Purple QTemp theme
- `'dark'` - Dark theme variant
- `'light'` - Light theme variant

## Customization

### Custom Colors

1. Edit variables in `/var/www/pterodactyl/resources/scripts/themes/qtemp/variables.ts`:
```typescript
// Example: Changing primary colors
const defaultTheme: ThemeVariables = {
    background: '#1a1625',        // Main background
    containerBackground: '#2D2640', // Card/container background
    accent: '#7C3AED',           // Primary accent color
    // ... other variables
};
```

2. Rebuild after changes:
```bash
cd /var/www/pterodactyl
yarn build:production
```

### Custom Logo

The theme comes with two logo files:
- `qtemp-logo.png` - The main icon logo
- `qtemp-text.png` - The text logo

To replace the logos:

1. Prepare your logo files:
   - Icon should be square (recommended: 512x512px)
   - Text logo should be properly sized (recommended height: 48px)
   - Save both in PNG format with transparent background

2. Place your logo files:
```bash
# Navigate to theme directory
cd /var/www/pterodactyl/resources/scripts/themes/qtemp/assets/

# Replace logo files (adjust filenames as needed)
cp /path/to/your/icon.png qtemp-logo.png
cp /path/to/your/text.png qtemp-text.png

# Set proper permissions
chown www-data:www-data qtemp-logo.png qtemp-text.png
chmod 644 qtemp-logo.png qtemp-text.png
```

3. Rebuild assets:
```bash
cd /var/www/pterodactyl
yarn build:production
```

4. Clear cache:
```bash
php artisan view:clear
php artisan cache:clear
```

### Logo Component Usage

The theme includes a Logo component that can be used in your custom pages:

```tsx
import { Logo } from '@/themes/qtemp/components/Logo';

// With both icon and text
<Logo />

// Icon only
<Logo showText={false} />

// With custom class
<Logo className="my-custom-class" />
```

## Troubleshooting

### Theme Not Appearing

1. Clear browser cache and cookies
2. Verify file permissions:
```bash
sudo chown -R www-data:www-data /var/www/pterodactyl/*
```

3. Rebuild assets:
```bash
cd /var/www/pterodactyl
yarn build:production
```

4. Clear panel cache:
```bash
php artisan view:clear
php artisan cache:clear
```

### Build Errors

1. Clear Node modules and reinstall:
```bash
cd /var/www/pterodactyl
rm -rf node_modules
yarn install
yarn build:production
```

2. Check Node.js version:
```bash
node -v  # Should be 16.x or higher
```

### Permission Issues

Fix permissions recursively:
```bash
sudo chown -R www-data:www-data /var/www/pterodactyl
find /var/www/pterodactyl -type f -exec chmod 644 {} \;
find /var/www/pterodactyl -type d -exec chmod 755 {} \;
```

## Uninstallation

To remove the theme:
```bash
# Switch to root
sudo su

# Navigate to panel directory
cd /var/www/pterodactyl

# Remove theme files
rm -rf resources/scripts/themes/qtemp

# Rebuild assets
yarn build:production

# Clear cache
php artisan view:clear
php artisan cache:clear
```

## Support

Need help? We're here to assist:

1. Check the [FAQ](docs/FAQ.md)
2. [Open an issue](https://github.com/QtempStudio/qtemp-theme/issues)
3. Join our Discord server

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md).

## License

© 2024 QTemp Studio. All rights reserved. 