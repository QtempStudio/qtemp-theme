#!/bin/bash

# ANSI color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# ASCII Art Logo
echo -e "${PURPLE}"
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
╚════██║   ██║   ██║   ██║██║  ██║██║   ██║    
███████║   ██║   ╚██████╔╝██████╔╝██║╚██████╔╝    
╚══════╝   ╚═╝    ╚═════╝ ╚═════╝ ╚═╝ ╚═════╝     
EOF
echo -e "${NC}"

# Progress bar function
progress() {
    local width=50
    local percent=$1
    local filled=$((width * percent / 100))
    local empty=$((width - filled))
    printf "\r[${PURPLE}"
    printf "%${filled}s" '' | tr ' ' '█'
    printf "${NC}"
    printf "%${empty}s" '' | tr ' ' '░'
    printf "] ${percent}%%"
}

# Spinner function for long-running tasks
spinner() {
    local pid=$1
    local delay=0.1
    local spinstr='|/-\'
    while [ "$(ps a | awk '{print $1}' | grep $pid)" ]; do
        local temp=${spinstr#?}
        printf "\r[${CYAN}%c${NC}] " "$spinstr"
        local spinstr=$temp${spinstr%"$temp"}
        sleep $delay
    done
    printf "\r   \r"
}

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo -e "${RED}This script must be run as root${NC}"
   exit 1
fi

# Check if pterodactyl directory exists
if [ ! -d "/var/www/pterodactyl" ]; then
    echo -e "${RED}Error: Pterodactyl directory not found at /var/www/pterodactyl${NC}"
    exit 1
fi

# Welcome message
echo -e "\n${CYAN}Welcome to QTemp Studio Theme Installer${NC}"
echo -e "${CYAN}This script will install the QTemp theme for your Pterodactyl Panel${NC}\n"

# Terms of Service
echo -e "${YELLOW}Terms of Service:${NC}"
echo -e "1. This theme is provided as-is without warranty"
echo -e "2. You are responsible for any modifications"
echo -e "3. Support is provided through official channels only\n"

read -p "Do you accept the terms? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}Installation cancelled${NC}"
    exit 1
fi

# Check dependencies
echo -e "\n${BLUE}Checking dependencies...${NC}"
dependencies=("git" "npm" "yarn" "php" "composer")
missing_deps=()

for dep in "${dependencies[@]}"; do
    if ! command -v $dep &> /dev/null; then
        missing_deps+=($dep)
    fi
    progress $((25 + 15 * ${#missing_deps[@]} / ${#dependencies[@]}))
done

if [ ${#missing_deps[@]} -ne 0 ]; then
    echo -e "\n${RED}Missing dependencies: ${missing_deps[*]}${NC}"
    echo -e "${YELLOW}Please install them and try again${NC}"
    exit 1
fi
echo -e "\n${GREEN}✓ All dependencies satisfied${NC}"

# Create backup
echo -e "\n${BLUE}Creating backup...${NC}"
timestamp=$(date +%Y%m%d_%H%M%S)
backup_dir="/var/www/pterodactyl/resources/scripts/themes_backup_$timestamp"
mkdir -p "$backup_dir"

if [ -d "/var/www/pterodactyl/resources/scripts/themes" ]; then
    cp -r /var/www/pterodactyl/resources/scripts/themes/* "$backup_dir/" &
    spinner $!
    progress 40
fi
echo -e "\n${GREEN}✓ Backup created at $backup_dir${NC}"

# Download theme
echo -e "\n${BLUE}Downloading QTemp theme...${NC}"
cd /var/www/pterodactyl
git clone https://github.com/QtempStudio/qtemp-theme.git temp_theme &
spinner $!
progress 60

# Install theme
echo -e "\n${BLUE}Installing theme...${NC}"
mkdir -p resources/scripts/themes
cp -r temp_theme/theme/* resources/scripts/themes/ &
spinner $!
progress 75

# Install dependencies and build
echo -e "\n${BLUE}Installing dependencies and building...${NC}"
yarn install &
spinner $!
progress 85

yarn build:production &
spinner $!
progress 95

# Cleanup
rm -rf temp_theme
chown -R www-data:www-data /var/www/pterodactyl/*
find /var/www/pterodactyl -type f -exec chmod 644 {} \;
find /var/www/pterodactyl -type d -exec chmod 755 {} \;

# Clear cache
php artisan view:clear
php artisan cache:clear
progress 100

echo -e "\n${GREEN}✓ Installation completed successfully!${NC}"

# Post-installation instructions
echo -e "\n${CYAN}Post-Installation Steps:${NC}"
echo -e "1. Clear your browser cache"
echo -e "2. Refresh the panel page"
echo -e "3. If you experience any issues, restore from backup at $backup_dir"

echo -e "\n${CYAN}Theme Customization:${NC}"
echo -e "1. Edit theme variables: /var/www/pterodactyl/resources/scripts/themes/qtemp/variables.ts"
echo -e "2. Change theme variant in: /var/www/pterodactyl/resources/scripts/themes/qtemp/index.ts"
echo -e "3. Rebuild after changes: ${YELLOW}cd /var/www/pterodactyl && yarn build:production${NC}"

echo -e "\n${PURPLE}Thank you for installing QTemp Studio Theme!${NC}"
echo -e "${PURPLE}For support, visit our Discord server or GitHub repository${NC}\n" 