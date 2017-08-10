import { SendUniformDataGLSLSenderDataMap } from "../../type/utilsType";

export type WebGL1SendUniformDataDataMap = {
    glslSenderData: SendUniformDataGLSLSenderDataMap;
    ambientLightData: WebGL1SendUniformDataAmbientLightDataMap;
    directionLightData: WebGL1SendUniformDataDirectionLightDataMap;
    pointLightData: WebGL1SendUniformDataPointLightDataMap;
}

export type WebGL1SendUniformDataAmbientLightDataMap = {
    getColorArr3: Function;

    AmbientLightDataFromSystem: any;
}

export type WebGL1SendUniformDataDirectionLightDataMap = {
    getColorArr3: Function;
    getIntensity: Function;
    getPosition: Function;

    DirectionLightDataFromSystem: any;
}

export type WebGL1SendUniformDataPointLightDataMap = {
    getColorArr3: Function;
    getIntensity: Function;
    getConstant: Function;
    getLinear: Function;
    getQuadratic: Function;
    getRange: Function;
    getPosition: Function;

    PointLightDataFromSystem: any;
}
