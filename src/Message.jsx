import React, {Component} from 'react';



class Message extends Component {
  render() {
    // console.log(this.props.content)
let URL = ''
URL = this.props.content.match(/\bhttps?:\/\/\S+/gi);
// this.props.content.replace(/^https+/, '');
    // if (content.has(.jpg)) {
      // return (
        // {/*<div className="message">*/}
          // {/*{<span className="message-username">{this.props.username}</span>}*/}
          // {/*<span className="message-content">*/}
            // {/*<img src="http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg">*/}
          // {/*</span>*/}
        // {/*</div>*/}
      // );
    // {/*}*/}

    if (this.props.type === "postMessage") {
      return (
        <div className="message">
          <span className={`message-username ${this.props.colour}`}>{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
          <div className="postedImg">
            <img src={URL}></img>
          </div>
        </div>
      );
    } else {
      return (
        <div className="message system">
          {this.props.content }
        </div>
      );
    }

  }
}
export default Message;
