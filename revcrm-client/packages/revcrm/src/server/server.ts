
import * as path from 'path';

import * as Koa from 'koa';
import * as mount from 'koa-mount';
import * as serve from 'koa-static';
import * as body from 'koa-bodyparser';
import * as session from 'koa-session';
import * as passport from 'koa-passport';

import { initialiseAuth, requireAuth } from './auth';
import { jsonLog } from 'koa-json-log';
import { registerRoutes } from './routes';

import { registerModels } from '../models/server';
import { CRM_DIR, getCRMModulesInLoadOrder, getCRMModuleMeta } from '../modules';
import { IModelManager, ModelManager } from 'rev-models';
import { IModelApiManager, ModelApiManager } from 'rev-api';

const staticPath = path.join(CRM_DIR, 'dist', 'static');

export interface IRevCRMServerConfig {
    port?: number;
}

export class RevCRMServer {
    koa: Koa;
    models: IModelManager;
    api: IModelApiManager;

    constructor(public config: IRevCRMServerConfig = {}) {
        this.config.port = this.config.port || Number(process.env.NODE_PORT) || 3000;
        this.koa = new Koa();
        this.koa.keys = ['some_secret_here'];
        this.koa.use(jsonLog());
        this.koa.use(mount('/static', serve(staticPath)));
        this.koa.use(body()); // TODO Set options
        this.koa.use(session({ key: 'revcrm' }, this.koa));
        this.koa.use(passport.initialize());
        this.koa.use(passport.session());
        this.koa.use(requireAuth({
            unauthenticatedUrls: ['/login', '/static'],
            loginUrl: '/login'
        }));

        this.models = new ModelManager();
        this.api = new ModelApiManager(this.models);
    }

    async start() {
        console.log('RevCRM Path:', CRM_DIR);
        registerModels(this);
        initialiseAuth(this);
        await this.loadModules();
        // TODO: Register main routes first, then API once modules have loaded
        registerRoutes(this);
        this.koa.listen(this.config.port, '0.0.0.0');
        console.log(`Server running on port ${this.config.port}`);
    }

    private async loadModules() {
        const modules = getCRMModuleMeta();
        const loadOrder = getCRMModulesInLoadOrder(modules);
        for (const moduleName of loadOrder) {
            const meta = modules[moduleName];
            if (meta.server) {
                console.log(`Loading ${moduleName}/lib/server ...`);
                const mod = require(path.join(CRM_DIR, 'node_modules', moduleName, 'lib', 'server'));
                await mod.register(this);
            }
        }
    }

}