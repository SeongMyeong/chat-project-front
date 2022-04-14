import React, { useState, useEffect } from 'react'
import { io } from "socket.io-client";

const ChatPage = () => {
  const [msg, setMsg] = useState('')
  const [userCount, setUserCount] = useState(0)
  const [recieveMsg, setRecieveMsg] = useState('')
  const socket = io('http://localhost:3000');
  socket.connect()

  useEffect(() => {
    socket.on('usercount', (count) => {
      setUserCount(count)
    })

    socket.on('message', (msg) => {
      setRecieveMsg(recieveMsg + ' / ' + msg)
    })
  }, [])

  const sendMessage = (e: any) => {
    console.log('[masonms] sendMessage: ', msg)

    socket.emit('message', msg)
  }

  return (
    <div>
      <ul id="messages">
        <li id="usercount" />
        <li>{recieveMsg}</li>
      </ul>
      <form id="msgform">
        <input id="msginput" autoComplete="off" type="text" onChange={(e) => setMsg(e.target.value)} value={msg} />
        <button type="button" onClick={sendMessage}>전송</button>
      </form>
    </div>
  )
}

export default ChatPage;

// var socket = io();
// var msgform = document.getElementById('msgform');
// // socket.on 함수로 서버에서 전달하는 신호를 수신
// socket.on('usercount', (count) => {
//   var userCounter = document.getElementById('usercount');
//   userCounter.innerText = "현재 " + count + "명이 서버에 접속해있습니다.";
// });

// // 메시지 수신시 HTML에 메시지 내용 작성
// socket.on('message', (msg) => {
//   var messageList = document.getElementById('messages');
//   var messageTag = document.createElement("li");
//   messageTag.innerText = msg;
//   messageList.appendChild(messageTag);
// });

// msgform.onsubmit = (e) => {
//   e.preventDefault();
//   var msginput = document.getElementById('msginput');

//   // socket.emit으로 서버에 신호를 전달
//   socket.emit('message', msginput.value);

//   msginput.value = "";
// };