export function WithHost(path: string) {
  return `${process.env.NEXT_PUBLIC_API_URL}${path}`;
}

export const EndPointPathMap = {
  ethApi: WithHost("/mainnet"),
  sepoliaApi: WithHost("/sepolia"),
  opApi: WithHost("/op"),
  baseApi: WithHost("/base"),

  ethGql: WithHost("/mainnet/graphql"),
  sepoliaGql: WithHost("/sepolia/graphql"),
  opGql: WithHost("/op/graphql"),
  baseGql: WithHost("/base/graphql"),

  token:
    "https://cdn.shorter.finance/tokens/mainnet/tokenlist.json?ts=1694769072373",
};
