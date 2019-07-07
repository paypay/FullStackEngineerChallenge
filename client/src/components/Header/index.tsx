import React from "react";
import styles from "./Header.css";

interface Props {
  title: string;
}

export default function Header({ title }: Props) {
  return (
    <div className={styles.header}>
      <a className={styles.logo} href="#/">
        {title}
      </a>
    </div>
  );
}
