import React, { useEffect, useState } from "react";
import { useWebSocket } from 'react-use-websocket';
 
function Chat() {
  // Replace 'ws://your-websocket-url' with your actual WebSocket URL
  const socketUrl = 'ws://your-websocket-url';
  const [sendMessage, lastMessage, readyState] = useWebSocket(socketUrl);
//   const { sendJsonMessage, lastJsonMessage } = useWebSocket('ws://your-websocket-url');

  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
    if (lastMessage) {
      setChatLog((prevLog) => [...prevLog, lastMessage]);
    }
  }, [lastMessage]);

  const handleSendMessage = () => {
    sendMessage({ message });
    setMessage("");
  };

  return (
    <div>
      <div>
        {chatLog.map((msg, index) => (
          <div key={index}>{msg.message}</div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
