import { ThemeVariables } from '../types';

// Default QtempHost Purple Theme
const defaultTheme: ThemeVariables = {
    background: '#1a1625',
    containerBackground: '#2D2640',
    defaultTextColor: '#ffffff',
    textSecondary: '#a8a5b5',
    accent: '#7C3AED',
    'input.background': '#1a1625',
    'button.primary': '#7C3AED',
    'button.primary.hover': '#6D28D9',
    'button.secondary': 'rgba(255, 255, 255, 0.1)',
    'button.secondary.hover': 'rgba(255, 255, 255, 0.15)',
    'status.success': '#10B981',
    'status.error': '#EF4444',
    'status.warning': '#F59E0B',
    'status.info': '#3B82F6',
    'border.color': 'rgba(255, 255, 255, 0.1)',
    'border.radius': '8px',
    'spacing.base': '1rem',
    'font.family': '"Inter", sans-serif',
    'font.weight.normal': '400',
    'font.weight.medium': '500',
    'font.weight.bold': '600',
    'transition.speed': '0.2s',
    'transition.easing': 'ease-in-out',
    'shadow.small': '0 2px 4px rgba(0, 0, 0, 0.1)',
    'shadow.medium': '0 4px 6px rgba(0, 0, 0, 0.1)',
    'shadow.large': '0 8px 24px rgba(0, 0, 0, 0.2)',
};

// Dark Theme Variant
const darkTheme: ThemeVariables = {
    ...defaultTheme,
    background: '#0f0f0f',
    containerBackground: '#1a1a1a',
    accent: '#3B82F6',
    'button.primary': '#3B82F6',
    'button.primary.hover': '#2563EB',
};

// Light Theme Variant
const lightTheme: ThemeVariables = {
    ...defaultTheme,
    background: '#f5f5f5',
    containerBackground: '#ffffff',
    defaultTextColor: '#1a1625',
    textSecondary: '#4B5563',
    'input.background': '#ffffff',
    'button.secondary': 'rgba(0, 0, 0, 0.05)',
    'button.secondary.hover': 'rgba(0, 0, 0, 0.1)',
    'border.color': 'rgba(0, 0, 0, 0.1)',
};

export const getThemeVariables = (variant: 'default' | 'dark' | 'light'): ThemeVariables => {
    switch (variant) {
        case 'dark':
            return darkTheme;
        case 'light':
            return lightTheme;
        default:
            return defaultTheme;
    }
}; 