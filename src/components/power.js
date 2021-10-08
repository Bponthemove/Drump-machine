import React from "react"


const Powerbtn = ({ power, onClick }) => { 
    if (power) {
        return ( 
        <div id='power-button' className='outer-circle-on'>
            <div id='inner-circle' onClick={onClick}>
            </div>
        </div>
        )
    } else {
    return (
        <div id='power-button' className='outer-circle-off'>
            <div id='inner-circle' onClick={onClick}>
            </div>
        </div>
    )}
}

export { Powerbtn }