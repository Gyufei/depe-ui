export function WithHost(path: string) {
  return `https://api.depe.app${path}`;
  //return `${process.env.NEXT_PUBLIC_API_URL}${path}`;
}

export function WithCDN(path: string) {
  return `https://cdn.depe.app${path}`;
  // return `${process.env.NEXT_PUBLIC_CDN_URL}${path}`;
}

export const EndPointPathMap = {
  ethApi: WithHost("/sepolia"),
  sepoliaApi: WithHost("/sepolia"),
  opApi: WithHost("/sepolia"),
  baseApi: WithHost("/sepolia"),

  sepoliaTokens: WithCDN("/tokens/sepolia/tokenlist.json"),
  ethTokens: WithCDN("/tokens/sepolia/tokenlist.json"),
  opTokens: WithCDN("/tokens/sepolia/tokenlist.json"),
  baseTokens: WithCDN("/tokens/sepolia/tokenlist.json"),

  sepoliaRouter: WithCDN("/tokens/sepolia/routers.json"),
  ethRouter: WithCDN("/tokens/sepolia/tokenlist.json"),
  opRouter: WithCDN("/tokens/sepolia/tokenlist.json"),
  baseRouter: WithCDN("/tokens/sepolia/tokenlist.json"),
};
