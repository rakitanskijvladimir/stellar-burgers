import React, { FormEvent } from "react";

import styles from "../tweak-profile/adjust-settings.module.css";

import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  TUserUpdate,
  useAppDispatch,
  useAppSelector,
} from "../../../utils/data-blueprint";

import { fetchUpdateUser } from "../../../services/reducers/auth-power-slice";
import { userSelector } from "../../../services/operations/deep-selector-utils";
import { useForm } from "../../../hooks/use-form-handler";

export default function ProfileEdit() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);

  const { form, onChange, reset } = useForm<TUserUpdate>({
    name: user?.name ?? "",
    email: user?.email ?? "",
    password: "",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchUpdateUser(form));
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <Input
        value={form.name || ""}
        onChange={onChange}
        name="name"
        placeholder="Имя"
        icon="EditIcon"
      />
      <EmailInput
        value={form.email || ""}
        name="email"
        onChange={onChange}
        placeholder="Логин"
        isIcon={true}
      />
      <PasswordInput
        value={form.password || ""}
        name="password"
        onChange={onChange}
        placeholder="Пароль"
        icon="EditIcon"
      />
      <div>
        <Button htmlType="button" onClick={reset} type="secondary">
          Отмена
        </Button>
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
      </div>
    </form>
  );
}
