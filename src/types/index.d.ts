declare module "react-beautiful-dnd" {
    import * as React from "react";

    export interface DraggableLocation {
        droppableId: string;
        index: number;
    }

    export interface DropResult {
        draggableId: string;
        type: string;
        source: DraggableLocation;
        destination: DraggableLocation | null;
        reason: "DROP" | "CANCEL";
        combine?: {
            draggableId: string;
            droppableId: string;
        } | null;
        mode?: "FLUID" | "SNAP";
    }

    export interface DragDropContextProps {
        onDragEnd: (result: DropResult) => void;
        onDragStart?: (start: unknown) => void;
        onDragUpdate?: (update: unknown) => void;
        children: React.ReactNode;
    }

    export class DragDropContext extends React.Component<DragDropContextProps> { }

    export interface DroppableProvided {
        innerRef: (element: HTMLElement | null) => void;
        droppableProps: React.HTMLAttributes<HTMLElement>;
        placeholder?: React.ReactNode;
    }

    export interface DroppableStateSnapshot {
        isDraggingOver: boolean;
        draggingFromThisWith: string | null;
        draggingOverWith: string | null;
    }

    export interface DroppableProps {
        droppableId: string;
        type?: string;
        direction?: "vertical" | "horizontal";
        isDropDisabled?: boolean;
        children: (
            provided: DroppableProvided,
            snapshot: DroppableStateSnapshot
        ) => React.ReactNode;
    }

    export class Droppable extends React.Component<DroppableProps> { }

    export interface DraggableProvidedDraggableProps
        extends React.HTMLAttributes<HTMLElement> {
        style?: React.CSSProperties;
    }

    export interface DraggableProvided {
        innerRef: (element: HTMLElement | null) => void;
        draggableProps: DraggableProvidedDraggableProps;
        dragHandleProps?: React.HTMLAttributes<HTMLElement> | null;
    }

    export interface DraggableStateSnapshot {
        isDragging: boolean;
        draggingOver: string | null;
    }

    export interface DraggableProps {
        draggableId: string;
        index: number;
        isDragDisabled?: boolean;
        disableInteractiveElementBlocking?: boolean;
        children: (
            provided: DraggableProvided,
            snapshot: DraggableStateSnapshot
        ) => React.ReactNode;
    }

    export class Draggable extends React.Component<DraggableProps> { }
}
