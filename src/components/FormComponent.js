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

const reqModel = {
    startDate : '',
    endDate : '',
    statusTypes: [],
    userTypes: [],
    reportFormatType: ''
};

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

    const [validateState, setValidateState] = React.useState({
        submit:false
    })

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const handleCurrentChange = (event) => {
        if(event.target.checked) {
            if(event.target.name == 'checkedA') {
                setState({...state, [event.target.name]: event.target.checked, monthDisable:true, validateDate: true});
                setValidateState({submit: false});
            }
            else if(event.target.name == 'checkedB'){
                setState({...state, [event.target.name]: event.target.checked,yearDisable:true, validateDate: true});
                setValidateState({submit: false});
            }
        }else{
            if(event.target.name == 'checkedA') {
                setState({...state, [event.target.name]: event.target.checked, monthDisable:false, validateDate: false});
                if(fromSelectedDate && toSelectedDate) {
                    setValidateState({submit: false});
                }else{
                    setValidateState({submit: true});
                }
            }
            else if(event.target.name == 'checkedB'){
                setState({...state, [event.target.name]: event.target.checked,yearDisable:false, validateDate: false});
                if(fromSelectedDate && toSelectedDate) {
                    setValidateState({submit: false});
                }else{
                    setValidateState({submit: true});
                }

            }
        }

    };

    const activateHandleChange = (event) => {
        console.log("changed");
        if(event.target.checked){
            setState({...state, [event.target.name]: event.target.checked,disabled: false});
        }else{
            let validate = event.target.name == 'checkedC'?state.checkedD?true:false:event.target.name == 'checkedD'?state.checkedC?true:false:false;
            setState({...state, [event.target.name]: event.target.checked,disabled: !validate});
        }

    };

    const formatTypeChange = (event) => {
        setformatTypeValue(event.target.value);
      console.log(event.target.value);
    };
    const [formatTypeValue, setformatTypeValue] = React.useState('DetailedReport');

    const [fromSelectedDate, setFromSelectedDate] = React.useState(new Date());

    const [toSelectedDate, setToSelectedDate] = React.useState(new Date());

    const handleFromDateChange = (date) => {
        if(date) {
            setFromSelectedDate(date);
            if(toSelectedDate) {
                setValidateState({submit: false});
            }
        }else{
            setValidateState({submit: true});
            setFromSelectedDate(date);
        }
    };
    const handleToDateChange = (date) => {
        if(date) {
            setToSelectedDate(date);
            if(fromSelectedDate) {
                setValidateState({submit: false});
            }
        }else{
            setValidateState({submit: true});
            setToSelectedDate(date);
        }
    };



    function handleSubmit(event) {
        event.preventDefault();
        if(state.checkedA || state.checkedB){
            const date = new Date();
            if(state.checkedA){
                // current year
                const d = new Date(new Date().getFullYear(), 0, 1);
                const startDate = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
                const endDate = new Date().toISOString().slice(0,10);
                reqModel.startDate = startDate;
                reqModel.endDate = endDate;
            }else{
                // current month
                const d = new Date(date.getFullYear(), date.getMonth(), 1);
                const startDate = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
                const endDate = new Date().toISOString().slice(0,10);
                reqModel.startDate = startDate;
                reqModel.endDate = endDate;
            }
        }else{
            // range validation
            const startDate = new Date(fromSelectedDate).toISOString().slice(0,10);
            const endDate = new Date(toSelectedDate).toISOString().slice(0,10);
            reqModel.startDate = startDate;
            reqModel.endDate = endDate;
        }
        // report type format
        reqModel.reportFormatType = formatTypeValue;
        reqModel.statusTypes = [];
        reqModel.userTypes = [];
        if(state.checkedC)
            reqModel.statusTypes.push('ActiVated');
        if(state.checkedC)
            reqModel.statusTypes.push('NotActivated');
        if(state.checkedE)
            reqModel.userTypes.push('Registered&Verified');
        if(state.checkedF)
            reqModel.userTypes.push('Registered&NotVerified');
        if(state.checkedG)
            reqModel.userTypes.push('Migrated&Verified');
        if(state.checkedH)
            reqModel.userTypes.push('Migrated&NotVerified');


        console.log( 'data'+JSON.stringify(reqModel));

        // ..code to submit form to backend here... finally call service with reqModel

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
                      <td className={classes.td}>
                          <label className={classes.root}>User Type</label></td><td>
                      <FormControlLabel
                          control={
                              <Checkbox
                                  checked={state.checkedE}
                                  onChange={handleChange}
                                  name="checkedE"
                                  color="primary"
                                  value="Registered&Verified"
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
                                      value="Registered&NotVerified"
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
                                  value="Migrated&Verified"
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
                                  value="Migrated&NotVerified"
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
                          <RadioGroup row onChange={formatTypeChange} value={formatTypeValue}>
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
                    <td className={classes.border}><div className={classes.button}><Button variant="contained" color="primary" disabled={validateState.submit || state.disabled} type="submit">
                        Download
                    </Button></div></td><td colSpan={2} className={classes.border}></td>
                </tr>
            </table>
        </div>
        </form>
    );
};

export default FormComponent;