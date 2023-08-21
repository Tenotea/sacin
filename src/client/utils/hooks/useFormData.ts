import { ChangeEvent, useReducer } from "react";

export default function useFormData<T>(initialState: T) {
  function reducer(
    state: T,
    payload: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    return {
      ...state,
      [payload.target.name]: payload.target.value,
    } as T;
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  return { formData: state, handleChange: dispatch };
}
