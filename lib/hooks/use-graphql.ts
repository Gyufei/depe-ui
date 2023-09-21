import useSWR, { SWRResponse } from "swr";

import { GraphQLClient } from "graphql-request";
import { useEndPoint } from "./use-endpoint";
import { plainFetcher } from "../fetcher";

export function useGqlRequest<T = any>(doc: string): SWRResponse<T, any, any> {
  const { gqlEndPoint } = useEndPoint();

  const fetchGql = async ([document, endPoint]: [string, string]) => {
    if (!document || !endPoint) return null;

    const gqlClient = new GraphQLClient(endPoint || "", {
      method: `GET`,
      fetch: plainFetcher,
    });

    const res = gqlClient.request(document as any);
    return res;
  };

  const res = useSWR<T>([doc, gqlEndPoint], fetchGql as any);

  return res;
}
