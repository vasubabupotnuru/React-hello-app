import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from '@material-ui/core/styles';
import React from "react";

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
    },
    date:{
        width:400
    }
});

export const RangeComponent = ({       setSelectedFromDate,
                                       selectedToDate,
                                       selectedFromDate,
                                       setSelectedToDate,
                                       state,
                                       setValidateState,
                                       validateState,
                                       setSelectedMinDate,
                                       selectedMinDate
                                   }) => {
    const classes = useStyles();

    const handleFromDateChange = (date) => {
        if(date) {
            if (date.getDate() && date <=  new Date() && date >= selectedMinDate) {
                setSelectedFromDate(date);
                if (selectedToDate) {
                    setValidateState({submit: false});
                }
            } else {
                setValidateState({submit: true});
                setSelectedFromDate(date);
            }
        }
    };
    const handleToDateChange = (date) => {
        if(date) {
            if (date.getDate() && date >= selectedMinDate && selectedFromDate <= date && date <=  new Date()) {
                setSelectedToDate(date);
                if (selectedFromDate) {
                    setValidateState({submit: false});
                }
            } else {
                setValidateState({submit: true});
                setSelectedToDate(date);
            }
        }
    };

    return (
        <tr>
            <td className={classes.tdFirstCol}>
                <label className={classes.root}>Date Range</label>
            </td>
            <td colSpan={2} className={classes.tdCols}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="From Date"
                        onChange={handleFromDateChange}
                        disabled={state.dateDisabled}
                        value={selectedFromDate}
                        KeyboardButtonProps={{
                            "aria-label": "change date",
                        }}
                        className={classes.date}
                        minDate={selectedMinDate}
                        maxDate={state.today}
                    />
                </MuiPickersUtilsProvider>
            </td>
            <td colSpan={2} className={classes.tdCols}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="To Date"
                        value={selectedToDate}
                        onChange={handleToDateChange}
                        disabled={state.dateDisabled}
                        KeyboardButtonProps={{
                            "aria-label": "change date",
                        }}
                        className={classes.date}
                        minDate={selectedFromDate}
                        maxDate={state.today}
                    />
                </MuiPickersUtilsProvider>
            </td>
        </tr>
    );
};
