import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { getStore } from './store/index';

import { App } from './components/App';

import { ModelProvider } from 'rev-ui';
import { registerComponents } from 'rev-ui-materialui';
import { clientModels } from '../models/client';
import { ViewManager } from './ViewManager';

export class RevCRMClient {
    views: ViewManager;

    async start() {
        registerComponents();

        console.log(clientModels);

        await this.loadModules();

        const store = getStore();

        ReactDOM.render((
                <Provider store={store} >
                    <ModelProvider modelManager={clientModels} >
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </ModelProvider>
                </Provider>
            ),
            document.getElementById('app')
        );
    }

    private async loadModules() {
        const loadOrder: string[] = CRM_MODULES;
        for (const moduleName of loadOrder) {
            console.log(`Loading ${moduleName} ...`);
        }
    }

}
