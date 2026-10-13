import {
    CustomTabWrapper,
    TabCountCircle,
} from '@/styles/CustomStyled/CustomTabsWrapper';
import { Box, Tab } from '@mui/material';
import React, { SyntheticEvent } from 'react';

export interface ICustomTabItem {
    label: string;
    count?: number;
    icon?: React.ReactNode;
}

interface ICustomTabsGroupProps {
    tabs: ICustomTabItem[];
    value?: number;
    onChange?: (event: SyntheticEvent, value: number) => void;
    showCount?: boolean;
    className?: string;
    variant?: 'default' | 'segmented';
}

const CustomTabsGroup: React.FC<ICustomTabsGroupProps> = ({
    tabs,
    value,
    onChange,
    showCount = true,
    className = '',
    variant = 'default',
}) => {
    const isSegmented = variant === 'segmented';

    return (
        <CustomTabWrapper
            className={`${className} ${isSegmented ? 'segmented' : ''}`.trim()}
            variant={isSegmented ? 'fullWidth' : 'scrollable'}
            value={value}
            onChange={onChange}
            scrollButtons={isSegmented ? false : 'auto'}
            allowScrollButtonsMobile={!isSegmented}
        >
            {tabs.map((tab, index) => (
                <Tab
                    key={index}
                    disableRipple={isSegmented}
                    label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            {tab.icon}
                            {tab.label}
                            {showCount && tab.count !== undefined && (
                                <TabCountCircle>{tab.count}</TabCountCircle>
                            )}
                        </Box>
                    }
                />
            ))}
        </CustomTabWrapper>
    );
};

export default CustomTabsGroup;
