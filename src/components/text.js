import React from "react"

const Text = ({ text, power }) => {
    if (!power) {
        return (
            <div id='display-container-outer'>
                <div id='display-container-inner-off'>
                    <div className= 'display-off' id='display'></div>
                </div>
            </div>
        )
    } else {
        return (
            <div id='display-container-outer'>
                <div id='display-container-inner-on'>
                    <div className= 'display-on' id='display'>{text}</div>
                </div>
            </div>
        )
    }
}

export { Text }