open StateDataType;

/* TODO duplicate with render job */
let _getAllLogicJobs = (executableJobs, jobHandleMap, state: StateDataType.state) =>
  LogicConfigType.(
    executableJobs
    |> WonderCommonlib.ArraySystem.reduceOneParam(
         [@bs]
         (
           (list, {name}: executableJob) =>
             switch (WonderCommonlib.HashMapSystem.get(name, jobHandleMap)) {
             | None =>
               /* TODO test */
               WonderLog.Log.fatal(
                 WonderLog.Log.buildFatalMessage(
                   ~title="_getAllLogicInitJobs",
                   ~description={j|can't find job handle function whose job name is $name|j},
                   ~reason="",
                   ~solution={j|make sure that the job name defined in config be correctly|j},
                   ~params={j|jobHandleMap: $jobHandleMap|j}
                 )
               )
             | Some(handleFunc) => list @ [(name, handleFunc)]
             }
         ),
         []
       )
  );

let _getLogicInitJobList = (state: StateDataType.state) => state.jobData.logicInitJobList;

let _getLogicUpdateJobList = (state: StateDataType.state) => state.jobData.logicUpdateJobList;

/* TODO refactor */
let execLogicInitJobs = (state: StateDataType.state) : state =>
  state
  |> _getLogicInitJobList
  |> List.fold_left((state, (_, handleFunc)) => handleFunc(state), state);

let execLogicUpdateJobs = (elapsed: float, state: StateDataType.state) : state =>
  state
  |> _getLogicUpdateJobList
  |> List.fold_left((state, (_, handleFunc)) => handleFunc(elapsed, state), state);

let _getAllRenderJobs = (executableJobs, jobHandleMap, state: StateDataType.state) =>
  RenderConfigType.(
    executableJobs
    |> WonderCommonlib.ArraySystem.reduceOneParam(
         [@bs]
         (
           (list, {name, flags, shader}: executableJob) =>
             switch (WonderCommonlib.HashMapSystem.get(name, jobHandleMap)) {
             | None =>
               /* TODO test */
               WonderLog.Log.fatal(
                 WonderLog.Log.buildFatalMessage(
                   ~title="_getAllRenderInitJobs",
                   ~description={j|can't find job handle function whose job name is $name|j},
                   ~reason="",
                   ~solution={j|make sure that the job name defined in config be correctly|j},
                   ~params={j|jobHandleMap: $jobHandleMap|j}
                 )
               )
             | Some(handleFunc) => list @ [(name, handleFunc((flags, shader)))]
             }
         ),
         []
       )
  );

let _getRenderInitJobList = (state: StateDataType.state) => state.jobData.renderInitJobList;

let _getRenderRenderJobList = (state: StateDataType.state) => state.jobData.renderRenderJobList;

/* TODO refactor */
let execRenderInitJobs = (gl, state: StateDataType.state) : state =>
  state
  |> _getRenderInitJobList
  |> List.fold_left((state, (_, handleFunc)) => handleFunc(gl, state), state);

let execRenderRenderJobs = (gl, state: StateDataType.state) : state =>
  state
  |> _getRenderRenderJobList
  |> List.fold_left((state, (_, handleFunc)) => handleFunc(gl, state), state);

let _initLogic = (state: StateDataType.state) => {
  ...state,
  jobData: {
    ...state.jobData,
    logicInitJobList:
      _getAllLogicJobs(
        LogicConfigSystem.getInitPipelineExecutableJobs(
          LogicConfigSystem.getLogicSetting(state),
          LogicConfigSystem.getInitPipelines(state),
          LogicConfigSystem.getInitJobs(state)
        ),
        LogicJobHandleSystem.createInitJobHandleMap(),
        state
      ),
    logicUpdateJobList:
      _getAllLogicJobs(
        LogicConfigSystem.getUpdatePipelineExecutableJobs(
          LogicConfigSystem.getLogicSetting(state),
          LogicConfigSystem.getUpdatePipelines(state),
          LogicConfigSystem.getUpdateJobs(state)
        ),
        LogicJobHandleSystem.createUpdateJobHandleMap(),
        state
      )
  }
};

let _initRender = (state: StateDataType.state) => {
  ...state,
  jobData: {
    ...state.jobData,
    renderInitJobList:
      _getAllRenderJobs(
        RenderConfigSystem.getInitPipelineExecutableJobs(
          RenderConfigSystem.getRenderSetting(state),
          RenderConfigSystem.getInitPipelines(state),
          RenderConfigSystem.getInitJobs(state)
        ),
        RenderJobHandleSystem.createInitJobHandleMap(),
        state
      ),
    renderRenderJobList:
      _getAllRenderJobs(
        RenderConfigSystem.getRenderPipelineExecutableJobs(
          RenderConfigSystem.getRenderSetting(state),
          RenderConfigSystem.getRenderPipelines(state),
          RenderConfigSystem.getRenderJobs(state)
        ),
        RenderJobHandleSystem.createRenderJobHandleMap(),
        state
      )
  }
};

let init = (state: StateDataType.state) => state |> _initLogic |> _initRender;

let _addRenderJob = ((targetJobName: string, afterJobName: string, targetHandleFunc), jobList) =>
  afterJobName |> Js.String.length === 0 ?
    [(targetJobName, targetHandleFunc), ...jobList] :
    jobList
    |> List.fold_left(
         (list, (jobName, handleFunc) as jobItem) =>
           jobName === afterJobName ?
             list @ [jobItem, (targetJobName, targetHandleFunc)] : list @ [jobItem],
         []
       );

let _removeRenderJob = (targetJobName: string, jobList) =>
  jobList |> List.filter(((jobName, handleFunc)) => jobName !== targetJobName);

let addRenderInitJob =
    (targetJobName: string, afterJobName: string, targetHandleFunc, state: StateDataType.state) => {
  ...state,
  jobData: {
    ...state.jobData,
    renderInitJobList:
      _addRenderJob((targetJobName, afterJobName, targetHandleFunc), _getRenderInitJobList(state))
  }
};

let addRenderRenderJob =
    (targetJobName: string, afterJobName: string, targetHandleFunc, state: StateDataType.state) => {
  ...state,
  jobData: {
    ...state.jobData,
    renderRenderJobList:
      _addRenderJob(
        (targetJobName, afterJobName, targetHandleFunc),
        _getRenderRenderJobList(state)
      )
  }
};

let removeRenderInitJob = (targetJobName: string, state: StateDataType.state) => {
  ...state,
  jobData: {
    ...state.jobData,
    renderInitJobList: _removeRenderJob(targetJobName, _getRenderInitJobList(state))
  }
};

let removeRenderRenderJob = (targetJobName: string, state: StateDataType.state) => {
  ...state,
  jobData: {
    ...state.jobData,
    renderRenderJobList: _removeRenderJob(targetJobName, _getRenderRenderJobList(state))
  }
};