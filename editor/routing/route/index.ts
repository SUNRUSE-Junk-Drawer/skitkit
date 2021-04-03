import * as superfine from "superfine";

export type Route<TParameters> = {
  readonly parameters: TParameters;
  view(parameters: TParameters): superfine.ElementNode<`body`>;
};
