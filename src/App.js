import React, { Component } from 'react';

import './App.css';
import bigshaq from './bigshaq.jpg';
import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone';

class App extends Component {
  state = {
    firstInput: '',
    secondInput: '',
    result: '',
    quickMafs: ' quick mafs',
    shouldQuickMafsHide: true,
    sounds: [
      'https://cdn-resources.crowdcat.co/media/a027e3cf-bd0d-4183-83a1-081f6a47915a.mp3',
      'https://cdn-resources.crowdcat.co/media/8432f01f-0bef-4928-8668-707dc228f378.mp3',
      'https://cdn-resources.crowdcat.co/media/6c1901aa-8719-42e8-b00b-efb1ed0307b1.mp3',
      'https://cdn-resources.crowdcat.co/media/6c1901aa-8719-42e8-b00b-efb1ed0307b1.mp3',
      'https://cdn-resources.crowdcat.co/media/6ce2bb28-6067-4902-a8ec-b50882a43919.mp3',
      'https://cdn-resources.crowdcat.co/media/927feb7b-9d17-443c-a12a-8258c103947f.mp3',
      'https://cdn-resources.crowdcat.co/media/0961d6e1-81cd-48e2-8371-e56c5c9fc882.mp3',
      'https://cdn-resources.crowdcat.co/media/4047b641-4f02-4b16-8336-1974f2f3c0d4.mp3',
      'https://cdn-resources.crowdcat.co/media/0723121b-fd3e-47af-92d8-f72d74e43457.mp3',
      'https://cdn-resources.crowdcat.co/media/d8f968c9-cfb1-465f-bb71-121025aa448d.mp3',
      'https://cdn-resources.crowdcat.co/media/d1991e62-36fb-45c6-a4eb-41b44695d1c3.mp3',
      'https://cdn-resources.crowdcat.co/media/afc19ca1-2d4d-4b86-935f-78ed13cb0bec.mp3',
      'https://cdn-resources.crowdcat.co/media/b5afab28-676f-461f-b491-690a42a29d3b.mp3',
    ],
    shouldAnimate: false,
    text: '',
    focusedInput: '',
  };

  translateWordIntoNumber = word => {
    if (word.includes('one')) {
      return 1;
    } else if (word.includes('two') || word.includes('to')) {
      return 2;
    } else if (word.includes('three') || word.includes('free')) {
      return 3;
    } else if (word.includes('four') || word.includes('for')) {
      return 4;
    } else if (
      word.includes('five') ||
      word.includes('life') ||
      word.includes('hi')
    ) {
      return 5;
    } else if (word.includes('six')) {
      return 6;
    } else if (word.includes('seven')) {
      return 7;
    } else if (word.includes('eight')) {
      return 8;
    } else if (word.includes('nine')) {
      return 9;
    } else {
      return { number: 11 };
    }
  };

  onFirstInputListenClick() {
    fetch('/api/speech-to-text/token')
      .then(function(response) {
        return response.text();
      })
      .then(token => {
        console.log('token is', token);
        var stream = recognizeMic({
          token: token,
          objectMode: true, // send objects instead of text
          extractResults: true, // convert {results: [{alternatives:[...]}], result_index: 0} to {alternatives: [...], index: 0}
          format: false, // optional - performs basic formatting on the results such as capitals an periods
        });
        stream.on('data', data => {
          // if (typeof this.secondInput.value != NaN) {
          //   stream.stop();
          // }
          this.setState({
            firstInput: this.translateWordIntoNumber(
              data.alternatives[0].transcript,
            ),
          });
          stream.stop();
        });
        stream.on('error', function(err) {
          console.log(err);
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onSecondInputListenClick() {
    fetch('/api/speech-to-text/token')
      .then(function(response) {
        return response.text();
      })
      .then(token => {
        console.log('token is', token);
        var stream = recognizeMic({
          token: token,
          objectMode: true, // send objects instead of text
          extractResults: true, // convert {results: [{alternatives:[...]}], result_index: 0} to {alternatives: [...], index: 0}
          format: false, // optional - performs basic formatting on the results such as capitals an periods
        });
        stream.on('data', data => {
          // if (typeof this.secondInput.value != NaN) {
          //   stream.stop();
          // }
          this.setState({
            secondInput: this.translateWordIntoNumber(
              data.alternatives[0].transcript,
            ),
          });
          stream.stop();
        });
        stream.on('error', function(err) {
          console.log(err);
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  stopStreaming = () => {
    console.log('stream stopped');
    fetch('/api/speech-to-text/token')
      .then(function(response) {
        return response.text();
      })
      .then(token => {
        var stream = recognizeMic({
          token: token,
          objectMode: true, // send objects instead of text
          extractResults: true, // convert {results: [{alternatives:[...]}], result_index: 0} to {alternatives: [...], index: 0}
          format: false, // optional - performs basic formatting on the results such as capitals an periods
        });
        stream.stop();
      });
  };

  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  add = () => {
    this.setState({
      result:
        parseInt(this.state.firstInput) + parseInt(this.state.secondInput),
      shouldQuickMafsHide: false,
    });
    this.playSong();
  };

  playSong = () => {
    const index = this.getRandomInt(1, this.state.sounds.length);
    const audio = new Audio(this.state.sounds[index]);
    audio.play();
  };

  minus = () => {
    this.setState({
      result:
        parseInt(this.state.firstInput) - parseInt(this.state.secondInput),
      shouldQuickMafsHide: false,
    });
    this.playSong();
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
            this.state.shouldQuickMafsHide ? 'image' : 'image-animation'
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
            ref={input => (this.firstInput = input)}
            value={this.state.firstInput}
            onFocus={this.onFirstInputListenClick.bind(this)}
          />
          <input
            onChange={event =>
              this.setState({ secondInput: event.target.value })
            }
            type="number"
            placeholder="Insert second number"
            ref={input => (this.secondInput = input)}
            value={this.state.secondInput}
            onFocus={this.onSecondInputListenClick.bind(this)}
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
        <div style={{ fontSize: '40px' }}>{this.state.text}</div>
      </div>
    );
  }
}

export default App;
