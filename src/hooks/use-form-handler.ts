import { ChangeEvent, useState, useCallback } from "react";

type TUseForm<TForm> = {
  form: TForm;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
  setFieldValue: (name: keyof TForm, value: string) => void;
};

export function useForm<TForm>(initialValues: TForm): TUseForm<TForm> {
  const [form, setForm] = useState<TForm>(initialValues);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }, []);

  const reset = useCallback((): void => {
    setForm(initialValues);
  }, [initialValues]);

  const setFieldValue = useCallback((name: keyof TForm, value: string): void => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }, []);

  return { form, onChange, reset, setFieldValue };
}
