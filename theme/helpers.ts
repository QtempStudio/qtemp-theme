import { Theme } from './types';

export const createTheme = (theme: Theme): Theme => {
    // Convert theme variables to CSS variables
    const cssVariables = Object.entries(theme.variables)
        .map(([key, value]) => `--${key.replace(/\./g, '-')}: ${value};`)
        .join('\n');

    // Inject CSS variables into global styles
    const enhancedGlobalStyles = `
        :root {
            ${cssVariables}
        }
        
        ${theme.global}
    `;

    return {
        ...theme,
        global: enhancedGlobalStyles,
    };
}; 