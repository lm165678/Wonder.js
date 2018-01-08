// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as JsObjUtils$Wonderjs                 from "../../../../utils/JsObjUtils.js";
import * as HashMapSystem$WonderCommonlib       from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapSystem.js";
import * as SparseMapSystem$WonderCommonlib     from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapSystem.js";
import * as GeometryGetStateDataCommon$Wonderjs from "./GeometryGetStateDataCommon.js";

function setConfigData(geometry, configData, state) {
  var configDataHashMap = HashMapSystem$WonderCommonlib.set("depthSegment", JsObjUtils$Wonderjs.getValueFromJsObj(configData.depthSegment, 1), HashMapSystem$WonderCommonlib.set("heightSegment", JsObjUtils$Wonderjs.getValueFromJsObj(configData.heightSegment, 1), HashMapSystem$WonderCommonlib.set("widthSegment", JsObjUtils$Wonderjs.getValueFromJsObj(configData.widthSegment, 1), HashMapSystem$WonderCommonlib.set("depth", JsObjUtils$Wonderjs.getValueFromJsObj(configData.depth, 10), HashMapSystem$WonderCommonlib.set("height", JsObjUtils$Wonderjs.getValueFromJsObj(configData.height, 10), HashMapSystem$WonderCommonlib.set("width", JsObjUtils$Wonderjs.getValueFromJsObj(configData.width, 10), HashMapSystem$WonderCommonlib.createEmpty(/* () */0)))))));
  SparseMapSystem$WonderCommonlib.set(geometry, configDataHashMap, GeometryGetStateDataCommon$Wonderjs.getGeometryData(state)[/* configDataMap */4]);
  return state;
}

export {
  setConfigData ,
  
}
/* HashMapSystem-WonderCommonlib Not a pure module */