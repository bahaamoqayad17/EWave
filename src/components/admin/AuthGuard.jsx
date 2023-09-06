import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { CheckToken } from "@/lib/HandleToken";

export default function AuthGuard(props) {
  const { children } = props;
  const router = useRouter();
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (ignore.current) {
      return;
    }

    ignore.current = true;

    if (CheckToken()) {
      setChecked(true);
    } else {
      console.log("Not authenticated, redirecting");
      router
        .replace({
          pathname: "/admin/login",
          query:
            router.asPath !== "/admin"
              ? { continueUrl: router.asPath }
              : undefined,
        })
        .catch(console.error);
    }
    if (router.pathname == "/admin/login" && checked) {
      router
        .replace({
          pathname: "/admin",
        })
        .catch(console.error);
    }
  }, [router.isReady]);

  if (!checked) {
    return null;
  }

  return children;
}

AuthGuard.propTypes = {
  children: PropTypes.node,
};
