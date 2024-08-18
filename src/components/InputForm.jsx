import React from 'react'

const InputForm = (props) => {
    const { type, id, placeholder, value, onChange } = props
    return (
        <input
            type={type}
            id={id}
            className="form-input mt-1 block w-full p-2 border border-gray-300 rounded"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    )
}

export default InputForm
