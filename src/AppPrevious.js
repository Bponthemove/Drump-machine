import React, { Component } from "react";
import { Powerbtn } from "./components/power";
import { Text } from "./components/text";
import { DrumMachineTile } from "./components/drumpad";
import { Volume } from "./components/volume";
import { SoundArr } from "./data";
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      "sounds": SoundArr,
      "power": false,
      "text": 'HELLO',
      "volume": 50,
    }
    this.clickHandlerPower = this.clickHandlerPower.bind(this)
    this.clickHandlerTiles = this.clickHandlerTiles.bind(this)
    this.keydownHandler = this.keydownHandler.bind(this)
    this.handleChangeValue = this.handleChangeValue.bind(this)
  }

  componentDidMount() {
      document.addEventListener("keydown", this.keydownHandler, false)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydownHandler, false)
  }

  //switch power on and off
  clickHandlerPower() {
    this.setState(
      {power: !this.state.power}
    )
    if (!this.state.power) {
      this.setState(
        {volume: 50}
      )
    }
  }

  //volume control
  handleChangeValue(e) {
    if (this.state.power) {
      this.setState(
        {volume: e.target.value}
      )
    } 
  }

  //toggle tile to play audio file and display text
  clickHandlerTiles(e) {
    const sample = this.state.sounds.find(sound => sound.id === e.target.innerText)
    if (sample) {
      const audio = new Audio(sample.src)
      audio.volume = this.state.volume/100
      audio.play()
      this.setState(
        {text: sample.text}
      )
      setTimeout(() => {
        this.setState(
          {text: ''}
        )
      }, 200)
    }    
  }

  //toggle tile when that key is pressed
  keydownHandler(e) {
    if (this.state.power) {
      const sample = this.state.sounds.find((sound, i) => sound.id === e.key.toUpperCase())
      const index = this.state.sounds.indexOf(sample)
      if (sample) {
        const audio = new Audio(sample.src)
        audio.volume = this.state.volume/100
        audio.play()
        this.setState(
          {text: sample.text}
        )
        setTimeout(() => {
          this.setState(
            {text: ''}
          )
        }, 200)

        //change hover status so that when pressing the key the right div is illuminated for a short while
        let newState = [...this.state.sounds]     //copy state
        newState[index] = {...newState[index], hover: !newState.hover} //switch hover at that index
        this.setState(
          {sounds: newState}
        )

        //switch div style back to normal after half a second
        setTimeout(() => {
          newState = [...this.state.sounds]
          newState[index] = {...newState[index], hover: false} //switch hover at that index
          console.log(newState[index]);
          this.setState(
          {sounds: newState}
        )}, 200)
      } 
    }
  }
  
  render() {
    return (
      <div id='drum-machine'>
        <div id='controls'>
          <div id='power'>
            <p>Power</p>
            <Powerbtn power={this.state.power} onClick={this.clickHandlerPower}/>
          </div>
          <Text text={this.state.text} power={this.state.power}/>
          <Volume volume={this.state.volume} onChangeValue={this.handleChangeValue}/>
        </div>
        <div id='empty'></div>
        <div id='samples-container-outer'>
          <div id='samples-container-inner'>
            {this.state.sounds.map(sound => {
              return (
                <DrumMachineTile key={sound.id} id={sound.id} src={sound.src} onClick={this.clickHandlerTiles} power={this.state.power} hover={sound.hover}>
                </DrumMachineTile>
              )}
            )}
          </div>
        </div>
      </div>
    )
  } 
}

export default App 
