#!/bin/bash

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

# Progress bar function
progress_bar() {
    local duration=$1
    local width=50
    local progress=0
    local fill_char="▇"
    local empty_char="░"
    
    while [ $progress -le 100 ]; do
        local count=$(($width * $progress / 100))
        local spaces=$((width - count))
        
        printf "\r[${BLUE}"
        printf "%${count}s" | tr " " "${fill_char}"
        printf "${NC}"
        printf "%${spaces}s" | tr " " "${empty_char}"
        printf "] ${YELLOW}%3d%%${NC}" $progress
        
        progress=$((progress + 2))
        sleep $duration
    done
    printf "\n"
}

# Clear screen
clear

# ASCII Art
echo -e "${CYAN}"
cat << "EOF"
 ██████╗ ████████╗███████╗███╗   ███╗██████╗     
██╔═══██╗╚══██╔══╝██╔════╝████╗ ████║██╔══██╗    
██║   ██║   ██║   █████╗  ██╔████╔██║██████╔╝    
██║▄▄ ██║   ██║   ██╔══╝  ██║╚██╔╝██║██╔═══╝     
╚██████╔╝   ██║   ███████╗██║ ╚═╝ ██║██║         
 ╚══▀▀═╝    ╚═╝   ╚══════╝╚═╝     ╚═╝╚═╝         
███████╗████████╗██╗   ██╗██████╗ ██╗ ██████╗     
██╔════╝╚══██╔══╝██║   ██║██╔══██╗██║██╔═══██╗    
███████╗   ██║   ██║   ██║██║  ██║██║██║   ██║    
╚════██║   ██║   ██║   ██║██║  ██║██║██║   ██║    
███████║   ██║   ╚██████╔╝██████╔╝██║╚██████╔╝    
╚══════╝   ╚═╝    ╚═════╝ ╚═════╝ ╚═╝ ╚═════╝     
EOF
echo -e "${NC}"

echo -e "${BLUE}Pterodactyl Theme Installer${NC}"
echo -e "${YELLOW}Version: 1.0.0${NC}"
echo -e "${CYAN}Created by: QTemp Studio${NC}\n"

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Error: Please run as root${NC}"
    exit 1
fi

# Terms of Service
echo -e "\n${YELLOW}Terms of Service${NC}"
echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "1. This script will modify your Pterodactyl Panel installation"
echo -e "2. A backup will be created before any changes"
echo -e "3. QTemp Studio is not responsible for any damage"
echo -e "4. This theme is for personal use only"
echo -e "5. You may not redistribute this theme without permission"
echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Ask for agreement
read -p "Do you agree to these terms? (y/N): " agree
if [[ ! $agree =~ ^[Yy]$ ]]; then
    echo -e "${RED}Installation cancelled${NC}"
    exit 1
fi

# Check system requirements
echo -e "\n${BLUE}Checking system requirements...${NC}"
progress_bar 0.03

# Check if pterodactyl directory exists
if [ ! -d "/var/www/pterodactyl" ]; then
    echo -e "${RED}Error: Pterodactyl directory not found at /var/www/pterodactyl${NC}"
    exit 1
fi

# Check for required commands
commands=("git" "yarn" "php" "composer")
missing_commands=()

for cmd in "${commands[@]}"; do
    if ! command -v $cmd &> /dev/null; then
        missing_commands+=($cmd)
    fi
done

if [ ${#missing_commands[@]} -ne 0 ]; then
    echo -e "${RED}Error: Missing required commands: ${missing_commands[*]}${NC}"
    echo -e "\nInstalling missing dependencies..."
    
    # Install missing dependencies
    apt update
    for cmd in "${missing_commands[@]}"; do
        case $cmd in
            "git")
                apt install -y git
                ;;
            "yarn")
                curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
                echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
                apt update && apt install -y yarn
                ;;
            "php")
                apt install -y php8.1-cli php8.1-common php8.1-fpm
                ;;
            "composer")
                curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
                ;;
        esac
    done
fi

# Create backup
echo -e "\n${BLUE}Creating backup...${NC}"
timestamp=$(date +%Y%m%d_%H%M%S)
backup_dir="/var/www/pterodactyl/resources/scripts/themes_backup_${timestamp}"
mkdir -p "$backup_dir"

if [ -d "/var/www/pterodactyl/resources/scripts/themes" ]; then
    cp -r /var/www/pterodactyl/resources/scripts/themes/* "$backup_dir/"
    echo -e "${GREEN}✓ Backup created at $backup_dir${NC}"
else
    mkdir -p /var/www/pterodactyl/resources/scripts/themes
    echo -e "${YELLOW}! No existing themes found, created themes directory${NC}"
fi

# Download theme
echo -e "\n${BLUE}Downloading theme...${NC}"
progress_bar 0.02

if [ -d "qtemp-theme" ]; then
    rm -rf qtemp-theme
fi

git clone https://github.com/QtempStudio/qtemp-theme.git
if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Failed to download theme${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Theme downloaded${NC}"

# Install theme
echo -e "\n${BLUE}Installing theme...${NC}"
progress_bar 0.02

cp -r qtemp-theme/theme/* /var/www/pterodactyl/resources/scripts/themes/
rm -rf qtemp-theme
echo -e "${GREEN}✓ Theme files installed${NC}"

# Set permissions
echo -e "\n${BLUE}Setting permissions...${NC}"
progress_bar 0.01
chown -R www-data:www-data /var/www/pterodactyl/*
echo -e "${GREEN}✓ Permissions set${NC}"

# Build assets
echo -e "\n${BLUE}Building panel assets...${NC}"
cd /var/www/pterodactyl

echo -e "${YELLOW}Installing dependencies...${NC}"
yarn install
if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Failed to install dependencies${NC}"
    exit 1
fi

echo -e "${YELLOW}Building production assets...${NC}"
yarn build:production
if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Failed to build assets${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Panel assets built${NC}"

# Clear cache
echo -e "\n${BLUE}Clearing cache...${NC}"
progress_bar 0.01
php artisan view:clear
php artisan cache:clear
echo -e "${GREEN}✓ Cache cleared${NC}"

# Installation complete
echo -e "\n${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║         Installation Complete!          ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"

echo -e "\n${YELLOW}Next steps:${NC}"
echo -e "1. Clear your browser cache"
echo -e "2. Refresh your panel"
echo -e "3. If styles are missing, run: ${CYAN}yarn build:production${NC}"

echo -e "\n${BLUE}Theme Customization:${NC}"
echo -e "Edit these files to customize your theme:"
echo -e "• ${CYAN}/var/www/pterodactyl/resources/scripts/themes/qtemp/variables.ts${NC}"
echo -e "• ${CYAN}/var/www/pterodactyl/resources/scripts/themes/qtemp/index.ts${NC}"

echo -e "\n${YELLOW}Need help? Join our Discord or open an issue on GitHub${NC}"
echo -e "${BLUE}https://github.com/QtempStudio/qtemp-theme/issues${NC}"

# Print QTemp Studio footer
echo -e "\n${CYAN}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "           QTemp Studio © 2024            "
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${NC}" 