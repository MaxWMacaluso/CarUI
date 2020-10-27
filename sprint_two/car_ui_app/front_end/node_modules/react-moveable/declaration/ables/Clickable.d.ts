import { MoveableManagerInterface, MoveableGroupInterface, ClickableProps } from "../types";
declare const _default: {
    readonly name: "clickable";
    readonly props: {};
    readonly events: {
        readonly onClick: "click";
        readonly onClickGroup: "clickGroup";
    };
    readonly always: true;
    readonly dragStart: () => void;
    readonly dragGroupStart: (moveable: MoveableManagerInterface<ClickableProps>, e: any) => void;
    readonly dragEnd: (moveable: MoveableManagerInterface<ClickableProps>, e: any) => void;
    readonly dragGroupEnd: (moveable: MoveableGroupInterface<ClickableProps>, e: any) => void;
};
export default _default;
