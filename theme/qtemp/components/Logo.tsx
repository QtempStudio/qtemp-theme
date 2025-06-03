import React from 'react';
import { assets } from '../assets';
import styled from 'styled-components';

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    gap: calc(var(--spacing-base) * 0.75);
    padding: calc(var(--spacing-base) * 1.5);
`;

const LogoImage = styled.img`
    width: 40px;
    height: 40px;
    object-fit: contain;
    transition: transform var(--transition-speed) var(--transition-easing);

    &:hover {
        transform: scale(1.05);
    }
`;

const LogoText = styled.img`
    height: 24px;
    object-fit: contain;
    transition: transform var(--transition-speed) var(--transition-easing);

    &:hover {
        transform: scale(1.02);
    }
`;

interface LogoProps {
    showText?: boolean;
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ showText = true, className }) => {
    return (
        <LogoContainer className={`qtemp-logo ${className || ''}`}>
            <LogoImage src={assets.logo} alt="QTemp Studio" />
            {showText && <LogoText src={assets.logoText} alt="QTemp Studio" />}
        </LogoContainer>
    );
};

export default Logo; 