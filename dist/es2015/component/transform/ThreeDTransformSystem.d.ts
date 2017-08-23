import { BatchTransformData, ThreeDTransform } from "./ThreeDTransform";
import { Map as MapImmutable } from "immutable";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { IUIdEntity } from "../../core/entityObject/gameObject/IUIdEntity";
export declare var addAddComponentHandle: (_class: any) => void;
export declare var addDisposeHandle: (_class: any) => void;
export declare var create: Function;
export declare var checkShouldAlive: (component: ThreeDTransform, ThreeDTransformData: any) => void;
export declare var init: (GlobalTempData: any, ThreeDTransformData: any, state: MapImmutable<any, any>) => any;
export declare var addComponent: (transform: ThreeDTransform, gameObject: GameObject) => any;
export declare var isAlive: (transform: ThreeDTransform, ThreeDTransformData: any) => boolean;
export declare var isNotAlive: (transform: ThreeDTransform, ThreeDTransformData: any) => boolean;
export declare var disposeComponent: (transform: ThreeDTransform) => void;
export declare var getGameObject: (uid: number, ThreeDTransformData: any) => IUIdEntity;
export declare var getParent: (transform: ThreeDTransform, ThreeDTransformData: any) => any;
export declare var setParent: (transform: ThreeDTransform, parent: ThreeDTransform, ThreeDTransformData: any) => any;
export declare var getLocalToWorldMatrix: Function;
export declare var getPosition: Function;
export declare var getNormalMatrix: Function;
export declare var setPosition: Function;
export declare var setBatchDatas: (batchData: BatchTransformData[], GlobalTempData: any, ThreeTransformData: any) => any;
export declare var getLocalPosition: Function;
export declare var setLocalPosition: Function;
export declare var update: (elapsed: number, GlobalTempData: any, ThreeDTransformData: any, state: MapImmutable<any, any>) => any;
export declare var getTempLocalToWorldMatrix: (transform: ThreeDTransform, ThreeDTransformData: any) => any;
export declare var initData: (GlobalTempData: any, ThreeDTransformData: any) => void;
