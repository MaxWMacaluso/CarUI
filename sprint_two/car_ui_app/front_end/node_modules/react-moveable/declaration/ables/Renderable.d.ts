import { MoveableManagerInterface, RenderableProps, MoveableGroupInterface } from "../types";
declare const _default: {
    readonly name: "Renderable";
    readonly props: {};
    readonly events: {
        readonly onRenderStart: "renderStart";
        readonly onRender: "render";
        readonly onRenderEnd: "renderEnd";
        readonly onRenderGroupStart: "renderGroupStart";
        readonly onRenderGroup: "renderGroup";
        readonly onRenderGroupEnd: "renderGroupEnd";
    };
    readonly dragStart: (moveable: MoveableManagerInterface<RenderableProps>, e: any) => void;
    readonly drag: (moveable: MoveableManagerInterface<RenderableProps>, e: any) => void;
    readonly dragEnd: (moveable: MoveableManagerInterface<RenderableProps>, e: any) => void;
    readonly dragGroupStart: (moveable: MoveableGroupInterface<RenderableProps>, e: any) => void;
    readonly dragGroup: (moveable: MoveableGroupInterface<RenderableProps>, e: any) => void;
    readonly dragGroupEnd: (moveable: MoveableGroupInterface<RenderableProps>, e: any) => void;
    readonly dragControlStart: (moveable: MoveableManagerInterface<RenderableProps>, e: any) => void;
    readonly dragControl: (moveable: MoveableManagerInterface<RenderableProps>, e: any) => void;
    readonly dragControlEnd: (moveable: MoveableManagerInterface<RenderableProps>, e: any) => void;
    readonly dragGroupControlStart: (moveable: MoveableGroupInterface<RenderableProps>, e: any) => void;
    readonly dragGroupControl: (moveable: MoveableGroupInterface<RenderableProps>, e: any) => void;
    readonly dragGroupControlEnd: (moveable: MoveableGroupInterface<RenderableProps>, e: any) => void;
};
export default _default;
