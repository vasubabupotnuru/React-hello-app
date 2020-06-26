import React, {Fragment, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {FormControlLabel,Checkbox, RadioGroup, Radio, Button} from '@material-ui/core';
import {MuiPickersUtilsProvider,KeyboardDatePicker} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles({
    root: {
        paddingTop: 10,
        paddingRight: 10
    },
    label: {},
    div:{
        maxWidth: 1000,
        margin: "auto"
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
    tdButton:{
        fontWeight: "bold",
        paddingLeft: "450px"

    },
    button:{
        maxWidth: 150,
        paddingTop: 5,
        textAlign: "center"
    },
    date:{
        width:400
    },
    border:{
        border: "none"
    }

});

const reportData = {
    startDate : '',
    endDate : '',
    statusTypes: [],
    userTypes: [],
    reportFormatType: ''
};

const DateComponent = ({ data }) => {
    const [state, setState] = React.useState({
        CurrentYear: false, //CurrentYear
        CurrentMonth: false, //CurrentYear
        Activated: true,  //Activated
        NotActivated: true, //NotActivated
        RegisteredVerified: true, //RegisteredVerified
        RegisteredNotVerified: true, //RegisteredNotVerified
        MigratedVerified: true, //MigratedVerified
        MigratedNotVerified: true, //MigratedNotVerified
        disabled: false,    //disabled
        dateDisabled: false, //dateDisabled
        monthDisabled: false,  //monthDisabled
        yearDisabled: false, //yearDisabled
        today: new Date()

    });

    const [selectedFromDate, setSelectedFromDate] = React.useState(new Date('11/22/2019'));
    const [selectedToDate, setSelectedToDate] = React.useState(new Date());
    const [formatTypeValue, setformatTypeValue] = React.useState('DetailedReport');

    const [validateState, setValidateState] = React.useState({
        submit:false
    })

    const handleFromDateChange = (date) => {
        if(date) {
            setSelectedFromDate(date);
            if(selectedToDate) {
                setValidateState({submit: false});
            }
        }else{
            setValidateState({submit: true});
            setSelectedFromDate(date);
        }
    };
    const handleToDateChange = (date) => {
        if(date) {
            setSelectedToDate(date);
            if(selectedFromDate) {
                setValidateState({submit: false});
            }
        }else{
            setValidateState({submit: true});
            setSelectedToDate(date);
        }
    };


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

    const handleStatusChange = (event) => {
        console.log("changed");
        if(event.target.checked){
            setState({...state, [event.target.name]: event.target.checked,disabled: false});
        }else{
            let validate = event.target.name == 'Activated'?state.NotActivated?true:false:event.target.name == 'NotActivated'?state.Activated?true:false:false;
            setState({...state, [event.target.name]: event.target.checked,disabled: !validate});
        }

    };

    const handleUserTypeChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const handleFormatTypeChange = (event) => {
        setformatTypeValue(event.target.value);
        console.log(event.target.value);
    };

    function handleSubmit(event) {
        event.preventDefault();
        // console.log( 'data'+JSON.stringify(state)+"-From Date- "+selectedFromDate+
        //     "- To Date- "+selectedToDate+"-Format Type - "+formatTypeValue)

        if(state.CurrentYear || state.CurrentMonth){
            const date = new Date();
            if(state.CurrentYear){
                // current year
                const d = new Date(new Date().getFullYear(), 0, 1);
                const startDate = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
                const endDate = new Date().toISOString().slice(0,10);
                reportData.startDate = startDate;
                reportData.endDate = endDate;
            }else{
                // current month
                const d = new Date(date.getFullYear(), date.getMonth(), 1);
                const startDate = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
                const endDate = new Date().toISOString().slice(0,10);
                reportData.startDate = startDate;
                reportData.endDate = endDate;
            }
        }else{
            // range validation
            const startDate = new Date(selectedFromDate).toISOString().slice(0,10);
            const endDate = new Date(selectedToDate).toISOString().slice(0,10);
            reportData.startDate = startDate;
            reportData.endDate = endDate;
        }
        // report type format
        reportData.reportFormatType = formatTypeValue;
        reportData.statusTypes = [];
        reportData.userTypes = [];
        if(state.Activated)
            reportData.statusTypes.push('ActiVated');
        if(state.Activated)
            reportData.statusTypes.push('NotActivated');
        if(state.RegisteredVerified)
            reportData.userTypes.push('RegisteredVerified');
        if(state.RegisteredNotVerified)
            reportData.userTypes.push('RegisteredNotVerified');
        if(state.MigratedVerified)
            reportData.userTypes.push('MigratedVerified');
        if(state.MigratedNotVerified)
            reportData.userTypes.push('MigratedNotVerified');


        console.log( 'data'+JSON.stringify(reportData));

        const url = "https://curl.haxx.se/libcurl/c/allexamples.zip";

        // fetch(url)
        //     .then(Response => Response.json())
        //     .then(findResponse => {
        //         console.log(findResponse);
        //
        //     });
// checking response type
        // if (response.headers.get('Content-Type').indexOf('application/json') > -1) {
        //
        //     data = response.json();
        // }

        fetch(url,
            {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body:JSON.stringify(reportData),
            }).then(response => {
            // const filename = response.headers.get('Content-Disposition').split('filename=')[1];
            // const filename1 = response.headers;
            // console.log(filename1);
            response.blob()
                .then(response => {
                    const url = window.URL.createObjectURL(new Blob([response]));
                    const link = document.createElement('a');
                    link.href = url;
                    // link.download = filename;
                    // link.click();
                    //link.removeChild(link);

                    link.setAttribute('download', 'file.zip'); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                    link.parentNode.removeChild(link);
                });
        });

        // ..code to submit form to backend here... finally call service with reqModel

    }


    const classes = useStyles();

    return (
        <form id="userReportForm" onSubmit={handleSubmit}>
            <div className={classes.div}>
                <table border="1">
                    <thead></thead>
                    <tbody>
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
                                        'aria-label': 'change date',
                                    }}
                                    keyboard={true}
                                    className={classes.date}
                                    minDate={selectedFromDate}
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
                                        'aria-label': 'change date',
                                    }}
                                    className={classes.date}
                                    minDate={selectedFromDate}
                                    maxDate={state.today}
                                />
                            </MuiPickersUtilsProvider>
                        </td>
                    </tr>

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

                    <tr>
                        <td className={classes.tdFirstCol}>
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

                    <tr>
                        <td colSpan={5} className={classes.tdButton}>
                            <Button className={classes.button} variant="contained"
                                    color="primary"
                                    name="Download"
                                    type="submit"
                                    disabled={validateState.submit || state.disabled}>
                                Download
                            </Button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </form>
    );
};

export default DateComponent;