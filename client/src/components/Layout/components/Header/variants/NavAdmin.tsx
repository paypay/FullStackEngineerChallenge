import { Trans } from "@lingui/macro";
import Link from "next/link";
import Router from "next/router";

import { getLocale } from "../../../../../helpers/getLocale";

export const NavAdmin = () => {
  return (
    <>
      <li className="px-4">
        <Link
          href="/[locale]/admin/employees"
          as={`/${getLocale()}/admin/employees`}
        >
          <a aria-selected={Router.pathname.includes("admin/employees")}>
            <Trans id="admin.navbar.employees">Employees</Trans>
          </a>
        </Link>
      </li>
    </>
  );
};
