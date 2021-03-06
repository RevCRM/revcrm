package org.revcrm.testdb

import org.bson.types.ObjectId
import org.revcrm.annotations.APIDisabled
import org.revcrm.annotations.EmbeddedEntity
import org.revcrm.annotations.Label
import org.revcrm.annotations.MultiLine
import org.revcrm.annotations.Validate
import org.revcrm.annotations.ValidateDelete
import org.revcrm.db.EntityValidationData
import org.revcrm.entities.Base
import org.revcrm.entities.BaseEmbedded
import xyz.morphia.annotations.Embedded
import xyz.morphia.annotations.Entity
import xyz.morphia.annotations.Id
import xyz.morphia.annotations.Reference
import java.math.BigDecimal
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.LocalTime
import javax.validation.Valid
import javax.validation.constraints.Max
import javax.validation.constraints.Min
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotEmpty
import javax.validation.constraints.Size

enum class EnumFieldOptions {
    OPTION1,
    OPTION2,
    OTHER_OPTION
}

@Entity
class TestFieldsEntity(
    @Label("Text Field")
    var string_field: String,
    @Label("Integer Field")
    var short_field: Short,
    var int_field: Int,
    var long_field: Long,
    var double_field: Double,
    var float_field: Float,
    var decimal_field: BigDecimal,
    var boolean_field: Boolean,
    var date_field: LocalDate,
    var time_field: LocalTime,
    var datetime_field: LocalDateTime,

    @APIDisabled
    var api_disabled_field: String,

    var enum_field: EnumFieldOptions
) : Base() {
    val readonly_field: String
        get() = this.string_field
}

abstract class ParentEntity {
    @Id
    var id: ObjectId? = null
    var parentField: String? = null
}

@Entity
class TestEntity2(
    var name: String,
    var number: Int
) : ParentEntity()

@Entity
@TestClassValidator
class TestConstraintsEntity(
    var non_nullable_field: String,

    var nullable_field: String?,

    @MultiLine
    @get:NotBlank
    @get:Size(min = 1, max = 10)
    var textField: String,

    @field:Min(10)
    var min_field: Int,

    @field:Max(100)
    var max_field: Int

) : Base()

@Entity
class TestWithValidateMethod(
    @field:Min(10)
    val numericField: Int,
    val textField: String
) : Base() {

    @Validate
    fun validate(validation: EntityValidationData) {
        if (textField == "invalid") {
            validation.addEntityError(this, "Fail", "textField must not be invalid!")
            validation.addEntityError(this, "Fail2", "Adding more errors, because we can :)")
        }
    }
}

@Entity
@APIDisabled
class SensitiveEntity(
    var name: String
) : Base()

@Entity
class Account(
    @field:NotBlank
    var name: String,
    var contact: String,
    var phone: String,
    var email: String,
    var rating: Int
) : Base()

@Entity
class TestWithEmbeddedEntity(
    var label: String,
    @Embedded
    @field:Valid
    var embedded: TestEmbeddedEntity?
) : Base()

@Entity
class TestWithEmbeddedEntityList(
    var label: String,
    var options: List<TestEmbeddedEntity>?
) : Base()

@EmbeddedEntity
class TestEmbeddedEntity(
    @field:NotBlank
    var name: String,
    var value: String? = null
) : BaseEmbedded()

@Entity
class TestWithStringList(
    var name: String,
    @field:NotEmpty
    var values: List<String>
) : Base()

@Entity
class TestWithReferencedEntity(
    var name: String,

    @Reference
    var otherEntity: TestReferencedEntity? = null,

    @Reference(ignoreMissing = true)
    var maybeMissingEntity: TestReferencedEntity? = null

) : Base()

@Entity
class TestReferencedEntity(
    var label: String
) : Base()

@Entity
class TestWithValidatedDelete(
    val status: String
) : Base() {

    @ValidateDelete
    fun validateDelete(validation: EntityValidationData) {
        if (status == "no_delete") {
            validation.addEntityError(this, "Denied", "You cannot delete an entity in this status")
        }
    }
}