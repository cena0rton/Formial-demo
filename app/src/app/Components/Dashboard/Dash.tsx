import React from 'react'


const Dash = ({children, className}: {children?: React.ReactNode, className?: string}) => {
  return (
    <>
    <div className={` p-4 ${className}  ml-78 mr-4 mt-4 rounded-tr-3xl rounded-tl-3xl bg-[#e5e1d2] border-1 border-[#1E3F2B]/20`}>
        {children}
    </div>
    </>
  )
}

export default Dash