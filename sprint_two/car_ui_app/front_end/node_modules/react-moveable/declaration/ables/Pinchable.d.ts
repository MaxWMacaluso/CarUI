import { PinchableProps, SnappableState, MoveableManagerInterface, MoveableGroupInterface } from "../types";
declare const _default: {
    name: string;
    updateRect: boolean;
    props: {
        readonly pinchable: BooleanConstructor;
    };
    events: {
        readonly onPinchStart: "pinchStart";
        readonly onPinch: "pinch";
        readonly onPinchEnd: "pinchEnd";
        readonly onPinchGroupStart: "pinchGroupStart";
        readonly onPinchGroup: "pinchGroup";
        readonly onPinchGroupEnd: "pinchGroupEnd";
    };
    dragStart(): boolean;
    pinchStart(moveable: MoveableManagerInterface<PinchableProps, SnappableState>, e: any): any;
    pinch(moveable: MoveableManagerInterface<PinchableProps>, e: any): any;
    pinchEnd(moveable: MoveableManagerInterface<PinchableProps>, e: any): any;
    pinchGroupStart(moveable: MoveableGroupInterface<any, any>, e: any): any;
    pinchGroup(moveable: MoveableGroupInterface, e: any): any;
    pinchGroupEnd(moveable: MoveableGroupInterface, e: any): any;
};
export default _default;
