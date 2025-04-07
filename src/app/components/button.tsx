import React from 'react'

const buttonSignIn = ({ title }: { title: string }) => {
  return (
    <button className='bg-[#4aa56a] text-white font-bold py-2 px-4 rounded-md text-sm'>{title}</button>
  )
}

export default buttonSignIn