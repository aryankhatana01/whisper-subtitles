import React from 'react';
import './Hero.css';
import videobg from '../../assets/bg2.mp4';

const Hero = () => {
  return (
    <>
        <div className='video-bg'>
            <video src={videobg} autoPlay muted loop></video>
        </div>
    </>
  )
}

export default Hero