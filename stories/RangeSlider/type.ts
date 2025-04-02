type rootElementProps = HTMLElement;
type extensionUnitProps = string;
type showValueProps = boolean;
type stepProps = number;



type calcProps = {
    value : number;
    min : number;
    max : number;
}

type inputRangeProps = {
    min : number;
    max : number;
    currentValue : number;
}




type childProps = {
    id : string;
    disabled : boolean;
    values : inputRangeProps;
}

type toolTipProps = {
    direction : string;
    mode : string;
    effect : boolean
}

export {rootElementProps, extensionUnitProps, showValueProps, stepProps, calcProps, inputRangeProps, childProps, toolTipProps}