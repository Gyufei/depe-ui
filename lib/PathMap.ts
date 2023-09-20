export function WithHost(path: string) {
  return `https://api.depe.app${path}`;
  //return `${process.env.NEXT_PUBLIC_API_URL}${path}`;
}

export function WithCDN(path: string) {
  return `https://cdn.depe.app${path}`;
  // return `${process.env.NEXT_PUBLIC_CDN_URL}${path}`;
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

  ethTokens: WithCDN("/tokens/mainnet/tokenlist.json"),
  sepoliaTokens: WithCDN("/tokens/sepolia/tokenlist.json"),
  opTokens: WithCDN("/tokens/op/tokenlist.json"),
  baseTokens: WithCDN("/tokens/base/tokenlist.json"),
};
