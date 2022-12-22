import { TextInput, Label } from 'flowbite-react'
import React from 'react'

interface Props {
  id: string
  label?: string
  val: string
  placeholder?: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleBlur?: React.FocusEventHandler<HTMLInputElement>
}

export const TextForm = (props: Props) => {
  const { id, label, val, placeholder, handleChange, handleBlur } = props

  const form = () => {
    const DOM: JSX.Element[] = []
    const inputDOM = (
      <TextInput
        key="input"
        id={id}
        type="text"
        placeholder={placeholder}
        value={val}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    )
    const labelDOM = (
      <div key="label" className="mb-2 block">
        <Label htmlFor={id} value={label} />
      </div>
    )

    if (label != undefined) {
      DOM.push(labelDOM)
    }
    DOM.push(inputDOM)
    return DOM
  }

  return <>{form()}</>
}
