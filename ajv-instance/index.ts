import * as ajv from "ajv";

export const ajvInstance = new ajv.default({ allErrors: true });
