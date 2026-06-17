"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { syncUnifiedBackendUser } from "@/lib/supabase/sync-unified-user";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { logSyncVerification } from "@/lib/debug/syncVerification";

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  operationLoading: boolean;
  configured: boolean;
  signInWithPassword: (email: string, password: string) => Promise<void>;
  signUpWithPassword: (
    email: string,
    password: string,
    fullName: string,
    locale: string,
  ) => Promise<{ needsEmailConfirmation: boolean }>;
  verifyEmailOtp: (email: string, token: string) => Promise<void>;
  resendEmailOtp: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [operationLoading, setOperationLoading] = useState(false);
  const configured = isSupabaseConfigured();

  const getClient = useCallback(() => {
    if (!configured) {
      throw new Error("Supabase is not configured");
    }
    return createClient();
  }, [configured]);

  useEffect(() => {
    if (!configured) {
      setLoading(false);
      return;
    }

    const supabase = getClient();

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);

      if (data.session?.user) {
        logSyncVerification("session_init", {
          userId: data.session.user.id,
          email: data.session.user.email,
        });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      setLoading(false);

      if (nextSession?.user) {
        logSyncVerification("auth_state_change", {
          event,
          userId: nextSession.user.id,
          email: nextSession.user.email,
        });

        const displayName =
          (nextSession.user.user_metadata?.full_name as string | undefined) ??
          (nextSession.user.user_metadata?.display_name as string | undefined);

        await syncUnifiedBackendUser(
          supabase,
          nextSession.user.id,
          displayName,
        );
      }
    });

    return () => subscription.unsubscribe();
  }, [configured, getClient]);

  const signInWithPassword = useCallback(
    async (email: string, password: string) => {
      setOperationLoading(true);
      try {
        const supabase = getClient();
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;

        if (data.user?.id) {
          logSyncVerification("sign_in", {
            userId: data.user.id,
            email: data.user.email,
          });
          await syncUnifiedBackendUser(supabase, data.user.id);
        }
      } finally {
        setOperationLoading(false);
      }
    },
    [getClient],
  );

  const signUpWithPassword = useCallback(
    async (
      email: string,
      password: string,
      fullName: string,
      locale: string,
    ) => {
      setOperationLoading(true);
      try {
        const supabase = getClient();
        const redirectTo = `${window.location.origin}/auth/callback?next=/${locale}/profile`;

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: redirectTo,
          },
        });
        if (error) throw error;

        logSyncVerification("sign_up", {
          userId: data.user?.id ?? null,
          email,
          needsEmailConfirmation: !data.session,
        });

        if (data.session?.user?.id) {
          const { error: ensureError } = await supabase.rpc(
            "ensure_user_profile",
            { p_full_name: fullName },
          );
          if (ensureError) {
            console.warn("[auth] ensure_user_profile:", ensureError.message);
          }
          await syncUnifiedBackendUser(
            supabase,
            data.session.user.id,
            fullName,
          );
          return { needsEmailConfirmation: false };
        }

        return { needsEmailConfirmation: true };
      } finally {
        setOperationLoading(false);
      }
    },
    [getClient],
  );

  const verifyEmailOtp = useCallback(
    async (email: string, token: string) => {
      setOperationLoading(true);
      try {
        const supabase = getClient();
        const { data, error } = await supabase.auth.verifyOtp({
          email: email.trim(),
          token: token.trim(),
          type: "signup",
        });
        if (error) throw error;
        if (!data.session) {
          throw new Error("Verification succeeded but no session was returned.");
        }

        const fullName =
          (data.user?.user_metadata?.full_name as string | undefined) ?? "";
        const { error: ensureError } = await supabase.rpc(
          "ensure_user_profile",
          { p_full_name: fullName },
        );
        if (ensureError) {
          console.warn("[auth] ensure_user_profile:", ensureError.message);
        }

        if (data.user?.id) {
          logSyncVerification("email_verified", {
            userId: data.user.id,
            email: data.user.email,
          });
          await syncUnifiedBackendUser(supabase, data.user.id, fullName);
        }
      } finally {
        setOperationLoading(false);
      }
    },
    [getClient],
  );

  const resendEmailOtp = useCallback(
    async (email: string) => {
      const supabase = getClient();
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email.trim(),
      });
      if (error) throw error;
    },
    [getClient],
  );

  const signOut = useCallback(async () => {
    const supabase = getClient();
    await supabase.auth.signOut();
    logSyncVerification("sign_out", {});
  }, [getClient]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      loading,
      operationLoading,
      configured,
      signInWithPassword,
      signUpWithPassword,
      verifyEmailOtp,
      resendEmailOtp,
      signOut,
    }),
    [
      user,
      session,
      loading,
      operationLoading,
      configured,
      signInWithPassword,
      signUpWithPassword,
      verifyEmailOtp,
      resendEmailOtp,
      signOut,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
