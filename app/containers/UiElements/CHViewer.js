import React, { useState, useEffect } from "react";
import FullScreenDialog from "./demos/DialogModal/FullScreenDialog";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { PapperBlock } from "dan-components";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: 30,
  },
  field: {
    width: "100%",
    marginBottom: 20,
  },
  fieldBasic: {
    width: "100%",
    marginBottom: 20,
    marginTop: 10,
  },
  inlineWrap: {
    display: "flex",
    flexDirection: "row",
  },
  buttonInit: {
    margin: 20,
    textAlign: "center",
  },
  formControl: {
    margin: 20,
    minWidth: 120,
  },
  margin: {
    margin: 10,
  },
});

function CHViewer(props) {
  const {
    company_name,
    registration_number,
    company_status,
    incorporated_on,
    made_up,
    office_address,
    officers_details,
    status,
    created_at,
    updated_at,
  } = props;
  const [isReady, setIsReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.open && isReady) {
      handleClickOpen();
    } else {
      if (!isReady) {
        setIsReady(true);
      }
    }
  }, [props.open]);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    props.onClose({ type: false });
    setOpen(false);
  }

  return (
    <FullScreenDialog open={open} onClose={handleClose} title={company_name}>
      <PapperBlock
        icon="ion-md-car"
        title="HGV Driver Hub - Company House Details"
        desc="The details below are verified by the Government of UK"
      >
        <Grid
          container
          spacing={3}
          alignItems="flex-start"
          direction="row"
          justify="center"
        >
          <Grid item xs={12} md={12} lg={12}>
            <Typography variant="h5" component="h3">
              Details
            </Typography>
            <Grid md={12} container spacing={2} item>
              <Grid md={4} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={company_name}
                    placeholder="Company Name"
                    label="Company Name"
                    required
                    style={styles().field}
                  />
                </div>
              </Grid>
              <Grid md={4} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={registration_number}
                    placeholder="Company Registration Number"
                    label="Company Registration Number"
                    required
                    style={styles().field}
                  />
                </div>
              </Grid>
              <Grid md={4} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={incorporated_on}
                    placeholder="Incorporated On"
                    label="Incorporated On"
                    required
                    style={styles().field}
                  />
                </div>
              </Grid>
              <Grid md={4} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={office_address}
                    placeholder="Office Address"
                    label="Office Address"
                    required
                    style={styles().field}
                  />
                </div>
              </Grid>
              <Grid md={4} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={officers_details}
                    placeholder="Officers Details"
                    label="Officers Details"
                    required
                    style={styles().field}
                  />
                </div>
              </Grid>
              <Grid md={4} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={company_status ? "Active" : "Not Active"}
                    placeholder="Company Status"
                    label="Company Status"
                    required
                    style={styles().field}
                  />
                </div>
              </Grid>
              <Grid md={4} sm={12} xs={12} item>
                <div>
                  <TextField
                    value={made_up}
                    placeholder="Last Madeup"
                    label="Last Madeup"
                    required
                    style={styles().field}
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </PapperBlock>
    </FullScreenDialog>
  );
}

export default withStyles(styles)(CHViewer);
