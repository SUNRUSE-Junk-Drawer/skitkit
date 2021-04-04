import * as ajv from "ajv";
import {
  accepts,
  rejectsMissingProperty,
  rejectsOtherThanExpectedString,
  rejectsNonObjects,
} from "../../../unit";
import { validateUuidSchema } from "../../../uuid-schema/unit";
import { Json, updateSceneBackgroundEventSchema } from "../../../..";

export function validateUpdateSceneBackgroundEventSchema(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instanceFactory: (updateSceneBackgroundEvent: Json) => Json
): void {
  describe(description, () => {
    accepts(
      `valid`,
      instanceFactory({
        type: `updateSceneBackground`,
        sceneUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
        backgroundUuid: `8870dec9-04b8-4d55-adc1-51d70a84a1a4`,
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
        backgroundUuid: `8870dec9-04b8-4d55-adc1-51d70a84a1a4`,
      })
    );

    rejectsOtherThanExpectedString(
      `type`,
      schema,
      `${path}/type`,
      `updateSceneBackground`,
      unpredictableErrors,
      (type) =>
        instanceFactory({
          type,
          sceneUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
          backgroundUuid: `8870dec9-04b8-4d55-adc1-51d70a84a1a4`,
        })
    );

    rejectsMissingProperty(
      `sceneUuid`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        type: `updateSceneBackground`,
        backgroundUuid: `8870dec9-04b8-4d55-adc1-51d70a84a1a4`,
      })
    );

    validateUuidSchema(
      `sceneUuid`,
      schema,
      `${path}/sceneUuid`,
      unpredictableErrors,
      (sceneUuid) =>
        instanceFactory({
          type: `updateSceneBackground`,
          sceneUuid,
          backgroundUuid: `8870dec9-04b8-4d55-adc1-51d70a84a1a4`,
        })
    );

    rejectsMissingProperty(
      `backgroundUuid`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        type: `updateSceneBackground`,
        sceneUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
      })
    );

    validateUuidSchema(
      `backgroundUuid`,
      schema,
      `${path}/backgroundUuid`,
      unpredictableErrors,
      (backgroundUuid) =>
        instanceFactory({
          type: `updateSceneBackground`,
          sceneUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
          backgroundUuid,
        })
    );
  });
}

rejectsNonObjects(
  `updateSceneBackgroundEventSchema`,
  updateSceneBackgroundEventSchema,
  `instance`,
  false,
  (nonObject) => nonObject
);

validateUpdateSceneBackgroundEventSchema(
  `updateSceneBackgroundEventSchema`,
  updateSceneBackgroundEventSchema,
  `instance`,
  false,
  (updateSceneBackgroundEvent) => updateSceneBackgroundEvent
);
