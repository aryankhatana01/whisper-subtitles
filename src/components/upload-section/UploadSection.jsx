import React, { useRef } from 'react'
import './UploadSection.css'
import UpscaleBtn from '../upload-btn/UploadBtn';

const UploadSection = (props) => {
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    }

    const handleFileChange = (e) => {
        props.setSelectedFile(e.target.files[0]);
        console.log(e.target.files[0]);
    }
    return (
        <div className='container'>
            <div className="drag-n-drop" onClick={handleButtonClick}>
                <input type="file" onChange={handleFileChange} name="file" ref={fileInputRef} style={{display: "none"}}/>
                Click or Drag & Drop your video here
                <p>(Make sure the file is an MP4)</p>
            </div>
            <UpscaleBtn />
        </div>
      )
}

export default UploadSection