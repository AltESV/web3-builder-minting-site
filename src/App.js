import { useState, useEffect } from "react";
import './App.css';
import bgVideo from "./assets/background.mp4";
import nftvideo from "./assets/nftvideo.mp4";
import StartMinting from './components/StartMinting';
import InProgressMinting from './components/InProgressMinting';
import CompletedMinting from './components/CompletedMinting';
import { ethers } from "ethers";
import abi from "./contracts/contract.json";

function App() {

  const [inProgress, setInProgress] = useState(false);  
  const [completed, setCompleted] = useState(false);
  const [account, setAccount] = useState();
  const [supply, setSupply] = useState(0);
  const [contract, setContract] = useState();
  const [hash, setHash] = useState("");
  

  const mint = async () => {
    const options = {value: ethers.utils.parseEther("0.01")};
    const transaction = await contract.safeMint(1, options);
    setHash(transaction.hash);
    setInProgress(true);
    await transaction.wait();
    setInProgress(false);
    setCompleted(true);
  }


  useEffect(() => {
    if(contract) {
    getTotalSupply();}
  }, [contract]);

  const getTotalSupply = async () =>{
  
    const totalSupply = await contract.totalSupply()
    setSupply(totalSupply.toNumber());

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
      setContract(NFTContract);
      
      
    }

  }

  const getState = () => { 
      if(inProgress){
        return <InProgressMinting hash={hash}/>
      }

      if(completed){
        return <CompletedMinting />
      }

      return (
        <StartMinting mint={mint}/>
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
              {account ? 
                getState()
               :
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
