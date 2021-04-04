import { histories } from ".";
import { historySchema } from "../history";

describe(`histories`, () => {
  it(`uses the expected name`, () => {
    expect(histories.name).toEqual(`histories`);
  });

  it(`uses the expected prefix`, () => {
    expect(histories.keyPrefix).toEqual(`skitKitHistory`);
  });

  it(`uses the expected schema`, () => {
    expect(histories.schema).toBe(historySchema);
  });
});
