type SyncVerificationPayload = Record<string, unknown>;

function isSyncDebugEnabled(): boolean {
  return (
    process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_DEBUG_SYNC === "true"
  );
}

/** Temporary cross-platform identity verification logs (web). */
export function logSyncVerification(
  scope: string,
  payload: SyncVerificationPayload,
): void {
  if (!isSyncDebugEnabled()) return;

  const { email: _email, ...safePayload } = payload;
  console.log(`[SYNC_VERIFY:web:${scope}]`, safePayload);
}
