package org.revcrm.meta.fields

import graphql.schema.GraphQLInputType
import graphql.schema.GraphQLOutputType
import org.revcrm.meta.Entity
import org.revcrm.meta.EntityPropInfo
import org.revcrm.meta.MetadataService

abstract class Field {

    val name: String
    val label: String
    val jvmType: String
    val nullable: Boolean
    val readonly: Boolean
    val idField: Boolean
    val properties: Map<String, String>
    val constraints: Map<String, String>

    val type: String
        get() = this::class.java.simpleName

    constructor(
        propInfo: EntityPropInfo,
        properties: Map<String, String>,
        constraints: Map<String, String>
    ) {
        name = propInfo.name
        label = propInfo.label
        jvmType = propInfo.jvmType
        nullable = propInfo.isNullable
        readonly = propInfo.isImmutable
        idField = propInfo.isIdField
        this.properties = properties
        this.constraints = constraints
    }

    constructor(
        propInfo: EntityPropInfo
    ) : this(propInfo, mapOf(), mapOf())

    abstract fun getGraphQLType(meta: MetadataService, entity: Entity): GraphQLOutputType

    abstract fun getGraphQLInputType(meta: MetadataService, entity: Entity): GraphQLInputType
}