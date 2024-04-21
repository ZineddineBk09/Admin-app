// use native WebSocket

const mapSocket = (token: string): WebSocket => {
  const socket: WebSocket = new WebSocket(
    `ws://localhost:2110/map?token=${token}`
  )
  
  socket.onopen = () => {
    console.log('Socket opened')
  }

  // automatically reconnect on close
  socket.onclose = () => {
    console.log('Socket closed')
    setTimeout(() => {
      mapSocket(token)
    }, 1000)
  }


  // close the socket on error
  socket.onerror = (e: any) => {
    console.error('Socket error', e)
    socket.close()
  }

  socket.onmessage = (e: any) => {
    const data = JSON.parse(e.data)
    console.log(data)
  }

  return socket
}

export default mapSocket
