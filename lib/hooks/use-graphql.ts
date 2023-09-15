import useSWR, { SWRResponse } from "swr";

import { GraphQLClient } from "graphql-request";
import { useEndPoint } from "./use-endpoint";
import { plainFetcher } from "../fetcher";

export function useGqlRequest<T = any>(doc: string): SWRResponse<T, any, any> {
  const { gqlEndPoint: networkEndPoint } = useEndPoint();

  const gqlClient = new GraphQLClient(networkEndPoint || "", {
    method: `GET`,
    jsonSerializer: {
      parse: JSON.parse,
      stringify: JSON.stringify,
    },
    fetch: plainFetcher,
  });

  const res = useSWR<T>(doc, gqlClient.request.bind(gqlClient));
  return res;
}
