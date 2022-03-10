import React from "react";
import Dropdown from './Dropdown';

interface IProps extends React.HTMLProps<HTMLSelectElement> {
    countriesValues: any[];
    statesValues: any[];
    countriesTextColumn: string;
    countriesValuesColumn: string;
    statesTextColumn: string;
    statesValuesColumn: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>)=>void;
}

export default function CountriesAndStates(props: IProps){
    const {countriesValues, statesValues, countriesTextColumn, countriesValuesColumn, statesTextColumn, statesValuesColumn, onChange, ...restProps} = props;
    return(
        <div>
            <h2>Countries</h2>
            <Dropdown values={countriesValues} textField={countriesTextColumn} valueField={countriesValuesColumn} onChange={onChange}/>
            <h2>States</h2>
            <Dropdown values={statesValues} textField={statesTextColumn} valueField={statesValuesColumn}/></div>
        
    )
    
}