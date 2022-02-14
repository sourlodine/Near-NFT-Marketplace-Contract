import React from 'react';
import { IconLoader } from '../IconLoader';
import './InputBox.scss';

interface InputBoxProps {
  icon?: string;
  onInputChange: Function;
  placeholder: string;
  name: string;
  value: any
}

const InputBox = (props: InputBoxProps) => {
  return(
    <div className="input-box">
      {
        props.icon &&
        <IconLoader icon={props.icon} />
      }
      <input
        type="text"
        value={props.value}
        name={props.name}
        placeholder={props.placeholder}
        onChange={ (event) => props.onInputChange(event)}
      />
    </div>
  )
}

export default InputBox;