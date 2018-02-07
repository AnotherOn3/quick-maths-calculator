import React, { Component } from 'react';

import './App.css';
import bigshaq from './bigshaq.jpg';

class App extends Component {
  state = {
    firstInput: '',
    secondInput: '',
    result: '',
    quickMafs: ' quick mafs',
    shouldQuickMafsHide: true,
  };

  add = () => {
    this.setState({
      result:
        parseInt(this.state.firstInput) + parseInt(this.state.secondInput),
      shouldQuickMafsHide: false,
    });
    const audio = new Audio(
      'https://cdn-resources.crowdcat.co/media/a027e3cf-bd0d-4183-83a1-081f6a47915a.mp3',
    );
    audio.play();
  };

  minus = () => {
    this.setState({
      result:
        parseInt(this.state.firstInput) - parseInt(this.state.secondInput),
      shouldQuickMafsHide: false,
    });
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
        }}
      >
        <img
          src={bigshaq}
          className={
            this.state.shouldQuickMafsHide ? 'image' : 'image image-animation'
          }
        />
        <h1>QUICK MATHS CALCULATOR</h1>
        <div>
          <input
            onChange={event =>
              this.setState({ firstInput: event.target.value })
            }
            type="number"
            placeholder="Insert first number"
          />
          <input
            onChange={event =>
              this.setState({ secondInput: event.target.value })
            }
            type="number"
            placeholder="Insert second number"
          />
          <br />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            <button onClick={this.add}>Add</button>
            <button onClick={this.minus}>Minus</button>
          </div>
          <h2>
            {this.state.result}
            {this.state.shouldQuickMafsHide ? '' : this.state.quickMafs}
          </h2>
        </div>
      </div>
    );
  }
}

export default App;
