
import * as React from 'react';
import { Field } from 'rev-ui';
import { ViewManager } from 'revcrm/lib/client';
import { CRMListView, CRMFormView, Panel } from 'revcrm/lib/views';

export function registerViews(views: ViewManager) {
    views.registerPerspective({
        name: 'accounts',
        title: 'Accounts',
        views: {
            list: 'account_list',
            form: 'account_form'
        }
    });

    views.registerView({
        name: 'account_list',
        model: 'Account',
        component: (
            <CRMListView
                fields={[
                    'type',
                    'code',
                    'name',
                    'phone',
                    'email',
                    'website'
                ]}
                detailView="accounts/form"
            />
        )
    });

    views.registerView({
        name: 'account_form',
        model: 'Account',
        component: (
            <CRMFormView>
                <Panel title="Account Summary" colspan={12}>
                    <Field name="type" />
                    <Field name="code" />
                    <Field name="org_name" colspan={12} />
                    <Field name="title" colspan={2} />
                    <Field name="first_name" colspan={5} />
                    <Field name="last_name" colspan={5} />
                </Panel>
                <Panel title="Contact Details">
                    <Field name="phone" colspan={12} />
                    <Field name="fax" colspan={12} />
                    <Field name="mobile" colspan={12} />
                    <Field name="email" colspan={12} />
                    <Field name="website" colspan={12} />
                </Panel>
                <Panel title="Notes">
                    <Field name="notes" colspan={12} />
                </Panel>
            </CRMFormView>
        )
    });
}