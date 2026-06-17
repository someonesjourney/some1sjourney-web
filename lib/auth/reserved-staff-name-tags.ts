const STAFF_TAG_PATTERN = /\[(?:GM|PM)\]/i;

export function validateNameForRegistration(name: string): {
  allowed: boolean;
  message?: string;
} {
  if (!name.trim()) {
    return { allowed: false, message: "NAME_REQUIRED" };
  }
  if (name.trim().length < 2) {
    return { allowed: false, message: "NAME_MIN_LENGTH" };
  }
  if (STAFF_TAG_PATTERN.test(name)) {
    return { allowed: false, message: "RESERVED_STAFF_TAG" };
  }
  return { allowed: true };
}
