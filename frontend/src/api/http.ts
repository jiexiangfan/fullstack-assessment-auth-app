export type ApiError = { error: { code: string; message: string } };

export async function requestJson<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const msg =
      (data as ApiError | null)?.error?.message ??
      `Request failed (${res.status})`;
    throw new Error(msg);
  }

  return data as T;
}
