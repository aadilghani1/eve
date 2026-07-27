import { defineEval } from "eve/evals";
import { equals } from "eve/evals/expect";

/** Declining a session token-limit continuation terminally completes the session. */
export default defineEval({
  description: "Stopping at the session token limit cancels and finalizes the session.",
  async test(t) {
    const first = await t.send('Reply with exactly the text "stop ping" and nothing else.');
    first.expectOk();

    await t.send('Reply with exactly the text "stop pong" and nothing else.');
    const request = t.requireInputRequest({
      display: "confirmation",
      optionIds: ["continue", "stop"],
      toolName: "session_limit_continuation",
    });

    const stopped = await t.respond({
      optionId: "stop",
      requestId: request.requestId,
    });
    stopped.expectOk();
    t.notEvent("turn.failed");
    t.notEvent("session.failed");
    t.event("turn.cancelled");
    t.event("session.completed");
    stopped.notEvent("session.waiting");
    t.check(stopped.status, equals("completed"));
  },
});
