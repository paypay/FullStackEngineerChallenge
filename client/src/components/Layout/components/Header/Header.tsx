import React from "react";

import { Container } from "../../../";
import { useAuth } from "../../../../contexts/AuthContext";
import { UserType } from "../../../../graphql/types";
import { AuthMenu } from "./components/AuthMenu";
import styles from "./Header.module.scss";
import { NavAdmin } from "./variants/NavAdmin";
import { NavEmployee } from "./variants/NavEmployee";
import { LanguageMenu } from "./components/LanguageMenu";

export const Header = () => {
  const { user } = useAuth();

  return (
    <Container className="py-6">
      <div className={styles.header}>
        <img src="/header-logo.png" className="object-fit w-32" />
        <nav>
          <ul className=" md:flex items-center font-bold text-gray-700">
            {user?.userType === UserType.Admin && <NavAdmin />}
            {user?.userType === UserType.Employee && <NavEmployee />}
            <li className="pl-8 pr-4">
              <LanguageMenu />
            </li>
            <li className="cursor-pointer">
              <AuthMenu />
            </li>
          </ul>
        </nav>
      </div>
    </Container>
  );
};
