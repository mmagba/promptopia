'use client';
import { SessionProvider } from 'next-auth/react';

function Provider(props) {
  return (
    <SessionProvider>
      {props.children}
    </SessionProvider>
  )
}

export default Provider