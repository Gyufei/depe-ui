import { GraphQLClient } from "graphql-request";
import { useEndPoint } from "./use-endpoint";

export function useGraphqlClient() {
  const { gqlEndPoint: networkEndPoint } = useEndPoint();

  const gqlClient = new GraphQLClient(networkEndPoint || "", {
    method: `GET`,
    jsonSerializer: {
      parse: JSON.parse,
      stringify: JSON.stringify,
    },
  });

  const gqlFetcher = async (...rest: any[]) => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const res = await gqlClient.request(...rest);
      console.log("res", res);
      return (res as any)?.data || res;
    } catch (e) {
      console.error(e);
    }
  };

  return {
    gqlFetcher,
  };
}
