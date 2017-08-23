import { Map as MapImmutable } from "immutable";
import { Color } from "../../structure/Color";
import { Material } from "./Material";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { IShaderLibGenerator } from "../../renderer/data/shaderLib_generator_interface";
import { IMaterialConfig } from "../../renderer/data/material_config_interface";
import { IUIdEntity } from "../../core/entityObject/gameObject/IUIdEntity";
export declare var addAddComponentHandle: (BasicMaterial: any, LightMaterial: any) => void;
export declare var addDisposeHandle: (BasicMaterial: any, LightMaterial: any) => void;
export declare var addInitHandle: (BasicMaterial: any, LightMaterial: any) => void;
export declare var create: (index: number, material: Material, ShaderData: any, MaterialData: any) => Material;
export declare var useShader: (index: number, shaderName: string, state: MapImmutable<any, any>, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, initMaterialShader: Function, initShaderDataMap: {
    GPUDetectDataFromSystem: any;
    DeviceManagerDataFromSystem: any;
    ProgramDataFromSystem: any;
    LocationDataFromSystem: any;
    GLSLSenderDataFromSystem: any;
    ShaderDataFromSystem: any;
    MaterialDataFromSystem: any;
    BasicMaterialDataFromSystem: any;
    LightMaterialDataFromSystem: any;
    MapManagerDataFromSystem: any;
    AmbientLightDataFromSystem: any;
    DirectionLightDataFromSystem: any;
    PointLightDataFromSystem: any;
    VaoDataFromSystem: any;
}) => any;
export declare var init: (state: MapImmutable<any, any>, gl: WebGLRenderingContext, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, initNoMaterialShader: Function, TextureData: any, MaterialData: any, BasicMaterialData: any, LightMaterialData: any, AmbientLightData: any, DirectionLightData: any, PointLightData: any, GPUDetectData: any, GLSLSenderData: any, ProgramData: any, VaoData: any, LocationData: any, ShaderData: any) => void;
export declare var initMaterial: any;
export declare var clearWorkerInitList: any;
export declare var hasNewInitedMaterial: (MaterialData: any) => boolean;
export declare var getShaderIndex: (materialIndex: number, MaterialData: any) => any;
export declare var getColor: (materialIndex: number, MaterialData: any) => Color;
export declare var getColorArr3: (index: number, DataFromSystem: any) => number[];
export declare var setColor: (materialIndex: number, color: Color, MaterialData: any) => void;
export declare var setColorData: (materialIndex: number, color: Color, colors: Float32Array) => void;
export declare var getOpacity: (materialIndex: number, MaterialDataFromSystem: any) => number;
export declare var setOpacity: Function;
export declare var getAlphaTest: (materialIndex: number, MaterialDataFromSystem: any) => number;
export declare var setAlphaTest: Function;
export declare var addComponent: (component: Material, gameObject: GameObject, MaterialData: any) => void;
export declare var disposeComponent: Function;
export declare var getGameObject: (index: number, MaterialData: any) => IUIdEntity;
export declare var isTestAlpha: (alphaTest: number) => boolean;
export declare var createDefaultColor: () => Color;
export declare var initData: (TextureCacheData: any, TextureData: any, MapManagerData: any, MaterialData: any, BasicMaterialData: any, LightMaterialData: any) => void;
