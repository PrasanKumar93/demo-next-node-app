'use client';

import MUISelect, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { SelectProps } from '../types';
import styles from './Select.module.scss';

/**
 * Select Component
 *
 * A wrapper around MUI Select with consistent interface.
 * Supports single and multiple selection modes.
 *
 * @example
 * ```tsx
 * <Select
 *   name="country"
 *   label="Country"
 *   value={country}
 *   onChange={(name, value) => setCountry(value)}
 *   options={[
 *     { value: 'us', label: 'United States' },
 *     { value: 'uk', label: 'United Kingdom' },
 *   ]}
 * />
 * ```
 */
const Select = ({
  name,
  label,
  value,
  onChange,
  options,
  error,
  helperText,
  placeholder,
  disabled = false,
  required = false,
  fullWidth = true,
  size = 'medium',
  className,
  multiple = false,
}: SelectProps) => {
  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    onChange(name, event.target.value);
  };

  const labelId = `${name}-label`;

  return (
    <div className={`${styles.selectWrapper} ${className || ''}`}>
      <FormControl fullWidth={fullWidth} error={!!error} disabled={disabled} required={required} size={size}>
        <InputLabel id={labelId}>{label}</InputLabel>
        <MUISelect
          labelId={labelId}
          name={name}
          value={value}
          onChange={handleChange}
          label={label}
          multiple={multiple}
          displayEmpty={!!placeholder}
        >
          {placeholder && !multiple && (
            <MenuItem value="" disabled>
              <em>{placeholder}</em>
            </MenuItem>
          )}
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </MenuItem>
          ))}
        </MUISelect>
        {(error || helperText) && <FormHelperText>{error || helperText}</FormHelperText>}
      </FormControl>
    </div>
  );
};

export default Select;

