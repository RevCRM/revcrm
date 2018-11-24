package org.revcrm.models.common

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory
import org.hibernate.annotations.NaturalId
import org.revcrm.data.DBService
import org.revcrm.models.BaseModel
import org.revcrm.util.session
import javax.persistence.Entity

@Entity
class SelectionList(
    @NaturalId
    var code: String,
    var model: String,
    var label: String
) : BaseModel()

fun importSelectionLists(fileName: String, db: DBService) {
    val mapper = ObjectMapper(YAMLFactory())
    val res = object {}.javaClass.getResource(fileName)
    val nodes = mapper.readTree(res)
    if (!nodes.isArray()) {
        throw Exception("YAML Root Element must be an array")
    }
    db.withTransaction { em ->
        for (node in nodes) {
            val code = node.get("code").asText()
            val model = node.get("model").asText()
            val label = node.get("label").asText()

            val existingRecord = em.session
                .bySimpleNaturalId(SelectionList::class.java)
                .load(code)

            if (existingRecord != null) {
                existingRecord.model = model
                existingRecord.label = label
            } else {
                val newRecord = SelectionList(
                    code = code,
                    model = model,
                    label = label
                )
                em.persist(newRecord)
            }
        }
    }
}