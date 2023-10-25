import { Checkbox, Input, ScrollArea } from '@/shared';
import React, { useState, useEffect } from 'react';

export interface CheckboxPropsData {
  name: string;
  text: string;
  isChecked?: boolean;
}

export interface ListCheckboxWithSearchProps {
  className?: string;
  placeholder?: string;
  list: CheckboxPropsData[];
  scrollClassName?: string;
  isSearch?: boolean;
  isScroll?: boolean;
  getCheckboxes?: (checkboxs: CheckboxPropsData[]) => void;
}

type CheckboxObjState = { [key: string]: CheckboxPropsData };

export const ListCheckboxWithSearch: React.FC<ListCheckboxWithSearchProps> = ({
  list = [],
  className,
  isScroll = false,
  scrollClassName,
  isSearch = false,
  getCheckboxes,
  placeholder,
}) => {
  const [inputData, setInputData] = useState<string>('');
  const [checkboxObj, setCheckboxObj] = useState<CheckboxObjState>({});
  useEffect(() => {
    setCheckboxObj(
      list.reduce(
        (obj, checkbox) => ({
          ...obj,
          [checkbox.name]: { ...checkbox, isChecked: false },
        }),
        {}
      )
    );
  }, [list]);

  const ListCheckbox = () => {
    return (
      <div className='w-full'>
        {Object.values(checkboxObj)
          .filter(({ text }) => (inputData === '' ? true : text.indexOf(inputData) !== -1))
          .map((checkbox) => (
            <div
              className='flex items-center mt-3'
              key={checkbox.name}
            >
              <Checkbox
                id={checkbox.name}
                checked={!!checkbox.isChecked}
                onCheckedChange={(checked: boolean) => {
                  const newCheckboxState = {
                    ...checkboxObj,
                    [checkbox.name]: {
                      ...checkboxObj[checkbox.name],
                      isChecked: checked,
                    },
                  };
                  setCheckboxObj(newCheckboxState);
                  if (getCheckboxes && typeof getCheckboxes === 'function') {
                    getCheckboxes(Object.values(newCheckboxState));
                  }
                }}
              />
              <label
                htmlFor={checkbox.name}
                className='text-sm ml-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                {checkbox.text}
              </label>
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className={`w-full ${className}`}>
      {isSearch && (
        <Input
          onChange={(e) => setInputData(e.target.value)}
          value={inputData}
          className='w-full'
          placeholder={placeholder || ''}
        />
      )}
      {isScroll ? <ScrollArea className={`${scrollClassName} mt-2`}>{<ListCheckbox />}</ScrollArea> : <ListCheckbox />}
    </div>
  );
};
