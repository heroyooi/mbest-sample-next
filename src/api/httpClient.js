const defaultHeaders = {
  Accept: "application/json"
};

const parseJsonSafely = async (response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

export const request = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {})
    }
  });

  const payload = await parseJsonSafely(response);

  if (!response.ok) {
    const message =
      payload?.error || payload?.message || `요청이 실패했습니다. (status: ${response.status})`;
    throw new Error(message);
  }

  return payload;
};
