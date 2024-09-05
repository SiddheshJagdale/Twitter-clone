import React from 'react'


interface InputProps{
    placeholder?:string
    disabled?:boolean
    value?:string
    type?:string
    onChange?:(event:React.ChangeEvent<HTMLInputElement>)=> void;
}

const Input :React.FC<InputProps>= ({placeholder,disabled,value,type,onChange}) => {
  return (
    <input
    disabled={disabled}
    value={value}
    placeholder={placeholder}
    type={type}
    onChange={onChange}
    className='
    w-full
    p-4
    bg-black
    text-lg
    border-2
    border-neutral-800
    disabled:cursor-not-allowed
    disabled:opacity-70
    disabled:bg-neutral-700
    focus:border-sky-500
    text-white
    '
    ></input>
  )
}

export default Input