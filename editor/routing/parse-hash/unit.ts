import { parseHash } from ".";

describe(`parseHash`, () => {
  for (const scenario of [
    [``, []],
    [`/`, []],
    [`//`, []],
    [`#`, []],
    [`#/`, []],
    [`#//`, []],
    [`TestLevelA`, [`testlevela`]],
    [`/TestLevelA`, [`testlevela`]],
    [`/TestLevelA/`, [`testlevela`]],
    [`#TestLevelA`, [`testlevela`]],
    [`#/TestLevelA`, [`testlevela`]],
    [`#/TestLevelA/`, [`testlevela`]],
    [`TestLevelA/TestLevelB`, [`testlevela`, `testlevelb`]],
    [`/TestLevelA/TestLevelB`, [`testlevela`, `testlevelb`]],
    [`/TestLevelA/TestLevelB/`, [`testlevela`, `testlevelb`]],
    [`#TestLevelA/TestLevelB`, [`testlevela`, `testlevelb`]],
    [`#/TestLevelA/TestLevelB`, [`testlevela`, `testlevelb`]],
    [`#/TestLevelA/TestLevelB/`, [`testlevela`, `testlevelb`]],
    [
      `TestLevelA/TestLevelB/TestLevelC`,
      [`testlevela`, `testlevelb`, `testlevelc`],
    ],
    [
      `/TestLevelA/TestLevelB/TestLevelC`,
      [`testlevela`, `testlevelb`, `testlevelc`],
    ],
    [
      `/TestLevelA/TestLevelB/TestLevelC/`,
      [`testlevela`, `testlevelb`, `testlevelc`],
    ],
    [
      `#TestLevelA/TestLevelB/TestLevelC`,
      [`testlevela`, `testlevelb`, `testlevelc`],
    ],
    [
      `#/TestLevelA/TestLevelB/TestLevelC`,
      [`testlevela`, `testlevelb`, `testlevelc`],
    ],
    [
      `#/TestLevelA/TestLevelB/TestLevelC/`,
      [`testlevela`, `testlevelb`, `testlevelc`],
    ],
  ] as ReadonlyArray<readonly [string, ReadonlyArray<string>]>) {
    describe(`given ${JSON.stringify(scenario[0])}`, () => {
      let output: ReadonlyArray<string>;

      beforeAll(() => {
        output = parseHash(scenario[0]);
      });

      it(`returns ${JSON.stringify(scenario[1])}`, () => {
        expect(output).toEqual(scenario[1]);
      });
    });
  }
});
