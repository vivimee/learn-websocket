import React from 'react';
import './index.css';

const IN = 'in';
const OUT = 'out';

export default class ChartWindow extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: []
        }
    }
    componentDidMount() {
        const ws = new WebSocket('ws://192.168.0.101:8181');
        this.ws = ws;
        ws.onopen = () => {
            console.log('opened');
        };
        ws.onmessage = (ev) => {
            const messages = this.state.messages.concat([]);
            messages.push({ data: ev.data, direction: IN });
            this.setState({ messages });
        }
        ws.onclose = () => {
            console.log('closed');
        };
    }
    send = () => {
        const ele = this.textDom;
        const str = ele.value;
        if (str) {
            this.ws.send(str);
            const messages = this.state.messages.concat([]);
            messages.push({ data: str, direction: OUT });
            this.setState({ messages });
            ele.value = '';
        }
    }
    isSystemMsg = (str) => {
        if (/已加入群聊，快和大家打个招呼吧~/.test(str)) return true;
    }
    render() {
        const { messages } = this.state;
        return (
            <div className="chart-window">
                <div className="message-box">{
                    messages.map((item, idx) => (<div className="msg-item" key={idx}>
                        <p className={`msg ${item.direction} ${this.isSystemMsg(item.data) ? 'system-msg' : ''}`}>{item.data}</p>
                    </div>))
                }</div>
                <div className="edit-box">
                    <input placeholder="说点什么？" className="textarea" ref={dom => this.textDom = dom} />
                    <span className="btn" onClick={this.send}>发送</span>
                </div>
            </div>
        );
    }
}
