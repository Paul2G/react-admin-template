import type { Control, FieldValues, Path } from 'react-hook-form';

export type FormField<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
};

export type FormOption = {
  label: string;
  value: string;
  description?: string;
};
