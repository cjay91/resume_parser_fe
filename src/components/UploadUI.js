import React, { Component } from 'react';
import ImageUpload from './ImageUpload';
import JDUpload from './JDUpload';
import DataTable from './DataTable';
import ReadCSVData from './ReadCSVData';
import UploadOne from './UploadOne';
import UploadTwo from './UploadTwo';
import Slider from './Slider';


class ParentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDataTable: false,
    };
  }

  handleButtonClick = () => {
    this.setState({ showDataTable: true });
  };

  render() {
    const { showDataTable } = this.state;

    return (
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div className="upload-space"></div>
        <div style={{ margin: 'auto' }}> {/* Center the Slider component */}
          <Slider />
        </div>
        {/* Other components... */}
        <div className="upload-space"></div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button className="user-friendly-button" onClick={this.handleButtonClick}>
            Click Me
          </button>
        </div>
        {showDataTable && <DataTable/>} {/* Conditionally render DataTable based on showDataTable state */}
      </div>
    );
  }
}

export default ParentComponent;
