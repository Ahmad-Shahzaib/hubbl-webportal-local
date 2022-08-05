import React, { useState, useEffect } from "react";
import FullScreenDialog from "./demos/DialogModal/FullScreenDialog";
// import { Document, Page, pdfjs } from "react-pdf/dist/umd/entry.webpack";
// import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { resolveUrl, UPLOADURL } from "dan-api/url";
import { useWindowDimensions } from "dan-api/hooks";
import { withStyles, useTheme } from "@material-ui/styles";
import DocViewer, {
  // BMPRenderer,
  // PDFRenderer,
  // HTMLRenderer,
  // JPGRenderer,
  // MSDocRenderer,
  // MSGRenderer,
  // PNGRenderer,
  // TXTRenderer,
  DocViewerRenderers,
} from "react-doc-viewer";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: 30,
  },
  attachment: {
    flexGrow: 1,
    padding: 30,
    margin: 10,
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
  Btnmargin: {
    marginTop: 10,
    alignItems: "center",
  },
});

function PDFViewer(props) {
  const [isReady, setIsReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [numPage, setNumPage] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const theme = useTheme();
  const { width, height } = useWindowDimensions();
  // console.log(theme);

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

  function onDocumentLoadSuccess({ numPages }) {
    setNumPage(numPages);
  }

  function nextPage() {
    setPageNumber(pageNumber + 1);
  }

  function previousPage() {
    setPageNumber(pageNumber - 1);
  }

  return (
    <FullScreenDialog
      open={open}
      onClose={handleClose}
      title="Attachment Viewer"
    >
      <Grid container spacing={3} direction="row" justify="space-between">
        <Grid item xs={12} md={12} lg={12}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper style={styles().attachment}>
              <DocViewer
                documents={[{ uri: UPLOADURL + resolveUrl(props.url) }]}
                pluginRenderers={DocViewerRenderers}
                theme={{
                  disableThemeScrollbar: false,
                  tertiary: theme.palette.common.white,
                  text_tertiary: theme.palette.text.primary,
                  primary: theme.palette.common.white,
                  secondary: theme.palette.background.paper,
                  text_primary: theme.palette.common.black,
                  text_secondary: theme.palette.text.primary,
                }}
                config={{
                  header: {
                    disableHeader: true,
                  },
                }}
                style={{
                  background: theme.palette.background.default,
                  minHeight: height - 200,
                }}
              />
              {/* {props.url.endsWith("pdf") || props.url.endsWith("PDF") ? (
                <Grid
                  container
                  spacing={3}
                  alignItems="center"
                  direction="row"
                  justify="space-evenly"
                >
                  <Document
                    file={{
                      url: UPLOADURL + resolveUrl(props.url),
                      withCredentials: false,
                    }}
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    <Page pageNumber={pageNumber} width={800} height={1200} />
                    <Grid
                      container
                      spacing={3}
                      alignItems="center"
                      direction="row"
                      justify="space-evenly"
                      style={{ marginTop: 20 }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        type="button"
                        onClick={previousPage}
                        style={styles.margin}
                        disabled={pageNumber <= 1}
                      >
                        Previous
                      </Button>
                      <p>
                        Page {pageNumber} of {numPage}
                      </p>
                      <Button
                        variant="contained"
                        color="primary"
                        type="button"
                        onClick={nextPage}
                        style={styles.margin}
                        disabled={pageNumber == numPage}
                      >
                        Next
                      </Button>
                    </Grid>
                  </Document>
                </Grid>
              ) : (
                <Grid
                  container
                  spacing={3}
                  alignItems="center"
                  direction="row"
                  justify="space-evenly"
                >
                  {props.url !== "" ? (
                    <img
                      src={UPLOADURL + resolveUrl(props.url)}
                      style={{ width: 500, height: 500 }}
                    />
                  ) : null}
                </Grid>
              )} */}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </FullScreenDialog>
  );
}

export default withStyles(styles)(PDFViewer);
