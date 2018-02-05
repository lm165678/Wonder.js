open GeometryType;

open BoxGeometryType;

open StateDataType;

open GeometryGetStateDataCommon;

let setConfigData =
    (geometry: geometry, configData: boxGeometryConfigDataJsObj, state: StateDataType.state) => {
  open JsObjUtils;
  let {configDataMap} as data = getGeometryData(state);
  {
    ...state,
    geometryData: {
      ...data,
      configDataMap:
        configDataMap
        |> WonderCommonlib.SparseMapSystem.set(
             geometry,
             WonderCommonlib.HashMapSystem.createEmpty()
             |> WonderCommonlib.HashMapSystem.set(
                  "width",
                  getValueFromJsObj(configData##width, 10.)
                )
             |> WonderCommonlib.HashMapSystem.set(
                  "height",
                  getValueFromJsObj(configData##height, 10.)
                )
             |> WonderCommonlib.HashMapSystem.set(
                  "depth",
                  getValueFromJsObj(configData##depth, 10.)
                )
             |> WonderCommonlib.HashMapSystem.set(
                  "widthSegment",
                  getValueFromJsObj(configData##widthSegment, 1.)
                )
             |> WonderCommonlib.HashMapSystem.set(
                  "heightSegment",
                  getValueFromJsObj(configData##heightSegment, 1.)
                )
             |> WonderCommonlib.HashMapSystem.set(
                  "depthSegment",
                  getValueFromJsObj(configData##depthSegment, 1.)
                )
           )
    }
  }
};