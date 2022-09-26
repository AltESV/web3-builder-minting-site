import React from 'react'

const StartMinting = (props) => {
  return (
    <div className='mintStart'>
        <div onClick={props.mint} className='button'>MINT</div>  
    </div>
  )
}

export default StartMinting