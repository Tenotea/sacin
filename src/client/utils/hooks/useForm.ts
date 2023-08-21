import type { FormEvent } from "react";
import { useState } from "react";
import useFormData from "./useFormData";
import { ZodSchema, ZodType } from "zod";

export type ZRawShapeOf<T> = {
  [property in keyof T]: ZodType<T[property]>;
};

export interface UseFormParams<T> {
  initialFormData: T;
  schema?: ZodSchema;
  onSubmit?: (formData: T) => Promise<void>;
}

export function useForm<T>(params: UseFormParams<T>) {
  const form = useFormData(params.initialFormData);
  const [validationError, setValidationError] = useState<string | null>(null);

  async function handleSubmit(e?: FormEvent) {
    try {
      if (e != null) e.preventDefault();
      if (params.schema != null) {
        setValidationError(null);
        await params.schema.parse(form.formData);
      }
      if (params.onSubmit != null) {
        await params.onSubmit(form.formData);
      }
    } catch (error: unknown) {
      setValidationError((error as Error).message);
    }
  }

  return {
    ...form,
    handleSubmit,
    validationError,
    schema: params.schema,
  };
}
