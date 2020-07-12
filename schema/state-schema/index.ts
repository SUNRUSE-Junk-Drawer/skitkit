import * as jsonschema from "jsonschema";
import { NameSchema, nameSchema } from "../name-schema";
import { EmoteStateSchema, emoteStateSchema } from "./emote-state-schema";
import { SceneStateSchema, sceneStateSchema } from "./scene-state-schema";
import { LineStateSchema, lineStateSchema } from "./line-state-schema";
import {
  CharacterStateSchema,
  characterStateSchema,
} from "./character-state-schema";
import {
  BackgroundStateSchema,
  backgroundStateSchema,
} from "./background-state-schema";

export const stateSchema: jsonschema.Schema = {
  $schema: `http://json-schema.org/draft-04/schema#`,
  type: `object`,
  additionalProperties: false,
  required: [`name`, `backgrounds`, `characters`, `emotes`, `scenes`, `lines`],
  properties: {
    name: nameSchema,
    backgrounds: {
      type: `object`,
      additionalProperties: false,
      patternProperties: {
        "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$": backgroundStateSchema,
      },
    },
    characters: {
      type: `object`,
      additionalProperties: false,
      patternProperties: {
        "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$": characterStateSchema,
      },
    },
    emotes: {
      type: `object`,
      additionalProperties: false,
      patternProperties: {
        "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$": emoteStateSchema,
      },
    },
    scenes: {
      type: `object`,
      additionalProperties: false,
      patternProperties: {
        "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$": sceneStateSchema,
      },
    },
    lines: {
      type: `object`,
      additionalProperties: false,
      patternProperties: {
        "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$": lineStateSchema,
      },
    },
  },
};

export type StateSchema = {
  readonly name: NameSchema;
  readonly backgrounds: {
    readonly [backgroundUuid: string]: BackgroundStateSchema;
  };
  readonly characters: {
    readonly [characterUuid: string]: CharacterStateSchema;
  };
  readonly emotes: {
    readonly [emoteUuid: string]: EmoteStateSchema;
  };
  readonly scenes: {
    readonly [sceneUuid: string]: SceneStateSchema;
  };
  readonly lines: {
    readonly [lineUuid: string]: LineStateSchema;
  };
};
