import { getLocale } from "../../../../../helpers/getLocale";
import Link from "next/link";
import Router from "next/router";

import { Trans } from "@lingui/macro";

export const NavEmployee = () => {
  return (
    <>
      <li className="px-4">
        <Link href="/[locale]/auth/reviews" as={`/${getLocale()}/auth/reviews`}>
          <a aria-selected={Router.pathname.includes("auth/reviews")}>
            <Trans id="auth.navbar.reviews">Reviews</Trans>
          </a>
        </Link>
      </li>
    </>
  );
};
