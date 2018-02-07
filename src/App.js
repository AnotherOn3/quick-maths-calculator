import React, { Component } from 'react';

import './App.css';

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
        <h1>QUICK MATHS CALCULATOR</h1>
        <div>
          <input
            onChange={event =>
              this.setState({ firstInput: event.target.value })
            }
            type="number"
          />
          <input
            onChange={event =>
              this.setState({ secondInput: event.target.value })
            }
            type="number"
          />
          <br />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginTop: 30,
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
