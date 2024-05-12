// use native WebSocket

const mapSocket = (token: string): WebSocket => {
  const socket: WebSocket = new WebSocket(
    `${process.env.NEXT_PUBLIC_WEBSOCKET_URL as string}/map?token=${token}`
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

  return socket
}

export default mapSocket
