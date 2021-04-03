import { EventApplicationError } from "../types/event-application-result/event-application-error";

export function stringifyEventApplicationError(
  error: EventApplicationError
): string {
  switch (error.type) {
    case `entityDoesNotExist`:
      return `Entity ${error.entityType} ${error.uuid} does not exist`;

    case `entityAlreadyExists`:
      return `Entity ${error.entityType} ${error.uuid} already exists`;

    case `entityIsReferenced`:
      return `Entity ${error.referencedEntityType} ${error.referencedUuid} is referenced by entity ${error.referencingEntityType} ${error.referencingUuid}`;

    case `noEntitiesExist`:
      return `No entities of type ${error.entityType} exist`;

    case `noRelationshipBetweenEntities`: {
      const stringifiedEntities = error.entities.map(
        (entity) => `${entity.entityType} ${entity.uuid}`
      );
      const stringifiedEntitiesExceptLast = stringifiedEntities.slice(
        0,
        stringifiedEntities.length - 1
      );
      const lastStringifiedEntity =
        stringifiedEntities[stringifiedEntities.length - 1];

      return `No relationship exists between entities ${stringifiedEntitiesExceptLast.join(
        `, `
      )} and ${lastStringifiedEntity}`;
    }

    case `entityIsLastChild`:
      return `Entity ${error.childEntityType} ${error.childUuid} is the last child of ${error.parentEntityType} ${error.parentUuid}`;
  }
}
