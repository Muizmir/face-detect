import React from 'react';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/image-form/image-form';
import Rank from './components/rank/rank';
import FaceRecognition from './components/face-recognition/face-recognition';
import SignIn from './components/sign-in/sign-in';
import SignUp from './components/sign-up/sign-up';

import Clarifai from 'clarifai';
import Particles from 'react-particles-js'
import './App.css';

const app = new Clarifai.App({
  apiKey: 'd40cbf80aa7d45a6905d41b6aa2df353'
});

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      imageShown: false,
      box: {

      },
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  calculateFaceLocation = data => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height)
    }
  }

  displayFaceBox = box => {
    this.setState({ box: box });
  }

  onInputChange = event => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {    
    this.setState({ imageShown: true, imageUrl: this.state.input });

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        if(response){
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count}))
          })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(error => console.log(error))
  }

  onRouteChange = (route) => {
    if (route === 'signout' || route === 'signin' ){
      this.setState({ isSignedIn: false });
    } 
    else if (route === 'home'){
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  }

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  render(){
    return (
      <div className="App">
        <div className='Particles'>
          <Particles
            params={{
              particles:{
                number:{
                  value: 50,
                  density:{
                    enable: true,
                    value_area: 500
                  }
                }
              }
            }} />
        </div>
        <Navigation isSignedIn={ this.state.isSignedIn } onRouteChange={ this.onRouteChange } />
        { this.state.route === 'home' ?
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onInputChange={ this.onInputChange } onButtonSubmit = { this.onButtonSubmit }/>
            { this.state.imageShown ? <FaceRecognition box={ this.state.box } imageUrl={ this.state.imageUrl } /> : null }
          </div>
          :
          ( 
            this.state.route === 'signin' ?
              <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            :
            <SignUp loadUser={ this.loadUser } onRouteChange={this.onRouteChange} />
          )}
      </div>
    );
  }
}

export default App;
