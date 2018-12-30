package org.revcrm.meta.fields

import graphql.schema.GraphQLType
import org.revcrm.meta.Entity
import org.revcrm.meta.MetadataService

interface IField {
    val name: String
    val label: String
    val jvmType: String
    val nullable: Boolean
    val constraints: Map<String, String>

    fun getGraphQLType(meta: MetadataService, entity: Entity): GraphQLType
}