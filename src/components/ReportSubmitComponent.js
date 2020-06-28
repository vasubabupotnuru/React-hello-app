import { makeStyles } from '@material-ui/core/styles';
import React from "react";
import {Button} from "@material-ui/core";

const useStyles = makeStyles({
    tdButton:{
        fontWeight: "bold",
        paddingLeft: "450px"
    },
    button:{
        maxWidth: 150,
        paddingTop: 5,
        textAlign: "center"
    }
});

export const ReportSubmitComponent = ({   state,
                                          validateState
                                    }) => {
    const classes = useStyles();

    return (
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
    );
};
