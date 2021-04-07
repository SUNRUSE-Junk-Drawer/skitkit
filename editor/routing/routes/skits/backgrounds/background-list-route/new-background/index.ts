import * as uuid from "uuid";
import { commitAndRedirect } from "../../../../../../event-handlers/commit-and-redirect";

const importedUuid = uuid.v4;
const importedCommitAndRedirect = commitAndRedirect;

export function newBackground(skitUuid: string): () => void {
  return () => {
    const backgroundUuid = importedUuid();

    importedCommitAndRedirect(
      skitUuid,
      {
        type: `createBackground`,
        backgroundUuid,
      },
      `#skits/${skitUuid}/backgrounds/${backgroundUuid}`
    );
  };
}
