package org.revcrm.meta.fields

import graphql.schema.GraphQLType
import org.revcrm.graphql.GraphQLObjectID
import org.revcrm.meta.Entity
import org.revcrm.meta.EntityPropInfo
import org.revcrm.meta.MetadataService

open class IDField(
    override val name: String,
    override val label: String,
    override val jvmType: String,
    override val nullable: Boolean,
    override val constraints: Map<String, String> = mapOf()
) : IField {

    override fun getGraphQLType(meta: MetadataService, entity: Entity): GraphQLType {
        return GraphQLObjectID
    }
}

fun mapIDField(meta: MetadataService, propInfo: EntityPropInfo): IField {
    return IDField(
        name = propInfo.name,
        label = propInfo.name, // TODO: Get from @Field annotation
        jvmType = propInfo.jvmType,
        nullable = propInfo.nullable
    )
}