import { GLSLChunk } from "../../shader/chunk/ShaderChunk";
import { IMaterialShaderLibGroup, IShaderLibItem } from "../../data/material_config_interface";
import { InitShaderDataMap } from "../../type/utilsType";
import { IGLSLConfig, IGLSLDefineListItem, IShaderLibContentGenerator } from "../../data/shaderLib_generator_interface";
export declare var getPrecisionSource: (lowp_fragment: GLSLChunk, mediump_fragment: GLSLChunk, highp_fragment: GLSLChunk, GPUDetectData: any) => any;
export declare var getMaterialShaderLibNameArr: (materialShaderLibConfig: (string | IShaderLibItem)[], materialShaderLibGroup: IMaterialShaderLibGroup, materialIndex: number, initShaderFuncDataMap: any, initShaderDataMap: InitShaderDataMap) => string[];
export declare var getEmptyFuncGLSLConfig: () => {
    "top": string;
    "varDeclare": string;
    "funcDeclare": string;
    "funcDefine": string;
    "body": string;
    "defineList": any[];
};
export declare var buildSourceDefine: (defineList: IGLSLDefineListItem[], initShaderDataMap: InitShaderDataMap) => string;
export declare var getGLSLPartData: (glslConfig: IGLSLConfig, partName: string) => any;
export declare var getGLSLDefineListData: (glslConfig: IGLSLConfig) => IGLSLDefineListItem[];
export declare var getFuncGLSLPartData: (glslConfig: IGLSLConfig, partName: string) => any;
export declare var getFuncGLSLDefineListData: (glslConfig: IGLSLConfig) => IGLSLDefineListItem[];
export declare var generateUniformSource: (materialShaderLibNameArr: string[], shaderLibData: IShaderLibContentGenerator, sourceVarDeclare: string, sourceFuncDefine: string, sourceBody: string) => string;
