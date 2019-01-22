
import * as React from "react"

import { IFieldComponentProps } from "./props"
import { getGridWidthProps } from "../../Grid"
import { Grid, FormControl, FormControlLabel, Checkbox, FormHelperText } from "@material-ui/core"

export const CheckboxControl: React.StatelessComponent<IFieldComponentProps> = (props) => {

    const gridWidthProps = getGridWidthProps(props)
    const fieldId = props.field.name

    let errorText = ""
    props.errors.forEach((err) => {
        errorText += err.message + ". "
    })

    const value = props.value ? true : false

    return (
        <Grid item {...gridWidthProps} style={props.style}>

            <FormControl>
                <FormControlLabel
                    control={
                        <Checkbox
                            id={fieldId}
                            checked={value}
                            onChange={(event) => props.onChange(event.target.checked)}
                            color="primary"
                        />
                    }
                    label={props.label}
                    disabled={props.disabled || props.readonly}
                />
                {errorText &&
                    <FormHelperText error style={{ marginTop: 0 }}>
                        {errorText}
                    </FormHelperText>}
            </FormControl>

        </Grid>
    )
}