"use client";

import React from 'react';
import Select, { StylesConfig, ActionMeta, ControlProps, GroupBase, CSSObjectWithLabel, SingleValue } from 'react-select';

interface OptionType {
  key: string;
  label: string;
  value: boolean;
}

const customStyles: StylesConfig<OptionType, false> = {
  control: (provided: CSSObjectWithLabel, state: ControlProps<OptionType, false, GroupBase<OptionType>>) => ({
    ...provided,
    height: '46px',
    backgroundColor: '#2F271C',
    borderColor: '#9B8355',
    borderRadius: '10px',
    color: '#9B8355',
    display: 'flex',
    justifyContent: 'center',
    outline: 'none',
    boxShadow: state.isFocused ? '0 0 0 1px #9B8355' : 'none', 
    '&:hover': {
      borderColor: '#9B8355',
    },
  }),
  singleValue: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: '#9B8355',
    textAlign: 'center',
  }),
  option: (provided: CSSObjectWithLabel, state) => ({
    ...provided,
    color: '#2F271C',
    backgroundColor: state.isFocused ? '#9B8355' : state.isSelected ? '#9B835580' : '#FFCE3130',
    height: '46px',
    textAlign: 'center',
  }),
  menu: (provided: CSSObjectWithLabel) => ({
    ...provided,
    backgroundColor: '#FFCE3130',
  }),
  dropdownIndicator: (provided: CSSObjectWithLabel, state) => ({
    ...provided,
    color: '#9B8355',
    backgroundColor: '#FFCE31',
    alignSelf: 'stretch',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '8px',
    paddingRight: '8px',
    borderTopRightRadius: '8px',
    borderBottomRightRadius: '8px',
  }),
  
  indicatorSeparator: (provided: CSSObjectWithLabel, state) => ({
    ...provided,
    display: 'none',
  }),
};

const options: OptionType[] = [
  { key:'yes', value: true, label: 'Yes' },
  { key:'no', value: false, label: 'No' },
];

export default function CustomSelect({select, setSelect}:{select: boolean, setSelect:(v:boolean)=>void}) {
  const handleChange = (value: SingleValue<OptionType>, actionMeta: ActionMeta<OptionType>) => {
    if (value) {
      console.log(`Changed to ${value?.value}`);
      setSelect(value?.value);
    }
  };

  const selectedOption = options.filter(opt=>opt.value===select)[0];
  return (
    <Select
      className="w-full"
      styles={customStyles}
      options={options}
      value={selectedOption}
      isSearchable={false}
      onChange={handleChange}
    />
  );
}
