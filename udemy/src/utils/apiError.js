const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;

/**
 * Turns any API/network error into a string that is safe to render.
 *
 * Backends (and proxies such as Vercel) can return errors in different shapes:
 *   - { error: "Invalid email" }
 *   - { error: { code: "404", message: "The page could not be found" } }
 *   - { message: "Something went wrong" }
 *   - a plain string body
 *
 * Rendering `err.response.data.error` directly crashes React with error #31
 * when `error` is an object, so always normalize it first.
 */
export const getApiErrorMessage = (
  err,
  fallback = "Something went wrong. Please try again."
) => {
  const data = err?.response?.data;

  if (isNonEmptyString(data)) return data;
  if (isNonEmptyString(data?.error)) return data.error;
  if (isNonEmptyString(data?.error?.message)) return data.error.message;
  if (isNonEmptyString(data?.message)) return data.message;
  if (isNonEmptyString(err?.message)) return err.message;

  return fallback;
};
