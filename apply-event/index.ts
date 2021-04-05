import { StateSchema } from "../schema/state-schema";
import { EventSchema } from "../schema/event-schema";
import { UuidSchema } from "../schema/uuid-schema";
import { EventApplicationResult } from "../types/event-application-result";
import { BackgroundStateSchema } from "../schema/state-schema/background-state-schema";
import { CharacterStateSchema } from "../schema/state-schema/character-state-schema";
import { EmoteStateSchema } from "../schema/state-schema/emote-state-schema";
import { LineCharacterStateSchema } from "../schema/state-schema/line-state-schema/line-character-state-schema";
import { LineStateSchema } from "../schema/state-schema/line-state-schema";
import { SceneStateSchema } from "../schema/state-schema/scene-state-schema";

export const placeholderSvg = `<svg xmlns="http://www.w3.org/2000/svg" height="256" width="256"><defs><linearGradient y2="256" x2="256" y1="0" x1="0" id="A" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="red"/><stop offset=".375" stop-color="#ff0"/><stop offset=".5" stop-color="#0f0"/><stop offset=".625" stop-color="#0ff"/><stop offset="1" stop-color="#00f"/></linearGradient></defs><rect x="0" y="0" width="256" height="256" fill="url(#A)"/><rect x="16" y="16" width="224" height="224" fill="#fff"/><text y="128" x="128" font-size="16" font-family="sans-serif" dominant-baseline="middle" text-anchor="middle">PLACEHOLDER</text></svg>`;

export function applyEvent(
  state: StateSchema,
  event: EventSchema
): EventApplicationResult {
  function exists(
    entityType: `backgrounds` | `characters` | `emotes` | `lines` | `scenes`,
    uuid: UuidSchema
  ): boolean {
    return Object.prototype.hasOwnProperty.call(state[entityType], uuid);
  }

  switch (event.type) {
    case `createBackground`:
      if (exists(`backgrounds`, event.backgroundUuid)) {
        return {
          successful: false,
          error: {
            type: `entityAlreadyExists`,
            entityType: `background`,
            uuid: event.backgroundUuid,
          },
        };
      } else {
        return {
          successful: true,
          state: {
            ...state,
            backgrounds: {
              ...state.backgrounds,
              [event.backgroundUuid]: {
                name: `Untitled Background`,
                svg: placeholderSvg,
              },
            },
          },
        };
      }

    case `deleteBackground`:
      if (!exists(`backgrounds`, event.backgroundUuid)) {
        return {
          successful: false,
          error: {
            type: `entityDoesNotExist`,
            entityType: `background`,
            uuid: event.backgroundUuid,
          },
        };
      } else {
        const referencingSceneUuids = Object.entries(state.scenes)
          .filter((pair) => pair[1].backgroundUuid === event.backgroundUuid)
          .map((pair) => pair[0]);

        if (referencingSceneUuids.length > 0) {
          return {
            successful: false,
            error: {
              type: `entityIsReferenced`,
              referencedEntityType: `background`,
              referencedUuid: event.backgroundUuid,
              referencingEntityType: `scene`,
              referencingUuid: referencingSceneUuids[0],
            },
          };
        } else {
          const backgrounds: {
            [backgroundUuid: string]: BackgroundStateSchema;
          } = {};

          for (const backgroundUuid in state.backgrounds) {
            if (backgroundUuid !== event.backgroundUuid) {
              backgrounds[backgroundUuid] = state.backgrounds[backgroundUuid];
            }
          }

          return {
            successful: true,
            state: {
              ...state,
              backgrounds,
            },
          };
        }
      }

    case `updateBackgroundName`:
      if (exists(`backgrounds`, event.backgroundUuid)) {
        return {
          successful: true,
          state: {
            ...state,
            backgrounds: {
              ...state.backgrounds,
              [event.backgroundUuid]: {
                ...state.backgrounds[event.backgroundUuid],
                name: event.name,
              },
            },
          },
        };
      } else {
        return {
          successful: false,
          error: {
            type: `entityDoesNotExist`,
            entityType: `background`,
            uuid: event.backgroundUuid,
          },
        };
      }

    case `updateBackgroundSvg`:
      if (exists(`backgrounds`, event.backgroundUuid)) {
        return {
          successful: true,
          state: {
            ...state,
            backgrounds: {
              ...state.backgrounds,
              [event.backgroundUuid]: {
                ...state.backgrounds[event.backgroundUuid],
                svg: event.svg,
              },
            },
          },
        };
      } else {
        return {
          successful: false,
          error: {
            type: `entityDoesNotExist`,
            entityType: `background`,
            uuid: event.backgroundUuid,
          },
        };
      }

    case `createCharacter`:
      if (exists(`characters`, event.characterUuid)) {
        return {
          successful: false,
          error: {
            type: `entityAlreadyExists`,
            entityType: `character`,
            uuid: event.characterUuid,
          },
        };
      } else if (exists(`emotes`, event.characterUuid)) {
        return {
          successful: false,
          error: {
            type: `entityAlreadyExists`,
            entityType: `emote`,
            uuid: event.characterUuid,
          },
        };
      } else {
        const lines: { [lineUuid: string]: LineStateSchema } = {};

        for (const lineUuid in state.lines) {
          const line = state.lines[lineUuid];

          lines[lineUuid] = {
            ...line,
            characters: {
              ...line.characters,
              [event.characterUuid]: { emoteUuid: event.characterUuid },
            },
          };
        }

        return {
          successful: true,
          state: {
            ...state,
            characters: {
              ...state.characters,
              [event.characterUuid]: {
                name: `Untitled Character`,
                emoteUuids: [event.characterUuid],
              },
            },
            emotes: {
              ...state.emotes,
              [event.characterUuid]: {
                name: `Untitled Emote`,
                characterUuid: event.characterUuid,
                svg: placeholderSvg,
              },
            },
            lines,
          },
        };
      }

    case `deleteCharacter`:
      if (!exists(`characters`, event.characterUuid)) {
        return {
          successful: false,
          error: {
            type: `entityDoesNotExist`,
            entityType: `character`,
            uuid: event.characterUuid,
          },
        };
      } else {
        const characters: {
          [characterUuid: string]: CharacterStateSchema;
        } = {};

        for (const characterUuid in state.characters) {
          if (characterUuid !== event.characterUuid) {
            characters[characterUuid] = state.characters[characterUuid];
          }
        }

        const emotes: { [emoteUuid: string]: EmoteStateSchema } = {};

        for (const emoteUuid in state.emotes) {
          const emote = state.emotes[emoteUuid];

          if (emote.characterUuid !== event.characterUuid) {
            emotes[emoteUuid] = emote;
          }
        }

        const lines: { [sceneUuid: string]: LineStateSchema } = {};

        for (const lineUuid in state.lines) {
          const line = state.lines[lineUuid];

          const characters: {
            [characterUuid: string]: LineCharacterStateSchema;
          } = {};

          for (const characterUuid in line.characters) {
            if (characterUuid !== event.characterUuid) {
              characters[characterUuid] = line.characters[characterUuid];
            }
          }

          lines[lineUuid] = {
            ...line,
            characters,
          };
        }

        return {
          successful: true,
          state: {
            ...state,
            characters,
            emotes,
            lines,
          },
        };
      }

    case `updateCharacterName`:
      if (exists(`characters`, event.characterUuid)) {
        return {
          successful: true,
          state: {
            ...state,
            characters: {
              ...state.characters,
              [event.characterUuid]: {
                ...state.characters[event.characterUuid],
                name: event.name,
              },
            },
          },
        };
      } else {
        return {
          successful: false,
          error: {
            type: `entityDoesNotExist`,
            entityType: `character`,
            uuid: event.characterUuid,
          },
        };
      }

    case `createEmote`:
      if (!exists(`characters`, event.characterUuid)) {
        return {
          successful: false,
          error: {
            type: `entityDoesNotExist`,
            entityType: `character`,
            uuid: event.characterUuid,
          },
        };
      } else if (exists(`emotes`, event.emoteUuid)) {
        return {
          successful: false,
          error: {
            type: `entityAlreadyExists`,
            entityType: `emote`,
            uuid: event.emoteUuid,
          },
        };
      } else {
        const character = state.characters[event.characterUuid];

        return {
          successful: true,
          state: {
            ...state,
            characters: {
              ...state.characters,
              [event.characterUuid]: {
                ...character,
                emoteUuids: [...character.emoteUuids, event.emoteUuid],
              },
            },
            emotes: {
              ...state.emotes,
              [event.emoteUuid]: {
                name: `Untitled Emote`,
                characterUuid: event.characterUuid,
                svg: placeholderSvg,
              },
            },
          },
        };
      }

    case `deleteEmote`:
      if (!exists(`emotes`, event.emoteUuid)) {
        return {
          successful: false,
          error: {
            type: `entityDoesNotExist`,
            entityType: `emote`,
            uuid: event.emoteUuid,
          },
        };
      } else {
        const emote = state.emotes[event.emoteUuid];

        const character = state.characters[emote.characterUuid];

        if (character.emoteUuids.length === 1) {
          return {
            successful: false,
            error: {
              type: `entityIsLastChild`,
              parentEntityType: `character`,
              parentUuid: emote.characterUuid,
              childEntityType: `emote`,
              childUuid: event.emoteUuid,
            },
          };
        }

        const lines = Object.entries(state.lines).filter(
          (line) =>
            line[1].characters[emote.characterUuid].emoteUuid ===
            event.emoteUuid
        );

        if (lines.length !== 0) {
          return {
            successful: false,
            error: {
              type: `entityIsReferenced`,
              referencedEntityType: `emote`,
              referencedUuid: event.emoteUuid,
              referencingEntityType: `line`,
              referencingUuid: lines[0][0],
            },
          };
        } else {
          const emote = state.emotes[event.emoteUuid];
          const character = state.characters[emote.characterUuid];

          const emotes: { [emoteUuid: string]: EmoteStateSchema } = {};

          for (const emoteUuid in state.emotes) {
            if (emoteUuid !== event.emoteUuid) {
              emotes[emoteUuid] = state.emotes[emoteUuid];
            }
          }

          const emoteUuids = character.emoteUuids.slice();
          emoteUuids.splice(emoteUuids.indexOf(event.emoteUuid), 1);

          return {
            successful: true,
            state: {
              ...state,
              characters: {
                ...state.characters,
                [emote.characterUuid]: {
                  ...character,
                  emoteUuids,
                },
              },
              emotes,
            },
          };
        }
      }

    case `updateEmoteName`:
      if (exists(`emotes`, event.emoteUuid)) {
        return {
          successful: true,
          state: {
            ...state,
            emotes: {
              ...state.emotes,
              [event.emoteUuid]: {
                ...state.emotes[event.emoteUuid],
                name: event.name,
              },
            },
          },
        };
      } else {
        return {
          successful: false,
          error: {
            type: `entityDoesNotExist`,
            entityType: `emote`,
            uuid: event.emoteUuid,
          },
        };
      }

    case `updateEmoteSvg`:
      if (exists(`emotes`, event.emoteUuid)) {
        return {
          successful: true,
          state: {
            ...state,
            emotes: {
              ...state.emotes,
              [event.emoteUuid]: {
                ...state.emotes[event.emoteUuid],
                svg: event.svg,
              },
            },
          },
        };
      } else {
        return {
          successful: false,
          error: {
            type: `entityDoesNotExist`,
            entityType: `emote`,
            uuid: event.emoteUuid,
          },
        };
      }

    case `createStartingLine`: {
      if (!exists(`scenes`, event.sceneUuid)) {
        return {
          successful: false,
          error: {
            type: `entityDoesNotExist`,
            entityType: `scene`,
            uuid: event.sceneUuid,
          },
        };
      }

      if (exists(`lines`, event.lineUuid)) {
        return {
          successful: false,
          error: {
            type: `entityAlreadyExists`,
            entityType: `line`,
            uuid: event.lineUuid,
          },
        };
      }

      const characters: {
        [characterUuid: string]: LineCharacterStateSchema;
      } = {};

      const scene = state.scenes[event.sceneUuid];

      const nextLine = state.lines[scene.lineUuids[0]];

      for (const characterUuid in state.characters) {
        const nextLineCharacter = nextLine.characters[characterUuid];

        if (
          Object.prototype.hasOwnProperty.call(
            event.characterEmoteUuids,
            characterUuid
          )
        ) {
          const emoteUuid = event.characterEmoteUuids[characterUuid];

          if (!exists(`emotes`, emoteUuid)) {
            characters[characterUuid] = nextLineCharacter;
          } else {
            const emote = state.emotes[emoteUuid];

            if (emote.characterUuid !== characterUuid) {
              return {
                successful: false,
                error: {
                  type: `noRelationshipBetweenEntities`,
                  entities: [
                    {
                      entityType: `character`,
                      uuid: characterUuid,
                    },
                    {
                      entityType: `emote`,
                      uuid: emoteUuid,
                    },
                  ],
                },
              };
            } else {
              characters[characterUuid] = {
                ...nextLineCharacter,
                emoteUuid,
              };
            }
          }
        } else {
          characters[characterUuid] = nextLineCharacter;
        }
      }

      return {
        successful: true,
        state: {
          ...state,
          lines: {
            ...state.lines,
            [event.lineUuid]: {
              sceneUuid: event.sceneUuid,
              text: `(this line is yet to be written)`,
              characters,
            },
          },
          scenes: {
            ...state.scenes,
            [event.sceneUuid]: {
              ...scene,
              lineUuids: [event.lineUuid, ...scene.lineUuids],
            },
          },
        },
      };
    }

    case `updateLineCharacterEmote`: {
      if (!exists(`lines`, event.lineUuid)) {
        return {
          successful: false,
          error: {
            type: `entityDoesNotExist`,
            entityType: `line`,
            uuid: event.lineUuid,
          },
        };
      }

      if (!exists(`emotes`, event.emoteUuid)) {
        return {
          successful: false,
          error: {
            type: `entityDoesNotExist`,
            entityType: `emote`,
            uuid: event.emoteUuid,
          },
        };
      }

      const line = state.lines[event.lineUuid];

      const characterUuid = state.emotes[event.emoteUuid].characterUuid;

      return {
        successful: true,
        state: {
          ...state,
          lines: {
            ...state.lines,
            [event.lineUuid]: {
              ...line,
              characters: {
                ...line.characters,
                [characterUuid]: {
                  ...line.characters[characterUuid],
                  emoteUuid: event.emoteUuid,
                },
              },
            },
          },
        },
      };
    }

    case `updateLineText`:
      if (!exists(`lines`, event.lineUuid)) {
        return {
          successful: false,
          error: {
            type: `entityDoesNotExist`,
            entityType: `line`,
            uuid: event.lineUuid,
          },
        };
      } else {
        return {
          successful: true,
          state: {
            ...state,
            lines: {
              ...state.lines,
              [event.lineUuid]: {
                ...state.lines[event.lineUuid],
                text: event.text,
              },
            },
          },
        };
      }

    case `createScene`:
      if (exists(`scenes`, event.sceneUuid)) {
        return {
          successful: false,
          error: {
            type: `entityAlreadyExists`,
            entityType: `scene`,
            uuid: event.sceneUuid,
          },
        };
      } else if (exists(`lines`, event.sceneUuid)) {
        return {
          successful: false,
          error: {
            type: `entityAlreadyExists`,
            entityType: `line`,
            uuid: event.sceneUuid,
          },
        };
      } else if (Object.keys(state.backgrounds).length === 0) {
        return {
          successful: false,
          error: {
            type: `noEntitiesExist`,
            entityType: `background`,
          },
        };
      } else {
        const characters: {
          [characterUuid: string]: LineCharacterStateSchema;
        } = {};

        for (const characterUuid in state.characters) {
          if (
            Object.prototype.hasOwnProperty.call(
              event.characterEmoteUuids,
              characterUuid
            )
          ) {
            const emoteUuid = event.characterEmoteUuids[characterUuid];

            if (!exists(`emotes`, emoteUuid)) {
              const character = state.characters[characterUuid];

              characters[characterUuid] = {
                emoteUuid: character.emoteUuids
                  .slice()
                  .sort((a, b) =>
                    state.emotes[a].name.localeCompare(state.emotes[b].name)
                  )[0],
              };
            } else {
              const emote = state.emotes[emoteUuid];

              if (emote.characterUuid !== characterUuid) {
                return {
                  successful: false,
                  error: {
                    type: `noRelationshipBetweenEntities`,
                    entities: [
                      {
                        entityType: `character`,
                        uuid: characterUuid,
                      },
                      {
                        entityType: `emote`,
                        uuid: emoteUuid,
                      },
                    ],
                  },
                };
              } else {
                characters[characterUuid] = {
                  emoteUuid,
                };
              }
            }
          } else {
            const character = state.characters[characterUuid];

            characters[characterUuid] = {
              emoteUuid: character.emoteUuids
                .slice()
                .sort((a, b) =>
                  state.emotes[a].name.localeCompare(state.emotes[b].name)
                )[0],
            };
          }
        }

        let backgroundUuid: UuidSchema;

        if (exists(`backgrounds`, event.backgroundUuid)) {
          backgroundUuid = event.backgroundUuid;
        } else {
          backgroundUuid = Object.entries(state.backgrounds).sort((a, b) =>
            a[1].name.localeCompare(b[1].name)
          )[0][0];
        }

        return {
          successful: true,
          state: {
            ...state,
            lines: {
              ...state.lines,
              [event.sceneUuid]: {
                sceneUuid: event.sceneUuid,
                text: `(this line is yet to be written)`,
                characters,
              },
            },
            scenes: {
              ...state.scenes,
              [event.sceneUuid]: {
                name: `Untitled Scene`,
                backgroundUuid,
                lineUuids: [event.sceneUuid],
              },
            },
          },
        };
      }

    case `deleteScene`:
      if (!exists(`scenes`, event.sceneUuid)) {
        return {
          successful: false,
          error: {
            type: `entityDoesNotExist`,
            entityType: `scene`,
            uuid: event.sceneUuid,
          },
        };
      } else {
        const lines: { [lineUuid: string]: LineStateSchema } = {};

        for (const lineUuid in state.lines) {
          const line = state.lines[lineUuid];

          if (line.sceneUuid !== event.sceneUuid) {
            lines[lineUuid] = line;
          }
        }

        const scenes: { [emoteUuid: string]: SceneStateSchema } = {};

        for (const sceneUuid in state.scenes) {
          if (sceneUuid !== event.sceneUuid) {
            scenes[sceneUuid] = state.scenes[sceneUuid];
          }
        }

        return {
          successful: true,
          state: {
            ...state,
            lines,
            scenes,
          },
        };
      }

    case `updateSceneBackground`:
      if (!exists(`scenes`, event.sceneUuid)) {
        return {
          successful: false,
          error: {
            type: `entityDoesNotExist`,
            entityType: `scene`,
            uuid: event.sceneUuid,
          },
        };
      } else if (!exists(`backgrounds`, event.backgroundUuid)) {
        return {
          successful: false,
          error: {
            type: `entityDoesNotExist`,
            entityType: `background`,
            uuid: event.backgroundUuid,
          },
        };
      } else {
        return {
          successful: true,
          state: {
            ...state,
            scenes: {
              ...state.scenes,
              [event.sceneUuid]: {
                ...state.scenes[event.sceneUuid],
                backgroundUuid: event.backgroundUuid,
              },
            },
          },
        };
      }

    case `updateSceneName`:
      if (exists(`scenes`, event.sceneUuid)) {
        return {
          successful: true,
          state: {
            ...state,
            scenes: {
              ...state.scenes,
              [event.sceneUuid]: {
                ...state.scenes[event.sceneUuid],
                name: event.name,
              },
            },
          },
        };
      } else {
        return {
          successful: false,
          error: {
            type: `entityDoesNotExist`,
            entityType: `scene`,
            uuid: event.sceneUuid,
          },
        };
      }

    case `updateName`:
      return {
        successful: true,
        state: {
          ...state,
          name: event.name,
        },
      };
  }
}
