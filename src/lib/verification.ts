// Mock verification service for local UI development only — swap for real
// Clerk email-code verification. Guarded so it can never grant access outside
// a dev build: it accepts any code and must not be trusted as an auth check.
export async function verifyEmailCode(email: string, code: string): Promise<void> {
  if (!__DEV__) {
    throw new Error("Mock verification is disabled outside development.");
  }

  await new Promise((resolve) => setTimeout(resolve, 400));
}
