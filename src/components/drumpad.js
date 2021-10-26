import React from 'react'

//stateless components of drumpad tile and then wrap up inside the tile.

const DrumMachineTile = ({ id, src, onClick, power, hover }) => { 
        if (power) {
            return (
                    <div 
                        id={ hover ? "sample-fake-hover" : "sample"} 
                        className='sample-on'>
                        <div 
                            id={id} 
                            className='drum-pad' 
                            onClick={onClick}
                        >
                            {id}
                            <audio src={src} className="clip" id={id}></audio>
                        </div>
                    </div>
            )
        } else {
            return (
                <div></div> 
            )
        }
}

export { DrumMachineTile }
