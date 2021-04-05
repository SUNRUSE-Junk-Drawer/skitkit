import * as superfine from "superfine";
import { version } from "../../../../../package.json";
import { histories } from "../../../../histories";
import { getCurrentFromHistory } from "../../../../history/get-current-from-history";
import { newSkit } from "./new-skit";

export type SkitListRouteParameters = Record<string, never>;

const importedHistories = histories;

export function skitListRouteView(
  parameters: SkitListRouteParameters
): superfine.ElementNode<`body`> {
  parameters;

  let list: superfine.ElementNode<`div` | `ul`>;

  const skits = importedHistories
    .listKeys()
    .map((uuid) => ({
      uuid,
      name: getCurrentFromHistory(importedHistories.getItem(uuid)).name,
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
      superfine.h(`button`, { onclick: newSkit }, superfine.text(`New Skit`))
    ),
  ]);
}
