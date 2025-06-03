import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
`;

const slideUp = keyframes`
    from { transform: translateY(10px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
`;

const MetricsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-base);
    padding: var(--spacing-base);
    animation: ${slideUp} var(--animation.duration.normal) var(--animation.easing.smooth);
`;

const MetricCard = styled.div<{ alert?: boolean }>`
    background: var(--container-background);
    border-radius: var(--border-radius);
    padding: var(--spacing-base);
    box-shadow: var(--shadow-medium);
    transition: all var(--transition.speed) var(--transition.easing);
    position: relative;
    overflow: hidden;

    ${props => props.alert && `
        animation: ${pulse} 2s infinite;
        border: 1px solid var(--status-error);
    `}

    &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-large);
    }

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: var(--accent);
        opacity: 0.5;
    }
`;

const MetricTitle = styled.h3`
    margin: 0 0 var(--spacing-small);
    color: var(--text-secondary);
    font-size: 0.875rem;
    font-weight: var(--font-weight-medium);
`;

const MetricValue = styled.div<{ color?: string }>`
    font-size: 1.5rem;
    font-weight: var(--font-weight-bold);
    color: ${props => props.color || 'var(--default-text-color)'};
    margin-bottom: var(--spacing-small);
`;

const ProgressBar = styled.div<{ value: number; warning?: boolean }>`
    height: 6px;
    background: ${props => props.warning ? 'var(--status-error)' : 'var(--accent)'};
    border-radius: 3px;
    width: ${props => props.value}%;
    transition: width var(--transition.speed) var(--transition.easing);
    position: relative;
    overflow: hidden;

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
        );
        transform: translateX(-100%);
        animation: shimmer 2s infinite;
    }

    @keyframes shimmer {
        100% {
            transform: translateX(100%);
        }
    }
`;

const ProgressContainer = styled.div`
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    margin-top: var(--spacing-small);
`;

const MetricGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-small);
    margin-top: var(--spacing-base);
`;

const SmallMetric = styled.div`
    text-align: center;
    padding: var(--spacing-small);
    background: rgba(255, 255, 255, 0.05);
    border-radius: var(--border-radius-small);

    h4 {
        margin: 0;
        font-size: 0.75rem;
        color: var(--text-secondary);
    }

    p {
        margin: var(--spacing-small) 0 0;
        font-size: 1rem;
        font-weight: var(--font-weight-medium);
    }
`;

interface ServerMetricsProps {
    cpu: number;
    memory: number;
    disk: number;
    network: {
        up: number;
        down: number;
    };
    uptime: string;
}

export const ServerMetrics: React.FC<ServerMetricsProps> = ({
    cpu,
    memory,
    disk,
    network,
    uptime
}) => {
    const [isAlertActive, setIsAlertActive] = useState(false);

    useEffect(() => {
        setIsAlertActive(cpu > 90 || memory > 90 || disk > 90);
    }, [cpu, memory, disk]);

    const formatBytes = (bytes: number): string => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
    };

    return (
        <MetricsContainer>
            <MetricCard alert={cpu > 90}>
                <MetricTitle>CPU Usage</MetricTitle>
                <MetricValue color={cpu > 90 ? 'var(--status-error)' : undefined}>
                    {cpu}%
                </MetricValue>
                <ProgressContainer>
                    <ProgressBar value={cpu} warning={cpu > 90} />
                </ProgressContainer>
            </MetricCard>

            <MetricCard alert={memory > 90}>
                <MetricTitle>Memory Usage</MetricTitle>
                <MetricValue color={memory > 90 ? 'var(--status-error)' : undefined}>
                    {memory}%
                </MetricValue>
                <ProgressContainer>
                    <ProgressBar value={memory} warning={memory > 90} />
                </ProgressContainer>
            </MetricCard>

            <MetricCard alert={disk > 90}>
                <MetricTitle>Disk Usage</MetricTitle>
                <MetricValue color={disk > 90 ? 'var(--status-error)' : undefined}>
                    {disk}%
                </MetricValue>
                <ProgressContainer>
                    <ProgressBar value={disk} warning={disk > 90} />
                </ProgressContainer>
            </MetricCard>

            <MetricCard>
                <MetricTitle>Network & Uptime</MetricTitle>
                <MetricGrid>
                    <SmallMetric>
                        <h4>Upload</h4>
                        <p>{formatBytes(network.up)}/s</p>
                    </SmallMetric>
                    <SmallMetric>
                        <h4>Download</h4>
                        <p>{formatBytes(network.down)}/s</p>
                    </SmallMetric>
                    <SmallMetric>
                        <h4>Uptime</h4>
                        <p>{uptime}</p>
                    </SmallMetric>
                    <SmallMetric>
                        <h4>Status</h4>
                        <p style={{ color: 'var(--status-success)' }}>Online</p>
                    </SmallMetric>
                </MetricGrid>
            </MetricCard>
        </MetricsContainer>
    );
};

export default ServerMetrics; 