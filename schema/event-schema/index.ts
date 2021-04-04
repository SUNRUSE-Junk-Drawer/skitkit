import {
  createBackgroundEventSchema,
  CreateBackgroundEventSchema,
} from "./background/create-background-event-schema";
import {
  deleteBackgroundEventSchema,
  DeleteBackgroundEventSchema,
} from "./background/delete-background-event-schema";
import {
  updateBackgroundNameEventSchema,
  UpdateBackgroundNameEventSchema,
} from "./background/update-background-name-event-schema";
import {
  updateBackgroundSvgEventSchema,
  UpdateBackgroundSvgEventSchema,
} from "./background/update-background-svg-event-schema";
import {
  createCharacterEventSchema,
  CreateCharacterEventSchema,
} from "./character/create-character-event-schema";
import {
  deleteCharacterEventSchema,
  DeleteCharacterEventSchema,
} from "./character/delete-character-event-schema";
import {
  updateCharacterNameEventSchema,
  UpdateCharacterNameEventSchema,
} from "./character/update-character-name-event-schema";
import {
  createEmoteEventSchema,
  CreateEmoteEventSchema,
} from "./emote/create-emote-event-schema";
import {
  deleteEmoteEventSchema,
  DeleteEmoteEventSchema,
} from "./emote/delete-emote-event-schema";
import {
  updateEmoteNameEventSchema,
  UpdateEmoteNameEventSchema,
} from "./emote/update-emote-name-event-schema";
import {
  updateEmoteSvgEventSchema,
  UpdateEmoteSvgEventSchema,
} from "./emote/update-emote-svg-event-schema";
import {
  createStartingLineEventSchema,
  CreateStartingLineEventSchema,
} from "./line/create-starting-line-event-schema";
import {
  updateLineCharacterEmoteEventSchema,
  UpdateLineCharacterEmoteEventSchema,
} from "./line/update-line-character-emote-event-schema";
import {
  updateLineTextEventSchema,
  UpdateLineTextEventSchema,
} from "./line/update-line-text-event-schema";
import {
  createSceneEventSchema,
  CreateSceneEventSchema,
} from "./scene/create-scene-event-schema";
import {
  deleteSceneEventSchema,
  DeleteSceneEventSchema,
} from "./scene/delete-scene-event-schema";
import {
  updateSceneBackgroundEventSchema,
  UpdateSceneBackgroundEventSchema,
} from "./scene/update-scene-background-event-schema";
import {
  updateSceneNameEventSchema,
  UpdateSceneNameEventSchema,
} from "./scene/update-scene-name-event-schema";
import {
  updateNameEventSchema,
  UpdateNameEventSchema,
} from "./update-name-event-schema";

export const eventSchema = {
  $schema: `http://json-schema.org/draft-07/schema#`,
  oneOf: [
    createBackgroundEventSchema,
    deleteBackgroundEventSchema,
    updateBackgroundNameEventSchema,
    updateBackgroundSvgEventSchema,
    createCharacterEventSchema,
    deleteCharacterEventSchema,
    updateCharacterNameEventSchema,
    createEmoteEventSchema,
    deleteEmoteEventSchema,
    updateEmoteNameEventSchema,
    updateEmoteSvgEventSchema,
    createStartingLineEventSchema,
    updateLineCharacterEmoteEventSchema,
    updateLineTextEventSchema,
    createSceneEventSchema,
    deleteSceneEventSchema,
    updateSceneBackgroundEventSchema,
    updateSceneNameEventSchema,
    updateNameEventSchema,
  ],
};

export type EventSchema =
  | CreateBackgroundEventSchema
  | DeleteBackgroundEventSchema
  | UpdateBackgroundNameEventSchema
  | UpdateBackgroundSvgEventSchema
  | CreateCharacterEventSchema
  | DeleteCharacterEventSchema
  | UpdateCharacterNameEventSchema
  | CreateEmoteEventSchema
  | DeleteEmoteEventSchema
  | UpdateEmoteNameEventSchema
  | UpdateEmoteSvgEventSchema
  | CreateStartingLineEventSchema
  | UpdateLineCharacterEmoteEventSchema
  | UpdateLineTextEventSchema
  | CreateSceneEventSchema
  | DeleteSceneEventSchema
  | UpdateSceneBackgroundEventSchema
  | UpdateSceneNameEventSchema
  | UpdateNameEventSchema;
