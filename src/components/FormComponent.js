import React, {Fragment, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {FormControlLabel,Checkbox, RadioGroup, Radio, Button} from '@material-ui/core';



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
        checkedH: true

    });
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const classes = useStyles();
    return (
        <div className={classes.div}>
            <table border="1">
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
                                        onChange={handleChange}
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
                                        onChange={handleChange}
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
                                value="Activated"
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
                        <RadioGroup row>
                            <FormControlLabel
                                value="SummerizedReport"
                                              control=
                                                  {<Radio
                                                    color="primary"
                                                    name="summerizedReport"
                                                  />} label="Summerized Report" />
                            <FormControlLabel
                                value="DetailedReport"
                                control=
                                    {<Radio
                                        color="primary"
                                        name="detailedReport"
                                    />} label="Detailed Report" />
                            <FormControlLabel
                                value="Zip"
                                control=
                                    {<Radio
                                        color="primary"
                                        name="zip"
                                    />} label="Zip" />
                        </RadioGroup>
                    </td>
                </tr>
             </table>
            <div className={classes.button}>
            <Button variant="contained" color="primary" >
                Download
            </Button>
            </div>
        </div>
    );
};

export default FormComponent;