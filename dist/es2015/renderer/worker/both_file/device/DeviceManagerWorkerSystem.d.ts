import { Map } from "immutable";
import { ScreenData } from "../../../type/messageDataType";
import { ESide } from "../../../enum/ESide";
export declare var createGL: any;
export declare var setContextConfig: any;
export declare var getGL: (DeviceManagerDataFromSystem: any, state: Map<any, any>) => WebGLRenderingContext;
export declare var setGL: any;
export declare var setPixelRatio: any;
export declare var getViewport: (state: Map<any, any>) => any;
export declare var setViewport: any;
export declare var getViewportData: (screenData: ScreenData, state: Map<any, any>) => {
    x: number;
    y: number;
    width: number;
    height: number;
};
export declare var setViewportOfGL: any;
export declare var setScreen: any;
export declare var setCanvasPixelRatio: any;
export declare var clear: (gl: WebGLRenderingContext, DeviceManagerDataFromSystem: any) => void;
export declare var setColorWrite: (gl: WebGLRenderingContext, writeRed: boolean, writeGreen: boolean, writeBlue: boolean, writeAlpha: boolean, DeviceManagerDataFromSystem: any) => void;
export declare var setSide: (gl: WebGLRenderingContext, side: ESide, DeviceManagerDataFromSystem: any) => void;
export declare var initData: (DeviceManagerDataFromSystem: any) => void;
