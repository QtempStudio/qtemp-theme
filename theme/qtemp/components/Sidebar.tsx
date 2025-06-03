import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Logo } from './Logo';

const slideIn = keyframes`
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const SidebarContainer = styled.aside<{ isCollapsed: boolean }>`
    width: ${props => props.isCollapsed ? '64px' : '250px'};
    background: var(--container-background);
    border-right: 1px solid var(--border-color);
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    transition: width var(--transition-speed) var(--transition-easing);
    animation: ${slideIn} 0.3s ease-out;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 100;

    &:hover {
        box-shadow: var(--shadow-large);
    }

    /* Custom scrollbar */
    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: var(--accent);
        border-radius: 3px;
    }
`;

const NavSection = styled.div`
    padding: 1rem 0.75rem;
    
    &:not(:last-child) {
        border-bottom: 1px solid var(--border-color);
    }
`;

const NavItem = styled.div<{ isActive?: boolean }>`
    margin: 0.25rem 0;
`;

const NavLink = styled.a<{ isActive?: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    color: ${props => props.isActive ? 'white' : 'var(--text-secondary)'};
    text-decoration: none;
    border-radius: var(--border-radius);
    background: ${props => props.isActive ? 'var(--accent)' : 'transparent'};
    transition: all var(--transition-speed) var(--transition-easing);
    position: relative;
    overflow: hidden;

    &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: var(--accent);
        opacity: 0;
        transform: translateX(-100%);
        transition: all 0.3s ease;
    }

    &:hover {
        color: ${props => props.isActive ? 'white' : 'var(--default-text-color)'};
        background: ${props => props.isActive ? 'var(--accent)' : 'rgba(255, 255, 255, 0.05)'};
        transform: translateX(4px);

        &:before {
            transform: translateX(0);
            opacity: 0.1;
        }
    }

    /* Icon container */
    .icon {
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    /* Text animation */
    .text {
        white-space: nowrap;
        opacity: ${props => props.isActive ? 1 : 0.8};
        transform: translateX(0);
        transition: all 0.3s ease;
    }
`;

const CollapseButton = styled.button`
    position: absolute;
    right: -12px;
    top: 20px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--accent);
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    z-index: 10;

    &:hover {
        transform: scale(1.1);
        box-shadow: 0 0 10px rgba(124, 58, 237, 0.5);
    }

    svg {
        width: 16px;
        height: 16px;
        transition: transform 0.3s ease;
    }
`;

const ServerStatus = styled.div<{ status: 'online' | 'offline' | 'starting' }>`
    position: relative;
    padding-left: 16px;
    
    &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${props => {
            switch(props.status) {
                case 'online': return 'var(--status-success)';
                case 'starting': return 'var(--status-warning)';
                default: return 'var(--status-error)';
            }
        }};
        box-shadow: 0 0 8px ${props => {
            switch(props.status) {
                case 'online': return 'rgba(16, 185, 129, 0.5)';
                case 'starting': return 'rgba(245, 158, 11, 0.5)';
                default: return 'rgba(239, 68, 68, 0.5)';
            }
        }};
    }
`;

interface SidebarProps {
    activeRoute?: string;
    onCollapse?: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeRoute = '/', onCollapse }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleCollapse = () => {
        setIsCollapsed(!isCollapsed);
        onCollapse?.(!isCollapsed);
    };

    return (
        <SidebarContainer isCollapsed={isCollapsed}>
            <Logo showText={!isCollapsed} />
            
            <CollapseButton onClick={handleCollapse}>
                <svg 
                    style={{ transform: isCollapsed ? 'rotate(180deg)' : 'none' }}
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                >
                    <path d="M15 19l-7-7 7-7" />
                </svg>
            </CollapseButton>

            <NavSection>
                <NavItem>
                    <NavLink href="/" isActive={activeRoute === '/'}>
                        <span className="icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </span>
                        <span className="text">Dashboard</span>
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink href="/servers" isActive={activeRoute === '/servers'}>
                        <span className="icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                            </svg>
                        </span>
                        <span className="text">My Servers</span>
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink href="/account" isActive={activeRoute === '/account'}>
                        <span className="icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
                        <span className="text">Account</span>
                    </NavLink>
                </NavItem>
            </NavSection>

            <NavSection>
                <NavItem>
                    <NavLink href="/api" isActive={activeRoute === '/api'}>
                        <span className="icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </span>
                        <span className="text">API Credentials</span>
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink href="/support" isActive={activeRoute === '/support'}>
                        <span className="icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                        <span className="text">Support</span>
                    </NavLink>
                </NavItem>
            </NavSection>

            <NavSection>
                <NavItem>
                    <ServerStatus status="online">
                        <NavLink href="/server/1">
                            <span className="icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                                </svg>
                            </span>
                            <span className="text">Minecraft Server</span>
                        </NavLink>
                    </ServerStatus>
                </NavItem>

                <NavItem>
                    <ServerStatus status="offline">
                        <NavLink href="/server/2">
                            <span className="icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                                </svg>
                            </span>
                            <span className="text">CS:GO Server</span>
                        </NavLink>
                    </ServerStatus>
                </NavItem>
            </NavSection>
        </SidebarContainer>
    );
};

export default Sidebar; 