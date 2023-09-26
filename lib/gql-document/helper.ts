export interface IGqlDocParam {
  key: string;
  value: string | number;
}

export function convertKVsToParams(params: Array<IGqlDocParam>): string {
  const paramsStr = params.map((p) => `${p.key}: "${p.value}"`).join(",");

  return paramsStr;
}
