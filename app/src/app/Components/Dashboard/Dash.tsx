import React from 'react'


const Dash = ({children, className}: {children?: React.ReactNode, className?: string}) => {
  return (
    <>
    <div className={` p-4 ${className}  md:ml-78 ml-2 mr-2 mt-4 rounded-tr-3xl rounded-tl-3xl bg-[#e5e1d2] border-1 border-[#1E3F2B]/20`}>
        {children}
    </div>
    </>
  )
}

export default Dash