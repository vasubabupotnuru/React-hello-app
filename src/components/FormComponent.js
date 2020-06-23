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
        maxWidth: 150,
        paddingLeft: 350,
        paddingTop: 12
    },
    date:{
        width:400
    }

});

const FormComponent = ({ data }) => {
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedC: true,
        checkedD: true,
        checkedE: true,
        checkedF: true,
        checkedG: true,
        checkedH: true,
        disabled: false

    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const activateHandleChange = (event) => {
        if(event.target.checked){
            setState({...state, [event.target.name]: event.target.checked,disabled: false});
        }else{
            let validate = event.target.name == 'checkedC'?state.checkedD?true:false:event.target.name == 'checkedD'?state.checkedC?true:false:false;
            setState({...state, [event.target.name]: event.target.checked,disabled: !validate});
        }

    };


    const [selectedDate, setSelectedDate] = React.useState(new Date('2020-06-22T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };



    const classes = useStyles();

    return (
        <div className={classes.div}>
            <table border="1">
                <tr>
                    <td>
                    </td>
                    <td colSpan={2}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date picker inline"
                                onChange={handleDateChange}
                                value={selectedDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                className={classes.date}
                            />
                        </MuiPickersUtilsProvider>
                    </td>
                    <td colSpan={2}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date picker inline"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                className={classes.date}
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
                                        onChange={handleChange}
                                        name="checkedA"
                                        color="primary"
                                        value="CurrentYear"
                                        disabled={state.disabled}
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
                                        onChange={handleChange}
                                        name="checkedB"
                                        color="primary"
                                        value="CurrentMonth"
                                        disabled={state.disabled}
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

            </table>
            <div className={classes.button}>
            <Button variant="contained" color="primary" disabled={state.disabled}>
                Download
            </Button>
            </div>
        </div>
    );
};

export default FormComponent;