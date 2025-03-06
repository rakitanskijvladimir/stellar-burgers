import React from "react";

import styles from "./loader.module.css";

export default function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loaderCircle} />
      <div className="mt-10">
        <h3 className="text text_type_main-medium">Идет загрузка...</h3>
      </div>
    </div>
  );
}
