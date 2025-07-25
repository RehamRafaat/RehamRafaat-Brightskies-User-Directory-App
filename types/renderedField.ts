import { Control, FieldValues, Path } from "react-hook-form";

export type RenderFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
};