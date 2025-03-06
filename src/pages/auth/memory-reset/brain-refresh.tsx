import React, { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import clsx from "clsx";
import styles from "../memory-reset/brain-refresh.module.css";

import { fetchForgotPass } from "../../../services/reducers/auth-power-slice";
import { TForgotPass, useAppDispatch } from "../../../utils/data-blueprint";
import { useForm } from "../../../hooks/use-form-handler";

export default function ForgotPassword() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { form, onChange } = useForm<TForgotPass>({
    email: "",
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchForgotPass(form));
    navigate("/reset-password", {
      state: {
        from: "/forgot-password",
      },
    });
  };

  return (
    <section className={styles.container}>
      <h1 className="text text_type_main-large">Восстановление пароля</h1>
      <form className={clsx(styles.form, "mt-6")} onSubmit={onSubmit}>
        <EmailInput
          value={form.email}
          name="email"
          placeholder={"Укажите e-mail"}
          onChange={onChange}
        />
        <Button htmlType={"submit"} size="medium">
          Восстановить
        </Button>
      </form>
      <div className={clsx(styles.linkBlock, "mt-20")}>
        <p className={"text text_type_main-default"}>Вспомнили пароль?</p>
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
