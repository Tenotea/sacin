import { InputHTMLAttributes, ReactNode } from "react";
import {
  InputChangePayload,
  PartialRequired,
} from "../../utils/types/types.util";
import { ZodSchema } from "zod";

export type TextInputProps = PartialRequired<
  Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "className" | "onChange" | "placeholder"
  > & {
    label: string;
    onChange: (payload: InputChangePayload) => void;
    validationTrigger?: string | null;
    validation?: ZodSchema;
    icon?: ReactNode;
  },
  "name" | "value"
>;
