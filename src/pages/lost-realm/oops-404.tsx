import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import styles from "./oops-404.module.css";
import notFound404 from "../../images/not-found404.svg";

export default function NotFound404() {
  return (
    <div className={styles.container}>
      <h1 className={"text text_type_main-large mt-10 mb-5"}>
        Oops! Страница не найдена.
      </h1>
      <img
        className={styles.image}
        src={notFound404}
        alt="Страница не найдена: Ошибка 404"
      />
      <Link
        to="/"
        className={clsx(
          styles.link,
          "text text_type_main-default pl-5 pr-5 pb-4 pt-4 mr-2"
        )}
      >
        Вернуться на Главную
      </Link>
    </div>
  );
}
