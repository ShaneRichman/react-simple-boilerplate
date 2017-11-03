import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {
  render() {
    const messages = this.props.messages.map(message => {
      return <Message
      key           ={message.id}
      username      ={message.username}
      content       ={message.content}
      notification  ={this.props.status} />
    });
    return (
      <main className="messages">
        <div className="message system">
          {(this.props.status === '') ? '' : this.props.status }
        </div>
          { messages }

      </main>
    );
  }
}
export default MessageList;

