'use client';

import CustomInput from '@/components/ui/CustomInput/CustomInput';
import {
  CustomAutocompletePaper,
  CustomAutocompleteWrapper,
} from '@/styles/CustomStyled/CustomAutocompleteWrapper';
import {
  Autocomplete,
  Box,
  CircularProgress,
  InputAdornment,
  type AutocompleteInputChangeReason,
} from '@mui/material';
import {
  createContext,
  memo,
  useContext,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
  type UIEvent,
} from 'react';

type CustomAutocompleteProps<T> = {
  options: T[];
  value?: T | null;
  defaultValue?: T | null;
  onChange?: (value: T | null) => void;
  getOptionLabel: (option: T) => string;
  isOptionEqualToValue?: (option: T, value: T) => boolean;
  renderOption?: (option: T) => ReactNode;
  startAdornment?: ReactNode;
  inputLabelName?: string;
  placeholder?: string;
  disabled?: boolean;
  disableClearable?: boolean;
  noOptionsText?: ReactNode;
  name?: string;
  className?: string;
  inputSize?: 'medium' | 'large';
  inputValue?: string;
  onInputChange?: (
    value: string,
    reason: AutocompleteInputChangeReason,
  ) => void;
  loading?: boolean;
  loadingText?: ReactNode;
  hasMore?: boolean;
  loadingMore?: boolean;
  onLoadMore?: () => void;
};

const LOAD_MORE_THRESHOLD = 48;

const keepServerOptions = <T,>(options: T[]) => options;

const LoadingMoreContext = createContext(false);

type InfiniteListboxProps = HTMLAttributes<HTMLUListElement> & {
  ref?: Ref<HTMLUListElement>;
  ownerState?: unknown;
};

function InfiniteListbox({ children, ref, ...rest }: InfiniteListboxProps) {
  const loadingMore = useContext(LoadingMoreContext);
  const props = { ...rest };
  delete props.ownerState;

  return (
    <ul ref={ref} {...props}>
      {children}
      {loadingMore ? (
        <li className="listbox-loading-more" aria-live="polite">
          <CircularProgress size={18} />
        </li>
      ) : null}
    </ul>
  );
}

function CustomAutocomplete<T>({
  options,
  value,
  defaultValue,
  onChange,
  getOptionLabel,
  isOptionEqualToValue,
  renderOption,
  startAdornment,
  inputLabelName,
  placeholder,
  disabled = false,
  disableClearable = false,
  noOptionsText = 'No options',
  name,
  className,
  inputSize = 'medium',
  inputValue,
  onInputChange,
  loading = false,
  loadingText = 'Loading...',
  hasMore = false,
  loadingMore = false,
  onLoadMore,
}: CustomAutocompleteProps<T>) {
  const handleListboxScroll = (event: UIEvent<HTMLElement>) => {
    if (!onLoadMore || !hasMore || loadingMore) return;
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - LOAD_MORE_THRESHOLD) {
      onLoadMore();
    }
  };

  return (
    <LoadingMoreContext.Provider value={loadingMore}>
      <CustomAutocompleteWrapper className={className} $inputSize={inputSize}>
        <Autocomplete<T, false, boolean, false>
          options={options}
          {...(value !== undefined ? { value } : {})}
          {...(value === undefined && defaultValue !== undefined
            ? { defaultValue }
            : {})}
          {...(inputValue !== undefined ? { inputValue } : {})}
          onChange={(_event, next) => {
            onChange?.(next);
          }}
          {...(onInputChange
            ? {
              onInputChange: (_event, next, reason) =>
                onInputChange(next, reason),
              filterOptions: keepServerOptions<T>,
            }
            : {})}
          getOptionLabel={getOptionLabel}
          isOptionEqualToValue={isOptionEqualToValue}
          disabled={disabled}
          disableClearable={disableClearable}
          noOptionsText={noOptionsText}
          loading={loading}
          loadingText={loadingText}
          slots={{
            paper: CustomAutocompletePaper,
            ...(onLoadMore ? { listbox: InfiniteListbox } : {}),
          }}
          slotProps={
            onLoadMore
              ? { listbox: { onScroll: handleListboxScroll } }
              : undefined
          }
          renderOption={
            renderOption
              ? ({ key, ...optionProps }, option) => (
                <Box component="li" key={key} {...optionProps}>
                  {renderOption(option)}
                </Box>
              )
              : undefined
          }
          renderInput={(params) => (
            <CustomInput
              {...params}
              name={name}
              inputSize={inputSize}
              inputLabelName={inputLabelName}
              placeholder={placeholder}
              slotProps={{
                ...params.slotProps,
                input: {
                  ...params.slotProps.input,
                  startAdornment: startAdornment ? (
                    <InputAdornment position="start">
                      {startAdornment}
                    </InputAdornment>
                  ) : (
                    params.slotProps.input.startAdornment
                  ),
                },
              }}
            />
          )}
        />
      </CustomAutocompleteWrapper>
    </LoadingMoreContext.Provider>
  );
}

export default memo(CustomAutocomplete) as typeof CustomAutocomplete;
