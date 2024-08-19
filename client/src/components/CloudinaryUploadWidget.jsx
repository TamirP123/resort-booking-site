import { Component } from "react";


class CloudinaryUploadWidget extends Component {
  componentDidMount() {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dcscmcd7q",
        uploadPreset: "ml_default"
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info)
          const image = result.info;
          this.props.onImageUpload(image.url);
        }
      }
    );
    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  }

  render() {
    return (
      <button className="widgetbtn" id="upload_widget">
 <i  class="fa-solid fa-upload"></i>
 <span class="text">
    Upload Photo
  </span>
      </button>
     
    );
  }
}

export default CloudinaryUploadWidget;