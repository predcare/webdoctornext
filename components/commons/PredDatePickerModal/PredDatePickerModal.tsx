
'use client';

import React, {
    memo,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import { Box, Button, Dialog, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';


export interface PredDatePickerModalProps {
    visible: boolean;
    value?: Date;
    title?: string;
    onConfirm: (selectedDate: Date) => void;
    onCancel: () => void;
    onChange?: (date: Date) => void;
    minYear?: number;
    maxYear?: number;
    confirmText?: string;
    cancelText?: string;
    closeOnTouchOutside?: boolean;
}

const ITEM_HEIGHT = 44;

const MONTH_NAMES = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December',
];

interface WheelColumnProps<T> {
    data: T[];
    selectedIndex: number;
    onSelect: (index: number) => void;
    renderLabel: (item: T) => string;
    ariaLabel: string;
}

function WheelColumn<T>({
    data,
    selectedIndex,
    onSelect,
    renderLabel,
    ariaLabel,
}: WheelColumnProps<T>) {
    const listRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const list = listRef.current;

        if (list && selectedIndex >= 0 && selectedIndex < data.length) {
            list.scrollTo({
                top: selectedIndex * ITEM_HEIGHT,
                behavior: 'auto',
            });
        }
    }, [selectedIndex, data.length]);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    const handleScroll = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            const list = listRef.current;
            if (!list || data.length === 0) return;

            const index = Math.max(
                0,
                Math.min(
                    Math.round(list.scrollTop / ITEM_HEIGHT),
                    data.length - 1,
                ),
            );

            onSelect(index);
        }, 100);
    };

    const handleItemClick = (index: number) => {
        listRef.current?.scrollTo({
            top: index * ITEM_HEIGHT,
            behavior: 'smooth',
        });

        onSelect(index);
    };

    return (
        <Box
            ref={listRef}
            className="wheel-column"
            onScroll={handleScroll}
            role="listbox"
            aria-label={ariaLabel}
        >
            {data.map((item, index) => (
                <Box
                    key={`${ariaLabel}-${String(item)}`}
                    id={`${ariaLabel}-${index}`}
                    className="wheel-item"
                    role="option"
                    aria-selected={index === selectedIndex}
                    onClick={() => handleItemClick(index)}
                >
                    <Typography
                        className={`wheel-text ${index === selectedIndex ? 'selected' : ''
                            }`}
                    >
                        {renderLabel(item)}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
}

const getValidDate = (value?: Date): Date => {
    if (value && !Number.isNaN(value.getTime())) {
        return new Date(value.getTime());
    }

    return new Date();
};

const PredDatePickerModal: React.FC<PredDatePickerModalProps> = memo(
    ({
        visible,
        value,
        title = 'Select date',
        onConfirm,
        onCancel,
        onChange,
        minYear = 1900,
        maxYear = new Date().getFullYear() + 10,
        confirmText = 'Done',
        cancelText = 'Cancel',
        closeOnTouchOutside = true,
    }) => {
        const initialDate = useMemo(() => getValidDate(value), [value]);

        const [selectedYear, setSelectedYear] = useState(
            initialDate.getFullYear(),
        );
        const [selectedMonth, setSelectedMonth] = useState(
            initialDate.getMonth(),
        );
        const [selectedDay, setSelectedDay] = useState(
            initialDate.getDate(),
        );

        useEffect(() => {
            if (!visible) return;

            const date = getValidDate(value);

            setSelectedYear(date.getFullYear());
            setSelectedMonth(date.getMonth());
            setSelectedDay(date.getDate());
        }, [visible, value]);

        const years = useMemo(() => {
            const min = Math.ceil(minYear);
            const max = Math.floor(maxYear);

            if (max < min) return [];

            return Array.from(
                { length: max - min + 1 },
                (_, index) => min + index,
            );
        }, [minYear, maxYear]);

        const daysInMonth = useMemo(
            () => new Date(selectedYear, selectedMonth + 1, 0).getDate(),
            [selectedYear, selectedMonth],
        );

        const days = useMemo(
            () => Array.from(
                { length: daysInMonth },
                (_, index) => index + 1,
            ),
            [daysInMonth],
        );

        useEffect(() => {
            if (selectedDay > daysInMonth) {
                setSelectedDay(daysInMonth);
            }
        }, [selectedDay, daysInMonth]);

        const emitDateChange = useCallback(
            (day: number, month: number, year: number) => {
                const validDay = Math.min(
                    day,
                    new Date(year, month + 1, 0).getDate(),
                );

                onChange?.(new Date(year, month, validDay));
            },
            [onChange],
        );

        const handleDaySelect = (index: number) => {
            const day = days[index];
            if (day === undefined) return;

            setSelectedDay(day);
            emitDateChange(day, selectedMonth, selectedYear);
        };

        const handleMonthSelect = (index: number) => {
            if (index < 0 || index > 11) return;

            const day = Math.min(
                selectedDay,
                new Date(selectedYear, index + 1, 0).getDate(),
            );

            setSelectedMonth(index);
            setSelectedDay(day);
            emitDateChange(day, index, selectedYear);
        };

        const handleYearSelect = (index: number) => {
            const year = years[index];
            if (year === undefined) return;

            const day = Math.min(
                selectedDay,
                new Date(year, selectedMonth + 1, 0).getDate(),
            );

            setSelectedYear(year);
            setSelectedDay(day);
            emitDateChange(day, selectedMonth, year);
        };

        const handleConfirm = () => {
            if (years.length === 0) return;

            const day = Math.min(
                selectedDay,
                new Date(selectedYear, selectedMonth + 1, 0).getDate(),
            );

            onConfirm(new Date(selectedYear, selectedMonth, day));
        };

        if (years.length === 0) return null;

        const yearIndex = Math.max(0, years.indexOf(selectedYear));

        return (
            <Dialog
                open={visible}
                onClose={(_, reason) => {
                    if (reason === 'backdropClick' && !closeOnTouchOutside) {
                        return;
                    }

                    onCancel();
                }}
                maxWidth={false}
                aria-labelledby="pred-date-picker-title"
                slotProps={{
                    backdrop: {
                        sx: {
                            backgroundColor: 'rgba(15, 23, 42, 0.45)',
                        },
                    },
                    paper: {
                        sx: {
                            width: '100%',
                            maxWidth: 380,
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                            overflow: 'hidden',
                            margin: 2,
                        },
                    },
                }}
            >
                <PredDatePickerWrapper>
                    <Typography
                        id="pred-date-picker-title"
                        className="picker-title"
                    >
                        {title}
                    </Typography>

                    <Box className="column-header-row">
                        <Typography className="column-header">Day</Typography>
                        <Typography className="column-header">Month</Typography>
                        <Typography className="column-header">Year</Typography>
                    </Box>

                    <Box className="picker-wrapper">
                        <Box className="selection-highlight" />

                        <Box className="wheels-row">
                            <WheelColumn
                                data={days}
                                selectedIndex={Math.max(0, days.indexOf(selectedDay))}
                                onSelect={handleDaySelect}
                                renderLabel={String}
                                ariaLabel="Day"
                            />

                            <WheelColumn
                                data={MONTH_NAMES}
                                selectedIndex={selectedMonth}
                                onSelect={handleMonthSelect}
                                renderLabel={String}
                                ariaLabel="Month"
                            />

                            <WheelColumn
                                data={years}
                                selectedIndex={yearIndex}
                                onSelect={handleYearSelect}
                                renderLabel={String}
                                ariaLabel="Year"
                            />
                        </Box>
                    </Box>

                    <Box className="footer-row">
                        <Button className="action-button cancel-button" onClick={onCancel}>
                            {cancelText}
                        </Button>
                        <Button className="action-button confirm-button" onClick={handleConfirm}>
                            {confirmText}
                        </Button>
                    </Box>
                </PredDatePickerWrapper>
            </Dialog>
        );
    },
);

PredDatePickerModal.displayName = 'PredDatePickerModal';

export default PredDatePickerModal;



const PredDatePickerWrapper = styled(Box)(({ theme }) => ({
    width: '90%',
    maxWidth: 340,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 24,
    padding: '22px 20px 18px',
    boxShadow: '0 8px 32px rgba(15, 23, 42, 0.18)',

    '& .picker-title': {
        fontSize: 18,
        fontWeight: 700,
        color: theme.palette.text.primary,
        textAlign: 'center',
        marginBottom: 16,
    },

    '& .column-header-row': {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 12px',
        marginBottom: 6,
    },

    '& .column-header': {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 600,
        color: theme.palette.text.secondary,
    },

    '& .picker-wrapper': {
        height: 132,
        position: 'relative',
        margin: '4px 0 0',
        overflow: 'hidden',
    },

    '& .selection-highlight': {
        position: 'absolute',
        zIndex: 0,
        left: 4,
        right: 4,
        top: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: theme.palette.primary.light,
        opacity: 0.2,
        pointerEvents: 'none',
    },

    '& .wheels-row': {
        display: 'flex',
        height: 132,
        position: 'relative',
        zIndex: 1,
    },

    '& .wheel-column': {
        flex: 1,
        minWidth: 0,
        height: 132,
        maxHeight: 132,
        boxSizing: 'border-box',
        paddingTop: 44,
        paddingBottom: 44,
        overflowY: 'auto',
        overscrollBehavior: 'contain',
        scrollSnapType: 'y mandatory',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },

    '& .wheel-item': {
        height: 44,
        minHeight: 44,
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 4px',
        cursor: 'pointer',
        scrollSnapAlign: 'center',
        userSelect: 'none',
    },

    '& .wheel-text': {
        width: '100%',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 400,
        lineHeight: 1.4,
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',

        '&.selected': {
            fontWeight: 700,
            color: theme.palette.primary.main,
        },
    },

    '& .footer-row': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
        marginTop: 12,
        paddingTop: 8,
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        zIndex: 2,
    },

    '& .action-button': {
        minWidth: 0,
        padding: '8px 12px',
        borderRadius: 8,
        background: 'transparent',
        fontSize: 16,
        fontWeight: 600,
        textTransform: 'none',
        lineHeight: '24px',

        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
    },

    '& .cancel-button.MuiButton-root': {
        color: theme.palette.text.secondary,
    },

    '& .confirm-button.MuiButton-root': {
        color: theme.palette.primary.main,
        fontWeight: 700,
    },
}));
