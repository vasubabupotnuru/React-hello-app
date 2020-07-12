import React,{Component,Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {RangeComponent} from "./RangeComponent";
import {YearMonthComponent} from "./YearMonthComponent";
import {UserStatusComponent} from "./UserStatusComponent";
import {UserTypeComponent} from "./UserTypeComponent";
import {FormatTypeComponent} from "./FormatTypeComponent";
import {ReportSubmitComponent} from "./ReportSubmitComponent";

const useStyles = makeStyles({
    div:{
        maxWidth: 1000,
        margin: "auto"
    }
});

const reportData = {
    startDate : '',
    endDate : '',
    statusTypes: [],
    userTypes: [],
    reportFormatType: ''
};

const UserReportComponent = ({ data }) => {
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
    const [validateState, setValidateState] = React.useState({
        submit:false
    })
    const [formatTypeValue, setformatTypeValue] = React.useState('DetailedReport');

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

        const url = "http://localhost:8080/v1/download/usersReport";

        // fetch(url)   // https://curl.haxx.se/libcurl/c/allexamples.zip
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
            }).then(res => {
            const filename =  res.headers.get('Content-Disposition').split('filename=')[1];
            res.blob().then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = filename;
                a.click();
                });
        });

        // ..code to submit form to backend here... finally call service with reqModel

    }

    const classes = useStyles();
        return(
            <form id="userReportForm" onSubmit={handleSubmit}>
                <div className={classes.div}>
                    <table border="1">
                        <thead></thead>
                        <tbody>
                        <RangeComponent setSelectedFromDate={setSelectedFromDate}
                                        selectedToDate={selectedToDate}
                                        selectedFromDate={selectedFromDate}
                                        setSelectedToDate={setSelectedToDate}
                                        state={state}
                                        setValidateState={setValidateState}
                                        validateState={validateState}
                        />
                        <YearMonthComponent state={state}
                                            validateState={validateState}
                                            setValidateState={setValidateState}
                                            setState={setState}
                                            selectedFromDate={selectedFromDate}
                                            selectedToDate={selectedToDate}
                                            validateState={validateState}
                        />
                        <UserStatusComponent setState={setState}
                                             state={state}
                        />
                        <UserTypeComponent setState={setState}
                                           state={state}
                                           validateState={validateState}
                                           setValidateState={setValidateState}/>
                        <FormatTypeComponent state={state}
                                             formatTypeValue={formatTypeValue}
                                             setformatTypeValue={setformatTypeValue}
                        />
                        <ReportSubmitComponent state={state}
                                               validateState={validateState}
                        />
                        </tbody>
                    </table>
                </div>
            </form>
        );
}
export default UserReportComponent;

