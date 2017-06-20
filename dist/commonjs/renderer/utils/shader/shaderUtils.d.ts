import { IMaterialConfig } from "../../data/material_config";
import { IShaderLibGenerator } from "../../data/shaderLib_generator";
import { Map } from "immutable";
import { RenderCommandUniformData } from "../../type/dataType";
import { SendUniformDataFuncDataMap } from "../../type/utilsType";
export declare var init: (state: Map<any, any>, materialIndex: number, shaderIndex: number, materialClassName: string, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, buildGLSLSource: Function, getGL: Function, DeviceManagerDataFromSystem: any, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any, MaterialDataFromSystem: any) => void;
export declare var sendAttributeData: (gl: WebGLRenderingContext, shaderIndex: number, geometryIndex: number, getVertivesFunc: Function, getAttribLocation: Function, isAttributeLocationNotExist: Function, sendBuffer: Function, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any, GeometryWorkerDataFromSystem: any, ArrayBufferDataFromSystem: any) => void;
export declare var sendUniformData: (gl: WebGLRenderingContext, shaderIndex: number, funcDataMap: SendUniformDataFuncDataMap, MaterialDataFromSystem: any, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any, renderCommandUniformData: RenderCommandUniformData) => void;
export declare var bindIndexBuffer: (gl: WebGLRenderingContext, geometryIndex: number, getIndicesFunc: Function, ProgramDataFromSystem: any, GeometryWorkerDataFromSystem: any, IndexBufferDataFromSystem: any) => void;
export declare var use: (gl: WebGLRenderingContext, shaderIndex: number, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any) => void;
