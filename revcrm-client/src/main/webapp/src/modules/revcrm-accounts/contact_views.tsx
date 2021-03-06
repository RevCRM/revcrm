
import { UIManager } from "../../UIManager"
import React from "react"
import { SearchView } from "../../components/views/SearchView"
import { FormView } from "../../components/views/FormView"
import { Panel } from "../../components/views/widgets/Panel"
import { Field } from "../../components/views/fields/Field"

export function registerContactViews(ui: UIManager) {

    ui.registerView({
        id: "accounts_contact_list",
        entity: "account",
        component: () =>
            <SearchView
                entity="Account"
                title="Contacts"
                showFields={[
                    "record_name",
                    "tags",
                    "email",
                    "phone",
                    "website",
                    // primary contact
                ]}
                detailView="contacts/form"
            />
    })

    ui.registerView({
        id: "accounts_contact_form",
        entity: "account",
        component: () => (
            <FormView entity="Account">
                <Panel title="Contact Summary" colspan={12}>
                    <Field name="company_name" colspan={9} />
                    <Field name="is_company" colspan={3} />
                    <Field name="code" colspan={2} />
                    <Field name="tags" colspan={5} />
                    <Field name="source" colspan={5} />
                </Panel>
                <Panel title="Contact Details">
                    <Field name="title" colspan={2} />
                    <Field name="first_name" colspan={4} />
                    <Field name="last_name" colspan={6} />
                    <Field name="phone" />
                    <Field name="email" />
                    <Field name="mobile" />
                    <Field name="website" />
                </Panel>
                <Panel title="Notes">
                    <Field name="notes" colspan={12} />
                </Panel>
            </FormView>
        )
    })
}
