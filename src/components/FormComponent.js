import React, {Fragment, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {FormControlLabel,Checkbox, RadioGroup, Radio, Button} from '@material-ui/core';
import {MuiPickersUtilsProvider,KeyboardDatePicker} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles({
    root: {
        paddingTop: 10,
        paddingRight: 10
    }, // a style rule
    label: {}, // a nested style rule
    div:{
        maxWidth: 800,
        margin: "auto"
    },
    td: {
        backgroundColor: "darkgray",
        fontWeight: "bold"
    },
    button:{
        textAlign: "center"

    },
    date:{
        width:400
    },
    border:{
        border: "none"
    }

});

const FormComponent = ({ data }) => {
    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: false,
        checkedC: true,
        checkedD: true,
        checkedE: true,
        checkedF: true,
        checkedG: true,
        checkedH: true,
        disabled: false,
        validateDate: false,
        monthDisable: false,
        yearDisable: false,
        today: new Date()

    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const handleCurrentChange = (event) => {
        if(event.target.checked) {
            if(event.target.name == 'checkedA') {
                setState({...state, [event.target.name]: event.target.checked, monthDisable:true, validateDate: true});
            }
            else if(event.target.name == 'checkedB'){
                setState({...state, [event.target.name]: event.target.checked,yearDisable:true, validateDate: true});
            }
        }else{
            if(event.target.name == 'checkedA') {
                setState({...state, [event.target.name]: event.target.checked, monthDisable:false, validateDate: false});
            }
            else if(event.target.name == 'checkedB'){
                setState({...state, [event.target.name]: event.target.checked,yearDisable:false, validateDate: false});
            }
        }

    };

    const activateHandleChange = (event) => {
        if(event.target.checked){
            setState({...state, [event.target.name]: event.target.checked,disabled: false});
        }else{
            let validate = event.target.name == 'checkedC'?state.checkedD?true:false:event.target.name == 'checkedD'?state.checkedC?true:false:false;
            setState({...state, [event.target.name]: event.target.checked,disabled: !validate});
        }

    };


    const [fromSelectedDate, setFromSelectedDate] = React.useState(new Date());

    const [toSelectedDate, setToSelectedDate] = React.useState(new Date());

    const handleFromDateChange = (date) => {
        setFromSelectedDate(date);
    };
    const handleToDateChange = (date) => {
        setToSelectedDate(date);
    };

    function handleSubmit(event) {
        event.preventDefault();
        console.log( 'data'+JSON.stringify(state));

        // ..code to submit form to backend here...

    }


    const classes = useStyles();

    return (
        <form id="userReportForm" onSubmit={handleSubmit}>
        <div className={classes.div}>
            <table border="1">
                <tr>
                    <td>
                    </td>
                    <td colSpan={2}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                disabled={state.validateDate}
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date picker inline"
                                onChange={handleFromDateChange}
                                value={fromSelectedDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                className={classes.date}
                                minDate={state.today}
                            />
                        </MuiPickersUtilsProvider>
                    </td>
                    <td colSpan={2}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                disabled={state.validateDate}
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date picker inline"
                                value={toSelectedDate}
                                onChange={handleToDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                className={classes.date}
                                minDate={fromSelectedDate}
                            />
                        </MuiPickersUtilsProvider>
                    </td>
                </tr>
                <tr>
                    <td className={classes.td}>
                        <label className={classes.root}>Status</label></td><td>
                        <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={state.checkedC}
                                        onChange={activateHandleChange}
                                        name="checkedC"
                                        color="primary"
                                        value="Activated"
                                    />
                                }
                                label="Activated"
                            />
                </td>
                    <td colSpan={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={state.checkedD}
                                        onChange={activateHandleChange}
                                        name="checkedD"
                                        color="primary"
                                        value="NotActivated"
                                    />
                                }
                                label="NotActivated"
                            />
                    </td>
                </tr>
                <tr>
                    <td className={classes.td}><label className={classes.root}>Current Year/Month</label></td><td>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={state.checkedA}
                                        onChange={handleCurrentChange}
                                        name="checkedA"
                                        color="primary"
                                        value="CurrentYear"
                                        disabled={state.yearDisable}
                                    />
                                }
                                label="CurrentYear"
                            />
                </td>
                    <td colSpan={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={state.checkedB}
                                        onChange={handleCurrentChange}
                                        name="checkedB"
                                        color="primary"
                                        value="CurrentMonth"
                                        disabled={state.monthDisable}
                                    />
                                }
                                label="CurrentMonth"
                            />

                    </td>

                </tr>
                  <tr>
                      <td className={classes.td}>
                          <label className={classes.root}>User Type</label></td><td>
                      <FormControlLabel
                          control={
                              <Checkbox
                                  checked={state.checkedE}
                                  onChange={handleChange}
                                  name="checkedE"
                                  color="primary"
                                  value="Activated"
                                  disabled={state.disabled}
                              />
                          }
                          label="Registered&Verified"
                      />
                  </td>
                      <td>
                          <FormControlLabel
                              control={
                                  <Checkbox
                                      checked={state.checkedF}
                                      onChange={handleChange}
                                      name="checkedF"
                                      color="primary"
                                      value="NotActivated"
                                      disabled={state.disabled}
                                  />
                              }
                              label="Registered&NotVerified"
                          />
                      </td><td>
                      <FormControlLabel
                          control={
                              <Checkbox
                                  checked={state.checkedG}
                                  onChange={handleChange}
                                  name="checkedG"
                                  color="primary"
                                  value="NotActivated"
                                  disabled={state.disabled}
                              />
                          }
                          label="Migrated&Verified"
                      />
                  </td><td>
                      <FormControlLabel
                          control={
                              <Checkbox
                                  checked={state.checkedH}
                                  onChange={handleChange}
                                  name="checkedH"
                                  color="primary"
                                  value="NotActivated"
                                  disabled={state.disabled}
                              />
                          }
                          label="Migrated&NotVerified"
                      />
                  </td>
                </tr>
                  <tr>
                      <td className={classes.td}>
                          <label className={classes.root}>Format Type</label></td>
                      <td colSpan={4}>
                          <RadioGroup row >
                              <FormControlLabel
                                  value="SummerizedReport"
                                                control=
                                                    {<Radio
                                                      color="primary"
                                                      name="summerizedReport"
                                                      disabled={state.disabled}
                                                    />} label="Summerized Report" />
                              <FormControlLabel
                                  value="DetailedReport"
                                  control=
                                      {<Radio
                                          color="primary"
                                          name="detailedReport"
                                          disabled={state.disabled}
                                      />} label="Detailed Report" />
                              <FormControlLabel
                                  value="Zip"
                                  control=
                                      {<Radio
                                          color="primary"
                                          name="zip"
                                          disabled={state.disabled}
                                      />} label="Zip" />
                          </RadioGroup>
                      </td>
                  </tr>
                <tr><td colSpan={2} className={classes.border}></td>
                    <td className={classes.border}><div className={classes.button}><Button variant="contained" color="primary" disabled={state.disabled} type="submit">
                        Download
                    </Button></div></td><td colSpan={2} className={classes.border}></td>
                </tr>
            </table>
        </div>
        </form>
    );
};

export default FormComponent;