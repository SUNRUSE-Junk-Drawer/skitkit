import * as superfine from "superfine";
import { version } from "../../../../../package.json";

export function header(
  breadcrumb: ReadonlyArray<readonly [string, string]>
): superfine.ElementNode<`header`> {
  return superfine.h(`header`, {}, [
    superfine.h(`h1`, {}, [
      superfine.h(`a`, { href: `#` }, superfine.text(`SkitKit`)),
      superfine.h(`sub`, {}, superfine.text(`v${version}`)),
    ]),
    superfine.h(
      `nav`,
      {},
      breadcrumb.map((item) =>
        superfine.h(`a`, { href: item[0] }, superfine.text(item[1]))
      )
    ),
  ]);
}
