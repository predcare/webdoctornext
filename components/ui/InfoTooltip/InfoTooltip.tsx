import { IconButton, Tooltip } from '@mui/material';
import React from 'react';

interface IInfoTooltipProps {
    content: React.ReactNode;
    icon: React.ReactNode;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    maxWidth?: number;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    ariaLabel?: string;
    className?: string;
}

const InfoTooltip: React.FC<IInfoTooltipProps> = ({
    content,
    icon,
    placement = 'top',
    maxWidth = 260,
    onClick,
    ariaLabel,
    className,
}) => {
    return (
        <Tooltip
            title={content}
            placement={placement}
            arrow
            slotProps={{
                tooltip: {
                    sx: {
                        maxWidth,
                        fontSize: 13,
                        lineHeight: 1.5,
                        backgroundColor: '#FFFFFF',
                        color: '#1F2937',
                        border: '1px solid #E5E7EB',
                        boxShadow: '0px 8px 24px rgba(0,0,0,0.12)',
                        borderRadius: '8px',
                        padding: '10px 10px',
                        textAlign: 'left',
                        textJustify: 'inter-word',
                        letterSpacing: '0%',
                    },
                },
                arrow: {
                    sx: {
                        color: '#FFFFFF',
                        '&::before': {
                            border: '1px solid #E5E7EB',
                        },
                    },
                },
            }}
        >
            <IconButton
                disableRipple
                type="button"
                onClick={onClick}
                aria-label={ariaLabel}
                className={className}
                sx={{
                    padding: '5px 5px 6px',
                    '&:hover': {
                        backgroundColor: 'transparent',
                    },
                }}
            >
                {icon}
            </IconButton>
        </Tooltip>
    );
};

export default InfoTooltip;
