import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';

const WaitingRoom = ({ joinChatRoom }) => {
  const [username, setUsername] = useState('');
  const [chatroom, setChatroom] = useState('');

  const onFinish = () => {
    joinChatRoom(username, chatroom);
  };

  return (
    <Form className='form_style' onFinish={onFinish} layout="vertical">
      <Form.Item>
        <Input 
          placeholder='Username'
          value={username}
          onChange={e => setUsername(e.target.value)} 
        />
      </Form.Item>
      <Form.Item>
        <Input 
          placeholder='Chatroom'
          value={chatroom}
          onChange={e => setChatroom(e.target.value)} 
        />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>Join</Button>
      </Form.Item>
    </Form>
  );
};

export default WaitingRoom;
