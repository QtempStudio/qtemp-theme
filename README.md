# QtempHost Theme for Pterodactyl Panel

A modern, responsive theme for Pterodactyl Panel featuring three variants: Dark, Light, and Default Purple.

## Features

- 🎨 Three theme variants (Dark, Light, Default Purple)
- 🎯 Modern UI with smooth animations
- 📱 Fully responsive design
- ⚡ Performance optimized
- 🛠️ Complete theme override for all panel pages
- 🔄 Preserves all Pterodactyl functionality
- 🎉 Beautiful hover effects and transitions

## Installation

### Manual Installation

1. Navigate to your Pterodactyl Panel installation directory
```bash
cd /var/www/pterodactyl
```

2. Create a backup of your current theme (recommended)
```bash
cp -r resources/scripts/themes/ resources/scripts/themes_backup/
```

3. Clone this theme repository (replace YOUR_USERNAME with your GitHub username)
```bash
git clone https://github.com/YOUR_USERNAME/qtemp-theme.git
cd qtemp-theme
```

4. Copy theme files to your panel
```bash
cp -r theme/* /var/www/pterodactyl/resources/scripts/themes/
```

5. Build panel assets
```bash
cd /var/www/pterodactyl
yarn install
yarn build:production
```

6. Clear browser cache and refresh the panel

### Quick Installation (Script)

1. Download and run the installation script (replace YOUR_USERNAME with your GitHub username)
```bash
curl -L https://raw.githubusercontent.com/YOUR_USERNAME/qtemp-theme/main/install.sh | bash
```

## Customization

### Changing Theme Variants

1. Open `/var/www/pterodactyl/resources/scripts/themes/qtemp/index.ts`
2. Modify the `THEME_VARIANT` constant:
   - `'default'` - Purple QtempHost theme
   - `'dark'` - Dark theme variant
   - `'light'` - Light theme variant

### Custom Colors

You can customize colors by modifying the CSS variables in:
- `resources/scripts/themes/qtemp/variables.ts`

### Custom Logo

1. Replace the logo file at `resources/scripts/themes/qtemp/assets/logo.svg`
2. Rebuild panel assets:
```bash
yarn build:production
```

## Troubleshooting

### Theme Not Applying

1. Clear browser cache
2. Ensure proper file permissions
```bash
chown -R www-data:www-data /var/www/pterodactyl/*
```
3. Rebuild panel assets
```bash
yarn build:production
```

### Missing Styles

If some pages appear unstyled:
1. Check browser console for errors
2. Verify all theme files are in correct locations
3. Clear panel cache:
```bash
php artisan view:clear
php artisan cache:clear
```

## Support

For support, please:
1. Check the [FAQ](docs/FAQ.md)
2. Open an issue on GitHub
3. Join our Discord server

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md). 