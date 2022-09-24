import { useState} from "react";
import './App.css';
import bgVideo from "./assets/background.mp4";
import nftvideo from "./assets/nftvideo.mp4";
import StartMinting from './components/StartMinting';
import InProgressMinting from './components/InProgressMinting';
import CompletedMinting from './components/CompletedMinting';

function App() {
  const [inProgress, setInProgress] = useState(false);
  const [completed, setCompleted] = useState(false);

  const mint = async () => {

  }

  const getTotalSupply = async () =>{

  }

  const login = async () => {
    
  }

  const getState = () => { 
      if(inProgress){
        return <InProgressMinting  />
      }

      if(completed){
        return <CompletedMinting />
      }

      return (
        <StartMinting />
      )
  }


  return (
    <div className="App">
      {/* hack autoplay only is on if muted also on */}
      <video class="bg-video" autoPlay muted loop>
        <source src={bgVideo} type="video/mp4"></source>  
      </video>


        <div class="card">
          <div class="main">
            <div class="image">
            <video class="nft-video" autoPlay muted loop>
              <source src={nftvideo} type="video/mp4"></source>  
            </video>
      
            </div>
            <div class="information">
              <h2>Web3 Builders into the metaverse</h2>
              <p>0 Minted / 200</p>
              <button class="button">CONNECT WALLET</button>
            </div>
            
          </div>  
          <div class="footer">
            MINTING NOW
          </div>
        </div>
    </div>
  );
}

export default App;
