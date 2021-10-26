import React from "react"


const Powerbtn = ({ power, onClick }) => { 
    
    return ( 
        <div 
            id='power-button' 
            className={power ? 'outer-circle-on' : 'outer-circle-off'}>
            <div 
                id='inner-circle' 
                onClick={onClick}>
            </div>
        </div>
    ) 
}

export { Powerbtn }