import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { getStore } from '../store/index';

import { App } from '../components/App';

import { ModelProvider } from 'rev-ui';
import { registerComponents } from 'rev-ui-materialui';
import { clientModels } from '../models/client';

registerComponents();

console.log(clientModels);

// Required for onTouchTap event
import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

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
