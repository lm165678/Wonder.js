import { Geometry } from "./Geometry";
import { Map } from "immutable";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
export declare var addAddComponentHandle: (_class: any) => void;
export declare var addDisposeHandle: (_class: any) => void;
export declare var addInitHandle: (_class: any) => void;
export declare var create: Function;
export declare var init: (GeometryData: any, state: Map<any, any>) => Map<any, any>;
export declare var initGeometry: (index: number, state: Map<any, any>) => void;
export declare var getVertices: (index: number, GeometryData: any) => any;
export declare var setVertices: Function;
export declare var getIndices: (index: number, GeometryData: any) => any;
export declare var setIndices: Function;
export declare var addComponent: (component: Geometry, gameObject: GameObject) => void;
export declare var disposeComponent: (component: Geometry) => void;
export declare var isReallocate: (GeometryData: any) => any;
export declare var getGameObject: (index: number, Data: any) => GameObject;
export declare var getConfigData: (index: number, GeometryData: any) => any;
export declare var isIndicesBufferNeed32BitsByData: (GeometryData: any) => boolean;
export declare var clearWorkerInfoList: (GeometryData: any) => void;
export declare var hasNewPointData: (GeometryData: any) => boolean;
export declare var hasDisposedGeometryIndexArrayData: (GeometryData: any) => boolean;
export declare var clearDisposedGeometryIndexArray: (GeometryData: any) => void;
export declare var initData: (DataBufferConfig: any, GeometryData: any) => void;
export declare var getIndexType: any;
export declare var getIndexTypeSize: any;
export declare var hasIndices: any;
export declare var getDrawMode: any;
export declare var getVerticesCount: any;
export declare var getIndicesCount: any;
