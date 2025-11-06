import React from 'react'

const Dash = ({children, className}: {children?: React.ReactNode, className?: string}) => {
  return (
    <main className={`w-full ${className || ''}`}>
      {children}
    </main>
  )
}

export default Dash