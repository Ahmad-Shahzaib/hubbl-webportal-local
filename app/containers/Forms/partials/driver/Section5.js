import React, { useState, useEffect, useRef } from "react";
import { withStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { getCookie, setCookie } from "dan-api/cookie";
import { URL, IMGURL, UPLOADURL, resolveUrl } from "dan-api/url";
import Paper from "@material-ui/core/Paper";
import "react-toastify/dist/ReactToastify.css";
import Typography from "@material-ui/core/Typography";
import UploadInputAll from "../../demos/UploadInputAll";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import ImageLightbox from "react-image-lightbox";
import FullScreenDialog from "../../../UiElements/demos/DialogModal/FullScreenDialog";
import PDFViewer from "../../../UiElements/PDFViewer";
import AttachmentSideTabs from "./AttachmentSideTabs";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { useWindowDimensions } from "dan-api/hooks";

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

function Section5(props) {
  const {
    removeAttachment,
    handleUpload,
    handleCheckBox,
    passport,
    public_laibility_insurance,
    driving_license,
    driver_quilification_card,
    driver_card,
    driver_training_cirtificate,
    CEST,
    profile_image,
    vat,
    remittances,
    passport_check,
    public_laibility_insurance_check,
    driving_license_check,
    driver_quilification_card_check,
    driver_card_check,
    driver_training_cirtificate_check,
    CEST_check,
    vat_check,
    remittances_check,
    isAddForm,
    previous,
    next,
    files,
    viewMode,
  } = props;

  const theme = useTheme();
  const { height } = useWindowDimensions();

  const defaultPDFConfig = {
    open: false,
    onClose: () => {},
    url: "",
  };

  const [viewURL, setViewURL] = useState("");
  const [displayImageViewer, setDisplayImageViewer] = useState(false);
  const [viewAttachments, setViewAttachments] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [PDFConfig, setPDFConfig] = useState(defaultPDFConfig);

  useEffect(() => {
    if (getCookie("id")) {
    } else {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    if (!isAddForm && files) {
      if (viewMode) {
        setViewAttachments(true);
      }
      handleAttachments();
    }
  }, [files]);

  function handleAttachments() {
    const _files = [];
    if (files.passport) {
      _files.push({
        title: "Passport",
        url: files.passport,
        onClick: () => handleView(files.passport),
        onDelete: (index) => removeAttachment(index, "passport"),
      });
    }
    if (files.public_laibility_insurance) {
      _files.push({
        title: "Public Liability Insurance",
        url: files.public_laibility_insurance,
        onClick: () => handleView(files.public_laibility_insurance),
        onDelete: (index) =>
          removeAttachment(index, "public_laibility_insurance"),
      });
    }
    if (files.driving_license) {
      _files.push({
        title: "Driving License",
        url: files.driving_license,
        onClick: () => handleView(files.driving_license),
        onDelete: (index) => removeAttachment(index, "driving_license"),
      });
    }
    if (files.driver_quilification_card) {
      _files.push({
        title: "Driver Qualification Card",
        url: files.driver_quilification_card,
        onClick: () => handleView(files.driver_quilification_card),
        onDelete: (index) =>
          removeAttachment(index, "driver_quilification_card"),
      });
    }
    if (files.driver_card) {
      _files.push({
        title: "Driver Card",
        url: files.driver_card,
        onClick: () => handleView(files.driver_card),
        onDelete: (index) => removeAttachment(index, "driver_card"),
      });
    }
    if (files.driver_training_cirtificate) {
      _files.push({
        title: "Driver Training Certificate",
        url: files.driver_training_cirtificate,
        onClick: () => handleView(files.driver_training_cirtificate),
        onDelete: (index) =>
          removeAttachment(index, "driver_training_cirtificate"),
      });
    }
    if (files.CEST) {
      _files.push({
        title: "CEST Report",
        url: files.CEST,
        onClick: () => handleView(files.CEST),
        onDelete: (index) => removeAttachment(index, "CEST"),
      });
    }
    if (files.profile_image) {
      _files.push({
        title: "Profile Image",
        url: files.profile_image,
        onClick: () => handleView(files.profile_image),
        onDelete: (index) => removeAttachment(index, "profile_image"),
      });
    }
    if (files.vat) {
      _files.push({
        title: "Vat Certificate",
        url: files.vat,
        onClick: () => handleView(files.vat),
        onDelete: (index) => removeAttachment(index, "vat"),
      });
    }
    if (files.remittances) {
      const remits = files.remittances.split("***");
      for (let i = 0; i < remits.length; i++) {
        let count = i + 1;
        _files.push({
          title: resolveUrl(remits[i]),
          url: remits[i],
          onClick: () => handleView(remits[i]),
          onDelete: (index) => removeAttachment(index, "remittances", i),
        });
      }
    }
    // console.log(data);
    if (_files.length) {
      handleView(_files[0].url);
    }
    setAttachments(_files);
  }

  function handleView(url) {
    let _url = url;
    if (!url.includes("https:") && !url.includes("http:")) {
      _url = IMGURL + url;
    }
    setViewURL(_url);
  }

  function handleViewSingle(url, type, index) {
    // console.log(url);
    let _url = url;
    if (!url.includes("https:") && !url.includes("http:")) {
      _url = IMGURL + url;
    }
    // console.log(_url);
    setViewURL(_url);
    if (
      _url.endsWith(".png") ||
      _url.endsWith(".jpg") ||
      _url.endsWith(".jpeg") ||
      _url.endsWith(".bmp") ||
      _url.endsWith(".gif")
    ) {
      setDisplayImageViewer(true);
    } else {
      setPDFConfig({
        open: true,
        onClose: () => setPDFConfig(defaultPDFConfig),
        url: _url,
      });
    }
  }

  return (
    <Grid
      container
      spacing={3}
      alignItems="flex-start"
      direction="row"
      justify="center"
    >
      <FullScreenDialog
        open={viewAttachments}
        onClose={() => {
          if (viewAttachments) {
            setViewAttachments(false);
          }
        }}
        title="Attachments"
      >
        <Grid container spacing={3} direction="row" justify="space-between">
          <Grid item xs={12} md={3} lg={3}>
            <Grid item xs={12} md={12} lg={12}>
              <AttachmentSideTabs attachments={attachments} />
            </Grid>
          </Grid>
          <Grid item xs={12} md={9} lg={9}>
            <Grid item xs={12} md={12} lg={12}>
              <Paper style={styles().attachment}>
                <DocViewer
                  documents={[{ uri: UPLOADURL + resolveUrl(viewURL) }]}
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
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </FullScreenDialog>
      {displayImageViewer && (
        <ImageLightbox
          mainSrc={UPLOADURL + resolveUrl(viewURL)}
          onCloseRequest={() => setDisplayImageViewer(false)}
        />
      )}
      {viewMode ? null : (
        <Grid item xs={12} md={12} lg={12}>
          <Paper style={styles().root}>
            <Grid
              container
              spacing={3}
              alignItems="flex-start"
              direction="row"
              justify="space-between"
              style={{ marginBottom: isAddForm ? 10 : 0 }}
            >
              <Typography variant="h5" component="h3">
                Attachments
              </Typography>
              {!isAddForm ? (
                <Button
                  variant="contained"
                  color="secondary"
                  type="button"
                  style={{ margin: 10 }}
                  onClick={() => setViewAttachments(true)}
                >
                  Attachments
                </Button>
              ) : null}
            </Grid>
            <Typography
              variant="h6"
              component="h3"
              style={{ fontSize: 16, marginBottom: 20 }}
            >
              Note: Tick the checkbox if the uploaded file is not the default
              one
            </Typography>

            <form onSubmit={() => {}}>
              <Grid md={12} container spacing={2} item>
                <Grid md={6} sm={12} xs={12} item>
                  <div>
                    <div style={{ marginBottom: 5 }}>
                      <Typography
                        variant="h6"
                        component="h2"
                        style={{ fontSize: 16, marginTop: 10 }}
                      >
                        Passport
                      </Typography>
                    </div>
                    <UploadInputAll
                      onUpload={handleUpload("passport")}
                      text="Scanned copy or picture of your 'Passport'"
                      files={passport && [passport]}
                      showPreviews={true}
                      style={{ width: "100%" }}
                    />
                  </div>
                  {!isAddForm && files && files.passport ? (
                    <Button
                      variant="contained"
                      color="primary"
                      type="button"
                      onClick={() =>
                        handleViewSingle(files.passport, "Passport")
                      }
                      style={{ marginTop: -12 }}
                    >
                      View Previous
                    </Button>
                  ) : null}
                  <FormControlLabel
                    control={
                      <div>
                        <Checkbox
                          value="checkedD"
                          checked={passport_check ? true : false}
                          onChange={handleCheckBox("passport_check")}
                          color="primary"
                        />
                      </div>
                    }
                    label="File Available"
                    style={{ marginLeft: "auto", marginTop: -12 }}
                  />
                </Grid>
                <Grid md={6} sm={12} xs={12} item>
                  <div>
                    <div style={{ marginBottom: 5 }}>
                      <Typography
                        variant="h6"
                        component="h2"
                        style={{ fontSize: 16, marginTop: 10 }}
                      >
                        Public Liability Insurance
                      </Typography>
                    </div>
                    <UploadInputAll
                      onUpload={handleUpload("public_laibility_insurance")}
                      text="Scanned copy or picture of your 'Public Liability Insurance'"
                      files={
                        public_laibility_insurance && [
                          public_laibility_insurance,
                        ]
                      }
                      showPreviews={true}
                      style={{ width: "100%" }}
                    />
                  </div>
                  {!isAddForm && files && files.public_laibility_insurance ? (
                    <Button
                      variant="contained"
                      color="primary"
                      type="button"
                      onClick={() =>
                        handleViewSingle(
                          files.public_laibility_insurance,
                          "Insurance"
                        )
                      }
                      style={{ marginTop: -12 }}
                    >
                      View Previous
                    </Button>
                  ) : null}
                  <FormControlLabel
                    control={
                      <div>
                        <Checkbox
                          value="checkedD"
                          checked={
                            public_laibility_insurance_check ? true : false
                          }
                          onChange={handleCheckBox(
                            "public_laibility_insurance_check"
                          )}
                          color="primary"
                        />
                      </div>
                    }
                    label="File Available"
                    style={{ marginLeft: "auto", marginTop: -12 }}
                  />
                </Grid>
                <Grid md={6} sm={12} xs={12} item>
                  <div>
                    <div style={{ marginBottom: 5 }}>
                      <Typography
                        variant="h6"
                        component="h2"
                        style={{ fontSize: 16, marginTop: 15 }}
                      >
                        DVLA Driving License
                      </Typography>
                    </div>
                    <UploadInputAll
                      onUpload={handleUpload("driving_license")}
                      text="Scanned copy or picture of your 'DVLA Driving License'"
                      files={driving_license && [driving_license]}
                      showPreviews={true}
                      style={{ width: "100%" }}
                    />
                  </div>
                  {!isAddForm && files && files.driving_license ? (
                    <Button
                      variant="contained"
                      color="primary"
                      type="button"
                      onClick={() =>
                        handleViewSingle(files.driving_license, "License")
                      }
                      style={{ marginTop: -12 }}
                    >
                      View Previous
                    </Button>
                  ) : null}
                  <FormControlLabel
                    control={
                      <div>
                        <Checkbox
                          value="checkedD"
                          checked={driving_license_check ? true : false}
                          onChange={handleCheckBox("driving_license_check")}
                          color="primary"
                        />
                      </div>
                    }
                    label="File Available"
                    style={{ marginLeft: "auto", marginTop: -12 }}
                  />
                </Grid>
                <Grid md={6} sm={12} xs={12} item>
                  <div>
                    <div style={{ marginBottom: 5 }}>
                      <Typography
                        variant="h6"
                        component="h2"
                        style={{ fontSize: 16, marginTop: 15 }}
                      >
                        Driver Qualification Card
                      </Typography>
                    </div>
                    <UploadInputAll
                      onUpload={handleUpload("driver_quilification_card")}
                      text="Scanned copy or picture of your 'Driver Qualification Card'"
                      files={
                        driver_quilification_card && [driver_quilification_card]
                      }
                      showPreviews={true}
                      style={{ width: "100%", marginTop: -12 }}
                    />
                  </div>
                  {!isAddForm && files && files.driver_quilification_card ? (
                    <Button
                      variant="contained"
                      color="primary"
                      type="button"
                      onClick={() =>
                        handleViewSingle(
                          files.driver_quilification_card,
                          "QCard"
                        )
                      }
                      style={{ marginTop: -12 }}
                    >
                      View Previous
                    </Button>
                  ) : null}
                  <FormControlLabel
                    control={
                      <div>
                        <Checkbox
                          value="checkedD"
                          checked={
                            driver_quilification_card_check ? true : false
                          }
                          onChange={handleCheckBox(
                            "driver_quilification_card_check"
                          )}
                          color="primary"
                        />
                      </div>
                    }
                    label="File Available"
                    style={{ marginLeft: "auto", marginTop: -12 }}
                  />
                </Grid>
                <Grid md={6} sm={12} xs={12} item>
                  <div>
                    <div style={{ marginBottom: 5 }}>
                      <Typography
                        variant="h6"
                        component="h2"
                        style={{ fontSize: 16, marginTop: 15 }}
                      >
                        Driver Card
                      </Typography>
                    </div>
                    <UploadInputAll
                      onUpload={handleUpload("driver_card")}
                      text="Scanned copy or picture of your 'Driver Card'"
                      files={driver_card && [driver_card]}
                      showPreviews={true}
                      style={{ width: "100%" }}
                    />
                  </div>
                  {!isAddForm && files && files.driver_card ? (
                    <Button
                      variant="contained"
                      color="primary"
                      type="button"
                      onClick={() =>
                        handleViewSingle(files.driver_card, "DCard")
                      }
                      style={{ marginTop: -12 }}
                    >
                      View Previous
                    </Button>
                  ) : null}
                  <FormControlLabel
                    control={
                      <div>
                        <Checkbox
                          value="checkedD"
                          checked={driver_card_check ? true : false}
                          onChange={handleCheckBox("driver_card_check")}
                          color="primary"
                        />
                      </div>
                    }
                    label="File Available"
                    style={{ marginLeft: "auto", marginTop: -12 }}
                  />
                </Grid>
                <Grid md={6} sm={12} xs={12} item>
                  <div>
                    <div style={{ marginBottom: 5 }}>
                      <Typography
                        variant="h6"
                        component="h2"
                        style={{ fontSize: 16, marginTop: 15 }}
                      >
                        Driver Training Certificate
                      </Typography>
                    </div>
                    <UploadInputAll
                      onUpload={handleUpload("driver_training_cirtificate")}
                      text="Scanned copy or picture of your 'Driver Training Certificate'"
                      files={
                        driver_training_cirtificate && [
                          driver_training_cirtificate,
                        ]
                      }
                      showPreviews={true}
                      style={{ width: "100%" }}
                    />
                  </div>
                  {!isAddForm && files && files.driver_training_cirtificate ? (
                    <Button
                      variant="contained"
                      color="primary"
                      type="button"
                      onClick={() =>
                        handleViewSingle(
                          files.driver_training_cirtificate,
                          "Training"
                        )
                      }
                      style={{ marginTop: -12 }}
                    >
                      View Previous
                    </Button>
                  ) : null}
                  <FormControlLabel
                    control={
                      <div>
                        <Checkbox
                          value="checkedD"
                          checked={
                            driver_training_cirtificate_check ? true : false
                          }
                          onChange={handleCheckBox(
                            "driver_training_cirtificate_check"
                          )}
                          color="primary"
                        />
                      </div>
                    }
                    label="File Available"
                    style={{ marginLeft: "auto", marginTop: -12 }}
                  />
                </Grid>
                <Grid md={6} sm={12} xs={12} item>
                  <div>
                    <div style={{ marginBottom: 5 }}>
                      <Typography
                        variant="h6"
                        component="h2"
                        style={{ fontSize: 16, marginTop: 15 }}
                      >
                        CEST
                      </Typography>
                    </div>
                    <UploadInputAll
                      onUpload={handleUpload("CEST")}
                      text="Scanned copy or picture of your 'CEST'"
                      files={CEST && [CEST]}
                      showPreviews={true}
                      style={{ width: "100%" }}
                    />
                  </div>
                  {!isAddForm && files && files.CEST ? (
                    <Button
                      variant="contained"
                      color="primary"
                      type="button"
                      onClick={() => handleViewSingle(files.CEST, "CEST")}
                      style={{ marginTop: -12 }}
                    >
                      View Previous
                    </Button>
                  ) : null}
                  <FormControlLabel
                    control={
                      <div>
                        <Checkbox
                          value="checkedD"
                          checked={CEST_check ? true : false}
                          onChange={handleCheckBox("CEST_check")}
                          color="primary"
                        />
                      </div>
                    }
                    label="File Available"
                    style={{ marginLeft: "auto", marginTop: -12 }}
                  />
                </Grid>
                <Grid md={6} sm={12} xs={12} item>
                  <div>
                    <div style={{ marginBottom: 5 }}>
                      <Typography
                        variant="h6"
                        component="h2"
                        style={{ fontSize: 16, marginTop: 15 }}
                      >
                        VAT Certificate
                      </Typography>
                    </div>
                    <UploadInputAll
                      onUpload={handleUpload("vat")}
                      text="Scanned copy or picture of your 'VAT Certificate'"
                      files={vat && [vat]}
                      showPreviews={true}
                      style={{ width: "100%" }}
                    />
                  </div>
                  {!isAddForm && files && files.vat ? (
                    <Button
                      variant="contained"
                      color="primary"
                      type="button"
                      onClick={() => handleViewSingle(files.vat, "vat")}
                      style={{ marginTop: -12 }}
                    >
                      View Previous
                    </Button>
                  ) : null}
                  <FormControlLabel
                    control={
                      <div>
                        <Checkbox
                          value="checkedD"
                          checked={vat_check ? true : false}
                          onChange={handleCheckBox("vat_check")}
                          color="primary"
                        />
                      </div>
                    }
                    label="File Available"
                    style={{ marginLeft: "auto", marginTop: -12 }}
                  />
                </Grid>
                <Grid md={12} sm={12} xs={12} item>
                  <div>
                    <div style={{ marginBottom: 5 }}>
                      <Typography
                        variant="h6"
                        component="h2"
                        style={{ fontSize: 16, marginTop: 15 }}
                      >
                        Remittances
                      </Typography>
                    </div>
                    <UploadInputAll
                      onUpload={handleUpload("remittances")}
                      text="Scanned copy or picture of your 'Remittances'"
                      files={remittances && [remittances]}
                      showPreviews={true}
                      style={{ width: "100%" }}
                    />
                  </div>
                  {!isAddForm && files && files.remittances
                    ? files.remittances.split("***").map((item, index) => (
                        <Button
                          variant="contained"
                          color="primary"
                          type="button"
                          onClick={() =>
                            handleViewSingle(item, "remittance", index)
                          }
                          // style={{ marginTop: -12 }}
                        >
                          {resolveUrl(item)}
                        </Button>
                      ))
                    : null}
                  <FormControlLabel
                    control={
                      <div>
                        <Checkbox
                          value="checkedD"
                          checked={remittances_check ? true : false}
                          onChange={handleCheckBox("remittances_check")}
                          color="primary"
                        />
                      </div>
                    }
                    label="File Available"
                    style={{ marginLeft: "auto" }}
                  />
                </Grid>
                <Grid md={12} sm={12} xs={12} item>
                  <div>
                    <div style={{ marginBottom: 5 }}>
                      <Typography
                        variant="h6"
                        component="h2"
                        style={{ fontSize: 16, marginTop: 15 }}
                      >
                        Profile Image
                      </Typography>
                    </div>
                    <UploadInputAll
                      onUpload={handleUpload("profile_image")}
                      text={"Drag & drop your profile image here"}
                      files={profile_image && [profile_image]}
                      showPreviews={true}
                      style={{ width: "100%" }}
                    />
                  </div>
                  {!isAddForm && files && files.profile_image ? (
                    <Button
                      variant="contained"
                      color="primary"
                      type="button"
                      onClick={() => handleViewSingle(files.profile_image)}
                      style={{ marginTop: -12 }}
                    >
                      View Previous
                    </Button>
                  ) : null}
                </Grid>
              </Grid>
              <div style={{ marginTop: 20 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={previous}
                  style={styles().margin}
                >
                  Previous
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={next}
                  style={styles().margin}
                >
                  Next
                </Button>
              </div>
            </form>
          </Paper>
        </Grid>
      )}
      <PDFViewer {...PDFConfig} />
    </Grid>
  );
}

export default withStyles(styles)(Section5);
