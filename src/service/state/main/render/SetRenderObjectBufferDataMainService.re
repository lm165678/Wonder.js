open StateDataMainType;

open RenderType;

open RenderObjectBufferTypeArrayService;

open Js.Typed_array;

let setData =
    (
      renderArray,
      unsafeGetMaterialComponentFunc,
      {
        transformIndices,
        materialIndices,
        meshRendererIndices,
        geometryIndices,
        sourceInstanceIndices,
        geometryTypes,
      } as renderObjectRecord,
      {gameObjectRecord} as state,
    ) => {
  let (
    transformIndices,
    materialIndices,
    meshRendererIndices,
    geometryIndices,
    sourceInstanceIndices,
    geometryTypes,
    renderArray,
  ) =
    renderArray
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (.
           (
             transformIndices,
             materialIndices,
             meshRendererIndices,
             geometryIndices,
             sourceInstanceIndices,
             geometryTypes,
             renderArray,
           ) as dataTuple,
           uid,
           index,
         ) =>
           switch (
             GetComponentGameObjectService.getGeometryComponentData(.
               uid,
               gameObjectRecord,
             )
           ) {
           | None => dataTuple
           | Some((geometryIndex, type_)) =>
             let materialIndex =
               unsafeGetMaterialComponentFunc(. uid, gameObjectRecord);

             (
               setComponent(
                 index,
                 GetComponentGameObjectService.unsafeGetTransformComponent(
                   uid,
                   gameObjectRecord,
                 ),
                 transformIndices,
               ),
               setComponent(index, materialIndex, materialIndices),
               setComponent(
                 index,
                 GetComponentGameObjectService.unsafeGetMeshRendererComponent(
                   uid,
                   gameObjectRecord,
                 ),
                 meshRendererIndices,
               ),
               setComponent(index, geometryIndex, geometryIndices),
               switch (
                 GetComponentGameObjectService.getSourceInstanceComponent(.
                   uid,
                   gameObjectRecord,
                 )
               ) {
               | None => sourceInstanceIndices
               | Some(sourceInstance) =>
                 setComponent(index, sourceInstance, sourceInstanceIndices)
               },
               TypeArrayService.setUint8_1(index, type_, geometryTypes),
               renderArray |> ArrayService.push(index),
             );
           },
         (
           transformIndices,
           materialIndices,
           meshRendererIndices,
           geometryIndices,
           sourceInstanceIndices,
           geometryTypes,
           [||],
         ),
       );
  Some({
    ...renderObjectRecord,
    renderArray,
    transformIndices,
    materialIndices,
    meshRendererIndices,
    geometryIndices,
    sourceInstanceIndices,
    geometryTypes,
  });
};