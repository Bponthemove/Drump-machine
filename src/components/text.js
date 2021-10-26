import React from "react"

const Text = ({ text, power }) => {
    
    return (
        <div id='display-container-outer'>
            <div 
                id={!power ? 'display-container-inner-off' : 'display-container-inner-on'}>
                <div 
                    className= {!power ? 'display-off' : 'display-on'} 
                    id='display'>{!power ? '' : text}
                </div>
            </div>
        </div>
    )   
}

export { Text }