import * as superfine from "superfine";
import { version } from "../../../../../package.json";
import { UuidSchema } from "../../../../../schema/uuid-schema";
import { NameSchema } from "../../../../../schema/name-schema";

export type SkitListRouteParameters = {
  readonly skits: ReadonlyArray<{
    readonly uuid: UuidSchema;
    readonly name: NameSchema;
  }>;
};

export function skitListRouteView(
  parameters: SkitListRouteParameters
): superfine.ElementNode<`body`> {
  let list: superfine.ElementNode<`div` | `ul`>;

  if (parameters.skits.length === 0) {
    list = superfine.h(
      `div`,
      { className: `empty-list-message` },
      superfine.text(`You have not created any skits.`)
    );
  } else {
    list = superfine.h(
      `ul`,
      { className: `text-list` },
      parameters.skits.map((skit) =>
        superfine.h(
          `li`,
          {},
          superfine.h(
            `a`,
            { href: `#skits/${skit.uuid}` },
            superfine.text(skit.name)
          )
        )
      )
    );
  }

  return superfine.h(`body`, {}, [
    superfine.h(`header`, {}, [
      superfine.h(`h1`, {}, [
        superfine.h(`a`, { href: `#` }, superfine.text(`SkitKit`)),
        superfine.h(`sub`, {}, superfine.text(`v${version}`)),
      ]),
      superfine.h(
        `nav`,
        {},
        superfine.h(`a`, { href: `#skits` }, superfine.text(`Skits`))
      ),
    ]),
    superfine.h(`article`, {}, list),
    superfine.h(
      `footer`,
      {},
      superfine.h(`button`, {}, superfine.text(`New Skit`))
    ),
  ]);
}
