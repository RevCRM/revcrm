
import * as React from 'react';
import * as PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import { ListView, IModelManagerProp } from 'rev-ui';
import { ICRMViewManagerContext } from './CRMViewManager';
import { IModel } from 'rev-models';
import { withModelManager } from 'rev-ui/lib/provider/withModelManager';
import Paper from '@material-ui/core/Paper';
import { withStyles, WithStyles } from '@material-ui/core/styles';

export interface ICRMListViewProps {
    fields: string[];
    detailView?: string;
}

const styles = {
    listWrapper: {
        marginTop: 20
    }
};

class CRMListViewC extends React.Component<ICRMListViewProps & IModelManagerProp & WithStyles<keyof typeof styles>> {

    context: ICRMViewManagerContext;
    static contextTypes = {
        viewContext: PropTypes.object
    };

    loadDetailView(args?: any) {
        if (!this.props.detailView) {
            throw new Error(`CRMListView onRecordClick() Error: no detailView set in view: ${this.context.viewContext.view.name}`);
        }
        const [ perspectiveName, viewName ] = this.props.detailView.split('/');
        this.context.viewContext.changePerspective(perspectiveName, viewName, args);
    }

    onItemPress(model: IModel) {
        const meta = this.props.modelManager.getModelMeta(model);
        const args = {
            [meta.primaryKey]: model[meta.primaryKey]
        };
        this.loadDetailView(args);
    }

    render() {
        console.log('ListView props', this.props);
        console.log('ListView context', this.context);
        const ctx = this.context.viewContext;
        return (
            <div>
                <Button variant="raised" color="primary"
                    onClick={() => this.loadDetailView()}
                >
                    <Add style={{ marginRight: 10 }} />
                    New
                </Button>
                <Paper className={this.props.classes.listWrapper}>
                    <ListView
                        model={ctx.view.model}
                        fields={this.props.fields}
                        onItemPress={(record) => this.onItemPress(record)}
                    />
                </Paper>
            </div>
        );
    }
}

export const CRMListView = withStyles(styles)(withModelManager(CRMListViewC)) as any;
