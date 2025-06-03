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
    'border.radius.small': string;
    'border.radius.large': string;
    'spacing.base': string;
    'spacing.small': string;
    'spacing.large': string;
    'font.family': string;
    'font.weight.normal': string;
    'font.weight.medium': string;
    'font.weight.bold': string;
    'transition.speed': string;
    'transition.speed.fast': string;
    'transition.speed.slow': string;
    'transition.easing': string;
    'transition.bounce': string;
    'shadow.small': string;
    'shadow.medium': string;
    'shadow.large': string;
    'shadow.glow': string;
    'animation.duration.fast': string;
    'animation.duration.normal': string;
    'animation.duration.slow': string;
    'animation.easing.bounce': string;
    'animation.easing.smooth': string;
    'animation.easing.spring': string;
    'nebula.opacity': string;
    'nebula.color.primary': string;
    'nebula.color.secondary': string;
    'nebula.blur': string;
    'nebula.scale': string;
    'nebula.speed': string;
}

export interface Theme {
    name: string;
    variables: ThemeVariables;
    assets: {
        logo: string;
        logoText: string;
    };
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
        logo: {
            container: string;
            image: string;
            text: string;
        };
        status: {
            success: string;
            error: string;
            warning: string;
            info: string;
        };
    };
    global: string;
}

export interface ServerStatus {
    id: string;
    name: string;
    status: 'online' | 'offline' | 'starting' | 'stopping';
    cpu: number;
    memory: {
        used: number;
        total: number;
    };
    disk: {
        used: number;
        total: number;
    };
    network: {
        up: number;
        down: number;
    };
    uptime: number;
}

export interface User {
    id: string;
    username: string;
    email: string;
    avatar?: string;
    role: 'admin' | 'user' | 'moderator';
    lastLogin: Date;
    createdAt: Date;
}

export interface NotificationProps {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    description?: string;
    duration?: number;
    timestamp: Date;
}

export interface AnimationConfig {
    duration: number;
    ease: [number, number, number, number];
    delay?: number;
    repeat?: number;
    repeatType?: 'loop' | 'reverse' | 'mirror';
}

export interface NebulaConfig {
    enabled: boolean;
    density: number;
    speed: number;
    color: string;
    opacity: number;
    blur: number;
    scale: number;
}

export interface MetricsData {
    timestamp: Date;
    cpu: number;
    memory: number;
    disk: number;
    network: {
        up: number;
        down: number;
    };
}

export interface ChartConfig {
    type: 'line' | 'bar' | 'pie' | 'doughnut';
    data: MetricsData[];
    options: {
        animation: boolean;
        responsive: boolean;
        maintainAspectRatio: boolean;
        scales?: {
            x?: {
                type: string;
                time?: {
                    unit: string;
                };
            };
            y?: {
                beginAtZero: boolean;
                max?: number;
            };
        };
    };
} 