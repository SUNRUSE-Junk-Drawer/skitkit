import * as ajv from "ajv";
import { LocalStorageHelper } from ".";

type Schema = {
  readonly testKeyA: string;
  readonly testKeyB: string;
};

const schema: ajv.JSONSchemaType<Schema> = {
  type: `object`,
  required: [`testKeyA`, `testKeyB`],
  additionalProperties: false,
  properties: {
    testKeyA: {
      type: `string`,
      enum: [`Test Value A`],
    },
    testKeyB: {
      type: `string`,
      enum: [`Test Value B`],
    },
  },
};

describe(`LocalStorageHelper`, () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const patchableGlobal = global as any;

  describe(`when an instance is constructed`, () => {
    let localStorageGetItem: jasmine.Spy;
    let localStorageSetItem: jasmine.Spy;
    let localStorageRemoveItem: jasmine.Spy;

    beforeAll(() => {
      localStorageGetItem = jasmine.createSpy(`localStorageGetItem`);
      localStorageSetItem = jasmine.createSpy(`localStorageSetItem`);
      localStorageRemoveItem = jasmine.createSpy(`localStorageRemoveItem`);

      const existingLocalStorage = patchableGlobal.localStorage;

      try {
        patchableGlobal.localStorage = {
          getItem: localStorageGetItem,
          setItem: localStorageSetItem,
          removeItem: localStorageRemoveItem,
        };

        new LocalStorageHelper<Schema>(
          `Test Helper Name`,
          `Test Key Prefix`,
          schema
        );
      } finally {
        patchableGlobal.localStorage = existingLocalStorage;
      }
    });

    it(`does not call localStorage.getItem`, () => {
      expect(localStorageGetItem).not.toHaveBeenCalled();
    });

    it(`does not call localStorage.setItem`, () => {
      expect(localStorageSetItem).not.toHaveBeenCalled();
    });

    it(`does not call localStorage.removeItem`, () => {
      expect(localStorageRemoveItem).not.toHaveBeenCalled();
    });
  });

  describe(`tryGetItem`, () => {
    describe(`when localStorage.getItem returns null`, () => {
      let localStorageGetItem: jasmine.Spy;
      let localStorageSetItem: jasmine.Spy;
      let localStorageRemoveItem: jasmine.Spy;
      let result: null | Schema;

      beforeAll(() => {
        localStorageGetItem = jasmine
          .createSpy(`localStorageGetItem`)
          .and.returnValue(null);
        localStorageSetItem = jasmine.createSpy(`localStorageSetItem`);
        localStorageRemoveItem = jasmine.createSpy(`localStorageRemoveItem`);

        const existingLocalStorage = patchableGlobal.localStorage;

        try {
          patchableGlobal.localStorage = {
            getItem: localStorageGetItem,
            setItem: localStorageSetItem,
            removeItem: localStorageRemoveItem,
          };

          const localStorageHelper = new LocalStorageHelper<Schema>(
            `Test Helper Name`,
            `Test Key Prefix`,
            schema
          );

          result = localStorageHelper.tryGetItem(`Test Key`);
        } finally {
          patchableGlobal.localStorage = existingLocalStorage;
        }
      });

      it(`returns null`, () => {
        expect(result).toBeNull();
      });

      it(`calls localStorage.getItem once`, () => {
        expect(localStorageGetItem).toHaveBeenCalledTimes(1);
      });

      it(`calls localStorage.getItem with the expected key`, () => {
        expect(localStorageGetItem).toHaveBeenCalledWith(
          `Test Key PrefixTest Key`
        );
      });

      it(`does not call localStorage.setItem`, () => {
        expect(localStorageSetItem).not.toHaveBeenCalled();
      });

      it(`does not call localStorage.removeItem`, () => {
        expect(localStorageRemoveItem).not.toHaveBeenCalled();
      });
    });

    describe(`when localStorage.getItem returns non-JSON`, () => {
      let localStorageGetItem: jasmine.Spy;
      let localStorageSetItem: jasmine.Spy;
      let localStorageRemoveItem: jasmine.Spy;
      let error: Error;

      beforeAll(() => {
        localStorageGetItem = jasmine
          .createSpy(`localStorageGetItem`)
          .and.returnValue(`Test Non-JSON`);
        localStorageSetItem = jasmine.createSpy(`localStorageSetItem`);
        localStorageRemoveItem = jasmine.createSpy(`localStorageRemoveItem`);

        const existingLocalStorage = patchableGlobal.localStorage;

        try {
          patchableGlobal.localStorage = {
            getItem: localStorageGetItem,
            setItem: localStorageSetItem,
            removeItem: localStorageRemoveItem,
          };

          const localStorageHelper = new LocalStorageHelper<Schema>(
            `Test Helper Name`,
            `Test Key Prefix`,
            schema
          );

          localStorageHelper.tryGetItem(`Test Key`);
        } catch (ex) {
          error = ex;
        } finally {
          patchableGlobal.localStorage = existingLocalStorage;
        }
      });

      it(`throws the expected error`, () => {
        expect(error).toEqual(
          new Error(
            `Failed to deserialize value for key Test Key PrefixTest Key of localStorage helper Test Helper Name as JSON`
          )
        );
      });

      it(`calls localStorage.getItem once`, () => {
        expect(localStorageGetItem).toHaveBeenCalledTimes(1);
      });

      it(`calls localStorage.getItem with the expected key`, () => {
        expect(localStorageGetItem).toHaveBeenCalledWith(
          `Test Key PrefixTest Key`
        );
      });

      it(`does not call localStorage.setItem`, () => {
        expect(localStorageSetItem).not.toHaveBeenCalled();
      });

      it(`does not call localStorage.removeItem`, () => {
        expect(localStorageRemoveItem).not.toHaveBeenCalled();
      });
    });

    describe(`when localStorage.getItem returns JSON which fails schema validation`, () => {
      let localStorageGetItem: jasmine.Spy;
      let localStorageSetItem: jasmine.Spy;
      let localStorageRemoveItem: jasmine.Spy;
      let error: Error;

      beforeAll(() => {
        localStorageGetItem = jasmine
          .createSpy(`localStorageGetItem`)
          .and.returnValue(`{"testKeyB":4}`);
        localStorageSetItem = jasmine.createSpy(`localStorageSetItem`);
        localStorageRemoveItem = jasmine.createSpy(`localStorageRemoveItem`);

        const existingLocalStorage = patchableGlobal.localStorage;

        try {
          patchableGlobal.localStorage = {
            getItem: localStorageGetItem,
            setItem: localStorageSetItem,
            removeItem: localStorageRemoveItem,
          };

          const localStorageHelper = new LocalStorageHelper<Schema>(
            `Test Helper Name`,
            `Test Key Prefix`,
            schema
          );

          localStorageHelper.tryGetItem(`Test Key`);
        } catch (ex) {
          error = ex;
        } finally {
          patchableGlobal.localStorage = existingLocalStorage;
        }
      });

      it(`throws the expected error`, () => {
        expect(error).toEqual(
          new Error(`Value for key Test Key PrefixTest Key of localStorage helper Test Helper Name failed JSON schema validation:
 - instance must have required property 'testKeyA'
 - instance/testKeyB must be equal to one of the allowed values
 - instance/testKeyB must be string`)
        );
      });

      it(`calls localStorage.getItem once`, () => {
        expect(localStorageGetItem).toHaveBeenCalledTimes(1);
      });

      it(`calls localStorage.getItem with the expected key`, () => {
        expect(localStorageGetItem).toHaveBeenCalledWith(
          `Test Key PrefixTest Key`
        );
      });

      it(`does not call localStorage.setItem`, () => {
        expect(localStorageSetItem).not.toHaveBeenCalled();
      });

      it(`does not call localStorage.removeItem`, () => {
        expect(localStorageRemoveItem).not.toHaveBeenCalled();
      });
    });

    describe(`when localStorage.getItem returns JSON which passes schema validation`, () => {
      let localStorageGetItem: jasmine.Spy;
      let localStorageSetItem: jasmine.Spy;
      let localStorageRemoveItem: jasmine.Spy;
      let result: null | Schema;

      beforeAll(() => {
        localStorageGetItem = jasmine
          .createSpy(`localStorageGetItem`)
          .and.returnValue(
            `{"testKeyA":"Test Value A","testKeyB":"Test Value B"}`
          );
        localStorageSetItem = jasmine.createSpy(`localStorageSetItem`);
        localStorageRemoveItem = jasmine.createSpy(`localStorageRemoveItem`);

        const existingLocalStorage = patchableGlobal.localStorage;

        try {
          patchableGlobal.localStorage = {
            getItem: localStorageGetItem,
            setItem: localStorageSetItem,
            removeItem: localStorageRemoveItem,
          };

          const localStorageHelper = new LocalStorageHelper<Schema>(
            `Test Helper Name`,
            `Test Key Prefix`,
            schema
          );

          result = localStorageHelper.tryGetItem(`Test Key`);
        } finally {
          patchableGlobal.localStorage = existingLocalStorage;
        }
      });

      it(`returns the deserialized value`, () => {
        expect(result).toEqual({
          testKeyA: `Test Value A`,
          testKeyB: `Test Value B`,
        });
      });

      it(`calls localStorage.getItem once`, () => {
        expect(localStorageGetItem).toHaveBeenCalledTimes(1);
      });

      it(`calls localStorage.getItem with the expected key`, () => {
        expect(localStorageGetItem).toHaveBeenCalledWith(
          `Test Key PrefixTest Key`
        );
      });

      it(`does not call localStorage.setItem`, () => {
        expect(localStorageSetItem).not.toHaveBeenCalled();
      });

      it(`does not call localStorage.removeItem`, () => {
        expect(localStorageRemoveItem).not.toHaveBeenCalled();
      });
    });
  });

  describe(`getItem`, () => {
    describe(`when localStorage.getItem returns null`, () => {
      let localStorageGetItem: jasmine.Spy;
      let localStorageSetItem: jasmine.Spy;
      let localStorageRemoveItem: jasmine.Spy;
      let error: Error;

      beforeAll(() => {
        localStorageGetItem = jasmine
          .createSpy(`localStorageGetItem`)
          .and.returnValue(null);
        localStorageSetItem = jasmine.createSpy(`localStorageSetItem`);
        localStorageRemoveItem = jasmine.createSpy(`localStorageRemoveItem`);

        const existingLocalStorage = patchableGlobal.localStorage;

        try {
          patchableGlobal.localStorage = {
            getItem: localStorageGetItem,
            setItem: localStorageSetItem,
            removeItem: localStorageRemoveItem,
          };

          const localStorageHelper = new LocalStorageHelper<Schema>(
            `Test Helper Name`,
            `Test Key Prefix`,
            schema
          );

          localStorageHelper.getItem(`Test Key`);
        } catch (ex) {
          error = ex;
        } finally {
          patchableGlobal.localStorage = existingLocalStorage;
        }
      });

      it(`throws the expected error`, () => {
        expect(error).toEqual(
          new Error(
            `No value for key Test Key PrefixTest Key of localStorage helper Test Helper Name`
          )
        );
      });

      it(`calls localStorage.getItem once`, () => {
        expect(localStorageGetItem).toHaveBeenCalledTimes(1);
      });

      it(`calls localStorage.getItem with the expected key`, () => {
        expect(localStorageGetItem).toHaveBeenCalledWith(
          `Test Key PrefixTest Key`
        );
      });

      it(`does not call localStorage.setItem`, () => {
        expect(localStorageSetItem).not.toHaveBeenCalled();
      });

      it(`does not call localStorage.removeItem`, () => {
        expect(localStorageRemoveItem).not.toHaveBeenCalled();
      });
    });

    describe(`when localStorage.getItem returns non-JSON`, () => {
      let localStorageGetItem: jasmine.Spy;
      let localStorageSetItem: jasmine.Spy;
      let localStorageRemoveItem: jasmine.Spy;
      let error: Error;

      beforeAll(() => {
        localStorageGetItem = jasmine
          .createSpy(`localStorageGetItem`)
          .and.returnValue(`Test Non-JSON`);
        localStorageSetItem = jasmine.createSpy(`localStorageSetItem`);
        localStorageRemoveItem = jasmine.createSpy(`localStorageRemoveItem`);

        const existingLocalStorage = patchableGlobal.localStorage;

        try {
          patchableGlobal.localStorage = {
            getItem: localStorageGetItem,
            setItem: localStorageSetItem,
            removeItem: localStorageRemoveItem,
          };

          const localStorageHelper = new LocalStorageHelper<Schema>(
            `Test Helper Name`,
            `Test Key Prefix`,
            schema
          );

          localStorageHelper.getItem(`Test Key`);
        } catch (ex) {
          error = ex;
        } finally {
          patchableGlobal.localStorage = existingLocalStorage;
        }
      });

      it(`throws the expected error`, () => {
        expect(error).toEqual(
          new Error(
            `Failed to deserialize value for key Test Key PrefixTest Key of localStorage helper Test Helper Name as JSON`
          )
        );
      });

      it(`calls localStorage.getItem once`, () => {
        expect(localStorageGetItem).toHaveBeenCalledTimes(1);
      });

      it(`calls localStorage.getItem with the expected key`, () => {
        expect(localStorageGetItem).toHaveBeenCalledWith(
          `Test Key PrefixTest Key`
        );
      });

      it(`does not call localStorage.setItem`, () => {
        expect(localStorageSetItem).not.toHaveBeenCalled();
      });

      it(`does not call localStorage.removeItem`, () => {
        expect(localStorageRemoveItem).not.toHaveBeenCalled();
      });
    });

    describe(`when localStorage.getItem returns JSON which fails schema validation`, () => {
      let localStorageGetItem: jasmine.Spy;
      let localStorageSetItem: jasmine.Spy;
      let localStorageRemoveItem: jasmine.Spy;
      let error: Error;

      beforeAll(() => {
        localStorageGetItem = jasmine
          .createSpy(`localStorageGetItem`)
          .and.returnValue(`{"testKeyB":4}`);
        localStorageSetItem = jasmine.createSpy(`localStorageSetItem`);
        localStorageRemoveItem = jasmine.createSpy(`localStorageRemoveItem`);

        const existingLocalStorage = patchableGlobal.localStorage;

        try {
          patchableGlobal.localStorage = {
            getItem: localStorageGetItem,
            setItem: localStorageSetItem,
            removeItem: localStorageRemoveItem,
          };

          const localStorageHelper = new LocalStorageHelper<Schema>(
            `Test Helper Name`,
            `Test Key Prefix`,
            schema
          );

          localStorageHelper.getItem(`Test Key`);
        } catch (ex) {
          error = ex;
        } finally {
          patchableGlobal.localStorage = existingLocalStorage;
        }
      });

      it(`throws the expected error`, () => {
        expect(error).toEqual(
          new Error(`Value for key Test Key PrefixTest Key of localStorage helper Test Helper Name failed JSON schema validation:
 - instance must have required property 'testKeyA'
 - instance/testKeyB must be equal to one of the allowed values
 - instance/testKeyB must be string`)
        );
      });

      it(`calls localStorage.getItem once`, () => {
        expect(localStorageGetItem).toHaveBeenCalledTimes(1);
      });

      it(`calls localStorage.getItem with the expected key`, () => {
        expect(localStorageGetItem).toHaveBeenCalledWith(
          `Test Key PrefixTest Key`
        );
      });

      it(`does not call localStorage.setItem`, () => {
        expect(localStorageSetItem).not.toHaveBeenCalled();
      });

      it(`does not call localStorage.removeItem`, () => {
        expect(localStorageRemoveItem).not.toHaveBeenCalled();
      });
    });

    describe(`when localStorage.getItem returns JSON which passes schema validation`, () => {
      let localStorageGetItem: jasmine.Spy;
      let localStorageSetItem: jasmine.Spy;
      let localStorageRemoveItem: jasmine.Spy;
      let result: null | Schema;

      beforeAll(() => {
        localStorageGetItem = jasmine
          .createSpy(`localStorageGetItem`)
          .and.returnValue(
            `{"testKeyA":"Test Value A","testKeyB":"Test Value B"}`
          );
        localStorageSetItem = jasmine.createSpy(`localStorageSetItem`);
        localStorageRemoveItem = jasmine.createSpy(`localStorageRemoveItem`);

        const existingLocalStorage = patchableGlobal.localStorage;

        try {
          patchableGlobal.localStorage = {
            getItem: localStorageGetItem,
            setItem: localStorageSetItem,
            removeItem: localStorageRemoveItem,
          };

          const localStorageHelper = new LocalStorageHelper<Schema>(
            `Test Helper Name`,
            `Test Key Prefix`,
            schema
          );

          result = localStorageHelper.getItem(`Test Key`);
        } finally {
          patchableGlobal.localStorage = existingLocalStorage;
        }
      });

      it(`returns the deserialized value`, () => {
        expect(result).toEqual({
          testKeyA: `Test Value A`,
          testKeyB: `Test Value B`,
        });
      });

      it(`calls localStorage.getItem once`, () => {
        expect(localStorageGetItem).toHaveBeenCalledTimes(1);
      });

      it(`calls localStorage.getItem with the expected key`, () => {
        expect(localStorageGetItem).toHaveBeenCalledWith(
          `Test Key PrefixTest Key`
        );
      });

      it(`does not call localStorage.setItem`, () => {
        expect(localStorageSetItem).not.toHaveBeenCalled();
      });

      it(`does not call localStorage.removeItem`, () => {
        expect(localStorageRemoveItem).not.toHaveBeenCalled();
      });
    });
  });

  describe(`setItem`, () => {
    let localStorageGetItem: jasmine.Spy;
    let localStorageSetItem: jasmine.Spy;
    let localStorageRemoveItem: jasmine.Spy;

    beforeAll(() => {
      localStorageGetItem = jasmine.createSpy(`localStorageGetItem`);
      localStorageSetItem = jasmine.createSpy(`localStorageSetItem`);
      localStorageRemoveItem = jasmine.createSpy(`localStorageRemoveItem`);

      const existingLocalStorage = patchableGlobal.localStorage;

      try {
        patchableGlobal.localStorage = {
          getItem: localStorageGetItem,
          setItem: localStorageSetItem,
          removeItem: localStorageRemoveItem,
        };

        const localStorageHelper = new LocalStorageHelper<Schema>(
          `Test Helper Name`,
          `Test Key Prefix`,
          schema
        );

        localStorageHelper.setItem(`Test Key`, {
          testKeyA: `Test Value A`,
          testKeyB: `Test Value B`,
        });
      } finally {
        patchableGlobal.localStorage = existingLocalStorage;
      }
    });

    it(`does not call localStorage.getItem`, () => {
      expect(localStorageGetItem).not.toHaveBeenCalled();
    });

    it(`calls localStorage.setItem once`, () => {
      expect(localStorageSetItem).toHaveBeenCalledTimes(1);
    });

    it(`calls localStorage.setItem with the correct key`, () => {
      expect(localStorageSetItem).toHaveBeenCalledWith(
        `Test Key PrefixTest Key`,
        jasmine.any(String)
      );
    });

    it(`calls localStorage.setItem with the correct value`, () => {
      expect(localStorageSetItem).toHaveBeenCalledWith(
        jasmine.any(String),
        `{"testKeyA":"Test Value A","testKeyB":"Test Value B"}`
      );
    });

    it(`does not call localStorage.removeItem`, () => {
      expect(localStorageRemoveItem).not.toHaveBeenCalled();
    });
  });

  describe(`removeItem`, () => {
    let localStorageGetItem: jasmine.Spy;
    let localStorageSetItem: jasmine.Spy;
    let localStorageRemoveItem: jasmine.Spy;

    beforeAll(() => {
      localStorageGetItem = jasmine.createSpy(`localStorageGetItem`);
      localStorageSetItem = jasmine.createSpy(`localStorageSetItem`);
      localStorageRemoveItem = jasmine.createSpy(`localStorageRemoveItem`);

      const existingLocalStorage = patchableGlobal.localStorage;

      try {
        patchableGlobal.localStorage = {
          getItem: localStorageGetItem,
          setItem: localStorageSetItem,
          removeItem: localStorageRemoveItem,
        };

        const localStorageHelper = new LocalStorageHelper<Schema>(
          `Test Helper Name`,
          `Test Key Prefix`,
          schema
        );

        localStorageHelper.removeItem(`Test Key`);
      } finally {
        patchableGlobal.localStorage = existingLocalStorage;
      }
    });

    it(`does not call localStorage.getItem`, () => {
      expect(localStorageGetItem).not.toHaveBeenCalled();
    });

    it(`does not call localStorage.setItem`, () => {
      expect(localStorageSetItem).not.toHaveBeenCalled();
    });

    it(`calls localStorage.removeItem once`, () => {
      expect(localStorageRemoveItem).toHaveBeenCalledTimes(1);
    });

    it(`calls localStorage.removeItem with the correct key`, () => {
      expect(localStorageRemoveItem).toHaveBeenCalledWith(
        `Test Key PrefixTest Key`
      );
    });
  });

  describe(`listKeys`, () => {
    let localStorageGetItem: jasmine.Spy;
    let localStorageSetItem: jasmine.Spy;
    let localStorageRemoveItem: jasmine.Spy;
    let result: ReadonlyArray<string>;

    beforeAll(() => {
      localStorageGetItem = jasmine.createSpy(`localStorageGetItem`);
      localStorageSetItem = jasmine.createSpy(`localStorageSetItem`);
      localStorageRemoveItem = jasmine.createSpy(`localStorageRemoveItem`);

      const existingLocalStorage = patchableGlobal.localStorage;

      try {
        patchableGlobal.localStorage = {
          getItem: localStorageGetItem,
          setItem: localStorageSetItem,
          removeItem: localStorageRemoveItem,
          "Test Key PrefixtestKeyA": `Test Value A`,
          "Test Other Key PrefixtestKeyC": `Test Value C`,
          "Test Key PrefixtestKeyD": `Test Value D`,
          "Test Other Key PrefixtestKeyF": `Test Value F`,
          "Test Other Key PrefixtestKeyE": `Test Value E`,
          "Test Key PrefixtestKeyB": `Test Value B`,
        };

        const localStorageHelper = new LocalStorageHelper<Schema>(
          `Test Helper Name`,
          `Test Key Prefix`,
          schema
        );

        result = localStorageHelper.listKeys();
      } finally {
        patchableGlobal.localStorage = existingLocalStorage;
      }
    });

    it(`returns the applicable key suffixes`, () => {
      expect(result).toEqual([`testKeyA`, `testKeyB`, `testKeyD`]);
    });

    it(`does not call localStorage.getItem`, () => {
      expect(localStorageGetItem).not.toHaveBeenCalled();
    });

    it(`does not call localStorage.setItem`, () => {
      expect(localStorageSetItem).not.toHaveBeenCalled();
    });

    it(`does not call localStorage.removeItem`, () => {
      expect(localStorageRemoveItem).not.toHaveBeenCalled();
    });
  });
});
