import React from 'react'

const Container = ({ children, className="" }) => {
  return (
    <div className={`max-w-6xl mx-auto px-4 md:px-8 py-8 ${className}`}>
      { children }
    </div>
  )
}

export default Container