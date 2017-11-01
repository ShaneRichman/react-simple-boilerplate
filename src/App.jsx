import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {loading: false,
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
    };
  }





  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: true
        })
    })
  }

  render(props) {
    if(this.state.loading) {
      return (
        <div>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
          </nav>
          <MessageList messages={this.state.messages}/>
          <ChatBar currentUser={ this.state.currentUser.name}/>
        </div>
      );
    } else {
      return <h1>3 seconds have elapsed and page is loaded</h1>
    }
  }
}
export default App;
