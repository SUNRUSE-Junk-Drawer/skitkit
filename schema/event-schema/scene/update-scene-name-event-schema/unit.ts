import * as ajv from "ajv";
import {
  accepts,
  rejectsMissingProperty,
  rejectsOtherThanExpectedString,
  rejectsNonObjects,
} from "../../../unit";
import { validateUuidSchema } from "../../../uuid-schema/unit";
import { validateNameSchema } from "../../../name-schema/unit";
import { Json, updateSceneNameEventSchema } from "../../../..";

export function validateUpdateSceneNameEventSchema(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instanceFactory: (updateSceneNameEvent: Json) => Json
): void {
  describe(description, () => {
    accepts(
      `valid`,
      instanceFactory({
        type: `updateSceneName`,
        sceneUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
        name: `Test Name`,
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
        name: `Test Name`,
      })
    );

    rejectsOtherThanExpectedString(
      `type`,
      schema,
      `${path}/type`,
      `updateSceneName`,
      unpredictableErrors,
      (type) =>
        instanceFactory({
          type,
          sceneUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
          name: `Test Name`,
        })
    );

    rejectsMissingProperty(
      `sceneUuid`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        type: `updateSceneName`,
        name: `Test Name`,
      })
    );

    validateUuidSchema(
      `sceneUuid`,
      schema,
      `${path}/sceneUuid`,
      unpredictableErrors,
      (sceneUuid) =>
        instanceFactory({
          type: `updateSceneName`,
          sceneUuid,
          name: `Test Name`,
        })
    );

    rejectsMissingProperty(
      `name`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        type: `updateSceneName`,
        sceneUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
      })
    );

    validateNameSchema(
      `name`,
      schema,
      `${path}/name`,
      unpredictableErrors,
      (name) =>
        instanceFactory({
          type: `updateSceneName`,
          sceneUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
          name,
        })
    );
  });
}

rejectsNonObjects(
  `updateSceneNameEventSchema`,
  updateSceneNameEventSchema,
  `instance`,
  false,
  (nonObject) => nonObject
);

validateUpdateSceneNameEventSchema(
  `updateSceneNameEventSchema`,
  updateSceneNameEventSchema,
  `instance`,
  false,
  (updateSceneNameEvent) => updateSceneNameEvent
);
