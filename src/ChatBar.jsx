import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      currentUser: this.props.currentUser,
      type: 'postMessage'
    };
  }

getUserName = (event) => {
  this.setState({currentUser: event.target.value});
}

handleNameChange = (event) => {
  if(event.key == 'Enter'){
    if (this.state.currentUser === '') {
      this.setState({currentUser: 'Anonymous'});
    }
    this.props.onNewName(this.state.currentUser);
  }
}

handleMessageSend = (event) => {
    if(event.key == 'Enter'){
      this.props.onNewMessage(event.target.value, this.state.currentUser);
      event.target.value = '';
    }
}

  render() {
    const me = this.props.currentUser;
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={me} onKeyPress={this.handleNameChange} onChange={this.getUserName}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleMessageSend } />
      </footer>
    );
  }
}
export default ChatBar;
