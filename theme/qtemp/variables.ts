import { ThemeVariables } from '../types';

const baseTheme = {
    // Spacing
    'spacing.base': '1rem',
    'spacing.small': '0.5rem',
    'spacing.large': '1.5rem',

    // Typography
    'font.family': "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    'font.weight.normal': '400',
    'font.weight.medium': '500',
    'font.weight.bold': '600',

    // Borders
    'border.radius': '0.5rem',
    'border.radius.small': '0.25rem',
    'border.radius.large': '1rem',

    // Transitions
    'transition.speed': '0.2s',
    'transition.speed.fast': '0.15s',
    'transition.speed.slow': '0.3s',
    'transition.easing': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'transition.bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

    // Shadows
    'shadow.small': '0 2px 4px rgba(0, 0, 0, 0.1)',
    'shadow.medium': '0 4px 6px rgba(0, 0, 0, 0.1)',
    'shadow.large': '0 10px 15px rgba(0, 0, 0, 0.1)',
    'shadow.glow': '0 0 15px',

    // Animation
    'animation.duration.fast': '150ms',
    'animation.duration.normal': '300ms',
    'animation.duration.slow': '500ms',
    'animation.easing.bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    'animation.easing.smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'animation.easing.spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',

    // Nebula Effect
    'nebula.opacity': '0.15',
    'nebula.color.primary': 'rgba(124, 58, 237, 0.5)',
    'nebula.color.secondary': 'rgba(139, 92, 246, 0.3)',
    'nebula.blur': '20px',
    'nebula.scale': '1.5',
    'nebula.speed': '10s',
};

const defaultTheme: ThemeVariables = {
    ...baseTheme,
    // Colors - Default Purple Theme
    background: '#1a1625',
    containerBackground: '#2D2640',
    defaultTextColor: '#E2E8F0',
    textSecondary: '#A0AEC0',
    accent: '#7C3AED',
    'input.background': '#1a1625',
    'button.primary': '#7C3AED',
    'button.primary.hover': '#6D28D9',
    'button.secondary': '#2D2640',
    'button.secondary.hover': '#4C4556',
    'status.success': '#10B981',
    'status.error': '#EF4444',
    'status.warning': '#F59E0B',
    'status.info': '#3B82F6',
    'border.color': '#4C4556',
};

const darkTheme: ThemeVariables = {
    ...baseTheme,
    // Colors - Dark Theme
    background: '#0F172A',
    containerBackground: '#1E293B',
    defaultTextColor: '#E2E8F0',
    textSecondary: '#94A3B8',
    accent: '#3B82F6',
    'input.background': '#0F172A',
    'button.primary': '#3B82F6',
    'button.primary.hover': '#2563EB',
    'button.secondary': '#1E293B',
    'button.secondary.hover': '#334155',
    'status.success': '#10B981',
    'status.error': '#EF4444',
    'status.warning': '#F59E0B',
    'status.info': '#3B82F6',
    'border.color': '#334155',
};

const lightTheme: ThemeVariables = {
    ...baseTheme,
    // Colors - Light Theme
    background: '#F8FAFC',
    containerBackground: '#FFFFFF',
    defaultTextColor: '#1E293B',
    textSecondary: '#64748B',
    accent: '#6D28D9',
    'input.background': '#F1F5F9',
    'button.primary': '#6D28D9',
    'button.primary.hover': '#5B21B6',
    'button.secondary': '#F1F5F9',
    'button.secondary.hover': '#E2E8F0',
    'status.success': '#059669',
    'status.error': '#DC2626',
    'status.warning': '#D97706',
    'status.info': '#2563EB',
    'border.color': '#E2E8F0',
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