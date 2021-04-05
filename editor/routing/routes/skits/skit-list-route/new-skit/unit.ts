import rewire = require("rewire");
import * as uuid from "uuid";
import { histories } from "../../../../../histories";
import { navigate } from "../../../../../navigate";

describe(`newSkit`, () => {
  describe(`imports`, () => {
    let newSkit: { __get__(name: string): unknown };

    beforeAll(() => {
      newSkit = rewire(`.`);
    });

    it(`uuid`, () => {
      expect(newSkit.__get__(`importedUuid`)).toBe(uuid.v4);
    });

    it(`histories`, () => {
      expect(newSkit.__get__(`importedHistories`)).toBe(histories);
    });

    it(`navigate`, () => {
      expect(newSkit.__get__(`importedNavigate`)).toBe(navigate);
    });
  });

  describe(`on execution`, () => {
    let importedUuid: jasmine.Spy;
    let historiesTryGetItem: jasmine.Spy;
    let historiesGetItem: jasmine.Spy;
    let historiesSetItem: jasmine.Spy;
    let historiesRemoveItem: jasmine.Spy;
    let historiesListKeys: jasmine.Spy;
    let importedNavigate: jasmine.Spy;

    beforeAll(() => {
      const newSkit = rewire(`.`);

      importedUuid = jasmine
        .createSpy(`importedUuid`)
        .and.returnValue(`Test Skit Uuid`);
      newSkit.__set__(`importedUuid`, importedUuid);

      historiesTryGetItem = jasmine.createSpy(`historiesTryGetItem`);
      historiesGetItem = jasmine.createSpy(`historiesGetItem`);
      historiesSetItem = jasmine.createSpy(`historiesSetItem`);
      historiesRemoveItem = jasmine.createSpy(`historiesRemoveItem`);
      historiesListKeys = jasmine.createSpy(`historiesListKeys`);
      newSkit.__set__(`importedHistories`, {
        tryGetItem: historiesTryGetItem,
        getItem: historiesGetItem,
        setItem: historiesSetItem,
        removeItem: historiesRemoveItem,
        listKeys: historiesListKeys,
      });

      importedNavigate = jasmine.createSpy(`importedNavigate`);
      newSkit.__set__(`importedNavigate`, importedNavigate);

      newSkit.__get__(`newSkit`)();
    });

    it(`generates one UUID`, () => {
      expect(importedUuid).toHaveBeenCalledTimes(1);
    });

    it(`sets one history item`, () => {
      expect(historiesSetItem).toHaveBeenCalledTimes(1);
    });

    it(`does not try to get any history items`, () => {
      expect(historiesTryGetItem).not.toHaveBeenCalled();
    });

    it(`does not get any history items`, () => {
      expect(historiesGetItem).not.toHaveBeenCalled();
    });

    it(`does not remove any history items`, () => {
      expect(historiesRemoveItem).not.toHaveBeenCalled();
    });

    it(`does not list history keys`, () => {
      expect(historiesRemoveItem).not.toHaveBeenCalled();
    });

    it(`sets an initial history item`, () => {
      expect(historiesSetItem).toHaveBeenCalledWith(`Test Skit Uuid`, {
        beforeSteps: {
          name: `Untitled Skit`,
          backgrounds: {
            [`Test Skit Uuid`]: {
              name: `Untitled Background`,
              svg: `<svg xmlns="http://www.w3.org/2000/svg" height="256" width="256"><defs><linearGradient y2="256" x2="256" y1="0" x1="0" id="A" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="red"/><stop offset=".375" stop-color="#ff0"/><stop offset=".5" stop-color="#0f0"/><stop offset=".625" stop-color="#0ff"/><stop offset="1" stop-color="#00f"/></linearGradient></defs><rect x="0" y="0" width="256" height="256" fill="url(#A)"/><rect x="16" y="16" width="224" height="224" fill="#fff"/><text y="128" x="128" font-size="16" font-family="sans-serif" dominant-baseline="middle" text-anchor="middle">PLACEHOLDER</text></svg>`,
            },
          },
          characters: {},
          emotes: {},
          lines: {
            [`Test Skit Uuid`]: {
              sceneUuid: `Test Skit Uuid`,
              text: `(this line is yet to be written)`,
              characters: {},
            },
          },
          scenes: {
            [`Test Skit Uuid`]: {
              name: `Untitled Scene`,
              backgroundUuid: `Test Skit Uuid`,
              lineUuids: [`Test Skit Uuid`],
            },
          },
        },
        doneSteps: [],
        proposedStep: null,
        undoneSteps: [],
      });
    });

    it(`navigates once`, () => {
      expect(importedNavigate).toHaveBeenCalledTimes(1);
    });

    it(`navigates to the skit`, () => {
      expect(importedNavigate).toHaveBeenCalledWith(`#/skits/Test Skit Uuid`);
    });

    it(`sets the history item before navigating`, () => {
      expect(historiesSetItem).toHaveBeenCalledBefore(importedNavigate);
    });
  });
});
