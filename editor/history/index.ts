import * as ajv from "ajv";
import { stateSchema, StateSchema } from "../../schema/state-schema";
import { eventSchema, EventSchema } from "../../schema/event-schema";

export const historySchema: ajv.JSONSchemaType<History> = {
  $schema: `http://json-schema.org/draft-07/schema#`,
  type: `object`,
  additionalProperties: false,
  required: [`beforeSteps`, `doneSteps`, `undoneSteps`],
  properties: {
    beforeSteps: stateSchema,
    doneSteps: {
      type: `array`,
      items: eventSchema,
    },
    undoneSteps: {
      type: `array`,
      items: eventSchema,
    },
  },
};

export type History = {
  readonly beforeSteps: StateSchema;
  readonly doneSteps: ReadonlyArray<EventSchema>;
  readonly undoneSteps: ReadonlyArray<EventSchema>;
};
