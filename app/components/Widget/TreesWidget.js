import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import trees from "dan-images/trees.png";
import colorfull from "dan-api/palette/colorfull";
import TreeWidget from "../Counter/TreeWidget";
import styles from "./widget-jss";

function TreesWidget(props) {
  const { classes, data } = props;
  return (
    <div className={classes.rootCounterFull}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <TreeWidget
            color={colorfull[11]}
            start={0}
            end={data ? data.tree : 0}
            duration={3}
            title="Trees Planted"
          >
            <img
              src={trees}
              className={classes.counterIcon}
              style={{ width: 180, height: 200 }}
            />
            {/* <OndemandVideo /> */}
          </TreeWidget>
        </Grid>
      </Grid>
    </div>
  );
}

TreesWidget.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TreesWidget);
