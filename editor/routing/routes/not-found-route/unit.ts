import * as superfine from "superfine";
import { notFoundRouteView } from ".";

describe(`notFoundRouteView`, () => {
  let dom: superfine.ElementNode<`body`>;

  beforeAll(() => {
    dom = notFoundRouteView({});
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
          superfine.h(
            `ul`,
            { className: `error-message` },
            superfine.text(`The page you have requested cannot be found.`)
          )
        ),
      ])
    );
  });
});
