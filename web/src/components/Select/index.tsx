import './styles.css'
import React, { SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    name: string;
    options: Array<{ value: string, label: string }>
}

const Select: React.FC<SelectProps> = ({ label, name, options, ...rest }) =>
    <div className="select-block">
        <label htmlFor={name}>{label}</label>
        <select defaultValue={""} id={name} {...rest}>
            <option value="" disabled hidden>Selecione uma opção</option>
            {options.map(op => <option key={op.value} value={op.value}>{op.label}</option>)}
        </select>
    </div>

export default Select;