
import * as React from 'react';
import * as PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Done from 'material-ui-icons/Done';
import { IModelContextProp, DetailView, PostAction } from 'rev-ui';
import withStyles, { WithStyles } from 'material-ui/styles/withStyles';
import { ICRMViewManagerContext } from './CRMViewManager';
import { withModelContext } from 'rev-ui/lib/views/withModelContext';

const styles = {
    toolbar: {
        display: 'flex',
        borderBottom: '1px solid #EBEBEB'
    },
    formPaper: {
        marginTop: 20
    },
    formWrapper: {
        padding: '10 20'
    }
};

class CRMFormViewContentC extends React.Component<IModelContextProp & WithStyles<keyof typeof styles>> {

    render() {
        const { manager, model, modelMeta } = this.props.modelContext;

        const title = !model ? 'Loading...'
            : (manager.isNew(model) ? 'New ' : 'Edit ') + modelMeta.name;

        return (
            <Grid item xs={12}>
                <PostAction url="/todo" disabled={(ctx) => !ctx.dirty}>
                    <Done style={{ marginRight: 10 }} />
                    Save
                </PostAction>
                <Paper className={this.props.classes.formPaper}>
                    <Toolbar className={this.props.classes.toolbar}>
                        <Typography type="title" color="inherit">
                            {title}
                        </Typography>
                    </Toolbar>
                    <Grid container spacing={8} className={this.props.classes.formWrapper}>
                        {this.props.children}
                    </Grid>
                </Paper>
            </Grid>
        );
    }
}

const CRMFormViewContent: React.ComponentType = withStyles(styles)(withModelContext(CRMFormViewContentC));

export class CRMFormView extends React.Component {

    context: ICRMViewManagerContext;
    static contextTypes = {
        viewContext: PropTypes.object
    };

    render() {
        const ctx = this.context.viewContext;
        return (
            <DetailView model={ctx.view.model} primaryKeyValue={ctx.primaryKeyValue}>
                <CRMFormViewContent>{this.props.children}</CRMFormViewContent>
            </DetailView>
        );
    }
}
