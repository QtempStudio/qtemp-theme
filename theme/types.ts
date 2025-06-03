export interface ThemeVariables {
    background: string;
    containerBackground: string;
    defaultTextColor: string;
    textSecondary: string;
    accent: string;
    'input.background': string;
    'button.primary': string;
    'button.primary.hover': string;
    'button.secondary': string;
    'button.secondary.hover': string;
    'status.success': string;
    'status.error': string;
    'status.warning': string;
    'status.info': string;
    'border.color': string;
    'border.radius': string;
    'spacing.base': string;
    'font.family': string;
    'font.weight.normal': string;
    'font.weight.medium': string;
    'font.weight.bold': string;
    'transition.speed': string;
    'transition.easing': string;
    'shadow.small': string;
    'shadow.medium': string;
    'shadow.large': string;
}

export interface Theme {
    name: string;
    variables: ThemeVariables;
    styles: {
        button: {
            base: string;
            primary: string;
            secondary: string;
        };
        card: string;
        input: string;
        container: string;
        header: string;
        status: {
            success: string;
            error: string;
            warning: string;
            info: string;
        };
    };
    global: string;
} 