import React, { useState } from "react";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [qusetion, setquestion] = useState("");

  const formateMessage = (data) => {
    const result = data.split("");
    result.forEach((charaacter, index) => {
      setTimeout(() => {
        setMessages((preMesage) => [...preMesage, charaacter]);
      }, 100 * index);
    });
  };

  const handSubmit = () => {
    const eventSource = new EventSource(
      `http://localhost:3000/users/chat-room?qusetion=${encodeURIComponent(
        qusetion
      )}`
    );
    eventSource.onmessage = (event) => {
      const newMessage = event.data;
      formateMessage(newMessage);
      eventSource.close();
    };
    eventSource.onerror = (e) => {
      formateMessage(e.data);
      eventSource.close();
    };
  };

  return (
    <div>
      <div>消息</div>
      <input
        type="text"
        value={qusetion}
        onChange={(e) => setquestion(e.target.value)}
      />
      <button onClick={handSubmit}>提交</button>
      <div
        style={{
          display: "flex",
          width: "400px",
          backgroundColor: "yellow",
          whiteSpace: "pre-wrap",
        }}
      >
        {messages.map((message, index) => (
          <>{message}</>
        ))}
      </div>
    </div>
  );
};

export default ChatRoom;
