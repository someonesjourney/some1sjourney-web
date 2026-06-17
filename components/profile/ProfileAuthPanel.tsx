"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { useLocale } from "@/components/providers/LocaleProvider";
import { checkPassword, PASSWORD_RULES } from "@/lib/auth/password-policy";
import { validateNameForRegistration } from "@/lib/auth/reserved-staff-name-tags";
import { getSiteContent, localizeHref } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/client";
import { getProfileSharePath } from "@/lib/user-profile";

const OTP_LENGTH = 6;
const MAX_OTP_ATTEMPTS = 5;
const RESEND_COOLDOWN_SECONDS = 60;

type ProfileAuthPanelProps = {
  onSignedIn?: () => void;
  initialMode?: "signIn" | "signUp";
};

type FieldErrors = {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export function ProfileAuthPanel({
  onSignedIn,
  initialMode = "signIn",
}: ProfileAuthPanelProps) {
  const locale = useLocale();
  const copy = getSiteContent(locale).profile.auth;
  const {
    configured,
    operationLoading,
    signInWithPassword,
    signUpWithPassword,
    verifyEmailOtp,
    resendEmailOtp,
    user,
    signOut,
  } = useAuth();
  const router = useRouter();

  const [mode, setMode] = useState<"signIn" | "signUp">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [emailSent, setEmailSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);
  const [attemptsLeft, setAttemptsLeft] = useState(MAX_OTP_ATTEMPTS);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = window.setInterval(() => {
      setResendCooldown((seconds) => (seconds > 0 ? seconds - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [resendCooldown]);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  if (!configured) {
    return (
      <p className="mt-8 rounded-xl border border-border bg-surface/40 px-4 py-3 text-sm text-muted">
        {copy.unconfigured}
      </p>
    );
  }

  if (user) {
    return (
      <div className="mt-8 rounded-xl border border-border bg-surface/40 p-5 text-left rtl:text-right">
        <p className="text-sm text-muted">{copy.signedInAs}</p>
        <p className="mt-1 text-sm font-medium text-foreground">{user.email}</p>
        <p className="mt-1 text-xs text-muted-dark">
          {copy.userId}: <span className="text-foreground">{user.id}</span>
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => router.push(localizeHref(locale, getProfileSharePath(user.id)))}
            className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-background transition hover:bg-gold-light"
          >
            {copy.viewMyProfile}
          </button>
          <button
            type="button"
            onClick={() => signOut()}
            className="rounded-full border border-border px-5 py-2 text-sm text-foreground transition hover:border-border-gold hover:text-gold"
          >
            {copy.signOutButton}
          </button>
        </div>
      </div>
    );
  }

  function validationMessage(key: string | undefined): string | undefined {
    if (!key) return undefined;
    const map: Record<string, string> = {
      NAME_REQUIRED: copy.validation.nameRequired,
      NAME_MIN_LENGTH: copy.validation.nameMinLength,
      RESERVED_STAFF_TAG: copy.validation.reservedStaffTag,
      EMAIL_REQUIRED: copy.validation.emailRequired,
      EMAIL_INVALID: copy.validation.emailInvalid,
      PASSWORD_REQUIRED: copy.validation.passwordRequired,
      PASSWORD_WEAK: copy.validation.passwordWeak,
      CONFIRM_REQUIRED: copy.validation.confirmRequired,
      PASSWORDS_MISMATCH: copy.validation.passwordsMismatch,
    };
    return map[key] ?? key;
  }

  function validateField(field: keyof FieldErrors, value: string): string | undefined {
    switch (field) {
      case "fullName": {
        const result = validateNameForRegistration(value);
        return result.allowed ? undefined : validationMessage(result.message);
      }
      case "email":
        if (!value.trim()) return copy.validation.emailRequired;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return copy.validation.emailInvalid;
        }
        return undefined;
      case "password": {
        if (!value) return copy.validation.passwordRequired;
        const { valid } = checkPassword(value);
        return valid ? undefined : copy.validation.passwordWeak;
      }
      case "confirmPassword":
        if (!value) return copy.validation.confirmRequired;
        if (value !== password) return copy.validation.passwordsMismatch;
        return undefined;
      default:
        return undefined;
    }
  }

  async function redirectToProfile() {
    const supabase = createClient();
    const {
      data: { user: authedUser },
    } = await supabase.auth.getUser();
    if (authedUser?.id) {
      router.push(localizeHref(locale, getProfileSharePath(authedUser.id)));
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setMessage(null);

    try {
      if (mode === "signIn") {
        await signInWithPassword(email.trim(), password);
        await redirectToProfile();
        setMessage(copy.signInSuccess);
        onSignedIn?.();
        return;
      }

      const errors: FieldErrors = {
        fullName: validateField("fullName", fullName),
        email: validateField("email", email),
        password: validateField("password", password),
        confirmPassword: validateField("confirmPassword", confirmPassword),
      };
      setFieldErrors(errors);

      if (Object.values(errors).some(Boolean)) {
        setError(copy.fixErrors);
        return;
      }

      const result = await signUpWithPassword(
        email.trim(),
        password,
        fullName.trim(),
        locale,
      );

      if (result.needsEmailConfirmation) {
        setSentEmail(email.trim());
        setEmailSent(true);
        setOtp("");
        setOtpError(null);
        setAttemptsLeft(MAX_OTP_ATTEMPTS);
        setResendCooldown(RESEND_COOLDOWN_SECONDS);
        setMessage(copy.confirmEmail);
        return;
      }

      await redirectToProfile();
      setMessage(copy.signUpSuccess);
      onSignedIn?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.genericError);
    }
  }

  async function handleVerifyOtp(codeOverride?: string) {
    if (attemptsLeft <= 0) {
      setOtpError(copy.otp.tooManyAttempts);
      return;
    }

    const code = (codeOverride ?? otp).trim();
    if (code.length !== OTP_LENGTH) {
      setOtpError(copy.otp.invalidCode);
      return;
    }

    setOtpError(null);
    try {
      await verifyEmailOtp(sentEmail, code);
      await redirectToProfile();
      setMessage(copy.otp.verifySuccess);
      onSignedIn?.();
    } catch (err) {
      const remaining = attemptsLeft - 1;
      setAttemptsLeft(remaining);
      const base = err instanceof Error ? err.message : copy.genericError;
      setOtpError(
        remaining > 0
          ? `${base} — ${remaining}`
          : copy.otp.tooManyAttempts,
      );
      setOtp("");
    }
  }

  async function handleResendOtp() {
    if (resendCooldown > 0 || resending) return;
    setResending(true);
    setOtpError(null);
    try {
      await resendEmailOtp(sentEmail);
      setOtp("");
      setAttemptsLeft(MAX_OTP_ATTEMPTS);
      setResendCooldown(RESEND_COOLDOWN_SECONDS);
      setMessage(copy.otp.resendSuccess);
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.genericError);
    } finally {
      setResending(false);
    }
  }

  if (emailSent) {
    return (
      <div className="mt-8 rounded-xl border border-border bg-surface/40 p-5 text-left rtl:text-right">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">
          {copy.otp.title}
        </p>
        <p className="mt-2 text-sm text-muted">
          {copy.otp.description}{" "}
          <span className="font-semibold text-foreground">{sentEmail}</span>
        </p>

        <div className="mt-5">
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={OTP_LENGTH}
            value={otp}
            onChange={(event) => {
              const digits = event.target.value.replace(/[^0-9]/g, "").slice(0, OTP_LENGTH);
              setOtp(digits);
              if (otpError) setOtpError(null);
              if (digits.length === OTP_LENGTH && attemptsLeft > 0 && !operationLoading) {
                void handleVerifyOtp(digits);
              }
            }}
            className="w-full rounded-xl border border-border bg-surface/60 px-4 py-3 text-center text-2xl tracking-[0.35em] text-foreground outline-none transition focus:border-border-gold focus:ring-1 focus:ring-gold/30"
            aria-label={copy.otp.title}
          />
        </div>

        {otpError ? <p className="mt-2 text-sm text-red-400">{otpError}</p> : null}
        {message ? <p className="mt-2 text-sm text-gold">{message}</p> : null}

        <button
          type="button"
          disabled={
            operationLoading || attemptsLeft <= 0 || otp.length !== OTP_LENGTH
          }
          onClick={() => void handleVerifyOtp()}
          className="mt-4 w-full rounded-full bg-gold py-2.5 text-sm font-semibold text-background transition hover:bg-gold-light disabled:opacity-60"
        >
          {operationLoading ? copy.loading : copy.otp.verifyButton}
        </button>

        <button
          type="button"
          disabled={resending || operationLoading || resendCooldown > 0}
          onClick={() => void handleResendOtp()}
          className="mt-3 w-full text-sm font-medium text-gold transition hover:text-gold-light disabled:opacity-50"
        >
          {resending
            ? copy.loading
            : resendCooldown > 0
              ? `${copy.otp.resendCooldown} ${resendCooldown}s`
              : copy.otp.resend}
        </button>

        <button
          type="button"
          onClick={() => {
            setEmailSent(false);
            setOtp("");
            setOtpError(null);
            setMessage(null);
          }}
          className="mt-2 w-full text-sm text-muted transition hover:text-foreground"
        >
          {copy.otp.useDifferentEmail}
        </button>
      </div>
    );
  }

  const passwordChecks = checkPassword(password);
  const ruleLabels: Record<(typeof PASSWORD_RULES)[number]["id"], string> = {
    length: copy.passwordRules.length,
    letter: copy.passwordRules.letter,
    number: copy.passwordRules.number,
    symbol: copy.passwordRules.symbol,
  };

  return (
    <div className="mt-8 rounded-xl border border-border bg-surface/40 p-5 text-left rtl:text-right">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">
        {copy.title}
      </p>
      <p className="mt-2 text-sm text-muted">{copy.description}</p>
      {mode === "signUp" ? (
        <p className="mt-2 text-xs text-muted-dark">{copy.firstTimeAppHint}</p>
      ) : null}

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => {
            setMode("signIn");
            setFieldErrors({});
            setError(null);
          }}
            className={`rounded-full px-4 py-2 text-xs font-medium transition min-h-11 sm:min-h-0 sm:py-1.5 ${
            mode === "signIn"
              ? "bg-gold text-background"
              : "border border-border text-muted hover:text-foreground"
          }`}
        >
          {copy.signInTab}
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("signUp");
            setFieldErrors({});
            setError(null);
          }}
            className={`rounded-full px-4 py-2 text-xs font-medium transition min-h-11 sm:min-h-0 sm:py-1.5 ${
            mode === "signUp"
              ? "bg-gold text-background"
              : "border border-border text-muted hover:text-foreground"
          }`}
        >
          {copy.signUpTab}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        {mode === "signUp" ? (
          <div>
            <label htmlFor="auth-name" className="mb-1 block text-sm text-foreground">
              {copy.nameLabel}
            </label>
            <input
              id="auth-name"
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
              autoComplete="name"
              className="w-full rounded-xl border border-border bg-surface/60 px-4 py-2.5 text-foreground outline-none transition focus:border-border-gold focus:ring-1 focus:ring-gold/30"
            />
            {fieldErrors.fullName ? (
              <p className="mt-1 text-xs text-red-400">{fieldErrors.fullName}</p>
            ) : null}
          </div>
        ) : null}

        <div>
          <label htmlFor="auth-email" className="mb-1 block text-sm text-foreground">
            {copy.emailLabel}
          </label>
          <input
            id="auth-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
            className="w-full rounded-xl border border-border bg-surface/60 px-4 py-2.5 text-foreground outline-none transition focus:border-border-gold focus:ring-1 focus:ring-gold/30"
          />
          {fieldErrors.email ? (
            <p className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="auth-password" className="mb-1 block text-sm text-foreground">
            {copy.passwordLabel}
          </label>
          <input
            id="auth-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={mode === "signUp" ? 8 : 6}
            autoComplete={mode === "signIn" ? "current-password" : "new-password"}
            className="w-full rounded-xl border border-border bg-surface/60 px-4 py-2.5 text-foreground outline-none transition focus:border-border-gold focus:ring-1 focus:ring-gold/30"
          />
          {fieldErrors.password ? (
            <p className="mt-1 text-xs text-red-400">{fieldErrors.password}</p>
          ) : null}
        </div>

        {mode === "signUp" ? (
          <>
            <div>
              <label
                htmlFor="auth-confirm-password"
                className="mb-1 block text-sm text-foreground"
              >
                {copy.confirmPasswordLabel}
              </label>
              <input
                id="auth-confirm-password"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
                className="w-full rounded-xl border border-border bg-surface/60 px-4 py-2.5 text-foreground outline-none transition focus:border-border-gold focus:ring-1 focus:ring-gold/30"
              />
              {fieldErrors.confirmPassword ? (
                <p className="mt-1 text-xs text-red-400">
                  {fieldErrors.confirmPassword}
                </p>
              ) : null}
            </div>

            {(password.length > 0 || fieldErrors.password) && (
              <ul className="space-y-1 rounded-lg border border-border/70 bg-background/40 px-3 py-2">
                {PASSWORD_RULES.map((rule) => {
                  const ok = !passwordChecks.failed.some((failed) => failed.id === rule.id);
                  return (
                    <li
                      key={rule.id}
                      className={`text-xs ${ok ? "text-emerald-400" : "text-muted"}`}
                    >
                      {ruleLabels[rule.id]}
                    </li>
                  );
                })}
              </ul>
            )}

            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="text-xs text-muted transition hover:text-foreground"
            >
              {showPassword ? copy.hidePassword : copy.showPassword}
            </button>
          </>
        ) : null}

        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        {message ? <p className="text-sm text-gold">{message}</p> : null}

        <button
          type="submit"
          disabled={operationLoading}
          className="w-full rounded-full bg-gold py-2.5 text-sm font-semibold text-background transition hover:bg-gold-light disabled:opacity-60"
        >
          {operationLoading
            ? copy.loading
            : mode === "signIn"
              ? copy.signInButton
              : copy.signUpButton}
        </button>
      </form>
    </div>
  );
}
