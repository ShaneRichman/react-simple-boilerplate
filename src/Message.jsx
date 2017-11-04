import React, {Component} from 'react';



class Message extends Component {
  render() {
let newPost = this.props.content
let URL = ''
URL = newPost.match(/\bhttps?:\/\/\S+/gi);
newPost = newPost.replace(URL, '');
    if (URL != '') {
      return (
        <div className="message">
          <span className="message-username">{this.props.username}</span>
          <span className="message-content">
            <p>
            {newPost}
            </p>
            <img src={URL}></img>
          </span>
          {/*<span className="postedImg">*/}

          {/*</span>*/}
        </div>
      );
    }

    if (this.props.type === "postMessage") {
      return (
        <div className="message">
          <span className={`message-username ${this.props.colour}`}>{this.props.username}</span>
          <span className="message-content">{newPost}</span>
        </div>
      );
    } else {
      return (
        <div className="message system">
          {newPost }
        </div>
      );
    }

  }
}
export default Message;
