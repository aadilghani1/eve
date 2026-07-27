---
"eve": patch
---

Keep one session token-limit prompt pending while concurrent input queues behind it. Approving restores the configured budget window, while stopping cancels the active turn and terminally completes the session. Delegated sessions inherit from the fresh window, and zero-quota child tasks no longer raise continuation prompts that cannot grant tokens.
