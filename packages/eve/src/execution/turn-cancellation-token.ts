/** Derives the stable session-scoped cancellation hook token. */
export function sessionCancelHookToken(sessionId: string): string {
  return `${sessionId}:cancel`;
}

/**
 * Payload accepted by the session cancel hook. A mismatched `turnId` is a
 * benign no-op; omitting it targets whichever turn owns the hook.
 */
export type TurnCancelPayload = {
  readonly turnId?: string;
} & (
  | {
      readonly kind: "session-limit-declined";
    }
  | {
      readonly kind: "turn";
    }
);
