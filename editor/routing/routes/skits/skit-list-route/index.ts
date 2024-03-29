import * as superfine from "superfine";
import { histories } from "../../../../histories";
import { getCurrentBySkitUuid } from "../../../../history/get-current-by-skit-uuid";
import { header } from "../../components/header";
import { newSkit } from "./new-skit";

export type SkitListRouteParameters = Record<string, never>;

const importedHistories = histories;
const importedGetCurrentBySkitUuid = getCurrentBySkitUuid;

export function skitListRouteView(
  parameters: SkitListRouteParameters
): superfine.ElementNode<`body`> {
  parameters;

  let list: superfine.ElementNode<`div` | `ul`>;

  const skits = importedHistories
    .listKeys()
    .map((uuid) => ({
      uuid,
      name: importedGetCurrentBySkitUuid(uuid).name,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  if (skits.length === 0) {
    list = superfine.h(
      `div`,
      { className: `empty-list-message` },
      superfine.text(`You have not created any skits.`)
    );
  } else {
    list = superfine.h(
      `ul`,
      { className: `text-list` },
      skits.map((skit) =>
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
    header([[`#skits`, `Skits`]]),
    superfine.h(`article`, {}, list),
    superfine.h(
      `footer`,
      {},
      superfine.h(`button`, { onclick: newSkit }, superfine.text(`New Skit`))
    ),
  ]);
}
