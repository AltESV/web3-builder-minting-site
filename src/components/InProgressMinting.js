import React from 'react'
import ReactLoading from 'react-loading';

const InProgressMinting = (props) => {

  const checkEtherscan = () => {
    const url = "https://goerli.etherscan.io/tx/" + props.hash; 
    window.open(url, "_blank");
  }

  return (
    <div>
        <div>Your NFT is being minted. Please wait.</div>
        <ReactLoading type="bubbles" color="#fff" />
        <div onClick={checkEtherscan} className='button'>CHECK ETHERSCAN</div> 
    </div>
  )
}

export default InProgressMinting