import { SelectionSetNode, FieldNode } from "graphql"
import { IEntityMetadata, IMetadataContext } from "../components/meta/Metadata"

export interface IFieldSelections {
    [fieldName: string]: boolean | IFieldSelections
}

/**
 * Takes an object in the form:
 * {
 *     id: true,
 *     name: true,
 *     embedded: {
 *         name: true,
 *         value: true
 *     }
 * }
 * And returns a GraphQL SelectionSet in the form:
 * {
 *     id
 *     name
 *     embedded {
 *         name
 *         value
 *     }
 * }
 */
export function getSelectionSet(selection: IFieldSelections): SelectionSetNode {
    return {
        kind: "SelectionSet",
        selections: Object.keys(selection).map(field => {
            const fieldNode: FieldNode = {
                kind: "Field",
                name: {
                    kind: "Name",
                    value: field
                }
            }
            if (typeof selection[field] == "object") {
                const subSelections = getSelectionSet(selection[field] as IFieldSelections);
                (fieldNode as any).selectionSet = subSelections
            }
            return fieldNode
        })
    }
}

/**
 * Return full entity field SelectionSet from list of top-level fields
 */
export function getFieldSelections(meta: IMetadataContext, entity: IEntityMetadata, fields: string[] | null = null): IFieldSelections {
    const selections: IFieldSelections = {}
    const fieldList = fields || entity.fields.map(field => field.name)
    fieldList.forEach(fieldName => {
        const field = entity.fields.find(f => f.name == fieldName)!
        if (field.type == "EmbeddedEntityField") {
            const relatedEntityName = field.constraints["Entity"]
            const relatedEntity = meta.getEntity(relatedEntityName)!
            selections[fieldName] = getFieldSelections(meta, relatedEntity)
        }
        else {
            selections[fieldName] = true
        }
    })
    return selections
}
