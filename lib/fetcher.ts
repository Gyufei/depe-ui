export async function plainFetcher(
  input: URL | RequestInfo,
  init?: RequestInit | undefined,
) {
  const res = await fetch(input, init);

  if (!res.ok) {
    const error = new Error(
      "An error occurred while fetching the data.",
    ) as any;

    const resBody = await res.text();
    error.info = resBody.length > 100 ? "Failed: An error occurred" : resBody;
    error.status = res.status;

    throw error;
  }

  return res;
}

export default async function fetcher(
  input: URL | RequestInfo,
  init?: RequestInit | undefined,
) {
  const res = await plainFetcher(input, init);
  const jsonRes = await res.json();
  return jsonRes?.data || jsonRes;
}
