import PropTypes from "prop-types";
export declare const AggregateFilterType: PropTypes.Requireable<PropTypes.InferProps<{
    from: PropTypes.Requireable<number>;
    size: PropTypes.Requireable<number>;
    terms: PropTypes.Requireable<(object | null | undefined)[]>;
    range: PropTypes.Requireable<object>;
    notExists: PropTypes.Requireable<string>;
    exists: PropTypes.Requireable<string>;
    minTimestamp: PropTypes.Requireable<number>;
    q: PropTypes.Requireable<string>;
}>>;
export declare const TimeRangeType: PropTypes.Requireable<PropTypes.InferProps<{
    from: PropTypes.Validator<string | number | Date>;
    to: PropTypes.Validator<string | number | Date>;
    timeZone: PropTypes.Requireable<string>;
}>>;
export declare const OptionType: PropTypes.Requireable<PropTypes.InferProps<{
    label: PropTypes.Validator<string>;
    icon: PropTypes.Requireable<PropTypes.ReactComponentLike>;
    value: PropTypes.Validator<string>;
}>>;
