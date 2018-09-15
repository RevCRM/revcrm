package org.revcrm.models.common

import org.revcrm.models.BaseModel
import javax.persistence.Entity
import javax.persistence.ForeignKey
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne

@Entity
data class SelectionList(
    val model: String,
    val code: String,
    val label: String
): BaseModel()

@Entity
data class SelectionOption(

    @ManyToOne
    @JoinColumn(
        name = "listId",
        foreignKey = ForeignKey(name = "fk_list_id")
    )
    val list: SelectionList,

    val code: String,
    val label: String

): BaseModel()
