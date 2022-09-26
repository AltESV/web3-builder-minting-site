import React from 'react'

const CompletedMinting = () => {

  const viewOpenSea = () => {
    const url = "https://testnets.opensea.io/collection/fanacrew-v4"; 
    window.open(url, "_blank");
  }

  return (
    <div>
        <div>All set! Your NFT has been minted.</div>
        <div onClick={viewOpenSea} className='button'>VIEW OPENSEA</div>
    </div>
  )
}

export default CompletedMinting