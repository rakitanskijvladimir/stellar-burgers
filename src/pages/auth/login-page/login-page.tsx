import React, { FormEvent } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { fetchLogIn } from "../../../services/reducers/auth-power-slice";
import { TUserLogIn, useAppDispatch } from "../../../utils/data-blueprint";
import { useForm } from "../../../hooks/use-form-handler";

import clsx from "clsx";
import styles from "../login-page/login-page.module.css";

export default function Login() {
  const dispatch = useAppDispatch();

  const { form, onChange } = useForm<TUserLogIn>({ email: "", password: "" });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchLogIn(form));
  };

  return (
    <section className={styles.container}>
      <h1 className="text text_type_main-large">Вход</h1>
      <form className={clsx(styles.form, "mt-6")} onSubmit={handleSubmit}>
        <EmailInput value={form.email} name="email" onChange={onChange} />
        <PasswordInput
          value={form.password}
          name="password"
          onChange={onChange}
        />
        <Button htmlType="submit" size="medium">
          Войти
        </Button>
      </form>
      <div className={clsx(styles.linkBlock, "mt-20")}>
        <p className="text text_type_main-default">Вы — новый пользователь?</p>
        <Link
          to="/register"
          className={clsx(styles.link, "text text_type_main-default")}
        >
          Зарегистрироваться
        </Link>
      </div>
      <div className={clsx(styles.linkBlock, "mt-4")}>
        <p className="text text_type_main-default">Забыли пароль?</p>
        <Link
          to="/forgot-password"
          className={clsx(styles.link, "text text_type_main-default")}
        >
          Восстановить пароль
        </Link>
      </div>
    </section>
  );
}
