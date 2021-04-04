import * as ajv from "ajv";
import {
  accepts,
  rejectsMissingProperty,
  rejectsOtherThanExpectedString,
  rejectsNonObjects,
} from "../../../unit";
import { validateUuidSchema } from "../../../uuid-schema/unit";
import { Json, createSceneEventSchema } from "../../../..";
import { validateUuidUuidMapSchema } from "../../../uuid-uuid-map-schema/unit";

export function validateCreateSceneEventSchema(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  unpredictableErrors: boolean,
  instanceFactory: (createSceneEvent: Json) => Json
): void {
  describe(description, () => {
    accepts(
      `valid`,
      instanceFactory({
        type: `createScene`,
        sceneUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
        backgroundUuid: `45ff2bbf-7960-4be7-9742-a0d82316a9f1`,
        characterEmoteUuids: {
          "930c204f-28b8-4e19-9b57-4d381fc82107": `0eedaaf6-3273-41df-ac10-0b39aa20ca32`,
          "b3c27180-f8f9-4bbf-94a3-b50df6056114": `d982f79e-c16e-4224-85d9-b93946257052`,
          "6afb0c21-c2e2-414e-a40d-c2fd116f82c7": `4ce28459-6d17-4f33-b63d-3de7969a84cb`,
        },
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
        backgroundUuid: `45ff2bbf-7960-4be7-9742-a0d82316a9f1`,
        characterEmoteUuids: {
          "930c204f-28b8-4e19-9b57-4d381fc82107": `0eedaaf6-3273-41df-ac10-0b39aa20ca32`,
          "b3c27180-f8f9-4bbf-94a3-b50df6056114": `d982f79e-c16e-4224-85d9-b93946257052`,
          "6afb0c21-c2e2-414e-a40d-c2fd116f82c7": `4ce28459-6d17-4f33-b63d-3de7969a84cb`,
        },
      })
    );

    rejectsOtherThanExpectedString(
      `type`,
      schema,
      `${path}/type`,
      `createScene`,
      unpredictableErrors,
      (type) =>
        instanceFactory({
          type,
          sceneUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
          backgroundUuid: `45ff2bbf-7960-4be7-9742-a0d82316a9f1`,
          characterEmoteUuids: {
            "930c204f-28b8-4e19-9b57-4d381fc82107": `0eedaaf6-3273-41df-ac10-0b39aa20ca32`,
            "b3c27180-f8f9-4bbf-94a3-b50df6056114": `d982f79e-c16e-4224-85d9-b93946257052`,
            "6afb0c21-c2e2-414e-a40d-c2fd116f82c7": `4ce28459-6d17-4f33-b63d-3de7969a84cb`,
          },
        })
    );

    rejectsMissingProperty(
      `sceneUuid`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        type: `createScene`,
        backgroundUuid: `45ff2bbf-7960-4be7-9742-a0d82316a9f1`,
        characterEmoteUuids: {
          "930c204f-28b8-4e19-9b57-4d381fc82107": `0eedaaf6-3273-41df-ac10-0b39aa20ca32`,
          "b3c27180-f8f9-4bbf-94a3-b50df6056114": `d982f79e-c16e-4224-85d9-b93946257052`,
          "6afb0c21-c2e2-414e-a40d-c2fd116f82c7": `4ce28459-6d17-4f33-b63d-3de7969a84cb`,
        },
      })
    );

    validateUuidSchema(
      `sceneUuid`,
      schema,
      `${path}/sceneUuid`,
      unpredictableErrors,
      (sceneUuid) =>
        instanceFactory({
          type: `createScene`,
          sceneUuid,
          backgroundUuid: `45ff2bbf-7960-4be7-9742-a0d82316a9f1`,
          characterEmoteUuids: {
            "930c204f-28b8-4e19-9b57-4d381fc82107": `0eedaaf6-3273-41df-ac10-0b39aa20ca32`,
            "b3c27180-f8f9-4bbf-94a3-b50df6056114": `d982f79e-c16e-4224-85d9-b93946257052`,
            "6afb0c21-c2e2-414e-a40d-c2fd116f82c7": `4ce28459-6d17-4f33-b63d-3de7969a84cb`,
          },
        })
    );

    rejectsMissingProperty(
      `backgroundUuid`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        type: `createScene`,
        sceneUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
        characterEmoteUuids: {
          "930c204f-28b8-4e19-9b57-4d381fc82107": `0eedaaf6-3273-41df-ac10-0b39aa20ca32`,
          "b3c27180-f8f9-4bbf-94a3-b50df6056114": `d982f79e-c16e-4224-85d9-b93946257052`,
          "6afb0c21-c2e2-414e-a40d-c2fd116f82c7": `4ce28459-6d17-4f33-b63d-3de7969a84cb`,
        },
      })
    );

    validateUuidSchema(
      `backgroundUuid`,
      schema,
      `${path}/backgroundUuid`,
      unpredictableErrors,
      (backgroundUuid) =>
        instanceFactory({
          type: `createScene`,
          sceneUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
          backgroundUuid,
          characterEmoteUuids: {
            "930c204f-28b8-4e19-9b57-4d381fc82107": `0eedaaf6-3273-41df-ac10-0b39aa20ca32`,
            "b3c27180-f8f9-4bbf-94a3-b50df6056114": `d982f79e-c16e-4224-85d9-b93946257052`,
            "6afb0c21-c2e2-414e-a40d-c2fd116f82c7": `4ce28459-6d17-4f33-b63d-3de7969a84cb`,
          },
        })
    );

    rejectsMissingProperty(
      `characterEmoteUuids`,
      schema,
      path,
      unpredictableErrors,
      instanceFactory({
        type: `createScene`,
        sceneUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
        backgroundUuid: `45ff2bbf-7960-4be7-9742-a0d82316a9f1`,
      })
    );

    validateUuidUuidMapSchema(
      `characterEmoteUuids`,
      schema,
      `${path}/characterEmoteUuids`,
      unpredictableErrors,
      (characterEmoteUuids) =>
        instanceFactory({
          type: `createScene`,
          sceneUuid: `a366e69c-d60e-4e27-bd18-7aea8257bcdb`,
          backgroundUuid: `45ff2bbf-7960-4be7-9742-a0d82316a9f1`,
          characterEmoteUuids,
        })
    );
  });
}

rejectsNonObjects(
  `createSceneEventSchema`,
  createSceneEventSchema,
  `instance`,
  false,
  (nonObject) => nonObject
);

validateCreateSceneEventSchema(
  `createSceneEventSchema`,
  createSceneEventSchema,
  `instance`,
  false,
  (createSceneEvent) => createSceneEvent
);
