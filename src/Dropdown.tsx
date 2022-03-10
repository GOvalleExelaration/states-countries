import React from "react";

interface IProps extends React.HTMLProps<HTMLSelectElement> {
    values: any[];
    textField: string;
    valueField: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>)=>void;
}

export default function Dropdown(props: IProps){
    const {values, textField, valueField, onChange, ...restProps} = props;

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>){
        if(onChange){
            onChange(event);
        }
    }

    return (<select onChange={handleChange} {...restProps}>
                {values.map(v => <option value={v[valueField]}>{v[textField]}</option>)}
            </select>);
}