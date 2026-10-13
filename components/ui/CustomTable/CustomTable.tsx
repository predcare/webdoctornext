import { useDebounce } from '@/hooks/commons/useDebounce';
import { FilterList as FilterListIcon } from '@mui/icons-material';
import DownloadIcon from '@mui/icons-material/Download';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import {
    Box,
    Button,
    Chip,
    IconButton,
    Menu,
    MenuItem,
    Pagination,
    Skeleton,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { useState } from 'react';

interface IFilterOption {
    value: string;
    label: string;
}

interface IFilterConfig {
    id: string;
    label: string;
    options: IFilterOption[];
    defaultValue?: string;
}

interface ICustomTableProps {
    children?: React.ReactNode;
    headList: (string | React.ReactNode)[];
    page?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
    isLoading?: boolean;
    isEmpty?: boolean;
    emptyText?: string;
    emptyDescription?: string;
    skeletonRows?: number;
    className?: string;
    showHeader?: boolean;
    onRowClick?: (row: any, index: number) => void;
    // Search props
    showSearch?: boolean;
    searchPlaceholder?: string;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    searchDebounce?: number;
    // Filter props
    showFilters?: boolean;
    filters?: IFilterConfig[];
    activeFilters?: Record<string, string>;
    onFilterChange?: (filterId: string, value: string) => void;
    onClearFilters?: () => void;
    // View options
    showViewOptions?: boolean;
    onExport?: () => void;
    onRefresh?: () => void;
    totalResults?: number;
    // Style options
    stickyHeader?: boolean;
    zebraStriping?: boolean;
}

const CustomTable = ({
    children,
    headList,
    page = 1,
    totalPages = 1,
    onPageChange,
    isLoading = false,
    isEmpty = false,
    emptyText = 'No data available',
    emptyDescription,
    skeletonRows = 5,
    className,
    showHeader = true,
    // Search props
    showSearch = false,
    searchPlaceholder = 'Search...',
    searchValue = '',
    onSearchChange,
    searchDebounce = 500,
    // Filter props
    showFilters = false,
    filters = [],
    activeFilters = {},
    onFilterChange,
    onClearFilters,
    // View options
    showViewOptions = false,
    onExport,
    onRefresh,
    totalResults,
    // Style options
    stickyHeader = true,
    zebraStriping = true,
}: ICustomTableProps) => {
    const [localSearchValue, setLocalSearchValue] = useState(searchValue);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [activeFilterMenu, setActiveFilterMenu] = useState<string | null>(null);
    useDebounce(localSearchValue, searchDebounce, () => {
        if (onSearchChange) {
            onSearchChange(localSearchValue);
        }
    });

    const handleSearchChange = (value: string) => {
        setLocalSearchValue(value);
    };

    const handleFilterClick = (event: React.MouseEvent<HTMLElement>, filterId: string) => {
        setAnchorEl(event.currentTarget);
        setActiveFilterMenu(filterId);
    };

    const handleFilterSelect = (filterId: string, value: string) => {
        if (onFilterChange) {
            onFilterChange(filterId, value);
        }
        setAnchorEl(null);
        setActiveFilterMenu(null);
    };

    const handleClearFilters = () => {
        if (onClearFilters) {
            onClearFilters();
        }
    };

    const getActiveFilterCount = () => {
        return Object.values(activeFilters).filter(v => v && v !== '').length;
    };

    const renderSkeletonRows = () => {
        return Array.from({ length: skeletonRows }).map((_, index) => (
            <TableRow key={`skeleton-${index}`} className="skeletonRow">
                {headList.map((_, cellIndex) => (
                    <TableCell key={`skeleton-cell-${cellIndex}`}>
                        <Skeleton
                            variant="rounded"
                            width={cellIndex === 0 ? '70%' : '85%'}
                            height={20}
                            animation="wave"
                            sx={{ borderRadius: '6px' }}
                        />
                    </TableCell>
                ))}
            </TableRow>
        ));
    };

    const renderEmptyState = () => (
        <TableRow>
            <TableCell colSpan={headList.length} align="center" className="emptyCell">
                <Box className="emptyState">
                    <Box className="emptyIconWrap">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <rect width="40" height="40" rx="12" fill="currentColor" fillOpacity="0.06" />
                            <path
                                d="M13 27L27 13M20 10C14.477 10 10 14.477 10 20s4.477 10 10 10 10-4.477 10-10S25.523 10 20 10z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    </Box>
                    <Typography className="emptyText">{emptyText}</Typography>
                    {emptyDescription && (
                        <Typography className="emptyDescription">{emptyDescription}</Typography>
                    )}
                </Box>
            </TableCell>
        </TableRow>
    );

    const currentFilterMenu = filters.find(f => f.id === activeFilterMenu);
    const hasToolbar = showSearch || showFilters || showViewOptions;

    return (
        <CustomTableWrapper className={`${className ?? ''} ${zebraStriping ? 'zebra' : ''}`}>
            {hasToolbar && (
                <Box className="tableToolbar">
                    <Box className="toolbarLeft">
                        {showSearch && (
                            <Box className="searchWrap">
                                <SearchIcon className="searchIcon" fontSize="small" />
                                <TextField
                                    size="small"
                                    placeholder={searchPlaceholder}
                                    value={localSearchValue}
                                    onChange={e => handleSearchChange(e.target.value)}
                                    className="searchInput"
                                    variant="outlined"
                                    slotProps={{ htmlInput: { id: 'table-search-input' } }}
                                />
                            </Box>
                        )}

                        {showFilters && filters.length > 0 && (
                            <Box className="filtersWrapper">
                                <Box className="filterChips">
                                    {filters.map(filter => {
                                        const activeValue = activeFilters[filter.id];
                                        const selectedOption = filter.options.find(opt => opt.value === activeValue);
                                        return (
                                            <Chip
                                                key={filter.id}
                                                label={
                                                    <Box className="filterChipLabel">
                                                        <span className="filterChipBase">{filter.label}</span>
                                                        {selectedOption && (
                                                            <span className="selectedValue">: {selectedOption.label}</span>
                                                        )}
                                                    </Box>
                                                }
                                                onClick={e => handleFilterClick(e, filter.id)}
                                                onDelete={activeValue ? () => handleFilterSelect(filter.id, '') : undefined}
                                                className={`filterChip ${activeValue ? 'active' : ''}`}
                                                icon={<FilterListIcon fontSize="small" />}
                                            />
                                        );
                                    })}
                                </Box>
                                {getActiveFilterCount() > 0 && (
                                    <Button
                                        size="small"
                                        onClick={handleClearFilters}
                                        className="clearFiltersBtn"
                                        disableRipple
                                    >
                                        Clear all
                                    </Button>
                                )}
                            </Box>
                        )}
                    </Box>

                    <Box className="toolbarRight">
                        {totalResults !== undefined && (
                            <Typography className="resultsCount">
                                <span className="resultsNum">{totalResults.toLocaleString()}</span>
                                &nbsp;result{totalResults !== 1 ? 's' : ''}
                            </Typography>
                        )}

                        {showViewOptions && (
                            <Box className="viewOptions">
                                {onRefresh && (
                                    <Tooltip title="Refresh" placement="top" arrow>
                                        <IconButton
                                            size="small"
                                            onClick={onRefresh}
                                            className="viewOptionBtn"
                                            id="table-refresh-btn"
                                        >
                                            <RefreshIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                )}
                                {onExport && (
                                    <Tooltip title="Export" placement="top" arrow>
                                        <IconButton
                                            size="small"
                                            onClick={onExport}
                                            className="viewOptionBtn"
                                            id="table-export-btn"
                                        >
                                            <DownloadIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </Box>
                        )}
                    </Box>
                </Box>
            )}

            <TableContainer className={stickyHeader ? 'stickyContainer' : ''}>
                <Table stickyHeader={stickyHeader}>
                    {showHeader && (
                        <TableHead>
                            <TableRow>
                                {headList.map((head, index) => (
                                    <TableCell key={`head-${index}`} className="tableHeadCell">
                                        {head}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                    )}
                    <TableBody>
                        {isLoading ? renderSkeletonRows() : isEmpty ? renderEmptyState() : children}
                    </TableBody>
                </Table>
            </TableContainer>

            {totalPages > 1 && onPageChange && (
                <Box className="paginationWrapper">
                    <Typography className="paginationInfo">
                        Page <span className="paginationInfoBold">{page}</span> of{' '}
                        <span className="paginationInfoBold">{totalPages}</span>
                    </Typography>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(_, newPage) => onPageChange(newPage)}
                        color="primary"
                        shape="rounded"
                        size="medium"
                        showFirstButton
                        showLastButton
                    />
                </Box>
            )}

            {/* Filter Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                className="filterMenu"
                transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            >
                {currentFilterMenu?.options.map(option => (
                    <MenuItem
                        key={option.value}
                        onClick={() => handleFilterSelect(currentFilterMenu.id, option.value)}
                        selected={activeFilters[currentFilterMenu.id] === option.value}
                        className={activeFilters[currentFilterMenu.id] === option.value ? 'selectedItem' : ''}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Menu>
        </CustomTableWrapper>
    );
};

export default CustomTable;

export const CustomTableWrapper = styled(Box)`
  border-radius: 16px;
  background: ${({ theme }) => theme.palette.customColors.surfaceContainerLow};
  border: 1px solid ${({ theme }) => theme.palette.customColors.glassBorder};
  box-shadow: 0 4px 24px -4px rgba(0, 0, 0, 0.08),
              0 1px 4px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  transition: box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    box-shadow: 0 8px 32px -8px rgba(0, 0, 0, 0.12),
                0 2px 8px rgba(0, 0, 0, 0.06);
  }

  /* ─── Toolbar ─────────────────────────────────────────── */
  .tableToolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 18px;
    border-bottom: 1px solid ${({ theme }) => theme.palette.customColors.glassBorder};
    background: ${({ theme }) => theme.palette.customColors.surfaceContainerLow};
    flex-wrap: wrap;
    gap: 12px;
  }

  .toolbarLeft {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    flex: 1;
  }

  .toolbarRight {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  /* ─── Search ───────────────────────────────────────────── */
  .searchWrap {
    position: relative;
    display: flex;
    align-items: center;
    min-width: 240px;

    .searchIcon {
      position: absolute;
      left: 12px;
      color: ${({ theme }) => theme.palette.text.secondary};
      pointer-events: none;
      z-index: 1;
      transition: color 0.2s ease;
    }

    &:focus-within .searchIcon {
      color: ${({ theme }) => theme.palette.customColors.primaryCoral};
    }
  }

  .searchInput {
    width: 100%;

    .MuiOutlinedInput-root {
      border-radius: 9999px;
      font-size: 13px;
      font-family: var(--font-inter), Inter, sans-serif;
      background: ${({ theme }) => theme.palette.customColors.inputBg};
      padding-left: 36px;
      height: 38px;

      fieldset {
        border-color: ${({ theme }) => theme.palette.customColors.inputBorder};
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }

      &:hover fieldset {
        border-color: ${({ theme }) => theme.palette.customColors.primaryCoral};
      }

      &.Mui-focused fieldset {
        border-color: ${({ theme }) => theme.palette.customColors.primaryCoral};
        border-width: 1px;
        box-shadow: 0 0 0 3px ${({ theme }) => theme.palette.customColors.primaryGlow};
      }

      input {
        font-size: 13px;
        color: ${({ theme }) => theme.palette.text.primary};
        padding: 0;

        &::placeholder {
          color: ${({ theme }) => theme.palette.text.secondary};
          opacity: 1;
        }
      }
    }
  }

  /* ─── Filter Chips ─────────────────────────────────────── */
  .filtersWrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .filterChips {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .filterChip {
    height: 30px;
    border-radius: 9999px;
    font-size: 12px;
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 500;
    background: ${({ theme }) => theme.palette.customColors.surfaceContainerHigh};
    color: ${({ theme }) => theme.palette.text.secondary};
    border: 1px solid ${({ theme }) => theme.palette.customColors.glassBorder};
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    cursor: pointer;

    .MuiChip-icon {
      color: ${({ theme }) => theme.palette.text.secondary};
      font-size: 14px;
      transition: color 0.2s ease;
    }

    &:hover {
      border-color: ${({ theme }) => theme.palette.customColors.primaryCoral}66;
      background: ${({ theme }) => theme.palette.customColors.surfaceHover};
      color: ${({ theme }) => theme.palette.text.primary};
    }

    &.active {
      background: ${({ theme }) => theme.palette.customColors.primaryGlow};
      border-color: ${({ theme }) => theme.palette.customColors.primaryCoral}55;
      color: ${({ theme }) => theme.palette.customColors.primaryCoral};

      .MuiChip-icon {
        color: ${({ theme }) => theme.palette.customColors.primaryCoral};
      }

      .selectedValue {
        font-weight: 700;
      }
    }
  }

  .filterChipLabel {
    display: flex;
    align-items: center;
    gap: 2px;

    .filterChipBase {
      opacity: 0.75;
    }

    .selectedValue {
      color: ${({ theme }) => theme.palette.customColors.primaryCoral};
    }
  }

  .clearFiltersBtn {
    font-size: 12px;
    font-family: var(--font-inter), Inter, sans-serif;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.text.secondary};
    text-transform: none;
    padding: 4px 10px;
    border-radius: 9999px;
    border: 1px solid transparent;
    min-width: unset;
    transition: all 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.palette.error.main};
      background: ${({ theme }) => theme.palette.mode === 'light'
        ? 'rgba(186, 26, 26, 0.06)'
        : 'rgba(255, 180, 171, 0.08)'};
      border-color: ${({ theme }) => theme.palette.error.main}44;
    }
  }

  /* ─── Results Count ────────────────────────────────────── */
  .resultsCount {
    font-size: 12px;
    font-family: var(--font-inter), Inter, sans-serif;
    color: ${({ theme }) => theme.palette.text.secondary};
    white-space: nowrap;

    .resultsNum {
      font-weight: 700;
      color: ${({ theme }) => theme.palette.text.primary};
    }
  }

  /* ─── View Option Buttons ──────────────────────────────── */
  .viewOptions {
    display: flex;
    gap: 4px;
  }

  .viewOptionBtn {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    color: ${({ theme }) => theme.palette.text.secondary};
    background: ${({ theme }) => theme.palette.customColors.surfaceContainerHigh};
    border: 1px solid ${({ theme }) => theme.palette.customColors.glassBorder};
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

    &:hover {
      background: ${({ theme }) => theme.palette.customColors.primaryGlow};
      border-color: ${({ theme }) => theme.palette.customColors.primaryCoral}44;
      color: ${({ theme }) => theme.palette.customColors.primaryCoral};
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0) scale(0.95);
    }
  }

  /* ─── Table Container ──────────────────────────────────── */
  .stickyContainer {
    max-height: 600px;
    overflow-y: auto;
  }

  .MuiTableContainer-root {
    overflow-x: auto;
  }

  /* ─── Table Head ───────────────────────────────────────── */
  .MuiTableHead-root .MuiTableCell-root {
    font-family: var(--font-inter), Inter, sans-serif;
    font-size: 10.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.palette.text.secondary};
    background: ${({ theme }) => theme.palette.customColors.surfaceContainerHigh};
    padding: 13px 16px;
    white-space: nowrap;
    border-bottom: 1px solid ${({ theme }) => theme.palette.customColors.glassBorder};
    position: sticky;
    top: 0;
    z-index: 2;

    /* Subtle left accent line for first column */
    &:first-of-type {
      padding-left: 20px;
    }
  }

  /* ─── Table Body ───────────────────────────────────────── */
  .MuiTableBody-root .MuiTableCell-root {
    font-family: var(--font-inter), Inter, sans-serif;
    padding: 13px 16px;
    font-size: 13px;
    color: ${({ theme }) => theme.palette.text.primary};
    border-bottom: 1px solid ${({ theme }) => theme.palette.customColors.glassBorder};

    &:first-of-type {
      padding-left: 20px;
    }
  }

  /* ─── Table Row ────────────────────────────────────────── */
  .MuiTableBody-root .MuiTableRow-root {
    background: transparent;
    transition: background 0.2s cubic-bezier(0.16, 1, 0.3, 1);

    &:last-child .MuiTableCell-root {
      border-bottom: none;
    }

    &:hover {
      background: ${({ theme }) => theme.palette.action.hover};

      .MuiTableCell-root {
        border-bottom-color: ${({ theme }) => theme.palette.customColors.glassBorder};
      }
    }
  }

  /* Zebra striping */
  &.zebra .MuiTableBody-root .MuiTableRow-root:not(.skeletonRow):nth-of-type(even) {
    background: ${({ theme }) => theme.palette.mode === 'light'
        ? 'rgba(0,0,0,0.018)'
        : 'rgba(255,255,255,0.018)'};

    &:hover {
      background: ${({ theme }) => theme.palette.action.hover};
    }
  }

  /* ─── Skeleton Row ─────────────────────────────────────── */
  .skeletonRow .MuiTableCell-root {
    padding: 16px;
  }

  /* ─── Empty State ──────────────────────────────────────── */
  .emptyCell {
    padding: 64px 16px !important;
    border-bottom: none !important;
  }

  .emptyState {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

    .emptyIconWrap {
      color: ${({ theme }) => theme.palette.text.secondary};
      margin-bottom: 4px;
    }

    .emptyText {
      font-family: var(--font-sora), Sora, sans-serif;
      font-size: 15px;
      font-weight: 600;
      color: ${({ theme }) => theme.palette.text.primary};
    }

    .emptyDescription {
      font-family: var(--font-inter), Inter, sans-serif;
      font-size: 13px;
      color: ${({ theme }) => theme.palette.text.secondary};
      max-width: 320px;
      text-align: center;
      line-height: 1.6;
    }
  }

  /* ─── Pagination ───────────────────────────────────────── */
  .paginationWrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 20px;
    border-top: 1px solid ${({ theme }) => theme.palette.customColors.glassBorder};
    background: ${({ theme }) => theme.palette.customColors.surfaceContainerLow};

    .paginationInfo {
      font-family: var(--font-inter), Inter, sans-serif;
      font-size: 12px;
      color: ${({ theme }) => theme.palette.text.secondary};

      .paginationInfoBold {
        font-weight: 700;
        color: ${({ theme }) => theme.palette.text.primary};
      }
    }

    .MuiPagination-ul {
      gap: 2px;
    }

    .MuiPaginationItem-root {
      font-family: var(--font-inter), Inter, sans-serif;
      font-size: 12px;
      font-weight: 500;
      border-radius: 8px;
      min-width: 30px;
      height: 30px;
      color: ${({ theme }) => theme.palette.text.secondary};
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

      &:hover {
        background: ${({ theme }) => theme.palette.customColors.primaryGlow};
        color: ${({ theme }) => theme.palette.customColors.primaryCoral};
        transform: translateY(-1px);
      }

      &.Mui-selected {
        background: ${({ theme }) => theme.palette.customColors.primaryCoral};
        color: #ffffff;
        font-weight: 700;
        box-shadow: 0 2px 8px ${({ theme }) => theme.palette.customColors.primaryGlow};

        &:hover {
          background: ${({ theme }) => theme.palette.customColors.primaryHover};
          transform: translateY(-1px);
        }
      }

      &.MuiPaginationItem-firstLast,
      &.MuiPaginationItem-previousNext {
        color: ${({ theme }) => theme.palette.text.secondary};

        &:hover {
          background: ${({ theme }) => theme.palette.customColors.surfaceHover};
          color: ${({ theme }) => theme.palette.text.primary};
          transform: translateY(-1px);
        }
      }
    }
  }

  /* ─── Filter Menu ──────────────────────────────────────── */
  .MuiMenuItem-root {
    font-family: var(--font-inter), Inter, sans-serif;
    font-size: 13px;
    font-weight: 500;
    padding: 9px 16px;
    min-width: 160px;
    border-radius: 6px;
    margin: 0 4px;
    transition: all 0.18s ease;
    color: ${({ theme }) => theme.palette.text.primary};

    &:hover {
      background: ${({ theme }) => theme.palette.customColors.surfaceHover};
    }

    &.Mui-selected,
    &.selectedItem {
      background: ${({ theme }) => theme.palette.customColors.primaryGlow};
      color: ${({ theme }) => theme.palette.customColors.primaryCoral};
      font-weight: 600;

      &:hover {
        background: ${({ theme }) => theme.palette.customColors.primaryGlow};
      }
    }
  }

  /* ─── Responsive ───────────────────────────────────────── */
  @media (max-width: 768px) {
    border-radius: 12px;

    .tableToolbar {
      flex-direction: column;
      align-items: stretch;
      padding: 12px 14px;
      gap: 10px;
    }

    .toolbarLeft {
      flex-direction: column;
      align-items: stretch;
    }

    .toolbarRight {
      justify-content: space-between;
    }

    .searchWrap {
      min-width: unset;
      width: 100%;
    }

    .searchInput {
      width: 100%;
    }

    .filtersWrapper {
      flex-direction: column;
      align-items: stretch;
    }

    .paginationWrapper {
      flex-direction: column;
      align-items: center;
      gap: 10px;
      padding: 12px 16px;

      .paginationInfo {
        display: none;
      }
    }
  }
`;