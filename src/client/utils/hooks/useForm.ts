import type { FormEvent } from "react";
import { useState } from "react";
import useFormData from "./useFormData";
import { ZodError, ZodObject, ZodType } from "zod";

export type ZRawShapeOf<T> = {
  [property in keyof T]: ZodType<T[property]>;
};

export interface UseFormParams<T> {
  initialFormData: T;
  validationSchema?: ZodObject<ZRawShapeOf<T>>;
  onSubmit?: (formData: T) => Promise<void>;
}

export function useForm<T extends object>(params: UseFormParams<T>) {
  const form = useFormData(params.initialFormData);
  const [validationError, setValidationError] = useState<string | null>(null);

  async function handleSubmit(e?: FormEvent) {
    try {
      if (e != null) e.preventDefault();
      if (params.validationSchema != null) {
        setValidationError(null);
        await params.validationSchema.parseAsync(form.formData);
      }
      if (params.onSubmit != null) {
        await params.onSubmit(form.formData);
      }
    } catch (error: unknown) {
      setValidationError((error as ZodError).message);
    }
  }

  return {
    ...form,
    handleSubmit,
    validationError,
    validationSchema: params.validationSchema?.shape,
  };
}
