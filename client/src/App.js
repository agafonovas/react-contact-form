import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import FormPopup from './components/FormPopup'
import Popup from 'reactjs-popup';




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      message: '',
      email: '',
      buttonText: 'SEND',
      open: false
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ open: true });
  }
  closeModal() {
    this.setState({ open: false });
  }
  
  formSubmit = (e) => {
    e.preventDefault()

    this.setState({
        buttonText: 'SENDING...',
    })
  
    let data = {
        name: this.state.name,
        email: this.state.email,
        message: this.state.message
    }

    axios.post('/sendEmail', data)
    .then( res => {
      this.setState({ open: true }, this.resetForm())
    })
    .catch( () => {
      console.log('Message not sent')
    })
  }

  resetForm = () => {
    this.setState({
        name: '',
        message: '',
        email: '',
        buttonText: 'SEND'
    })
}

  render() {
    return (
      <form onSubmit={ (e) => this.formSubmit(e)} className="contact--form" name="getintouch">
        <input onChange={e => this.setState({ name: e.target.value})} value={this.state.name} type="text" name="name" className="contact--form-input" placeholder="Name" required />
        <input onChange={(e) => this.setState({ email: e.target.value})} value={this.state.email} type="email" name="email" className="contact--form-input" placeholder="E-mail" required />
        <textarea onChange={e => this.setState({ message: e.target.value})} value={this.state.message} name="message" className="contact--form-input" placeholder="Message" required></textarea>
        <button className="link-button dark wide">{ this.state.buttonText }</button>
        <Popup 
          open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal}
          >
          <div className="popup--wrapper">
            <div className="popup--content popup--content-result">
              <h3>Thanks for filling out our form!</h3>
              <p>We will look over your message and Tatiana will get back to you in 24 hours. In the meantime, you can check the <a href="/foundation">Foundation</a> section, look over our <a href="/experience">projects collection</a> or browse through our latest <a href="/blog">blog posts</a>.</p>
              <p>Your mate at MadAppGang, Jack Rudenko.</p>
            <div className="link-button dark wide popup-content--ok" onClick={this.closeModal}>OK</div>
            </div>
          </div>
        </Popup>
      </form>
    );
  }
}

export default App;