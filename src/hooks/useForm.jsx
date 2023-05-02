import { useState } from "react";

export const useForm = (inputValues) => {
  const [form, setForm] = useState(inputValues);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setForm({ ...form, [name]: value });
  };
  return { form, handleChange, setForm };
};
