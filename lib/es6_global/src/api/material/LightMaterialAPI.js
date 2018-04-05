// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as Contract$WonderLog                       from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as MainStateData$Wonderjs                   from "../../service/state/main/data/MainStateData.js";
import * as IsDebugMainService$Wonderjs              from "../../service/state/main/state/IsDebugMainService.js";
import * as AliveComponentService$Wonderjs           from "../../service/primitiive/component/AliveComponentService.js";
import * as DisposeLightMaterialService$Wonderjs     from "../../service/record/material/light/DisposeLightMaterialService.js";
import * as CreateLightMaterialMainService$Wonderjs  from "../../service/state/main/material/light/CreateLightMaterialMainService.js";
import * as GameObjectLightMaterialService$Wonderjs  from "../../service/record/material/light/GameObjectLightMaterialService.js";
import * as OperateLightMaterialMainService$Wonderjs from "../../service/state/main/material/light/OperateLightMaterialMainService.js";

function createLightMaterial(state) {
  return CreateLightMaterialMainService$Wonderjs.create(state);
}

function unsafeGetLightMaterialGameObject(material, state) {
  Contract$WonderLog.requireCheck((function () {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeLightMaterialService$Wonderjs.isAlive, state[/* lightMaterialRecord */16]);
        }), IsDebugMainService$Wonderjs.getIsDebug(MainStateData$Wonderjs.stateData));
  return GameObjectLightMaterialService$Wonderjs.unsafeGetGameObject(material, state[/* lightMaterialRecord */16]);
}

function unsafeGetLightMaterialDiffuseColor(material, state) {
  Contract$WonderLog.requireCheck((function () {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeLightMaterialService$Wonderjs.isAlive, state[/* lightMaterialRecord */16]);
        }), IsDebugMainService$Wonderjs.getIsDebug(MainStateData$Wonderjs.stateData));
  return OperateLightMaterialMainService$Wonderjs.unsafeGetDiffuseColor(material, state);
}

function setLightMaterialDiffuseColor(material, color, state) {
  Contract$WonderLog.requireCheck((function () {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeLightMaterialService$Wonderjs.isAlive, state[/* lightMaterialRecord */16]);
        }), IsDebugMainService$Wonderjs.getIsDebug(MainStateData$Wonderjs.stateData));
  return OperateLightMaterialMainService$Wonderjs.setDiffuseColor(material, color, state);
}

function unsafeGetLightMaterialSpecularColor(material, state) {
  Contract$WonderLog.requireCheck((function () {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeLightMaterialService$Wonderjs.isAlive, state[/* lightMaterialRecord */16]);
        }), IsDebugMainService$Wonderjs.getIsDebug(MainStateData$Wonderjs.stateData));
  return OperateLightMaterialMainService$Wonderjs.unsafeGetSpecularColor(material, state);
}

function setLightMaterialSpecularColor(material, color, state) {
  Contract$WonderLog.requireCheck((function () {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeLightMaterialService$Wonderjs.isAlive, state[/* lightMaterialRecord */16]);
        }), IsDebugMainService$Wonderjs.getIsDebug(MainStateData$Wonderjs.stateData));
  return OperateLightMaterialMainService$Wonderjs.setSpecularColor(material, color, state);
}

function unsafeGetLightMaterialShininess(material, state) {
  Contract$WonderLog.requireCheck((function () {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeLightMaterialService$Wonderjs.isAlive, state[/* lightMaterialRecord */16]);
        }), IsDebugMainService$Wonderjs.getIsDebug(MainStateData$Wonderjs.stateData));
  return OperateLightMaterialMainService$Wonderjs.unsafeGetShininess(material, state);
}

function setLightMaterialShininess(material, shininess, state) {
  Contract$WonderLog.requireCheck((function () {
          return AliveComponentService$Wonderjs.checkComponentShouldAlive(material, DisposeLightMaterialService$Wonderjs.isAlive, state[/* lightMaterialRecord */16]);
        }), IsDebugMainService$Wonderjs.getIsDebug(MainStateData$Wonderjs.stateData));
  return OperateLightMaterialMainService$Wonderjs.setShininess(material, shininess, state);
}

export {
  createLightMaterial                 ,
  unsafeGetLightMaterialGameObject    ,
  unsafeGetLightMaterialDiffuseColor  ,
  setLightMaterialDiffuseColor        ,
  unsafeGetLightMaterialSpecularColor ,
  setLightMaterialSpecularColor       ,
  unsafeGetLightMaterialShininess     ,
  setLightMaterialShininess           ,
  
}
/* Contract-WonderLog Not a pure module */