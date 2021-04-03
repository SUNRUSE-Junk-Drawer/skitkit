import * as superfine from "superfine";
import { skitListRouteView } from ".";

describe(`skitListRouteView`, () => {
  describe(`when there are no skits`, () => {
    let dom: superfine.ElementNode<`body`>;

    beforeAll(() => {
      dom = skitListRouteView({ skits: [] });
    });

    it(`returns the expected dom`, () => {
      expect(dom).toEqual(
        superfine.h(`body`, {}, [
          superfine.h(`header`, {}, [
            superfine.h(
              `h1`,
              {},
              superfine.h(`a`, { href: `#` }, superfine.text(`SkitKit`))
            ),
            superfine.h(
              `nav`,
              {},
              superfine.h(`a`, { href: `#skits` }, superfine.text(`Skits`))
            ),
          ]),
          superfine.h(`article`, {}, [
            superfine.h(
              `div`,
              { className: `empty-list-message` },
              superfine.text(`You have not created any skits.`)
            ),
          ]),
          superfine.h(`footer`, {}, [
            superfine.h(`button`, {}, superfine.text(`New Skit`)),
          ]),
        ])
      );
    });
  });

  describe(`when there is one skit`, () => {
    let dom: superfine.ElementNode<`body`>;

    beforeAll(() => {
      dom = skitListRouteView({
        skits: [
          {
            uuid: `73c87206-7df9-454e-b3d6-2e73237a6d62`,
            name: `Test Skit Name A`,
          },
        ],
      });
    });

    it(`returns the expected dom`, () => {
      expect(dom).toEqual(
        superfine.h(`body`, {}, [
          superfine.h(`header`, {}, [
            superfine.h(
              `h1`,
              {},
              superfine.h(`a`, { href: `#` }, superfine.text(`SkitKit`))
            ),
            superfine.h(
              `nav`,
              {},
              superfine.h(`a`, { href: `#skits` }, superfine.text(`Skits`))
            ),
          ]),
          superfine.h(`article`, {}, [
            superfine.h(`ul`, { className: `text-list` }, [
              superfine.h(
                `li`,
                {},
                superfine.h(
                  `a`,
                  { href: `#skits/73c87206-7df9-454e-b3d6-2e73237a6d62` },
                  superfine.text(`Test Skit Name A`)
                )
              ),
            ]),
          ]),
          superfine.h(`footer`, {}, [
            superfine.h(`button`, {}, superfine.text(`New Skit`)),
          ]),
        ])
      );
    });
  });

  describe(`when there are two skits`, () => {
    let dom: superfine.ElementNode<`body`>;

    beforeAll(() => {
      dom = skitListRouteView({
        skits: [
          {
            uuid: `73c87206-7df9-454e-b3d6-2e73237a6d62`,
            name: `Test Skit Name A`,
          },
          {
            uuid: `b4d4d89f-41b6-476d-954b-7e14d5401b41`,
            name: `Test Skit Name B`,
          },
        ],
      });
    });

    it(`returns the expected dom`, () => {
      expect(dom).toEqual(
        superfine.h(`body`, {}, [
          superfine.h(`header`, {}, [
            superfine.h(
              `h1`,
              {},
              superfine.h(`a`, { href: `#` }, superfine.text(`SkitKit`))
            ),
            superfine.h(
              `nav`,
              {},
              superfine.h(`a`, { href: `#skits` }, superfine.text(`Skits`))
            ),
          ]),
          superfine.h(`article`, {}, [
            superfine.h(`ul`, { className: `text-list` }, [
              superfine.h(
                `li`,
                {},
                superfine.h(
                  `a`,
                  { href: `#skits/73c87206-7df9-454e-b3d6-2e73237a6d62` },
                  superfine.text(`Test Skit Name A`)
                )
              ),
              superfine.h(
                `li`,
                {},
                superfine.h(
                  `a`,
                  { href: `#skits/b4d4d89f-41b6-476d-954b-7e14d5401b41` },
                  superfine.text(`Test Skit Name B`)
                )
              ),
            ]),
          ]),
          superfine.h(`footer`, {}, [
            superfine.h(`button`, {}, superfine.text(`New Skit`)),
          ]),
        ])
      );
    });
  });

  describe(`when there are three skits`, () => {
    let dom: superfine.ElementNode<`body`>;

    beforeAll(() => {
      dom = skitListRouteView({
        skits: [
          {
            uuid: `73c87206-7df9-454e-b3d6-2e73237a6d62`,
            name: `Test Skit Name A`,
          },
          {
            uuid: `b4d4d89f-41b6-476d-954b-7e14d5401b41`,
            name: `Test Skit Name B`,
          },
          {
            uuid: `5fd21596-798c-48a8-9931-ca7feeb7a78e`,
            name: `Test Skit Name C`,
          },
        ],
      });
    });

    it(`returns the expected dom`, () => {
      expect(dom).toEqual(
        superfine.h(`body`, {}, [
          superfine.h(`header`, {}, [
            superfine.h(
              `h1`,
              {},
              superfine.h(`a`, { href: `#` }, superfine.text(`SkitKit`))
            ),
            superfine.h(
              `nav`,
              {},
              superfine.h(`a`, { href: `#skits` }, superfine.text(`Skits`))
            ),
          ]),
          superfine.h(`article`, {}, [
            superfine.h(`ul`, { className: `text-list` }, [
              superfine.h(
                `li`,
                {},
                superfine.h(
                  `a`,
                  { href: `#skits/73c87206-7df9-454e-b3d6-2e73237a6d62` },
                  superfine.text(`Test Skit Name A`)
                )
              ),
              superfine.h(
                `li`,
                {},
                superfine.h(
                  `a`,
                  { href: `#skits/b4d4d89f-41b6-476d-954b-7e14d5401b41` },
                  superfine.text(`Test Skit Name B`)
                )
              ),
              superfine.h(
                `li`,
                {},
                superfine.h(
                  `a`,
                  { href: `#skits/5fd21596-798c-48a8-9931-ca7feeb7a78e` },
                  superfine.text(`Test Skit Name C`)
                )
              ),
            ]),
          ]),
          superfine.h(`footer`, {}, [
            superfine.h(`button`, {}, superfine.text(`New Skit`)),
          ]),
        ])
      );
    });
  });
});
