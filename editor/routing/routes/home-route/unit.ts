import * as superfine from "superfine";
import { homeRouteView } from ".";

describe(`homeRouteView`, () => {
  let dom: superfine.ElementNode<`body`>;

  beforeAll(() => {
    dom = homeRouteView({});
  });

  it(`returns the expected dom`, () => {
    expect(dom).toEqual(
      superfine.h(`body`, {}, [
        superfine.h(`header`, {}, [
          superfine.h(`h1`, {}, [
            superfine.h(`a`, { href: `#` }, superfine.text(`SkitKit`)),
            superfine.h(`sub`, {}, superfine.text(`v999.999.999`)),
          ]),
        ]),
        superfine.h(
          `article`,
          {},
          superfine.h(`ul`, { className: `text-list` }, [
            superfine.h(
              `li`,
              {},
              superfine.h(`a`, { href: `#skits` }, superfine.text(`Skits`))
            ),
          ])
        ),
        superfine.h(
          `footer`,
          {},
          superfine.h(`button`, {}, superfine.text(`aha`))
        ),
      ])
    );
  });
});
