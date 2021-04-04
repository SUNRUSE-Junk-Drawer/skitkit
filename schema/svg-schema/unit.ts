import * as ajv from "ajv";
import { accepts, rejects } from "../unit";
import { Json, svgSchema } from "../..";

export function validateSvgSchema(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instanceFactory: (svg: Json) => Json
): void {
  describe(description, () => {
    accepts(`single character`, instanceFactory(`T`), schema);

    accepts(
      `the length limit`,
      instanceFactory(`T`.repeat(1024 * 1024)),
      schema
    );

    rejects(
      `beyond the length limit`,
      instanceFactory(`T`.repeat(1024 * 1024 + 1)),
      schema,
      unpredictableErrors
        ? null
        : [`${path} must NOT have more than 1048576 characters`]
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
        : [`${path} must NOT have fewer than 1 characters`]
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

validateSvgSchema(`svgSchema`, svgSchema, `instance`, false, (svg) => svg);
