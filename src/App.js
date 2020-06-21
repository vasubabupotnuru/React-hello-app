import React,{Component,Fragment} from 'react';
import './App.css';
import Container from "@material-ui/core/Container"
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import FormComponent from "./components/FormComponent";



class AppComponent extends Component{


  render() {

     return(<Fragment>
        <Container maxWidth="sm">
          <Button variant="contained" color="primary" disableElevation>
            Disable elevation
          </Button>
          <div>
            <h2>Hello This is test</h2>
          </div>
        <FormComponent></FormComponent>
        </Container>
         </Fragment>
    );
  }
}
export default AppComponent;
