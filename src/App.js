import React,{Component,Fragment} from 'react';
import './App.css';
import UserReportComponent from "./components/UserReportComponent";

class AppComponent extends Component{

  render() {

     return(<Fragment>
        <UserReportComponent/>
         </Fragment>
    );
  }
}
export default AppComponent;
