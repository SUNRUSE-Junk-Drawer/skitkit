import * as ajv from "ajv";
import { Json } from "..";
import { ajvInstance } from "../ajv-instance";

export function accepts(
  description: string,
  instance: Json,
  schema: ajv.JSONSchemaType<Json>
): void {
  describe(description, () => {
    let validator: ajv.ValidateFunction;
    let validationResult: boolean;

    beforeAll(() => {
      validator = ajvInstance.compile(schema);
      validationResult = validator(instance);
    });

    it(`is valid`, () => {
      expect(validationResult).toBeTrue();
    });

    it(`has no errors`, () => {
      expect(validator.errors).toBeNull();
    });
  });
}

export function rejects(
  description: string,
  instance: Json,
  schema: ajv.JSONSchemaType<Json>,
  errors: null | ReadonlyArray<string>
): void {
  describe(description, () => {
    let validator: ajv.ValidateFunction;
    let validationResult: boolean;

    beforeAll(() => {
      validator = ajvInstance.compile(schema);
      validationResult = validator(instance);
    });

    it(`is not valid`, () => {
      expect(validationResult).toBeFalse();
    });

    if (errors !== null) {
      it(`has the expected errors`, () => {
        for (const error of errors) {
          expect(
            (validator.errors ?? []).map(
              (error) => `instance${error.instancePath} ${error.message}`
            )
          ).toContain(error);
        }
      });

      it(`has no unexpected errors`, () => {
        for (const error of validator.errors ?? []) {
          expect(errors).toContain(
            `instance${error.instancePath} ${error.message}`
          );
        }
      });
    }
  });
}

export function rejectsNonObjects(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instanceFactory: (nonObject: Json) => Json
): void {
  describe(description, () => {
    rejects(
      `empty strings`,
      instanceFactory(``),
      schema,
      unpredictableErrors ? null : [`${path} must be object`]
    );

    rejects(
      `non-empty strings`,
      instanceFactory(`Test Non-Empty String`),
      schema,
      unpredictableErrors ? null : [`${path} must be object`]
    );

    rejects(
      `zero`,
      instanceFactory(0),
      schema,
      unpredictableErrors ? null : [`${path} must be object`]
    );

    rejects(
      `negative zero`,
      instanceFactory(-0),
      schema,
      unpredictableErrors ? null : [`${path} must be object`]
    );

    rejects(
      `positive integers`,
      instanceFactory(326),
      schema,
      unpredictableErrors ? null : [`${path} must be object`]
    );

    rejects(
      `negative integers`,
      instanceFactory(-326),
      schema,
      unpredictableErrors ? null : [`${path} must be object`]
    );

    rejects(
      `positive decimals`,
      instanceFactory(32.6),
      schema,
      unpredictableErrors ? null : [`${path} must be object`]
    );

    rejects(
      `negative decimals`,
      instanceFactory(-32.6),
      schema,
      unpredictableErrors ? null : [`${path} must be object`]
    );

    rejects(
      `empty arrays`,
      instanceFactory([]),
      schema,
      unpredictableErrors ? null : [`${path} must be object`]
    );
  });
}

export function rejectsNonArrays(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instanceFactory: (nonObject: Json) => Json
): void {
  describe(description, () => {
    rejects(
      `empty strings`,
      instanceFactory(``),
      schema,
      unpredictableErrors ? null : [`${path} must be array`]
    );

    rejects(
      `non-empty strings`,
      instanceFactory(`Test Non-Empty String`),
      schema,
      unpredictableErrors ? null : [`${path} must be array`]
    );

    rejects(
      `zero`,
      instanceFactory(0),
      schema,
      unpredictableErrors ? null : [`${path} must be array`]
    );

    rejects(
      `negative zero`,
      instanceFactory(-0),
      schema,
      unpredictableErrors ? null : [`${path} must be array`]
    );

    rejects(
      `positive integers`,
      instanceFactory(326),
      schema,
      unpredictableErrors ? null : [`${path} must be array`]
    );

    rejects(
      `negative integers`,
      instanceFactory(-326),
      schema,
      unpredictableErrors ? null : [`${path} must be array`]
    );

    rejects(
      `positive decimals`,
      instanceFactory(32.6),
      schema,
      unpredictableErrors ? null : [`${path} must be array`]
    );

    rejects(
      `negative decimals`,
      instanceFactory(-32.6),
      schema,
      unpredictableErrors ? null : [`${path} must be array`]
    );

    rejects(
      `empty object`,
      instanceFactory({}),
      schema,
      unpredictableErrors ? null : [`${path} must be array`]
    );
  });
}

export function rejectsMissingProperty(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instance: Json
): void {
  describe(description, () => {
    rejects(
      `missing`,
      instance,
      schema,
      unpredictableErrors
        ? null
        : [`${path} must have required property '${description}'`]
    );
  });
}

export function rejectsOtherThanExpectedString(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  expected: string,
  unpredictableErrors: boolean,
  instanceFactory: (text: Json) => Json
): void {
  describe(description, () => {
    rejects(
      `empty strings`,
      instanceFactory(``),
      schema,
      unpredictableErrors
        ? null
        : [`${path} must be equal to one of the allowed values`]
    );

    rejects(
      `unexpected strings`,
      instanceFactory(`Test Unexpected String`),
      schema,
      unpredictableErrors
        ? null
        : [`${path} must be equal to one of the allowed values`]
    );

    rejects(
      `preceded by white space`,
      instanceFactory(` ${expected}`),
      schema,
      unpredictableErrors
        ? null
        : [`${path} must be equal to one of the allowed values`]
    );

    rejects(
      `followed by white space`,
      instanceFactory(`${expected} `),
      schema,
      unpredictableErrors
        ? null
        : [`${path} must be equal to one of the allowed values`]
    );

    if (expected !== expected.toUpperCase()) {
      rejects(
        `in upper case`,
        instanceFactory(expected.toUpperCase()),
        schema,
        unpredictableErrors
          ? null
          : [`${path} must be equal to one of the allowed values`]
      );
    }

    if (expected !== expected.toLowerCase()) {
      rejects(
        `in lower case`,
        instanceFactory(expected.toLowerCase()),
        schema,
        unpredictableErrors
          ? null
          : [`${path} must be equal to one of the allowed values`]
      );
    }

    rejects(
      `zero`,
      instanceFactory(0),
      schema,
      unpredictableErrors
        ? null
        : [
            `${path} must be string`,
            `${path} must be equal to one of the allowed values`,
          ]
    );

    rejects(
      `negative zero`,
      instanceFactory(-0),
      schema,
      unpredictableErrors
        ? null
        : [
            `${path} must be string`,
            `${path} must be equal to one of the allowed values`,
          ]
    );

    rejects(
      `positive integers`,
      instanceFactory(326),
      schema,
      unpredictableErrors
        ? null
        : [
            `${path} must be string`,
            `${path} must be equal to one of the allowed values`,
          ]
    );

    rejects(
      `negative integers`,
      instanceFactory(-326),
      schema,
      unpredictableErrors
        ? null
        : [
            `${path} must be string`,
            `${path} must be equal to one of the allowed values`,
          ]
    );

    rejects(
      `positive decimals`,
      instanceFactory(32.6),
      schema,
      unpredictableErrors
        ? null
        : [
            `${path} must be string`,
            `${path} must be equal to one of the allowed values`,
          ]
    );

    rejects(
      `negative decimals`,
      instanceFactory(-32.6),
      schema,
      unpredictableErrors
        ? null
        : [
            `${path} must be string`,
            `${path} must be equal to one of the allowed values`,
          ]
    );

    rejects(
      `empty arrays`,
      instanceFactory([]),
      schema,
      unpredictableErrors
        ? null
        : [
            `${path} must be string`,
            `${path} must be equal to one of the allowed values`,
          ]
    );

    rejects(
      `empty objects`,
      instanceFactory({}),
      schema,
      unpredictableErrors
        ? null
        : [
            `${path} must be string`,
            `${path} must be equal to one of the allowed values`,
          ]
    );
  });
}

export function validateUnpaddedString(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  length: number,
  unpredictableErrors: boolean,
  instanceFactory: (name: Json) => Json
): void {
  describe(description, () => {
    accepts(`single character`, instanceFactory(`T`), schema);

    rejects(
      `single white space character`,
      instanceFactory(` `),
      schema,
      unpredictableErrors
        ? null
        : [`${path} must match pattern "^\\S(?:.*\\S)?$"`]
    );

    rejects(
      `single character with preceding white space`,
      instanceFactory(` T`),
      schema,
      unpredictableErrors
        ? null
        : [`${path} must match pattern "^\\S(?:.*\\S)?$"`]
    );

    rejects(
      `single character with trailing white space`,
      instanceFactory(`T `),
      schema,
      unpredictableErrors
        ? null
        : [`${path} must match pattern "^\\S(?:.*\\S)?$"`]
    );

    accepts(`two characters`, instanceFactory(`Te`), schema);

    rejects(
      `two white space characters`,
      instanceFactory(`  `),
      schema,
      unpredictableErrors
        ? null
        : [`${path} must match pattern "^\\S(?:.*\\S)?$"`]
    );

    rejects(
      `two characters with preceding white space`,
      instanceFactory(` Te`),
      schema,
      unpredictableErrors
        ? null
        : [`${path} must match pattern "^\\S(?:.*\\S)?$"`]
    );

    rejects(
      `two characters with trailing white space`,
      instanceFactory(`Te `),
      schema,
      unpredictableErrors
        ? null
        : [`${path} must match pattern "^\\S(?:.*\\S)?$"`]
    );

    accepts(`three characters`, instanceFactory(`Tes`), schema);
    accepts(
      `three characters containing white space`,
      instanceFactory(`T s`),
      schema
    );

    rejects(
      `three white space characters`,
      instanceFactory(`   `),
      schema,
      unpredictableErrors
        ? null
        : [`${path} must match pattern "^\\S(?:.*\\S)?$"`]
    );

    rejects(
      `three characters with preceding white space`,
      instanceFactory(` Tes`),
      schema,
      unpredictableErrors
        ? null
        : [`${path} must match pattern "^\\S(?:.*\\S)?$"`]
    );

    rejects(
      `three characters with trailing white space`,
      instanceFactory(`Tes `),
      schema,
      unpredictableErrors
        ? null
        : [`${path} must match pattern "^\\S(?:.*\\S)?$"`]
    );

    accepts(`many characters`, instanceFactory(`Test Valid Name`), schema);

    rejects(
      `many characters with preceding white space`,
      instanceFactory(` Test Valid Name`),
      schema,
      unpredictableErrors
        ? null
        : [`${path} must match pattern "^\\S(?:.*\\S)?$"`]
    );

    rejects(
      `many characters with trailing white space`,
      instanceFactory(`Test Valid Name `),
      schema,
      unpredictableErrors
        ? null
        : [`${path} must match pattern "^\\S(?:.*\\S)?$"`]
    );

    accepts(`the length limit`, instanceFactory(`T`.repeat(length)), schema);

    rejects(
      `beyond the length limit`,
      instanceFactory(`T`.repeat(length + 1)),
      schema,
      unpredictableErrors
        ? null
        : [`${path} must NOT have more than ${length} characters`]
    );

    rejects(
      `null`,
      instanceFactory(null),
      schema,
      unpredictableErrors ? null : [`${path} must be string`]
    );

    rejects(
      `empty strings`,
      instanceFactory(``),
      schema,
      unpredictableErrors
        ? null
        : [`${path} must match pattern "^\\S(?:.*\\S)?$"`]
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
