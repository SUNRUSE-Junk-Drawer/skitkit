import * as superfine from "superfine";
import { notFoundRouteView } from ".";

describe(`notFoundRouteView`, () => {
  let dom: superfine.ElementNode<`body`>;

  beforeAll(() => {
    dom = notFoundRouteView({
      breadcrumb: [
        [`Test Hash A`, `Test Label A`],
        [`Test Hash B`, `Test Label B`],
        [`Test Hash C`, `Test Label C`],
      ],
    });
  });

  it(`returns the expected dom`, () => {
    expect(dom).toEqual(
      superfine.h(`body`, {}, [
        superfine.h(`header`, {}, [
          superfine.h(`h1`, {}, [
            superfine.h(`a`, { href: `#` }, superfine.text(`SkitKit`)),
            superfine.h(`sub`, {}, superfine.text(`v999.999.999`)),
          ]),
          superfine.h(`nav`, {}, [
            superfine.h(
              `a`,
              { href: `Test Hash A` },
              superfine.text(`Test Label A`)
            ),
            superfine.h(
              `a`,
              { href: `Test Hash B` },
              superfine.text(`Test Label B`)
            ),
            superfine.h(
              `a`,
              { href: `Test Hash C` },
              superfine.text(`Test Label C`)
            ),
          ]),
        ]),
        superfine.h(
          `article`,
          {},
          superfine.h(
            `p`,
            { className: `error-message` },
            superfine.text(`The page you have requested cannot be found.`)
          )
        ),
      ])
    );
  });
});
