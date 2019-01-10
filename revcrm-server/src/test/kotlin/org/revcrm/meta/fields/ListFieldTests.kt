package org.revcrm.meta.fields

import graphql.Scalars
import graphql.schema.GraphQLList
import graphql.schema.GraphQLTypeReference
import io.mockk.mockkClass
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.revcrm.annotations.Label
import org.revcrm.meta.Entity
import org.revcrm.meta.EntityPropInfo
import org.revcrm.meta.MetadataService

class EntityWithEmbeddedEntityListField(
    @Label("Embedded Entity List")
    val entityList: List<EmbeddedEntity>
)

class EmbeddedEntity(
    val value: String
)

class EntityWithStringListField(
    @Label("Embedded String List")
    val stringList: List<String>
)

class ListFieldTests {

    @Nested
    inner class EmbeddedEntityListField {

        val propInfo = EntityPropInfo(EntityWithEmbeddedEntityListField::class, "entityList")
        var meta = mockkClass(MetadataService::class)

        val field = mapListField(meta, propInfo)

        @Test
        fun `maps the standard properties`() {
            assertThat(field.name).isEqualTo("entityList")
            assertThat(field.label).isEqualTo("Embedded Entity List")
            assertThat(field.type).isEqualTo("EmbeddedEntityListField")
            assertThat(field.jvmType).isEqualTo("java.util.List")
            assertThat(field.nullable).isFalse()
        }

        @Test
        fun `maps field constraints`() {
            assertThat(field.constraints).containsEntry("Entity", "EmbeddedEntity")
        }

        @Test
        fun `returns the expected GraphQL Type`() {
            val mockEntity = Entity("mock", false, "mock", mapOf())
            val gqlType = field.getGraphQLType(meta, mockEntity)
            assertThat(gqlType).isInstanceOf(GraphQLList::class.java)

            val wrappedType = (gqlType as GraphQLList).wrappedType
            assertThat(wrappedType).isInstanceOf(GraphQLTypeReference::class.java)
            assertThat((wrappedType as GraphQLTypeReference).name).isEqualTo("EmbeddedEntity")
        }
    }

    @Nested
    inner class StringListField {

        val propInfo = EntityPropInfo(EntityWithStringListField::class, "stringList")
        var meta = mockkClass(MetadataService::class)

        val field = mapListField(meta, propInfo)

        @Test
        fun `maps the standard properties`() {
            assertThat(field.name).isEqualTo("stringList")
            assertThat(field.label).isEqualTo("Embedded String List")
            assertThat(field.type).isEqualTo("StringListField")
            assertThat(field.jvmType).isEqualTo("java.util.List")
            assertThat(field.nullable).isFalse()
        }

        @Test
        fun `returns the expected GraphQL Type`() {
            val mockEntity = Entity("mock", false, "mock", mapOf())
            val gqlType = field.getGraphQLType(meta, mockEntity)
            assertThat(gqlType).isInstanceOf(GraphQLList::class.java)

            val wrappedType = (gqlType as GraphQLList).wrappedType
            assertThat(wrappedType).isEqualTo(Scalars.GraphQLString)
        }
    }
}