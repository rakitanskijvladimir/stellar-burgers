import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

import clsx from "clsx";
import styles from "./universal-popup.module.css";

import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import useEscapeHandler from "../../../../hooks/use-escape-handler";

const modalRoot: HTMLElement | null = document.getElementById("react-modals");

type TModalProps = {
  onClose: () => void;
  title?: string;
  titleClassName?: string;
  children?: ReactNode;
};

export default function BaseModal({
  onClose,
  title,
  titleClassName,
  children,
}: TModalProps) {
  useEscapeHandler(onClose);

  if (!modalRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <div
        className={clsx(styles.modalContainer, "pb-10")}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={clsx(styles.modalHeader, "mt-10 ml-10 mr-10")}>
          <h2
            className={clsx(
              titleClassName ?? "text_type_main-large",
              "text"
            )}
          >
            {title}
          </h2>
          <button className={styles.closeButton} onClick={onClose}>
            <CloseIcon type="primary" />
          </button>
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
}
