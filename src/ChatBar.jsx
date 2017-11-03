import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      currentUser: 'Anonymous'
    };
  }

getUserName = (event) => {
    this.setState({currentUser: event.target.value});
}

handleKeyPress = (event) => {
    if(event.key == 'Enter'){
      this.props.onNewMessage(event.target.value, this.state.currentUser);
      this.setState({content: ''});
      event.target.value = '';
    }
}


  render() {
    const me = this.props.currentUser;
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={me} onChange={this.getUserName}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleKeyPress } />
      </footer>
    );
  }
}
export default ChatBar;
