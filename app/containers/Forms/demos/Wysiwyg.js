import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { convertFromRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import Grid from "@material-ui/core/Grid";
import "dan-styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css";
import styles from "dan-components/Email/email-jss";
import { convertToHTML } from "draft-convert";

function Wysiwyg(props) {
  const { classes, value } = props;

  const content = {
    blocks: [
      {
        key: "637gr",
        text: value,
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {},
  };
  const contentBlock = convertFromRaw(content);
  const tempEditorState = EditorState.createWithContent(contentBlock);
  const [dataEditorState, setEditorState] = useState(tempEditorState);

  const onEditorStateChange = (editorStateParam) => {
    setEditorState(editorStateParam);
  };

  useEffect(() => {
    props.onChange(convertToHTML(dataEditorState.getCurrentContent()));
  }, [dataEditorState]);
  useEffect(() => {
    if (value == "") {
      setEditorState(EditorState.createEmpty());
    }
  }, [value]);

  return (
    <Fragment>
      <Grid
        container
        alignItems="flex-start"
        justify="space-around"
        direction="row"
        spacing={3}
      >
        <Grid item xs={12}>
          <Editor
            editorState={dataEditorState}
            editorClassName={classes.textEditor}
            toolbarClassName={classes.toolbarEditor}
            onEditorStateChange={onEditorStateChange}
            // onChange={props.onChange}
          />
        </Grid>
        {/* <Grid item md={4} xs={12}>
          <Typography variant="button">JSON Result :</Typography>
          <textarea
            className={classes.textPreview}
            disabled
            value={JSON.stringify(dataEditorState, null, 4)}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <Typography variant="button">HTML Result :</Typography>
          <textarea
            className={classes.textPreview}
            disabled
            value={draftToHtml(convertToRaw(dataEditorState.getCurrentContent()))}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <Typography variant="button">Markdown Result :</Typography>
          <textarea
            className={classes.textPreview}
            disabled
            value={dataEditorState && draftToMarkdown(convertToRaw(dataEditorState.getCurrentContent()))}
          />
        </Grid> */}
      </Grid>
    </Fragment>
  );
}

Wysiwyg.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Wysiwyg);
