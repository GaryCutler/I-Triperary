import React, { useState } from 'react';

const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');

  const handleSendMessage = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
  
      const data = await response.json();
      setReply(data.reply);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  return (
    <div className="mt-3">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
      {reply && (
        <div className="alert alert-info" role="alert">
          <strong>Reply:</strong> {reply}
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
