export const keepAlive = (socket: WebSocket, message: string) => {
  if (socket?.readyState === 1) {
    socket.send(message)

    setTimeout(() => {
      keepAlive(socket, message)
    }, 3000)
  }
}

const mapSocket = (token: string): WebSocket => {
  if (typeof window === 'undefined') throw new Error('Window not loaded yet')
  if (!token) throw new Error('Please logout and login again')
  if (!process.env.NEXT_PUBLIC_WEBSOCKET_URL)
    throw new Error('Websocket URL not found')

  try {
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
      }, 500)
    }

    // close the socket on error
    socket.onerror = (e: any) => {
      console.error('Socket error', e)
      socket.close()
    }

    return socket
  } catch (error) {
    throw new Error(
      'Connection error, please logout and login again or try again later.'
    )
  }
}

export default mapSocket
