import React, { ReactChild } from "react";
import styles from "./Main.css";
interface Props {
  children: ReactChild | ReactChild[];
}
export default function Main({ children }: Props) {
  return <div className={styles.main}>{children}</div>;
}
