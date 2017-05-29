import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { Tag } from "./Tag";
export declare var addAddComponentHandle: (_class: any) => void;
export declare var addDisposeHandle: (_class: any) => void;
export declare var create: Function;
export declare var setNextIndexInTagArrayMap: Function;
export declare var addTag: Function;
export declare var removeTag: Function;
export declare var addComponent: (component: Tag, gameObject: GameObject) => void;
export declare var getSlotCount: (index: number, slotCountMap: number[]) => number;
export declare var getUsedSlotCount: (index: number, usedSlotCountMap: number[]) => number;
export declare var checkShouldAlive: (tag: Tag, TagData: any) => void;
export declare var disposeComponent: Function;
export declare var getGameObject: (index: number, Data: any) => GameObject;
export declare var findGameObjectsByTag: (targetTag: string, TagData: any) => GameObject[];
export declare var initData: (TagData: any) => void;
