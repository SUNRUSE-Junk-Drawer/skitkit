import * as ajv from "ajv";
import { accepts, rejects, rejectsNonObjects } from "../unit";
import { Json, uuidSchema } from "../..";

export function forEachInvalidUuid(
  callback: (description: string, value: string) => void
): void {
  callback(`empty strings`, ``);

  callback(`capitalized uuids`, `A366E69C-D60E-4E27-BD18-7AEA8257BCDB`);

  callback(`unhyphenated uuids`, `a366e69cd60e4e27bd187aea8257bcdb`);

  callback(`braced uuids`, `{a366e69c-d60e-4e27-bd18-7aea8257bcdb}`);

  callback(`extended uuids`, `a366e69c-d60e-4e27-bd18-7aea8257bcdbe`);

  callback(`truncated uuids`, `a366e69c-d60e-4e27-bd18-7aea8257bcd`);

  callback(
    `uuids with preceding white space`,
    ` a366e69c-d60e-4e27-bd18-7aea8257bcdb`
  );

  callback(
    `uuids with trailing white space`,
    `a366e69c-d60e-4e27-bd18-7aea8257bcdb `
  );
}

export function validateUuidSchema(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instanceFactory: (uuid: Json) => Json
): void {
  describe(description, () => {
    accepts(
      `valid`,
      instanceFactory(`a366e69c-d60e-4e27-bd18-7aea8257bcdb`),
      schema
    );

    forEachInvalidUuid((description, value) => {
      rejects(
        description,
        instanceFactory(value),
        schema,
        unpredictableErrors
          ? null
          : [
              `${path} must match pattern "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$"`,
            ]
      );
    });

    rejects(
      `null`,
      instanceFactory(null),
      schema,
      unpredictableErrors ? null : [`${path} must be string`]
    );

    rejects(
      `zero`,
      instanceFactory(0),
      schema,
      unpredictableErrors ? null : [`${path} must be string`]
    );

    rejects(
      `negative zero`,
      instanceFactory(-0),
      schema,
      unpredictableErrors ? null : [`${path} must be string`]
    );

    rejects(
      `positive integers`,
      instanceFactory(326),
      schema,
      unpredictableErrors ? null : [`${path} must be string`]
    );

    rejects(
      `negative integers`,
      instanceFactory(-326),
      schema,
      unpredictableErrors ? null : [`${path} must be string`]
    );

    rejects(
      `positive decimals`,
      instanceFactory(32.6),
      schema,
      unpredictableErrors ? null : [`${path} must be string`]
    );

    rejects(
      `negative decimals`,
      instanceFactory(-32.6),
      schema,
      unpredictableErrors ? null : [`${path} must be string`]
    );

    rejects(
      `empty arrays`,
      instanceFactory([]),
      schema,
      unpredictableErrors ? null : [`${path} must be string`]
    );

    rejects(
      `empty objects`,
      instanceFactory({}),
      schema,
      unpredictableErrors ? null : [`${path} must be string`]
    );
  });
}

validateUuidSchema(`uuidSchema`, uuidSchema, `instance`, false, (uuid) => uuid);

export function validateUuidMapSchema<TValue extends Json>(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instanceFactory: (name: Json) => Json,
  validValueA: TValue,
  validValueB: TValue,
  validValueC: TValue
): void {
  describe(description, () => {
    accepts(`valid empty`, instanceFactory({}), schema);

    accepts(
      `valid with one`,
      instanceFactory({
        "930c204f-28b8-4e19-9b57-4d381fc82107": validValueA,
      }),
      schema
    );

    accepts(
      `valid with two`,
      instanceFactory({
        "930c204f-28b8-4e19-9b57-4d381fc82107": validValueA,
        "b3c27180-f8f9-4bbf-94a3-b50df6056114": validValueB,
      }),
      schema
    );

    accepts(
      `valid with three`,
      instanceFactory({
        "930c204f-28b8-4e19-9b57-4d381fc82107": validValueA,
        "b3c27180-f8f9-4bbf-94a3-b50df6056114": validValueB,
        "6afb0c21-c2e2-414e-a40d-c2fd116f82c7": validValueC,
      }),
      schema
    );

    rejectsNonObjects(
      `non-object`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory
    );

    forEachInvalidUuid((description, value) => {
      rejects(
        `key ${description}`,
        instanceFactory({
          "930c204f-28b8-4e19-9b57-4d381fc82107": validValueA,
          [value]: validValueB,
          "6afb0c21-c2e2-414e-a40d-c2fd116f82c7": validValueC,
        }),
        schema,
        unpredictableErrors
          ? null
          : [`${path} must NOT have additional properties`]
      );
    });
  });
}
