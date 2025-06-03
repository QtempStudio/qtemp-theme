#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}QtempHost Theme Installer${NC}"
echo "=============================="

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Please run as root${NC}"
    exit 1
fi

# Check if pterodactyl directory exists
if [ ! -d "/var/www/pterodactyl" ]; then
    echo -e "${RED}Pterodactyl directory not found at /var/www/pterodactyl${NC}"
    exit 1
fi

# Create backup
echo -e "\n${BLUE}Creating backup...${NC}"
timestamp=$(date +%Y%m%d_%H%M%S)
backup_dir="/var/www/pterodactyl/resources/scripts/themes_backup_${timestamp}"
mkdir -p "$backup_dir"
cp -r /var/www/pterodactyl/resources/scripts/themes/* "$backup_dir/"
echo -e "${GREEN}✓ Backup created at $backup_dir${NC}"

# Download theme
echo -e "\n${BLUE}Downloading theme...${NC}"
if [ -d "qtemp-theme" ]; then
    rm -rf qtemp-theme
fi
git clone https://github.com/YOUR_USERNAME/qtemp-theme.git
echo -e "${GREEN}✓ Theme downloaded${NC}"

# Install theme
echo -e "\n${BLUE}Installing theme...${NC}"
cp -r qtemp-theme/theme/* /var/www/pterodactyl/resources/scripts/themes/
rm -rf qtemp-theme
echo -e "${GREEN}✓ Theme files installed${NC}"

# Set permissions
echo -e "\n${BLUE}Setting permissions...${NC}"
chown -R www-data:www-data /var/www/pterodactyl/*
echo -e "${GREEN}✓ Permissions set${NC}"

# Build assets
echo -e "\n${BLUE}Building panel assets...${NC}"
cd /var/www/pterodactyl
yarn install
yarn build:production
echo -e "${GREEN}✓ Panel assets built${NC}"

# Clear cache
echo -e "\n${BLUE}Clearing cache...${NC}"
php artisan view:clear
php artisan cache:clear
echo -e "${GREEN}✓ Cache cleared${NC}"

echo -e "\n${GREEN}Installation complete!${NC}"
echo -e "Please clear your browser cache and refresh the panel."
echo -e "\nTo customize the theme, edit:"
echo -e "- /var/www/pterodactyl/resources/scripts/themes/qtemp/variables.ts"
echo -e "- /var/www/pterodactyl/resources/scripts/themes/qtemp/index.ts"

echo -e "\n${BLUE}Need help? Join our Discord or open an issue on GitHub.${NC}" 