import './App.css';
import videobg from './assets/bg.mp4'

function App() {
  return (
    <div className="App">
      <div className='video-bg'>
        <video src={videobg} autoPlay muted loop></video>
      </div>
    </div>
  );
}

export default App;
