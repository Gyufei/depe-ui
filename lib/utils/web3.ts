export function truncateAddr(
  address: string,
  params = {
    nPrefix: 4,
    nSuffix: 4,
  },
): string {
  if (!address) return address;

  const { nPrefix, nSuffix } = params;

  const shorter = `${address.slice(0, nPrefix)}...${address.slice(
    -1 * nSuffix,
  )}`;

  return shorter;
}
