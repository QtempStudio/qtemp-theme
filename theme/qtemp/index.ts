import { Theme } from '../types';
import { getThemeVariables } from './variables';
import { createTheme } from '../helpers';

// Theme variant can be changed here
const THEME_VARIANT: 'default' | 'dark' | 'light' = 'default';

const theme: Theme = {
    name: 'qtemp',
    
    // Get theme variables based on selected variant
    variables: getThemeVariables(THEME_VARIANT),

    // Custom styles for components
    styles: {
        button: {
            base: `
                font-family: var(--font-family);
                font-weight: var(--font-weight-medium);
                padding: calc(var(--spacing-base) * 0.75) var(--spacing-base);
                border-radius: var(--border-radius);
                transition: all var(--transition-speed) var(--transition-easing);
                border: none;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: calc(var(--spacing-base) * 0.5);

                &:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
            `,
            primary: `
                background: var(--button-primary);
                color: white;

                &:hover:not(:disabled) {
                    background: var(--button-primary-hover);
                    transform: translateY(-1px);
                }
            `,
            secondary: `
                background: var(--button-secondary);
                color: var(--default-text-color);

                &:hover:not(:disabled) {
                    background: var(--button-secondary-hover);
                }
            `,
        },
        card: `
            background: var(--container-background);
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius);
            padding: calc(var(--spacing-base) * 2);
            transition: transform var(--transition-speed) var(--transition-easing);

            &:hover {
                transform: translateY(-2px);
                box-shadow: var(--shadow-large);
            }
        `,
        input: `
            font-family: var(--font-family);
            background: var(--input-background);
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius);
            padding: calc(var(--spacing-base) * 0.75) var(--spacing-base);
            color: var(--default-text-color);
            transition: border-color var(--transition-speed) var(--transition-easing);

            &:focus {
                border-color: var(--accent);
                outline: none;
            }

            &::placeholder {
                color: var(--text-secondary);
            }
        `,
        container: `
            background: var(--container-background);
            border-radius: var(--border-radius);
            padding: var(--spacing-base);
        `,
        header: `
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: calc(var(--spacing-base) * 1.5);

            h1, h2, h3, h4, h5, h6 {
                margin: 0;
                color: var(--default-text-color);
            }
        `,
        status: {
            success: `
                background: color-mix(in srgb, var(--status-success) 20%, transparent);
                color: var(--status-success);
                padding: calc(var(--spacing-base) * 0.25) calc(var(--spacing-base) * 0.75);
                border-radius: 1rem;
                font-size: 0.875rem;
                font-weight: var(--font-weight-medium);
            `,
            error: `
                background: color-mix(in srgb, var(--status-error) 20%, transparent);
                color: var(--status-error);
                padding: calc(var(--spacing-base) * 0.25) calc(var(--spacing-base) * 0.75);
                border-radius: 1rem;
                font-size: 0.875rem;
                font-weight: var(--font-weight-medium);
            `,
            warning: `
                background: color-mix(in srgb, var(--status-warning) 20%, transparent);
                color: var(--status-warning);
                padding: calc(var(--spacing-base) * 0.25) calc(var(--spacing-base) * 0.75);
                border-radius: 1rem;
                font-size: 0.875rem;
                font-weight: var(--font-weight-medium);
            `,
            info: `
                background: color-mix(in srgb, var(--status-info) 20%, transparent);
                color: var(--status-info);
                padding: calc(var(--spacing-base) * 0.25) calc(var(--spacing-base) * 0.75);
                border-radius: 1rem;
                font-size: 0.875rem;
                font-weight: var(--font-weight-medium);
            `,
        },
    },

    // Global styles
    global: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        body {
            font-family: var(--font-family);
            background: var(--background);
            color: var(--default-text-color);
            line-height: 1.5;
        }

        // Sidebar styles
        .sidebar {
            background: var(--container-background);
            border-right: 1px solid var(--border-color);
            padding: calc(var(--spacing-base) * 2) 0;

            .logo-container {
                padding: 0 calc(var(--spacing-base) * 1.5) calc(var(--spacing-base) * 2);
                display: flex;
                align-items: center;
                gap: calc(var(--spacing-base) * 0.75);
            }

            .nav-links {
                padding: 0 calc(var(--spacing-base) * 0.75);

                .nav-link {
                    display: flex;
                    align-items: center;
                    gap: calc(var(--spacing-base) * 0.75);
                    padding: calc(var(--spacing-base) * 0.75) var(--spacing-base);
                    color: var(--text-secondary);
                    text-decoration: none;
                    border-radius: var(--border-radius);
                    transition: all var(--transition-speed) var(--transition-easing);

                    &:hover {
                        background: color-mix(in srgb, var(--default-text-color) 10%, transparent);
                        color: var(--default-text-color);
                    }

                    &.active {
                        background: var(--accent);
                        color: white;
                    }
                }
            }
        }

        // Animation keyframes
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes slideIn {
            from { transform: translateY(10px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        // Animation classes
        .fade-in {
            animation: fadeIn var(--transition-speed) var(--transition-easing);
        }

        .slide-in {
            animation: slideIn var(--transition-speed) var(--transition-easing);
        }
    `,
};

export default createTheme(theme); 