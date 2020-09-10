'use strict';

var ListSt$Wonderjs = require("../../../../../../../construct/domain_layer/library/structure/ListSt.bs.js");
var PipelineCPRepo$Wonderjs = require("../../../../repo/pipeline/PipelineCPRepo.bs.js");
var PipelineRunAPI$Wonderjs = require("../../../../../../../construct/external_layer/api/run/PipelineRunAPI.bs.js");
var InitPassCPJobEntity$Wonderjs = require("../entity/jobs/init/InitPassCPJobEntity.bs.js");
var StartTimeCPJobEntity$Wonderjs = require("../entity/jobs/init/StartTimeCPJobEntity.bs.js");
var InitCameraCPJobEntity$Wonderjs = require("../entity/jobs/init/InitCameraCPJobEntity.bs.js");
var InitWebGPUCPJobEntity$Wonderjs = require("../entity/jobs/init/InitWebGPUCPJobEntity.bs.js");
var UpdatePassCPJobEntity$Wonderjs = require("../entity/jobs/update/UpdatePassCPJobEntity.bs.js");
var UpdateCameraCPJobEntity$Wonderjs = require("../entity/jobs/update/UpdateCameraCPJobEntity.bs.js");
var InitRayTracingCPJobEntity$Wonderjs = require("../entity/jobs/init/InitRayTracingCPJobEntity.bs.js");
var UpdateTransformCPJobEntity$Wonderjs = require("../entity/jobs/update/UpdateTransformCPJobEntity.bs.js");
var InitAccumulationCPJobEntity$Wonderjs = require("../entity/jobs/init/InitAccumulationCPJobEntity.bs.js");
var RenderRayTracingCPJobEntity$Wonderjs = require("../entity/jobs/render/RenderRayTracingCPJobEntity.bs.js");
var UpdateRayTracingCPJobEntity$Wonderjs = require("../entity/jobs/update/UpdateRayTracingCPJobEntity.bs.js");
var RenderAccumulationCPJobEntity$Wonderjs = require("../entity/jobs/render/RenderAccumulationCPJobEntity.bs.js");
var UpdateAccumulationCPJobEntity$Wonderjs = require("../entity/jobs/update/UpdateAccumulationCPJobEntity.bs.js");

function _getInitPipelineJobs(param) {
  return {
          hd: [
            StartTimeCPJobEntity$Wonderjs.create(undefined),
            StartTimeCPJobEntity$Wonderjs.exec
          ],
          tl: {
            hd: [
              InitWebGPUCPJobEntity$Wonderjs.create(undefined),
              InitWebGPUCPJobEntity$Wonderjs.exec
            ],
            tl: {
              hd: [
                InitCameraCPJobEntity$Wonderjs.create(undefined),
                InitCameraCPJobEntity$Wonderjs.exec
              ],
              tl: {
                hd: [
                  InitPassCPJobEntity$Wonderjs.create(undefined),
                  InitPassCPJobEntity$Wonderjs.exec
                ],
                tl: {
                  hd: [
                    InitRayTracingCPJobEntity$Wonderjs.create(undefined),
                    InitRayTracingCPJobEntity$Wonderjs.exec
                  ],
                  tl: {
                    hd: [
                      InitAccumulationCPJobEntity$Wonderjs.create(undefined),
                      InitAccumulationCPJobEntity$Wonderjs.exec
                    ],
                    tl: /* [] */0
                  }
                }
              }
            }
          }
        };
}

function _getUpdatePipelineJobs(param) {
  return {
          hd: [
            UpdateTransformCPJobEntity$Wonderjs.create(undefined),
            UpdateTransformCPJobEntity$Wonderjs.exec
          ],
          tl: {
            hd: [
              UpdateCameraCPJobEntity$Wonderjs.create(undefined),
              UpdateCameraCPJobEntity$Wonderjs.exec
            ],
            tl: {
              hd: [
                UpdateRayTracingCPJobEntity$Wonderjs.create(undefined),
                UpdateRayTracingCPJobEntity$Wonderjs.exec
              ],
              tl: {
                hd: [
                  UpdateAccumulationCPJobEntity$Wonderjs.create(undefined),
                  UpdateAccumulationCPJobEntity$Wonderjs.exec
                ],
                tl: {
                  hd: [
                    UpdatePassCPJobEntity$Wonderjs.create(undefined),
                    UpdatePassCPJobEntity$Wonderjs.exec
                  ],
                  tl: /* [] */0
                }
              }
            }
          }
        };
}

function _getRenderPipelineJobs(param) {
  return {
          hd: [
            RenderRayTracingCPJobEntity$Wonderjs.create(undefined),
            RenderRayTracingCPJobEntity$Wonderjs.exec
          ],
          tl: {
            hd: [
              RenderAccumulationCPJobEntity$Wonderjs.create(undefined),
              RenderAccumulationCPJobEntity$Wonderjs.exec
            ],
            tl: /* [] */0
          }
        };
}

function _register(pipeline, jobs) {
  return ListSt$Wonderjs.forEach(jobs, (function (param) {
                return PipelineRunAPI$Wonderjs.registerJob(pipeline, param[0], param[1]);
              }));
}

function registerAllJobs(param) {
  _register(PipelineCPRepo$Wonderjs.getInitPipeline(undefined), _getInitPipelineJobs(undefined));
  _register(PipelineCPRepo$Wonderjs.getUpdatePipeline(undefined), _getUpdatePipelineJobs(undefined));
  return _register(PipelineCPRepo$Wonderjs.getRenderPipeline(undefined), _getRenderPipelineJobs(undefined));
}

exports._getInitPipelineJobs = _getInitPipelineJobs;
exports._getUpdatePipelineJobs = _getUpdatePipelineJobs;
exports._getRenderPipelineJobs = _getRenderPipelineJobs;
exports._register = _register;
exports.registerAllJobs = registerAllJobs;
/* PipelineCPRepo-Wonderjs Not a pure module */