import React,{Component,Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {RangeComponent} from "./RangeComponent";
import {YearMonthComponent} from "./YearMonthComponent";
import {UserStatusComponent} from "./UserStatusComponent";
import {UserTypeComponent} from "./UserTypeComponent";
import {FormatTypeComponent} from "./FormatTypeComponent";
import {ReportSubmitComponent} from "./ReportSubmitComponent";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import {downloadReport} from "./DownloadReport";

const useStyles = makeStyles({
    div:{
        maxWidth: 1000,
        margin: "auto"
    },
    errMsg:{
      textAlign: "center"
    },
    root: {
        width: '100%',
    },
    errMsgDiv:{
        textAlign: "center",
        color: "red"
    },
    disableForm:
    {
        pointerEvents: "none",
        opacity: 0.7
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
        today: new Date(),
        errMsgDiv : true,
        errMessage : ''

    });
    const [selectedFromDate, setSelectedFromDate] = React.useState(new Date('11/22/2019'));
    const [selectedMinDate, setSelectedMinDate] = React.useState(new Date('11/22/2019'));
    const [selectedToDate, setSelectedToDate] = React.useState(new Date());
    const [validateState, setValidateState] = React.useState({
        submit:false
    })


    const [respState, setRespState] = React.useState({
        resp:false
    })
    const [formatTypeValue, setformatTypeValue] = React.useState('DetailedReport');

    const [open, setOpen] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleSubmit(event) {
        setRespState({resp: true});
        setValidateState({submit: true});
        event.preventDefault();

        // setState({dateDisabled: true});



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
            if(selectedFromDate.getDate() && selectedToDate.getDate()){
                if (selectedFromDate.getDate() && selectedFromDate.getDate() <=  new Date() && selectedFromDate.getDate() >= selectedMinDate &&
                    (selectedToDate >= selectedMinDate &&  selectedToDate <= new Date())) {
                    const startDate = new Date(selectedFromDate).toISOString().slice(0,10);
                    reportData.startDate = startDate;
                }else{
                    setRespState({resp: false});
                    setValidateState({submit: true});
                    state.errMsgDiv = false;
                    setState({errMessage :'* Please check Date validations'});
                }
                if (selectedToDate.getDate() && selectedToDate.getDate() >= selectedMinDate && selectedFromDate <= selectedToDate && selectedToDate.getDate() <=  new Date()){
                    const endDate = new Date(selectedToDate).toISOString().slice(0,10);
                    reportData.endDate = endDate;
                }else {
                    setValidateState({submit: true});
                    setRespState({resp: false});
                    state.errMsgDiv = false;
                    setState({errMessage :'* Please check date validations'});
                }
            }

           /* const startDate = new Date(selectedFromDate).toISOString().slice(0,10);
            const endDate = new Date(selectedToDate).toISOString().slice(0,10);
            reportData.startDate = startDate;
            reportData.endDate = endDate;*/
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

        downloadReport(reportData).then(result => {
           console.log(result);
            if(!result.ok){
                state.errMsgDiv = false;
                setState({errMessage :'* Services Down'});
            }
            if(result.SummeryList && result.SummeryList.length > 0){
                state.errMsgDiv = false;
                setState({errMessage :'* No Data Found Given Selection'});
            }

            if(result.headers.get('Content-Disposition')) {
                const filename =  result.headers.get('Content-Disposition').split('filename=')[1];
                result.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = filename;
                    a.click();
                });
             }
             //setState({dateDisabled: false});
             setRespState({resp: false});
             setValidateState({submit: false});
        });

      //  const url = "http://localhost:8080/v1/download/usersReport";

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



        /*fetch(url,
            {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body:JSON.stringify(reportData),
            }).then(res => {
            setRespState({resp: false});
            setValidateState({submit: false});
            if(!res.ok){
                state.errMsgDiv = false;
                setState({errMessage :'* Services Down'});
            }
            if(res.SummeryList && res.SummeryList.length > 0){
            state.errMsgDiv = false;
            setState({errMessage :'* No Data Found Given Selection'});
            }
            const filename =  'report.xlsx'// res.headers.get('Content-Disposition').split('filename=')[1];
            res.blob().then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = filename;
                a.click();
                });
        });*/

        // ..code to submit form to backend here... finally call service with reqModel

    }

    const classes = useStyles();
        return(
            <form id="userReportForm" onSubmit={handleSubmit} >
                <div className={respState.resp?classes.disableForm:''}>
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
                                        selectedMinDate = {selectedMinDate}
                                        setSelectedMinDate = {setSelectedMinDate}
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
                                             setRespState = {setRespState}
                                             respState = {respState}
                        />
                        <UserTypeComponent setState={setState}
                                           state={state}
                                           validateState={validateState}
                                           setValidateState={setValidateState}
                                           selectedFromDate={selectedFromDate}
                                           selectedToDate={selectedToDate}
                        />
                        <FormatTypeComponent state={state}
                                             formatTypeValue={formatTypeValue}
                                             setformatTypeValue={setformatTypeValue}
                        />
                        <ReportSubmitComponent state={state}
                                               validateState={validateState}
                        />
                        <tr>
                            <div>
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description">
                                   {/* <DialogTitle id="alert-dialog-title">{"Alert!"}</DialogTitle>*/}
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            No Data Found!
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} color="primary" autoFocus>
                                            Close
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </tr>
                        </tbody>
                    </table>
                    <div className={classes.root} hidden={!respState.resp} >
                        <LinearProgress />
                        <div className={classes.errMsg}>Please Wait..</div>
                    </div>
                    <div className={classes.errMsgDiv} hidden={state.errMsgDiv}>
                         <span>{state.errMessage}</span>
                    </div>
                </div>
                </div>
            </form>
        );
}
export default UserReportComponent;

