'use client'
import { useState } from "react"
import { Panel } from "./Panel"
import axios from "axios"

const ENDPOINT = 'api/chat'

export const ChatPrompt = () => {
  const [inputMessage, setInputMessage] = useState('')

  const handleSubmit = async () => {
    if (!inputMessage) {
      console.log('No message to send')
      return
    }

    const response = await axios.post(ENDPOINT, {messages: [inputMessage]})
    console.log(response.data)
  }

  return (
    <Panel className="flex p-1">
      <input className="flex-grow bg-white rounded-s p-2 shadow-inner  focus:outline-2 outline-primary" onChange={(e) => setInputMessage(e.target.value)}/>
      <button className="py-2 px-4 hover:bg-primary/20 rounded-e hover:outline-2 outline-primary" onClick={handleSubmit}>
        Send
      </button>
    </Panel>
  )
}