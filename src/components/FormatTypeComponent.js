import { makeStyles } from '@material-ui/core/styles';
import React from "react";
import { FormControlLabel, Radio, RadioGroup} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        paddingTop: 10,
        paddingRight: 10
    },
    tdFirstCol: {
        backgroundColor: "darkgray",
        fontWeight: "bold",
        textAlign: "center"
    },
    tdCols: {
        fontWeight: "bold",
        paddingLeft: "10px"
    }
});

export const FormatTypeComponent = ({   state,
                                        formatTypeValue,
                                        setformatTypeValue
                                        }) => {
    const classes = useStyles();
    const handleFormatTypeChange = (event) => {
        setformatTypeValue(event.target.value);
    };

    return (
        <tr><td className={classes.tdFirstCol}>
            <label className={classes.root}>Format Type</label></td>
            <td colSpan={4} className={classes.tdCols}>
                <RadioGroup row onChange={handleFormatTypeChange} value={formatTypeValue}>
                    <FormControlLabel
                        value="SummerizedReport"
                        control=
                            {<Radio
                                color="primary"
                                name="SummerizedReport"
                                disabled={state.disabled}
                            />} label="Summerized Report" />
                    <FormControlLabel
                        value="DetailedReport"
                        control=
                            {<Radio
                                color="primary"
                                name="DetailedReport"
                                disabled={state.disabled}
                            />} label="Detailed Report" />
                    <FormControlLabel
                        value="Zip"
                        control=
                            {<Radio
                                color="primary"
                                name="Zip"
                                disabled={state.disabled}
                            />} label="Zip" />
                </RadioGroup>
            </td>
        </tr>
    );
};
