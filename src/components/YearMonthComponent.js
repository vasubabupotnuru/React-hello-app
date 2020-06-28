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

export const YearMonthComponent = ({   state,
                                       setValidateState,
                                       setState,
                                       selectedToDate,
                                       selectedFromDate,
                                       validateState}) => {
    const classes = useStyles();
    const handleCurrentYearMonthChange = (event) => {
        if(event.target.checked) {
            if(event.target.name === 'CurrentYear') {
                setState({...state, [event.target.name]: event.target.checked, monthDisabled:true, dateDisabled: true});
                setValidateState({submit: false});
            }
            else if(event.target.name === 'CurrentMonth'){
                setState({...state, [event.target.name]: event.target.checked,yearDisabled:true, dateDisabled: true});
                setValidateState({submit: false});
            }
        }else{
            if(event.target.name === 'CurrentYear') {
                setState({...state, [event.target.name]: event.target.checked, monthDisabled:false, dateDisabled: false});
                if(selectedFromDate && selectedToDate) {
                    setValidateState({submit: false});
                }else{
                    setValidateState({submit: true});
                }
            }
            else if(event.target.name === 'CurrentMonth'){
                setState({...state, [event.target.name]: event.target.checked,yearDisabled:false, dateDisabled: false});
                if(selectedFromDate && selectedToDate) {
                    setValidateState({submit: false});
                }else{
                    setValidateState({submit: true});
                }
            }
        }
    };
    return (
        <tr>
            <td className={classes.tdFirstCol}>
                <label className={classes.root}>Current Year/Month</label></td>
            <td className={classes.tdCols}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={state.CurrentYear}
                            onChange={handleCurrentYearMonthChange}
                            name="CurrentYear"
                            color="primary"
                            value="CurrentYear"
                            disabled={state.yearDisabled}
                        />
                    }
                    label="Current Year"
                />
            </td>
            <td colSpan={3} className={classes.tdCols}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={state.CurrentMonth}
                            onChange={handleCurrentYearMonthChange}
                            name="CurrentMonth"
                            color="primary"
                            value="CurrentMonth"
                            disabled={state.monthDisabled}
                        />
                    }
                    label="Current Month"
                />
            </td>
        </tr>
    );
};
