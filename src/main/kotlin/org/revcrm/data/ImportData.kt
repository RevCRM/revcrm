package org.revcrm.data

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory
import com.fasterxml.jackson.module.kotlin.KotlinModule
import com.fasterxml.jackson.module.kotlin.readValue
import org.revcrm.models.common.SelectionList

data class SelectionListImport(
    val selection_list: Array<SelectionList>
//    val selection_option: Array<SelectionOption>
)

fun importData() {
    val mapper = ObjectMapper(YAMLFactory())
    mapper.registerModule(KotlinModule())

    val res = object {}.javaClass.getResource("/data/selections.yml")

    val import = mapper.readValue<SelectionListImport>(res)

    println("imported ${import.selection_list.size} lists")
}
