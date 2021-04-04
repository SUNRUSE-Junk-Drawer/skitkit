import * as ajv from "ajv";
import { validateCreateBackgroundEventSchema } from "./background/create-background-event-schema/unit";
import { validateDeleteBackgroundEventSchema } from "./background/delete-background-event-schema/unit";
import { validateUpdateBackgroundNameEventSchema } from "./background/update-background-name-event-schema/unit";
import { validateUpdateBackgroundSvgEventSchema } from "./background/update-background-svg-event-schema/unit";
import { validateCreateCharacterEventSchema } from "./character/create-character-event-schema/unit";
import { validateDeleteCharacterEventSchema } from "./character/delete-character-event-schema/unit";
import { validateUpdateCharacterNameEventSchema } from "./character/update-character-name-event-schema/unit";
import { validateCreateEmoteEventSchema } from "./emote/create-emote-event-schema/unit";
import { validateDeleteEmoteEventSchema } from "./emote/delete-emote-event-schema/unit";
import { validateUpdateEmoteNameEventSchema } from "./emote/update-emote-name-event-schema/unit";
import { validateUpdateEmoteSvgEventSchema } from "./emote/update-emote-svg-event-schema/unit";
import { validateCreateStartingLineEventSchema } from "./line/create-starting-line-event-schema/unit";
import { validateUpdateLineCharacterEmoteEventSchema } from "./line/update-line-character-emote-event-schema/unit";
import { validateUpdateLineTextEventSchema } from "./line/update-line-text-event-schema/unit";
import { validateCreateSceneEventSchema } from "./scene/create-scene-event-schema/unit";
import { validateDeleteSceneEventSchema } from "./scene/delete-scene-event-schema/unit";
import { validateUpdateSceneBackgroundEventSchema } from "./scene/update-scene-background-event-schema/unit";
import { validateUpdateSceneNameEventSchema } from "./scene/update-scene-name-event-schema/unit";
import { validateUpdateNameEventSchema } from "./update-name-event-schema/unit";
import { rejectsNonObjects } from "../unit";
import { eventSchema, Json } from "../..";

export function validateEventSchema(
  description: string,
  schema: ajv.JSONSchemaType<Json>,
  path: string,
  instanceFactory: (event: Json) => Json
): void {
  describe(description, () => {
    rejectsNonObjects(`eventSchema`, schema, path, true, instanceFactory);

    validateCreateBackgroundEventSchema(
      `createBackgroundEvent`,
      schema,
      path,
      true,
      instanceFactory
    );

    validateDeleteBackgroundEventSchema(
      `deleteBackgroundEvent`,
      schema,
      path,
      true,
      instanceFactory
    );

    validateUpdateBackgroundNameEventSchema(
      `updateBackgroundNameEvent`,
      schema,
      path,
      true,
      instanceFactory
    );

    validateUpdateBackgroundSvgEventSchema(
      `updateBackgroundSvgEvent`,
      schema,
      path,
      true,
      instanceFactory
    );

    validateCreateCharacterEventSchema(
      `createCharacterEvent`,
      schema,
      path,
      true,
      instanceFactory
    );

    validateDeleteCharacterEventSchema(
      `deleteCharacterEvent`,
      schema,
      path,
      true,
      instanceFactory
    );

    validateUpdateCharacterNameEventSchema(
      `updateCharacterNameEvent`,
      schema,
      path,
      true,
      instanceFactory
    );

    validateCreateEmoteEventSchema(
      `createEmoteEvent`,
      schema,
      path,
      true,
      instanceFactory
    );

    validateDeleteEmoteEventSchema(
      `deleteEmoteEvent`,
      schema,
      path,
      true,
      instanceFactory
    );

    validateUpdateEmoteNameEventSchema(
      `updateEmoteNameEvent`,
      schema,
      path,
      true,
      instanceFactory
    );

    validateUpdateEmoteSvgEventSchema(
      `updateEmoteSvgEvent`,
      schema,
      path,
      true,
      instanceFactory
    );

    validateCreateStartingLineEventSchema(
      `createStartingLineEvent`,
      schema,
      path,
      true,
      instanceFactory
    );

    validateUpdateLineCharacterEmoteEventSchema(
      `updateLineCharacterEmoteEvent`,
      schema,
      path,
      true,
      instanceFactory
    );

    validateUpdateLineTextEventSchema(
      `updateLineTextEvent`,
      schema,
      path,
      true,
      instanceFactory
    );

    validateCreateSceneEventSchema(
      `createSceneEvent`,
      schema,
      path,
      true,
      instanceFactory
    );

    validateDeleteSceneEventSchema(
      `deleteSceneEvent`,
      schema,
      path,
      true,
      instanceFactory
    );

    validateUpdateSceneBackgroundEventSchema(
      `updateSceneNameEvent`,
      schema,
      path,
      true,
      instanceFactory
    );

    validateUpdateSceneNameEventSchema(
      `updateSceneNameEvent`,
      schema,
      path,
      true,
      instanceFactory
    );

    validateUpdateNameEventSchema(
      `updateNameEvent`,
      schema,
      path,
      true,
      instanceFactory
    );
  });
}

validateEventSchema(`eventSchema`, eventSchema, `instance`, (event) => event);
