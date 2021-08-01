import React, { ReactNode } from "react";
declare const defaultProps: {
    onChange: (option: any) => void;
    alignMenu: string;
    options: never[];
    classNames: never[];
};
declare type OptionType = {
    icon?: React.ElementType;
    value?: string;
    label: string;
};
declare type DropdownType = {
    icon?: React.ElementType;
    alignMenu?: "center" | "right" | "left";
    onChange?: (option: OptionType) => void;
    title?: ReactNode;
    classNames: string[];
    value?: any;
    options: OptionType[];
};
export declare const Dropdown: {
    ({ icon: Icon, alignMenu, title, value, options, onChange, classNames, }: DropdownType & typeof defaultProps): JSX.Element;
    defaultProps: {
        onChange: (option: any) => void;
        alignMenu: string;
        options: never[];
        classNames: never[];
    };
};
export {};
