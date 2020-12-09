interface Body<TVariables> {
  query: string;
  variables?: TVariables;
}

interface Error {
  message: string;
}

export const server = {
  fetch: async <TData = unknown, TVariables = unknown>(
    body: Body<TVariables>
  ) => {
    const res = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new ErrorEvent("failed to receive a response from the server");
    }

    return res.json() as Promise<{ data: TData; errors: Error[] }>;
  },
};
