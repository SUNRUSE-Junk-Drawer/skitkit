import * as superfine from "superfine";
import { header } from ".";

describe(`header`, () => {
  let dom: superfine.ElementNode<`header`>;

  beforeAll(() => {
    dom = header([
      [`Test Hash A`, `Test Label A`],
      [`Test Hash B`, `Test Label B`],
      [`Test Hash C`, `Test Label C`],
    ]);
  });

  it(`renders to the expected DOM`, () => {
    expect(dom).toEqual(
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
      ])
    );
  });
});
