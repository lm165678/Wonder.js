// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as Most                                from "most";
import * as Curry                               from "../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as PathUtils$Wonderjs                  from "../utils/PathUtils.js";
import * as ArraySystem$Wonderjs                from "../structure/ArraySystem.js";
import * as FetchCommon$Wonderjs                from "./FetchCommon.js";
import * as AllJobSystem$Wonderjs               from "../job/AllJobSystem.js";
import * as LogicJobConfigHelper$Wonderjs       from "../job/logic/LogicJobConfigHelper.js";
import * as RenderJobConfigHelper$Wonderjs      from "../job/render/RenderJobConfigHelper.js";
import * as LogicJobConfigParseSystem$Wonderjs  from "../job/logic/LogicJobConfigParseSystem.js";
import * as RenderJobConfigParseSystem$Wonderjs from "../job/render/RenderJobConfigParseSystem.js";

function _createFetchLogicJobStreamArr(dataDir, fetchFunc) {
  return /* array */[
          Most.map(LogicJobConfigParseSystem$Wonderjs.convertLogicSettingToRecord, FetchCommon$Wonderjs.createFetchJsonStream(PathUtils$Wonderjs.join(/* array */[
                        dataDir,
                        "logic/setting/logic_setting.json"
                      ]), fetchFunc)),
          Most.map(LogicJobConfigParseSystem$Wonderjs.convertInitPipelinesToRecord, FetchCommon$Wonderjs.createFetchJsonStream(PathUtils$Wonderjs.join(/* array */[
                        dataDir,
                        "logic/pipeline/init_pipelines.json"
                      ]), fetchFunc)),
          Most.map(LogicJobConfigParseSystem$Wonderjs.convertUpdatePipelinesToRecord, FetchCommon$Wonderjs.createFetchJsonStream(PathUtils$Wonderjs.join(/* array */[
                        dataDir,
                        "logic/pipeline/update_pipelines.json"
                      ]), fetchFunc)),
          Most.map(LogicJobConfigParseSystem$Wonderjs.convertInitJobsToRecord, FetchCommon$Wonderjs.createFetchJsonStream(PathUtils$Wonderjs.join(/* array */[
                        dataDir,
                        "logic/job/init_jobs.json"
                      ]), fetchFunc)),
          Most.map(LogicJobConfigParseSystem$Wonderjs.convertUpdateJobsToRecord, FetchCommon$Wonderjs.createFetchJsonStream(PathUtils$Wonderjs.join(/* array */[
                        dataDir,
                        "logic/job/update_jobs.json"
                      ]), fetchFunc))
        ];
}

function _createFetchRenderJobStreamArr(dataDir, fetchFunc) {
  return /* array */[
          Most.map(RenderJobConfigParseSystem$Wonderjs.convertRenderSettingToRecord, FetchCommon$Wonderjs.createFetchJsonStream(PathUtils$Wonderjs.join(/* array */[
                        dataDir,
                        "render/setting/render_setting.json"
                      ]), fetchFunc)),
          Most.map(RenderJobConfigParseSystem$Wonderjs.convertInitPipelinesToRecord, FetchCommon$Wonderjs.createFetchJsonStream(PathUtils$Wonderjs.join(/* array */[
                        dataDir,
                        "render/pipeline/init_pipelines.json"
                      ]), fetchFunc)),
          Most.map(RenderJobConfigParseSystem$Wonderjs.convertRenderPipelinesToRecord, FetchCommon$Wonderjs.createFetchJsonStream(PathUtils$Wonderjs.join(/* array */[
                        dataDir,
                        "render/pipeline/render_pipelines.json"
                      ]), fetchFunc)),
          Most.map(RenderJobConfigParseSystem$Wonderjs.convertInitJobsToRecord, FetchCommon$Wonderjs.createFetchJsonStream(PathUtils$Wonderjs.join(/* array */[
                        dataDir,
                        "render/job/init_jobs.json"
                      ]), fetchFunc)),
          Most.map(RenderJobConfigParseSystem$Wonderjs.convertRenderJobsToRecord, FetchCommon$Wonderjs.createFetchJsonStream(PathUtils$Wonderjs.join(/* array */[
                        dataDir,
                        "render/job/render_jobs.json"
                      ]), fetchFunc)),
          Most.map(RenderJobConfigParseSystem$Wonderjs.convertShadersToRecord, FetchCommon$Wonderjs.createFetchJsonStream(PathUtils$Wonderjs.join(/* array */[
                        dataDir,
                        "render/shader/shaders.json"
                      ]), fetchFunc)),
          Most.map(RenderJobConfigParseSystem$Wonderjs.convertShaderLibsToRecord, FetchCommon$Wonderjs.createFetchJsonStream(PathUtils$Wonderjs.join(/* array */[
                        dataDir,
                        "render/shader/shader_libs.json"
                      ]), fetchFunc))
        ];
}

function _collectAllRecords(stream) {
  return Most.reduce((function (arr, record) {
                return ArraySystem$Wonderjs.push(record, arr);
              }), /* array */[], stream);
}

function _addInitDataFunc(initDataFunc, promise) {
  return promise.then((function (recordArr) {
                return Promise.resolve(/* tuple */[
                            recordArr,
                            initDataFunc
                          ]);
              }));
}

function load(dataDir, fetchFunc, state) {
  return Most.reduce((function (state, param) {
                  return Curry._2(param[1], param[0], state);
                }), state, Most.mergeArray(/* array */[
                    Most.fromPromise(_addInitDataFunc(LogicJobConfigHelper$Wonderjs.initData, _collectAllRecords(Most.mergeArray(_createFetchLogicJobStreamArr(dataDir, fetchFunc))))),
                    Most.fromPromise(_addInitDataFunc(RenderJobConfigHelper$Wonderjs.initData, _collectAllRecords(Most.mergeArray(_createFetchRenderJobStreamArr(dataDir, fetchFunc)))))
                  ])).then((function (state) {
                return Promise.resolve(AllJobSystem$Wonderjs.init(state));
              }));
}

export {
  _createFetchLogicJobStreamArr  ,
  _createFetchRenderJobStreamArr ,
  _collectAllRecords             ,
  _addInitDataFunc               ,
  load                           ,
  
}
/* most Not a pure module */