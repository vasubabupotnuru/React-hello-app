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

export const UserStatusComponent = ({   state,
                                       setState
                                       }) => {
    const classes = useStyles();
    const handleStatusChange = (event) => {
        console.log("changed");
        if(event.target.checked){
            setState({...state, [event.target.name]: event.target.checked,disabled: false});
        }else{
            let validate = event.target.name == 'Activated'?state.NotActivated?true:false:event.target.name == 'NotActivated'?state.Activated?true:false:false;
            setState({...state, [event.target.name]: event.target.checked,disabled: !validate});
        }
    };
    return (
        <tr>
            <td className={classes.tdFirstCol}>
                <label className={classes.root}>Status</label></td>
            <td className={classes.tdCols}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={state.Activated}
                            onChange={handleStatusChange}
                            name="Activated"
                            color="primary"
                            value="Activated"
                        />
                    }
                    label="Activated"
                />
            </td>
            <td colSpan={3} className={classes.tdCols}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={state.NotActivated}
                            onChange={handleStatusChange}
                            name="NotActivated"
                            color="primary"
                            value="NotActivated"
                        />
                    }
                    label="Not Activated"
                />
            </td>
        </tr>
    );
};
