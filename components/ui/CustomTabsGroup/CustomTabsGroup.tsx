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
}

const CustomTabsGroup: React.FC<ICustomTabsGroupProps> = ({
    tabs,
    value,
    onChange,
    showCount = true,
    className = '',
}) => {
    return (
        <CustomTabWrapper
            className={className}
            variant="scrollable"
            value={value}
            onChange={onChange}
            scrollButtons="auto"
            allowScrollButtonsMobile
        >
            {tabs.map((tab, index) => (
                <Tab
                    key={index}
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
