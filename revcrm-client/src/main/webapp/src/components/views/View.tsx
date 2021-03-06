
import * as React from "react"
import { withViewManagerContext, IViewManagerContextProp } from "./ViewManager"
import { Typography } from "@material-ui/core"

export const View = withViewManagerContext((props: IViewManagerContextProp) => {
    const Component = props.view.view
        ? props.view.view.component
        : () => <Typography>Not Found</Typography>

    return <Component />
})
