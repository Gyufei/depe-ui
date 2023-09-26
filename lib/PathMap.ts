export function WithHost(path: string) {
  return `https://api.depe.app${path}`;
  //return `${process.env.NEXT_PUBLIC_API_URL}${path}`;
}

export function WithCDN(path: string) {
  return `https://cdn.depe.app${path}`;
  // return `${process.env.NEXT_PUBLIC_CDN_URL}${path}`;
}

export const EndPointPathMap = {
  // ethApi: WithHost("/mainnet"),
  // opApi: WithHost("/op"),
  // baseApi: WithHost("/base"),
  ethApi: WithHost("/sepolia"),
  sepoliaApi: WithHost("/sepolia"),
  opApi: WithHost("/sepolia"),
  baseApi: WithHost("/sepolia"),

  // ethTokens: WithCDN("/tokens/mainnet/tokenlist.json"),
  // opTokens: WithCDN("/tokens/op/tokenlist.json"),
  // baseTokens: WithCDN("/tokens/base/tokenlist.json"),
  ethTokens: WithCDN("/tokens/sepolia/tokenlist.json"),
  opTokens: WithCDN("/tokens/sepolia/tokenlist.json"),
  baseTokens: WithCDN("/tokens/sepolia/tokenlist.json"),
  sepoliaTokens: WithCDN("/tokens/sepolia/tokenlist.json"),
};
