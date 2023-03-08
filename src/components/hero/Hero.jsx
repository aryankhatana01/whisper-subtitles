import React, { useState } from 'react';
import './Hero.css';
import videobg from '../../assets/bg2.mp4';
import UploadSection from '../upload-section/UploadSection';
import FileContext from '../contexts/FileContext';

const Hero = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  return (
    <>
        <div className='video-bg'>
            <video src={videobg} autoPlay muted loop></video>
            <div className="upload-section">
            <FileContext.Provider value={selectedFile}>
              <UploadSection setSelectedFile={setSelectedFile}/>
            </FileContext.Provider>
            </div>
        </div>
    </>
  )
}

export default Hero