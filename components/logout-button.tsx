"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button, type ButtonProps } from "@/components/ui/button";

type AuthState = "loading" | "authenticated" | "unauthenticated";

type LogoutButtonProps = Omit<ButtonProps, "onClick"> & {
  loginHref?: string;
  loginLabel?: string;
  redirectOnLogout?: string;
  initiallyAuthenticated?: boolean;
};

export function LogoutButton({
  className,
  variant,
  size,
  loginHref = "/auth/login",
  loginLabel = "Sign in",
  redirectOnLogout = "/auth/login",
  initiallyAuthenticated,
  ...buttonProps
}: LogoutButtonProps) {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [authState, setAuthState] = useState<AuthState>(() => {
    if (initiallyAuthenticated === true) return "authenticated";
    if (initiallyAuthenticated === false) return "unauthenticated";
    return "loading";
  });

  useEffect(() => {
    let isMounted = true;

    if (initiallyAuthenticated === undefined) {
      supabase.auth.getSession().then(({ data }) => {
        if (!isMounted) return;
        setAuthState(data.session ? "authenticated" : "unauthenticated");
      });
    } else {
      setAuthState(initiallyAuthenticated ? "authenticated" : "unauthenticated");
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      setAuthState(session ? "authenticated" : "unauthenticated");
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [supabase, initiallyAuthenticated]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuthState("unauthenticated");
    router.push(redirectOnLogout);
    router.refresh();
  };

  if (authState === "loading") {
    return null;
  }

  if (authState === "unauthenticated") {
    return (
      <Button
        asChild
        variant={variant}
        size={size}
        className={className}
        {...buttonProps}
      >
        <Link href={loginHref}>{loginLabel}</Link>
      </Button>
    );
  }

  return (
    <Button
      onClick={handleLogout}
      variant={variant}
      size={size}
      className={className}
      {...buttonProps}
    >
      Logout
    </Button>
  );
}
