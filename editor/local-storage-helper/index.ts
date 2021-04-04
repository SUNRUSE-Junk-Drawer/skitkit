import * as ajv from "ajv";
import { ajvInstance } from "../../ajv-instance";
import { Json } from "../../json";

export interface LocalStorageHelperInterface<T extends Json> {
  tryGetItem(key: string): null | T;
  getItem(key: string): T;
  setItem(key: string, value: T): void;
  removeItem(key: string): void;
  listKeys(): ReadonlyArray<string>;
}

export class LocalStorageHelper<T extends Json>
  implements LocalStorageHelperInterface<T> {
  private readonly validateFunction: ajv.ValidateFunction;

  constructor(
    public readonly name: string,
    public readonly keyPrefix: string,
    public readonly schema: ajv.JSONSchemaType<T>
  ) {
    this.validateFunction = ajvInstance.compile(schema);
  }

  tryGetItem(key: string): null | T {
    const json = localStorage.getItem(`${this.keyPrefix}${key}`);

    if (json === null) {
      return null;
    }

    let deserialized: T;

    try {
      deserialized = JSON.parse(json);
    } catch {
      throw new Error(
        `Failed to deserialize value for key ${this.keyPrefix}${key} of localStorage helper ${this.name} as JSON`
      );
    }

    const validationResult = this.validateFunction(deserialized);

    if (!validationResult) {
      throw new Error(
        `Value for key ${this.keyPrefix}${key} of localStorage helper ${
          this.name
        } failed JSON schema validation:${(this.validateFunction
          .errors as ajv.ErrorObject[])
          .map((e) => `\n - instance${e.instancePath} ${e.message}`)
          .sort()
          .join(``)}`
      );
    }

    return deserialized;
  }

  getItem(key: string): T {
    const output = this.tryGetItem(key);

    if (output === null) {
      throw new Error(
        `No value for key ${this.keyPrefix}${key} of localStorage helper ${this.name}`
      );
    }

    return output;
  }

  setItem(key: string, value: T): void {
    localStorage.setItem(`${this.keyPrefix}${key}`, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(`${this.keyPrefix}${key}`);
  }

  listKeys(): ReadonlyArray<string> {
    return Object.keys(localStorage)
      .filter((key) => key.startsWith(this.keyPrefix))
      .map((key) => key.slice(this.keyPrefix.length))
      .sort();
  }
}
