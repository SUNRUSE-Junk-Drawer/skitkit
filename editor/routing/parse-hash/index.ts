export function parseHash(hash: string): ReadonlyArray<string> {
  return hash
    .toLowerCase()
    .replace(/^[#/]+/, ``)
    .replace(/\/+$/, ``)
    .split(`/`)
    .filter((level) => level);
}
