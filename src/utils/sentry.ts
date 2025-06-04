import * as Sentry from "@sentry/node";

type LogLevel = "info" | "warning" | "error" | "debug" | "fatal";

export function LogEvent(
  message: string,
  category: string = "general",
  data?: Record<string, unknown>,
  level: LogLevel = "info",
  error?: unknown
) {
  Sentry.addBreadcrumb({
    category,
    message,
    level,
    data,
  });
  if (error) {
    if (error) {
      Sentry.captureException(error, {
        extra: data,
      });
    } else {
      Sentry.captureMessage(message, level);
    }
  }
}
