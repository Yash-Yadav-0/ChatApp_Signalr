import React from 'react';
import { Col, Row } from 'react-bootstrap';
import MessageContainer from './MessageContainer';
import SendMessageForm from './SendMessageForm'; // Assuming this component exists

const ChatRoom = ({ messages, sendMessage }) => {
  return (
    <div className='chatroom_style'>
      <Row className="px-5 py-5">
        <Col sm={10}>
          <h2>Chat Room</h2>
        </Col>
        <Col></Col>
      </Row>
      <Row className="px-5 py-5">
        <Col sm={15}>
          <MessageContainer messages={messages} />
        </Col>
      </Row>
      <Row className="px-5 py-5">
        <Col sm={15} className='send_message_form'>
          <SendMessageForm sendMessage={sendMessage} />
        </Col>
      </Row>
    </div>
  );
};

export default ChatRoom;
