import * as ajv from "ajv";
import {
  accepts,
  rejectsMissingProperty,
  rejectsOtherThanExpectedString,
  rejectsNonObjects,
} from "../../../unit";
import { validateUuidSchema } from "../../../uuid-schema/unit";
import { Json, deleteSceneEventSchema } from "../../../..";

export function validateDeleteSceneEventSchema(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instanceFactory: (deleteSceneEvent: Json) => Json
): void {
  describe(description, () => {
    accepts(
      `valid`,
      instanceFactory({
        type: `deleteScene`,
        sceneUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
      }),
      schema
    );

    rejectsMissingProperty(
      `type`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        sceneUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
      })
    );

    rejectsOtherThanExpectedString(
      `type`,
      schema,
      `${path}/type`,
      `deleteScene`,
      unpredictableErrors,
      (type) =>
        instanceFactory({
          type,
          sceneUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
        })
    );

    rejectsMissingProperty(
      `sceneUuid`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        type: `deleteScene`,
      })
    );

    validateUuidSchema(
      `sceneUuid`,
      schema,
      `${path}/sceneUuid`,
      unpredictableErrors,
      (sceneUuid) =>
        instanceFactory({
          type: `deleteScene`,
          sceneUuid,
        })
    );
  });
}

rejectsNonObjects(
  `deleteSceneEventSchema`,
  deleteSceneEventSchema,
  `instance`,
  false,
  (nonObject) => nonObject
);

validateDeleteSceneEventSchema(
  `deleteSceneEventSchema`,
  deleteSceneEventSchema,
  `instance`,
  false,
  (deleteSceneEvent) => deleteSceneEvent
);
