import React from 'react'
import { SocketContext, socket } from '../context/socketContext'


export const SocketProvider = ({children}) => {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}
