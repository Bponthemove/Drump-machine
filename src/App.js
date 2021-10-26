import React, { useEffect, useState } from "react";
import { Powerbtn } from "./components/power";
import { Text } from "./components/text";
import { DrumMachineTile } from "./components/drumpad";
import { Volume } from "./components/volume";
import { SoundArr } from "./data";
import './App.css'

function App () {

  const [sounds, setSounds] = useState(SoundArr)
  const [power, setPower] = useState(false)
  const [text, setText] = useState('Hello')
  const [volume, setVolume] = useState(50)

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler)
    return() => window.removeEventListener("keydown", keydownHandler)
  }, [power])

  
  //switch power on and off
  function clickHandlerPower() {
    setPower(!power)

    if (!power) {
      setVolume(50)
    }
  }

  //volume control
  function handleChangeValue(e) {
    if (power) {
      setVolume(e.target.value)
    } 
  }

  //toggle tile to play audio file and display text
  function clickHandlerTiles(e) {
    const sample = sounds.find(sound => sound.id === e.target.innerText)
    if (sample) {
      const audio = new Audio(sample.src)
      audio.volume = volume/100
      audio.play()
      setText(sample.text)
      setTimeout(() => {
        setText('')
      }, 200)
    }    
  }

  //toggle tile when that key is pressed
  function keydownHandler(e) {
    if (power) {
      const sample = sounds.find(sound => sound.id === e.key.toUpperCase())
      const index = sounds.indexOf(sample)
      if (sample) {
        const audio = new Audio(sample.src)
        audio.volume = volume/100
        audio.play()
        setText(sample.text)
        setTimeout(() => {
          setText('')
        }, 200)

        //change hover status so that when pressing the key the right div is illuminated for a short while
        let newState = [...sounds]     //copy state
        newState[index] = {...newState[index], hover: true} //switch hover at that index
        setSounds(newState)
        

        //switch div style back to normal after half a second
        setTimeout(() => {
          newState = [...sounds]
          newState[index] = {...newState[index], hover: false} //switch hover at that index
          setSounds(newState)
        }, 200)
      } 
    }
  }
  
  return (
    <div id='drum-machine'>
      <div id='controls'>
        <div id='power'>
          <p>Power</p>
          <Powerbtn 
            power={power}
            onClick={clickHandlerPower}
          />
        </div>
        <Text 
          text={text} 
          power={power}
        />
        <Volume 
          volume={volume} 
          onChangeValue={handleChangeValue}
        />
      </div>
      <div id='empty'></div>
      <div id='samples-container-outer'>
        <div id='samples-container-inner'>
          {sounds.map(sound => {
            return (
              <DrumMachineTile 
                key={sound.id} 
                id={sound.id} 
                src={sound.src} 
                onClick={clickHandlerTiles} 
                power={power} 
                hover={sound.hover}
              />
            )}
          )}
        </div>
      </div>
    </div>
  ) 
}

export default App 
