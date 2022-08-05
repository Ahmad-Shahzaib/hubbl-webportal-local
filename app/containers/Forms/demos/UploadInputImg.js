import React, { Fragment, useState, useEffect } from "react";
import { MaterialDropZone } from "dan-components";

function UploadInputImg(props) {
  const [files, setFiles] = useState(props.files || []);

  return (
    <Fragment>
      <div>
        <MaterialDropZone
          acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
          onUpload={(f) => props.onUpload(f)}
          files={files}
          showPreviews
          maxSize={5000000}
          filesLimit={props.filelimit || 1}
          text={props.text || "Drag and drop image(s) here or click"}
        />
      </div>
    </Fragment>
  );
}

export default UploadInputImg;
