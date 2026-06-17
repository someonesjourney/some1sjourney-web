export const PASSWORD_MIN_LENGTH = 8;

export interface PasswordRule {
  id: "length" | "letter" | "number" | "symbol";
  test: (password: string) => boolean;
}

export const PASSWORD_RULES: PasswordRule[] = [
  {
    id: "length",
    test: (password) => password.length >= PASSWORD_MIN_LENGTH,
  },
  {
    id: "letter",
    test: (password) => /[A-Za-z]/.test(password),
  },
  {
    id: "number",
    test: (password) => /[0-9]/.test(password),
  },
  {
    id: "symbol",
    test: (password) => /[^A-Za-z0-9]/.test(password),
  },
];

export function checkPassword(password: string): {
  valid: boolean;
  failed: PasswordRule[];
} {
  const failed = PASSWORD_RULES.filter((rule) => !rule.test(password));
  return { valid: failed.length === 0, failed };
}
