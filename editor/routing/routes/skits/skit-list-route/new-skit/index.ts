import * as uuid from "uuid";
import { histories } from "../../../../../histories";
import { placeholderSvg } from "../../../../../../apply-event";
import { navigate } from "../../../../../navigate";

const importedUuid = uuid.v4;
const importedHistories = histories;
const importedNavigate = navigate;

export function newSkit(): void {
  const skitUuid = importedUuid();

  importedHistories.setItem(skitUuid, {
    beforeSteps: {
      name: `Untitled Skit`,
      backgrounds: {
        [skitUuid]: {
          name: `Untitled Background`,
          svg: placeholderSvg,
        },
      },
      characters: {},
      emotes: {},
      lines: {
        [skitUuid]: {
          sceneUuid: skitUuid,
          text: `(this line is yet to be written)`,
          characters: {},
        },
      },
      scenes: {
        [skitUuid]: {
          name: `Untitled Scene`,
          backgroundUuid: skitUuid,
          lineUuids: [skitUuid],
        },
      },
    },
    doneSteps: [],
    proposedStep: null,
    undoneSteps: [],
  });

  importedNavigate(`#skits/${skitUuid}`);
}
