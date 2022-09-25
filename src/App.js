import { useState} from "react";
import './App.css';
import bgVideo from "./assets/background.mp4";
import nftvideo from "./assets/nftvideo.mp4";
import StartMinting from './components/StartMinting';
import InProgressMinting from './components/InProgressMinting';
import CompletedMinting from './components/CompletedMinting';
import { ethers } from "ethers";
import abi from "./contracts/contract.json";

function App() {
// saves user wallet and supply in session storage 
  const [supply, setSupply] = useState(0);
  const [account, setAccount] = useState() 
  const [inProgress, setInProgress] = useState(false);
  const [completed, setCompleted] = useState(false);

  const mint = async () => {

  }

  const getTotalSupply = async () =>{

  }

  const login = async () => {
    // Option from MetaMask docs
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const walletAccount = accounts[0];
      setAccount(walletAccount);
      // saved contract address from class connect code here https://ethereum.stackexchange.com/questions/120817/how-to-call-a-contract-function-method-using-ethersjs
      const contractAddress = "0xa3a3EF770249ADeCE37f3Be3d43BB878Bb57a8E2";
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(walletAccount);
      const NFTContract = new ethers.Contract(contractAddress, abi, signer);
      
// gives you total supply to feed into mint count on website
      const name = await NFTContract.name()
      const totalSupply = await NFTContract.totalSupply()
      setSupply(totalSupply.toNumber());
      
    }

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


  //displays html elements 
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
              <h2>Web3 Builders Into The Metaverse</h2>
              <p>{supply} Minted / 200 💎</p>
              {/* shows different button depending on if wallet connected*/}
              {account ? <button onClick={login} class="button">MINT</button> :
              <button onClick={login} class="button">CONNECT WALLET</button>
              }
    
            </div>
            
          </div>  
          <div class="footer">
          🎉 MINTING NOW 🎉
          </div>
        </div>
    </div>
  );
}

export default App;
