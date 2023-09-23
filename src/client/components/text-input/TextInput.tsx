import { useTextInput } from "./useTextInput";
import { TextInputProps } from "./TextInput.types";
import { Icon } from "@iconify/react";

export function TextInput(props: TextInputProps): JSX.Element {
  const {
    validationTrigger,
    validation,
    label,
    type,
    onChange,
    icon,
    ...inputProps
  } = props;

  const {
    inputType,
    handleIconClickAction,
    validationError,
    handleChange,
    parentRef,
  } = useTextInput(props);

  return (
    <div ref={parentRef}>
      <div className={"relative"}>
        <input
          {...inputProps}
          className={`${
            validationError == null ? "border-gray-50" : "border-red-300"
          } block h-[48px] w-full text-ellipsis rounded border bg-[#FAFAFA] pl-4 pr-[30px] text-sm outline-none focus:border-green-400 focus:ring-0 disabled:cursor-not-allowed disabled:bg-[#e7e7e7] disabled:opacity-70`}
          type={inputType}
          onChange={handleChange}
          placeholder={props.label}
        />
        {(props.icon || props.type === "password") && (
          <button
            className={
              "absolute bottom-0 right-[1px] top-0 my-auto flex h-[35px] w-[35px] items-center justify-center rounded-r px-1.5 text-xs text-gray-500"
            }
            type={"button"}
            onClick={handleIconClickAction}
          >
            {props.icon ?? (
              <Icon
                width={20}
                icon={
                  inputType !== "password"
                    ? "solar:eye-broken"
                    : "iconamoon:eye-off-thin"
                }
              />
            )}
          </button>
        )}
      </div>
      {validationError != null && (
        <p className={"mt-0 leading-none text-red-500"}>
          <span className={"text-[11px] leading-none"}>{validationError}</span>
        </p>
      )}
    </div>
  );
}
