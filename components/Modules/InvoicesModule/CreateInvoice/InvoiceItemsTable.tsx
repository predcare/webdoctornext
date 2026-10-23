'use client';

import CustomInput from '@/components/ui/CustomInput/CustomInput';
import { _formatShortNum } from '@/lib/commons/common.utils';
import { TCreateInvoiceSchemaType } from '@/lib/schemas/createInvoice.schema';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { memo } from 'react';
import {
  Control,
  Controller,
  useFieldArray,
  UseFormWatch,
} from 'react-hook-form';

interface InvoiceItemsTableProps {
  control: Control<TCreateInvoiceSchemaType>;
  watch: UseFormWatch<TCreateInvoiceSchemaType>;
}

function InvoiceItemsTable({ control, watch }: InvoiceItemsTableProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const watchedItems = watch('items') || [];

  const handleAddItem = () => {
    append({
      name: '',
      hsn_sac: '',
      qty: '1',
      price: '0.00',
      discount: '0',
      discount_type: '%',
      tax_percent: '0',
    });
  };

  const calculateRowValues = (index: number) => {
    const item = watchedItems[index] || {};
    const qty = parseFloat(item.qty || '0') || 0;
    const price = parseFloat(item.price || '0') || 0;
    const discount = parseFloat(item.discount || '0') || 0;
    const discountType = item.discount_type || '%';

    const baseAmount = qty * price;
    let discountAmount = 0;
    if (discountType === '%') {
      discountAmount = (baseAmount * discount) / 100;
    } else {
      discountAmount = discount;
    }
    if (discountAmount > baseAmount) discountAmount = baseAmount;

    const rowTotal = Math.max(0, baseAmount - discountAmount);
    return {
      discountAmount,
      rowTotal,
    };
  };

  return (
    <Box className="invoice-card">
      <Box className="card-header-row">
        <Typography component="h3" className="card-title">
          Items
        </Typography>
        <Button
          type="button"
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddItem}
          sx={{
            borderColor: '#0f766e',
            color: '#0f766e',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '13px',
            borderRadius: '6px',
            '&:hover': {
              borderColor: '#0f766e',
              background: 'rgba(15, 118, 110, 0.05)',
            },
          }}
        >
          Add Item
        </Button>
      </Box>

      <Box className="items-table-wrapper">
        <table>
          <thead>
            <tr>
              <th style={{ width: '40%' }}>Item / Description & HSN/SAC</th>
              <th style={{ width: '10%' }}>Qty</th>
              <th style={{ width: '15%' }}>Price</th>
              <th style={{ width: '15%' }}>Discount</th>
              <th style={{ width: '10%' }}>Disc. Amt</th>
              <th style={{ width: '10%' }}>Total</th>
              <th style={{ width: '5%' }}></th>
            </tr>
          </thead>
          <tbody>
            {fields.map((fieldItem, index) => {
              const { discountAmount, rowTotal } = calculateRowValues(index);
              return (
                <tr key={fieldItem.id}>
                  <td>
                    <Box className="item-desc-cell">
                      <Controller
                        name={`items.${index}.name`}
                        control={control}
                        render={({ field, fieldState }) => (
                          <CustomInput
                            {...field}
                            placeholder="Item name / description"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            size="small"
                            fullWidth
                          />
                        )}
                      />
                      <Controller
                        name={`items.${index}.hsn_sac`}
                        control={control}
                        render={({ field }) => (
                          <CustomInput
                            {...field}
                            placeholder="HSN / SAC"
                            size="small"
                            fullWidth
                          />
                        )}
                      />
                    </Box>
                  </td>

                  <td>
                    <Controller
                      name={`items.${index}.qty`}
                      control={control}
                      render={({ field, fieldState }) => (
                        <CustomInput
                          {...field}
                          type="number"
                          size="small"
                          error={!!fieldState.error}
                          slotProps={{
                            htmlInput: { min: 1, step: '1' },
                          }}
                        />
                      )}
                    />
                  </td>

                  <td>
                    <Controller
                      name={`items.${index}.price`}
                      control={control}
                      render={({ field, fieldState }) => (
                        <CustomInput
                          {...field}
                          type="number"
                          size="small"
                          error={!!fieldState.error}
                          slotProps={{
                            htmlInput: { min: 0, step: 'any' },
                          }}
                        />
                      )}
                    />
                  </td>

                  <td>
                    <Box className="discount-cell">
                      <Controller
                        name={`items.${index}.discount`}
                        control={control}
                        render={({ field }) => (
                          <CustomInput
                            {...field}
                            type="number"
                            size="small"
                            slotProps={{
                              htmlInput: { min: 0, step: 'any' },
                            }}
                          />
                        )}
                      />
                      <Controller
                        name={`items.${index}.discount_type`}
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            size="small"
                            sx={{ minWidth: 60 }}
                          >
                            <MenuItem value="%">%</MenuItem>
                            <MenuItem value="flat">₹</MenuItem>
                          </Select>
                        )}
                      />
                    </Box>
                  </td>

                  <td>
                    <Typography className="calc-val">
                      ₹{_formatShortNum(discountAmount)}
                    </Typography>
                  </td>

                  <td>
                    <Typography className="calc-val">
                      ₹{_formatShortNum(rowTotal)}
                    </Typography>
                  </td>

                  <td>
                    {fields.length > 1 ? (
                      <IconButton
                        size="small"
                        onClick={() => remove(index)}
                        sx={{ color: '#ef4444', mt: 0.5 }}
                        title="Remove Item"
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Box>
    </Box>
  );
}

export default memo(InvoiceItemsTable);
