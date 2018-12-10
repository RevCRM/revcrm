
import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { ViewManager, IViewManagerContext, withViewManagerContext, IViewManagerContextProp } from '../ViewManager';
import { createMemoryHistory } from 'history';
import { UI, IPerspective, IView } from '../../../UIManager';
import { sleep } from '../../../utils/sleep';

describe('<ViewManager />', () => {
    // let renderer: TestRenderer.ReactTestRenderer;
    // let instance: TestRenderer.ReactTestInstance;
    let receivedCtx: IViewManagerContext;

    const ViewContextSpy = withViewManagerContext((props: IViewManagerContextProp) => {
        receivedCtx = props.viewManagerCtx;
        return <div />;
    });

    const mockPerspective: IPerspective = {
        id: 'dashboard',
        title: 'Dashboard',
        views: {
            my: {
                title: 'My Dashboard',
                viewId: 'dashboard',
            },
            team: {
                title: 'Team Dashboard',
                viewId: 'dashboard_team',
            }
        }
    };
    UI.registerPerspective(mockPerspective);

    const mockMyView: IView = {
        id: 'dashboard',
        model: null,
        component: () => <div id="mockMyDashboard" />
    };
    UI.registerView(mockMyView);

    const mockTeamView: IView = {
        id: 'dashboard_team',
        model: null,
        component: () => <div id="mockTeamDashboard" />
    };
    UI.registerView(mockTeamView);

    describe('initialisation - when no URL is set', () => {

        beforeAll(() => {
            receivedCtx = null as any;
            const history = createMemoryHistory({
                initialEntries: ['/']
            });
            TestRenderer.create(
                <ViewManager history={history}>
                    <ViewContextSpy />
                </ViewManager>
            );
        });

        it('redirects to homeUrl', () => {
            expect(receivedCtx.history.location.pathname).toEqual(UI.homeUrl);
        });

        it('sets correct perspective and view in the context', () => {
            expect(receivedCtx.perspective).toEqual(mockPerspective);
            expect(receivedCtx.perspectiveView).toEqual(mockPerspective.views['my']);
            expect(receivedCtx.view).toEqual(mockMyView);
        });

    });

    describe('initialisation - when url is set', () => {
        const expectedUrl = '/dashboard/team';

        beforeAll(() => {
            receivedCtx = null as any;
            const history = createMemoryHistory({
                initialEntries: ['/dashboard/team']
            });
            TestRenderer.create(
                <ViewManager history={history}>
                    <ViewContextSpy />
                </ViewManager>
            );
        });

        it('does not redirect to homeUrl', () => {
            expect(receivedCtx.history.location.pathname).not.toEqual(UI.homeUrl);
        });

        it('stays at expected url', () => {
            expect(receivedCtx.history.location.pathname).toEqual(expectedUrl);
        });

        it('sets correct perspective and view in the context', () => {
            expect(receivedCtx.perspective).toEqual(mockPerspective);
            expect(receivedCtx.perspectiveView).toEqual(mockPerspective.views['team']);
            expect(receivedCtx.view).toEqual(mockTeamView);
        });

    });

    describe('when channging perspective', () => {
        const firstPerspectiveUrl = '/dashboard/team';
        const secondPerspectiveUrl = '/dashboard/my';

        beforeAll(() => {
            receivedCtx = null as any;
            const history = createMemoryHistory({
                initialEntries: [firstPerspectiveUrl]
            });
            TestRenderer.create(
                <ViewManager history={history}>
                    <ViewContextSpy />
                </ViewManager>
            );
        });

        it('starts at expected URL', () => {
            expect(receivedCtx.history.location.pathname).toEqual(firstPerspectiveUrl);
        });

        it('calling changePerspective redirects to the new URL', async () => {
            receivedCtx.changePerspective('dashboard', 'my');
            await sleep(10);
            expect(receivedCtx.history.location.pathname).toEqual(secondPerspectiveUrl);
        });

        it('sets correct perspective and view in the context', () => {
            expect(receivedCtx.perspective).toEqual(mockPerspective);
            expect(receivedCtx.perspectiveView).toEqual(mockPerspective.views['my']);
            expect(receivedCtx.view).toEqual(mockMyView);
        });

    });

});
