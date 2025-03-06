import React, { FormEvent } from "react";
import { Link } from "react-router-dom";

import clsx from "clsx";
import styles from "../enter-hub/doorway.module.css";

import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { fetchRegistration } from "../../../services/reducers/auth-power-slice";
import {
  TUserRegistration,
  useAppDispatch,
} from "../../../utils/data-blueprint";
import { useForm } from "../../../hooks/use-form-handler";

export default function Registration() {
  const dispatch = useAppDispatch();

  const { form, onChange } = useForm<TUserRegistration>({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchRegistration(form));
  };

  return (
    <section className={styles.container}>
      <h1 className="text text_type_main-large">Регистрация</h1>
      <form className={clsx(styles.form, "mt-6")} onSubmit={handleSubmit}>
        <Input
          value={form.name}
          onChange={onChange}
          name="name"
          placeholder="Имя"
        />
        <EmailInput value={form.email} name="email" onChange={onChange} />
        <PasswordInput
          value={form.password}
          name="password"
          onChange={onChange}
        />
        <Button htmlType="submit" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <div className={clsx(styles.linkBlock, "mt-20")}>
        <p className="text text_type_main-default">Уже зарегистрированы?</p>
        <Link
          to="/login"
          className={clsx(styles.link, "text text_type_main-default")}
        >
          Войти
        </Link>
      </div>
    </section>
  );
}
