import React, { Fragment, useState } from "react";
import { MaterialDropZone } from "dan-components";

function UploadInputAll(props) {
  const [files] = useState(props.files || []);

  return (
    <Fragment>
      <div>
        <MaterialDropZone
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

export default UploadInputAll;
