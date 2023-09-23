import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { TextInputProps } from "./TextInput.types";
import { ZodError } from "zod";

export function useTextInput(props: TextInputProps) {
  const [inputType, setInputType] = useState(props?.type ?? "text");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [parentRef] = useAutoAnimate();

  useEffect(() => {
    // if (validationError) {
    validateTextField();
    // }
  }, [props.value]);

  useEffect(() => {
    if (!props.validationTrigger) {
      setValidationError(null);
      return;
    }
    validateTextField();
  }, [props.validationTrigger]);

  function validateTextField() {
    try {
      if (props.validation) {
        setValidationError(null);
        props.validation.parse(props.value);
      }
    } catch (error: unknown) {
      setValidationError(
        (error as ZodError).issues[0]?.message || (error as ZodError).message
      );
    }
  }

  function handleIconClickAction() {
    if (props.type === "password") {
      setInputType(inputType === "password" ? "text" : "password");
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    props.onChange({
      field: props.name,
      value: e.target.value,
    });
  }

  return {
    inputType,
    handleIconClickAction,
    validationError,
    handleChange,
    parentRef,
  };
}
