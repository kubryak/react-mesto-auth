import { useState } from "react";
import { useValidation } from "./useValidation";

export function useInput(initialValue, validations) {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);
  const valid = useValidation(value, validations)

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const onFocus = () => {
    setIsDirty(true)
  }

  return {
    value,
    onChange,
    onFocus,
    isDirty,
    ...valid
  }
}
