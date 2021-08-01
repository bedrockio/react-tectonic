export declare const unitsMap: {
    s: {
        weight: number;
        name: string;
    };
    m: {
        weight: number;
        name: string;
    };
    h: {
        weight: number;
        name: string;
    };
    d: {
        weight: number;
        name: string;
    };
    w: {
        weight: number;
        name: string;
    };
    M: {
        weight: number;
        name: string;
    };
    y: {
        weight: number;
        name: string;
    };
};
export declare const units: string[];
export declare const unitsDesc: string[];
export declare const unitsAsc: string[];
export declare function parse(input: any, options?: {
    roundUp?: boolean;
    forceNow?: Date;
}): any;
