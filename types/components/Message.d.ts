import React from "react";
import PropTypes from "prop-types";
export declare const Message: {
    ({ children, error, classNames }: {
        children: React.ReactNode;
        error?: boolean | undefined;
        classNames?: string[] | undefined;
    }): JSX.Element;
    propTypes: {
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        boolean: PropTypes.Requireable<boolean>;
        classNames: PropTypes.Requireable<(string | null | undefined)[]>;
    };
    defaultProps: {
        center: boolean;
    };
};
