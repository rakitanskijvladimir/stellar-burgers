import React, { ReactNode } from "react";

import styles from "./modal-overlay.module.css";

type TModalOverlayProps = {
  onClose: () => void;
  children?: ReactNode;
};

export default function ModalOverlay({ onClose, children }: TModalOverlayProps) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      {children}
    </div>
  );
}
