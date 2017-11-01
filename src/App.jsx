import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    console.log(props)
    super(props);
    console.log(this);
    this.state = {loading: false};
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({loading: true})
    }, 500)
  }

  render() {
    if(this.state.loading) {
      return (
        <div>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
          </nav>
          <MessageList />
          <ChatBar />
        </div>
      );
    } else {
      return <h1>3 seconds have elapsed and page is loaded</h1>
    }
  }
}
export default App;
