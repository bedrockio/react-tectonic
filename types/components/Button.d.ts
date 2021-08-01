import React from "react";
import PropTypes from "prop-types";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    icon?: boolean;
    disabled?: boolean;
    primary?: boolean;
    secondary?: boolean;
    compact?: boolean;
    basic?: boolean;
}
export declare const Button: {
    ({ children, icon, disabled, primary, secondary, compact, basic, ...props }: ButtonProps): JSX.Element;
    propTypes: {
        children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        icon: PropTypes.Requireable<boolean>;
        disabled: PropTypes.Requireable<boolean>;
        basic: PropTypes.Requireable<boolean>;
        compact: PropTypes.Requireable<boolean>;
    };
    defaultProps: {};
};
export {};
