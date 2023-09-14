export function WithHost(path: string) {
  return `${process.env.NEXT_PUBLIC_API_URL}${path}`;
}

export const EndPointPathMap = {
  ethGql: WithHost("/ethereum/graphql"),
  sepoliaGql: WithHost("/sepolia/graphql"),
  opGql: WithHost("/op/graphql"),
  baseGql: WithHost("/base/graphql"),
};
