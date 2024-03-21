// setup socket io client
import { io } from 'socket.io-client'

const socket = io('ws://194.233.173.78:2110', {
  transports: ['websocket'],
  autoConnect: false,
})

export default socket
