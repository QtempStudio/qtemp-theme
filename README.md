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

```bash
# Switch to root user
sudo su

# Download and run the installer
curl -L https://raw.githubusercontent.com/QtempStudio/qtemp-theme/main/install.sh | bash
```

### Method 2: Manual Installation

1. Switch to root and navigate to Pterodactyl directory:
```bash
sudo su
cd /var/www/pterodactyl
```

2. Create backup of current theme:
```bash
timestamp=$(date +%Y%m%d_%H%M%S)
mkdir -p resources/scripts/themes_backup_$timestamp
if [ -d "resources/scripts/themes" ]; then
    cp -r resources/scripts/themes/* resources/scripts/themes_backup_$timestamp/
fi
```

3. Create themes directory if it doesn't exist:
```bash
mkdir -p resources/scripts/themes
```

4. Clone and install theme:
```bash
# Clone repository
git clone https://github.com/QtempStudio/qtemp-theme.git

# Copy theme files
cp -r qtemp-theme/theme/* resources/scripts/themes/

# Clean up
rm -rf qtemp-theme
```

5. Set proper permissions:
```bash
chown -R www-data:www-data /var/www/pterodactyl/*
```

6. Install dependencies and build:
```bash
# Install dependencies
yarn install

# Build production assets
yarn build:production
```

7. Clear cache:
```bash
php artisan view:clear
php artisan cache:clear
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

1. Replace logo file:
```bash
# Replace with your logo (supports SVG, PNG)
cp your-logo.svg /var/www/pterodactyl/resources/scripts/themes/qtemp/assets/logo.svg
```

2. Rebuild assets:
```bash
cd /var/www/pterodactyl
yarn build:production
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