import { makeStyles } from '@material-ui/core/styles';
import React from "react";
import {Checkbox, FormControlLabel} from "@material-ui/core";

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

export const UserTypeComponent = ({   state,
                                      setState
                                        }) => {
    const classes = useStyles();
    const handleUserTypeChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    return (
        <tr>
            <td className={classes.tdFirstCol}>
                <label className={classes.root}>User Type</label></td>
            <td className={classes.tdCols}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={state.RegisteredVerified}
                            onChange={handleUserTypeChange}
                            name="RegisteredVerified"
                            color="primary"
                            value="RegisteredVerified"
                            disabled={state.disabled}
                        />
                    }
                    label="Registered & Verified"
                />
            </td>
            <td className={classes.tdCols}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={state.RegisteredNotVerified}
                            onChange={handleUserTypeChange}
                            name="RegisteredNotVerified"
                            color="primary"
                            value="RegisteredNotVerified"
                            disabled={state.disabled}
                        />
                    }
                    label="Registered & NotVerified"
                />
            </td>
            <td className={classes.tdCols}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={state.MigratedVerified}
                            onChange={handleUserTypeChange}
                            name="MigratedVerified"
                            color="primary"
                            value="MigratedVerified"
                            disabled={state.disabled}
                        />
                    }
                    label="Migrated & Verified"
                />
            </td>
            <td className={classes.tdCols}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={state.MigratedNotVerified}
                            onChange={handleUserTypeChange}
                            name="MigratedNotVerified"
                            color="primary"
                            value="MigratedNotVerified"
                            disabled={state.disabled}
                        />
                    }
                    label="Migrated & NotVerified"
                />
            </td>
        </tr>
    );
};
