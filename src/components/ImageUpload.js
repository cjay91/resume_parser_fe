import React, { Component } from "react";
import axios from "axios";

export default class ImageUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: "",
      responseMsg: {
        status: "",
        message: "",
        error: "",
      },
    };
  }

  // image onchange handler
  handleChange = (e) => {
    const imagesArray = [];

    for (let i = 0; i < e.target.files.length; i++) {
      this.fileValidate(e.target.files[i]);
      imagesArray.push(e.target.files[i]);
    }
    this.setState({
      image: imagesArray,
    });
  };

  // submit handler
  submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let i = 0; i < this.state.image.length; i++) {
      data.append("files[]", this.state.image[i]);
    }

    axios
      .post("http://127.0.0.1:5000/upload", data)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          this.setState({
            responseMsg: {
              status: response.data.status,
              message: response.data.message,
            },
          });
          setTimeout(() => {
            this.setState({
              image: "",
              responseMsg: "",
            });
          }, 5000);

          document.querySelector("#imageForm").reset();
        }
        alert("Successfully Uploaded");
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          console.log(error.response);
          if (error.response.status === 401) {
            alert("Invalid credentials");
          }
        }
      });
  };

  // file validation
  fileValidate = (file) => {
    if (file.type === "application/pdf") {
      this.setState({
        responseMsg: {
          error: "",
        },
      });
      return true;
    } else {
      this.setState({
        responseMsg: {
          error: "File type allowed only pdf",
        },
      });
      return false;
    }
  };

  render(){
    return (
      <div className="container h-100 d-flex justify-content-center align-items-center">
        <div className="card p-3 shadow" style={{ maxWidth: "1000px" }}>
          <form onSubmit={this.submitHandler} encType="multipart/form-data" id="imageForm">
          <label htmlFor="images" className="form-label flex-grow-1">
                Select candidate CVs
              </label>
            <div className="mb-3 d-flex">
 
              <input
                type="file"
                name="image"
                multiple
                onChange={this.handleChange}
                className="form-control flex-grow-1 me-2"
              />
              <button type="submit" className="btn btn-success">
                Upload
              </button>
            </div>

            {this.state.responseMsg.status === "successs" && (
              <div className="alert alert-success">
                {this.state.responseMsg.message}
              </div>
            )}

            {this.state.responseMsg.status === "failed" && (
              <div className="alert alert-danger">
                {this.state.responseMsg.message}
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
}
