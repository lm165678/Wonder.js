open DependencyDataType;

open Js.Typed_array;

module All = {
  let hasDependencyData =
      (
        bufferDataName,
        abRelativePath,
        dependencyRelation,
        abBufferDataNameMap: bufferDataNameMap,
      ) =>
    FindDependencyDataSystem.findAllDependencyAbRelativePath(
      abRelativePath,
      dependencyRelation,
    )
    |> Js.Array.filter(dependencyAbRelativePath =>
         switch (
           abBufferDataNameMap
           |> WonderCommonlib.ImmutableHashMapService.get(
                dependencyAbRelativePath,
              )
         ) {
         | None => false
         | Some(bufferDataNameMap) =>
           bufferDataNameMap
           |> WonderCommonlib.ImmutableHashMapService.has(bufferDataName)
         }
       )
    |> Js.Array.length > 0;
};

module RAB = {
  let _getArrayBufferFromBufferViews =
      (buffer, bufferView, bufferViews: array(RABType.bufferView)) => {
    let {byteOffset, byteLength}: RABType.bufferView =
      Array.unsafe_get(bufferViews, bufferView);

    buffer
    |> Js.Typed_array.ArrayBuffer.slice(
         ~start=byteOffset,
         ~end_=byteOffset + byteLength,
       );
  };

  let _removeImageDuplicateBufferData =
      (
        (dependencyRelation, allRabDependentImageNameMap, rabRelativePath),
        {images, bufferViews}: RABType.resourceAssetBundleContent,
        buffer,
      ) => {
    let (imageArr, bufferViewArr, arrayBufferArr, byteOffset) =
      images
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (.
             (imageArr, bufferViewArr, arrayBufferArr, byteOffset),
             ({name, bufferView}: RABType.image) as imageData,
           ) =>
             All.hasDependencyData(
               name,
               rabRelativePath,
               dependencyRelation,
               allRabDependentImageNameMap,
             ) ?
               (
                 imageArr
                 |> ArrayService.push(
                      {
                        ...imageData,
                        bufferView:
                          ABBufferViewUtils.buildNoneBufferViewIndex(),
                      }: RABType.image,
                    ),
                 bufferViewArr,
                 arrayBufferArr,
                 byteOffset,
               ) :
               {
                 let arrayBuffer =
                   _getArrayBufferFromBufferViews(
                     buffer,
                     bufferView,
                     bufferViews,
                   );

                 let byteLength = arrayBuffer |> ArrayBuffer.byteLength;
                 let alignedByteLength =
                   BufferUtils.alignedLength(byteLength);

                 (
                   imageArr
                   |> ArrayService.push({
                        ...imageData,
                        bufferView: bufferViewArr |> Js.Array.length,
                      }),
                   bufferViewArr
                   |> ArrayService.push(
                        {byteOffset, byteLength}: RABType.bufferView,
                      ),
                   arrayBufferArr |> ArrayService.push(arrayBuffer),
                   byteOffset + alignedByteLength,
                 );
               },
           ([||], [||], [||], 0),
         );

    (
      /* imageIndexMap, */
      imageArr,
      bufferViewArr,
      arrayBufferArr,
      RABUtils.computeBufferViewDataByteLength(bufferViewArr),
    );
  };

  let _buildGeometryBufferData =
      (
        (
          geometryName,
          rabRelativePath,
          dependencyRelation,
          allRabDependentGeometryNameMap,
        ),
        (buffer, bufferViews),
        (
          imageBufferViewIndex,
          bufferView,
          bufferViewArr,
          byteOffset,
          arrayBufferArr,
        ),
      ) =>
    ABBufferViewUtils.isNoneBufferViewIndex(bufferView)
    || All.hasDependencyData(
         geometryName,
         rabRelativePath,
         dependencyRelation,
         allRabDependentGeometryNameMap,
       ) ?
      (
        ABBufferViewUtils.buildNoneBufferViewIndex(),
        bufferViewArr,
        byteOffset,
        arrayBufferArr,
      ) :
      {
        let arrayBuffer =
          _getArrayBufferFromBufferViews(buffer, bufferView, bufferViews);

        let byteLength = arrayBuffer |> ArrayBuffer.byteLength;

        let alignedByteLength = BufferUtils.alignedLength(byteLength);

        (
          (bufferViewArr |> Js.Array.length) + imageBufferViewIndex,
          bufferViewArr
          |> ArrayService.push({byteOffset, byteLength}: RABType.bufferView),
          byteOffset + alignedByteLength,
          arrayBufferArr |> ArrayService.push(arrayBuffer),
        );
      };

  let _removeGeometryDuplicateBufferData =
      (
        (dependencyRelation, allRabDependentGeometryNameMap, rabRelativePath),
        (imageAlignedByteLength, imageBufferViewArr),
        {geometrys, bufferViews}: RABType.resourceAssetBundleContent,
        buffer,
      ) => {
    let imageBufferViewIndex = imageBufferViewArr |> Js.Array.length;

    let (geometryArr, arrayBufferArr, bufferViewArr, byteOffset) =
      geometrys
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (.
             (geometryArr, arrayBufferArr, bufferViewArr, byteOffset),
             (
               {
                 name,
                 vertexBufferView,
                 normalBufferView,
                 texCoordBufferView,
                 indexBufferView,
               }: RABType.geometry
             ) as geometry,
           ) => {
             let (vertexBufferView, bufferViewArr, byteOffset, arrayBufferArr) =
               _buildGeometryBufferData(
                 (
                   name,
                   rabRelativePath,
                   dependencyRelation,
                   allRabDependentGeometryNameMap,
                 ),
                 (buffer, bufferViews),
                 (
                   imageBufferViewIndex,
                   vertexBufferView,
                   bufferViewArr,
                   byteOffset,
                   arrayBufferArr,
                 ),
               );

             let (normalBufferView, bufferViewArr, byteOffset, arrayBufferArr) =
               _buildGeometryBufferData(
                 (
                   name,
                   rabRelativePath,
                   dependencyRelation,
                   allRabDependentGeometryNameMap,
                 ),
                 (buffer, bufferViews),
                 (
                   imageBufferViewIndex,
                   normalBufferView,
                   bufferViewArr,
                   byteOffset,
                   arrayBufferArr,
                 ),
               );

             let (
               texCoordBufferView,
               bufferViewArr,
               byteOffset,
               arrayBufferArr,
             ) =
               _buildGeometryBufferData(
                 (
                   name,
                   rabRelativePath,
                   dependencyRelation,
                   allRabDependentGeometryNameMap,
                 ),
                 (buffer, bufferViews),
                 (
                   imageBufferViewIndex,
                   texCoordBufferView,
                   bufferViewArr,
                   byteOffset,
                   arrayBufferArr,
                 ),
               );

             let (indexBufferView, bufferViewArr, byteOffset, arrayBufferArr) =
               _buildGeometryBufferData(
                 (
                   name,
                   rabRelativePath,
                   dependencyRelation,
                   allRabDependentGeometryNameMap,
                 ),
                 (buffer, bufferViews),
                 (
                   imageBufferViewIndex,
                   indexBufferView,
                   bufferViewArr,
                   byteOffset,
                   arrayBufferArr,
                 ),
               );

             (
               geometryArr
               |> ArrayService.push(
                    {
                      ...geometry,
                      vertexBufferView,
                      normalBufferView,
                      texCoordBufferView,
                      indexBufferView,
                    }: RABType.geometry,
                  ),
               arrayBufferArr,
               bufferViewArr,
               byteOffset,
             );
           },
           ([||], [||], [||], imageAlignedByteLength),
         );

    (
      geometryArr,
      arrayBufferArr,
      bufferViewArr,
      bufferViewArr |> Js.Array.length === 0 ?
        imageAlignedByteLength :
        RABUtils.computeBufferViewDataByteLength(bufferViewArr),
    );
  };

  /* let _getJsonStr = (jsonByteLength, rab) => {
       let decoder = TextDecoder.newTextDecoder("utf-8");

       decoder
       |> TextDecoder.decodeUint8Array(
            Uint8Array.fromBufferRange(
              rab,
              ~offset=GenerateABUtils.getHeaderTotalByteLength(),
              ~length=jsonByteLength,
            ),
          );
     }; */

  let _getBuffer = (jsonByteLength, rab) =>
    rab
    |> ArrayBuffer.sliceFrom(
         GenerateABUtils.getHeaderTotalByteLength()
         + jsonByteLength
         |> BufferUtils.alignedLength,
       );

  /* let _readHeader = dataView => {
       let (jsonByteLength, byteOffset) =
         DataViewCommon.getUint32_1(. 0, dataView);

       let (bufferByteLength, byteOffset) =
         DataViewCommon.getUint32_1(. byteOffset, dataView);

       (byteOffset, jsonByteLength, bufferByteLength);
     }; */

  let removeRABDuplicateBufferData =
      /* {imageDependencyRelation, geometryDependencyRelation}, */
      (
        dependencyRelation,
        (allRabDependentImageNameMap, allRabDependentGeometryNameMap),
        (rabRelativePath, rab),
      ) => {
    let dataView = DataViewCommon.create(rab);

    let (byteOffset, jsonByteLength, bufferByteLength) =
      DependencyDataUtils.RAB.readHeader(dataView);

    let jsonStr = DependencyDataUtils.RAB.getJsonStr(jsonByteLength, rab);
    let buffer = _getBuffer(jsonByteLength, rab);

    let resourceAssetBundleContent: RABType.resourceAssetBundleContent =
      jsonStr |> Js.Json.parseExn |> Obj.magic;

    let (
      imageArr,
      imageBufferViewArr,
      imageArrayBufferArr,
      imageAlignedByteLength,
    ) =
      _removeImageDuplicateBufferData(
        (dependencyRelation, allRabDependentImageNameMap, rabRelativePath),
        resourceAssetBundleContent,
        buffer,
      );

    let (
      geometryArr,
      geometryArrayBufferArr,
      geometryBufferViewArr,
      bufferTotalAlignedByteLength,
    ) =
      _removeGeometryDuplicateBufferData(
        (dependencyRelation, allRabDependentGeometryNameMap, rabRelativePath),
        (imageAlignedByteLength, imageBufferViewArr),
        resourceAssetBundleContent,
        buffer,
      );

    let jsonUint8Array =
      BuildRABJsonDataSystem.buildJsonUint8Array({
        ...resourceAssetBundleContent,
        images: imageArr,
        geometrys: geometryArr,
        bufferViews:
          Js.Array.concat(geometryBufferViewArr, imageBufferViewArr),
      });

    GenerateRABSystem.generateRAB(
      (
        (imageBufferViewArr, geometryBufferViewArr),
        imageArrayBufferArr
        |> Js.Array.map(arrayBuffer => Uint8Array.fromBuffer(arrayBuffer)),
        geometryArrayBufferArr,
      ),
      bufferTotalAlignedByteLength,
      jsonUint8Array,
    );
  };
};

module SAB = {
  let _getArrayBufferFromBufferViews =
      (buffer, bufferView, bufferViews: array(WDType.bufferView)) => {
    let {byteOffset, byteLength}: WDType.bufferView =
      Array.unsafe_get(bufferViews, bufferView);

    buffer
    |> Js.Typed_array.ArrayBuffer.slice(
         ~start=byteOffset,
         ~end_=byteOffset + byteLength,
       );
  };

  let _removeImageDuplicateBufferData =
      (
        (dependencyRelation, allSabDependentImageNameMap, sabRelativePath),
        {images, bufferViews, accessors}: SABType.sceneAssetBundleContent,
        buffer,
      ) =>
    switch (images) {
    | None => ([||], [||], [||], 0)
    | Some(images) =>
      let (imageArr, bufferViewArr, arrayBufferArr, byteOffset) =
        images
        |> WonderCommonlib.ArrayService.reduceOneParam(
             (.
               (imageArr, bufferViewArr, arrayBufferArr, byteOffset),
               ({name, bufferView}: WDType.image) as imageData,
             ) =>
               All.hasDependencyData(
                 name,
                 sabRelativePath,
                 dependencyRelation,
                 allSabDependentImageNameMap,
               ) ?
                 (
                   imageArr
                   |> ArrayService.push(
                        {
                          ...imageData,
                          bufferView:
                            ABBufferViewUtils.buildNoneBufferViewIndex(),
                        }: WDType.image,
                      ),
                   bufferViewArr,
                   arrayBufferArr,
                   byteOffset,
                 ) :
                 {
                   let arrayBuffer =
                     _getArrayBufferFromBufferViews(
                       buffer,
                       bufferView,
                       bufferViews,
                     );

                   let byteLength = arrayBuffer |> ArrayBuffer.byteLength;
                   let alignedByteLength =
                     BufferUtils.alignedLength(byteLength);

                   let (buffer, byteOffset, byteLength, byteStride) =
                     GenerateCommon.buildBufferViewData(
                       byteOffset,
                       byteLength,
                     );

                   (
                     imageArr
                     |> ArrayService.push(
                          {
                            ...imageData,
                            bufferView: bufferViewArr |> Js.Array.length,
                          }: WDType.image,
                        ),
                     bufferViewArr
                     |> ArrayService.push(
                          {buffer, byteOffset, byteLength, byteStride}: WDType.bufferView,
                        ),
                     arrayBufferArr |> ArrayService.push(arrayBuffer),
                     byteOffset + alignedByteLength,
                   );
                 },
             ([||], [||], [||], 0),
           );

      (
        imageArr,
        bufferViewArr,
        arrayBufferArr,
        SABUtils.computeBufferViewDataByteLength(bufferViewArr),
      );
    };

  let _buildGeometryAttributeBufferData =
      (
        (
          geometryName,
          sabRelativePath,
          dependencyRelation,
          allSabDependentGeometryNameMap,
        ),
        dataViewArr,
        pointType,
        ({bufferViews, accessors}: SABType.sceneAssetBundleContent) as sceneAssetBundleContent,
        (
          isNoneAccessorIndexFunc,
          buildNoneAccessorIndexFunc,
          getAccessorIndexFunc,
          buildAccessorIndexFunc,
        ),
        (
          imageBufferViewIndex,
          accessor,
          accessorArr,
          bufferViewArr,
          byteOffset,
          arrayBufferArr,
        ),
      ) =>
    isNoneAccessorIndexFunc(accessor)
    || All.hasDependencyData(
         geometryName,
         sabRelativePath,
         dependencyRelation,
         allSabDependentGeometryNameMap,
       ) ?
      (
        buildNoneAccessorIndexFunc(),
        accessorArr,
        bufferViewArr,
        byteOffset,
        arrayBufferArr,
      ) :
      {
        let accessor = getAccessorIndexFunc(accessor);

        let points =
          BatchOperateWholeGeometrySystem.getBufferAttributeData(
            accessor,
            dataViewArr,
            sceneAssetBundleContent,
          );

        let arrayBuffer = points |> Float32Array.buffer;

        let byteLength = arrayBuffer |> ArrayBuffer.byteLength;

        let alignedByteLength = BufferUtils.alignedLength(byteLength);

        let (buffer, byteOffset, byteLength, byteStride) =
          GenerateCommon.buildBufferViewData(byteOffset, byteLength);

        (
          buildAccessorIndexFunc(accessorArr |> Js.Array.length),
          accessorArr
          |> ArrayService.push(
               {
                 bufferView:
                   (bufferViewArr |> Js.Array.length) + imageBufferViewIndex,
                 byteOffset: GenerateCommon.buildAccessorByteOffset(),
                 count: points |> Float32Array.length,
                 componentType:
                   BuildGeometryDataSystem.getComponentType(pointType)
                   |> ConvertUtils.convertComponentType,
                 type_:
                   BuildGeometryDataSystem.getType(pointType)
                   |> BufferUtils.convertType,
               }: WDType.accessor,
             ),
          bufferViewArr
          |> ArrayService.push(
               {buffer, byteOffset, byteLength, byteStride}: WDType.bufferView,
             ),
          byteOffset + alignedByteLength,
          arrayBufferArr |> ArrayService.push(arrayBuffer),
        );
      };

  let _buildGeometryIndexBufferData =
      (
        (
          name,
          sabRelativePath,
          dependencyRelation,
          allSabDependentGeometryNameMap,
        ),
        dataViewArr,
        ({bufferViews, accessors}: SABType.sceneAssetBundleContent) as sceneAssetBundleContent,
        (
          imageBufferViewIndex,
          accessor,
          accessorArr,
          bufferViewArr,
          byteOffset,
          arrayBufferArr,
        ),
      ) =>
    ABBufferViewUtils.isNoneAccessorIndex(accessor)
    || All.hasDependencyData(
         name,
         sabRelativePath,
         dependencyRelation,
         allSabDependentGeometryNameMap,
       ) ?
      (
        ABBufferViewUtils.buildNoneAccessorIndex(),
        accessorArr,
        bufferViewArr,
        byteOffset,
        arrayBufferArr,
      ) :
      {
        let componentType =
          BatchOperateWholeGeometrySystem.getAccessorComponentType(
            sceneAssetBundleContent,
            accessor,
          );

        let (arrayBuffer, pointsCount, pointType) =
          switch (
            BatchOperateWholeGeometrySystem.getBufferIndex16Data(
              componentType,
              accessor,
              dataViewArr,
              sceneAssetBundleContent,
            )
          ) {
          | Some(data) => (
              data |> Uint16Array.buffer,
              data |> Uint16Array.length,
              GenerateSceneGraphType.Index,
            )
          | None =>
            switch (
              BatchOperateWholeGeometrySystem.getBufferIndex32Data(
                componentType,
                accessor,
                dataViewArr,
                sceneAssetBundleContent,
              )
            ) {
            | Some(data) => (
                data |> Uint32Array.buffer,
                data |> Uint32Array.length,
                GenerateSceneGraphType.Index32,
              )
            | None =>
              WonderLog.Log.fatal(
                WonderLog.Log.buildFatalMessage(
                  ~title="_buildGeometryIndexBufferData",
                  ~description={j|unknown componentType: $componentType|j},
                  ~reason="",
                  ~solution={j||j},
                  ~params={j||j},
                ),
              )
            }
          };

        let byteLength = arrayBuffer |> ArrayBuffer.byteLength;

        let alignedByteLength = BufferUtils.alignedLength(byteLength);

        let (buffer, byteOffset, byteLength, byteStride) =
          GenerateCommon.buildBufferViewData(byteOffset, byteLength);

        (
          accessorArr |> Js.Array.length,
          accessorArr
          |> ArrayService.push(
               {
                 bufferView:
                   (bufferViewArr |> Js.Array.length) + imageBufferViewIndex,
                 byteOffset: GenerateCommon.buildAccessorByteOffset(),
                 count: pointsCount,
                 componentType:
                   BuildGeometryDataSystem.getComponentType(pointType)
                   |> ConvertUtils.convertComponentType,
                 type_:
                   BuildGeometryDataSystem.getType(pointType)
                   |> BufferUtils.convertType,
               }: WDType.accessor,
             ),
          bufferViewArr
          |> ArrayService.push(
               {buffer, byteOffset, byteLength, byteStride}: WDType.bufferView,
             ),
          byteOffset + alignedByteLength,
          arrayBufferArr |> ArrayService.push(arrayBuffer),
        );
      };

  let _removeGeometryDuplicateBufferData =
      (
        (dependencyRelation, allSabDependentGeometryNameMap, sabRelativePath),
        (imageAlignedByteLength, imageBufferViewArr),
        ({geometrys, bufferViews, accessors}: SABType.sceneAssetBundleContent) as sceneAssetBundleContent,
        buffer,
      ) => {
    let imageBufferViewIndex = imageBufferViewArr |> Js.Array.length;

    let dataViewArr = [|DataViewCommon.create(buffer)|];

    let (geometryArr, arrayBufferArr, accessorArr, bufferViewArr, byteOffset) =
      geometrys
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (.
             (
               geometryArr,
               arrayBufferArr,
               accessorArr,
               bufferViewArr,
               byteOffset,
             ),
             geometryData,
           ) =>
             geometryData |> OptionService.isJsonSerializedValueNone ?
               (
                 geometryArr |> ArrayService.push(None),
                 arrayBufferArr,
                 accessorArr,
                 bufferViewArr,
                 byteOffset,
               ) :
               {
                 let (
                       {name, position, normal, texCoord, index}: WDType.geometry
                     ) as geometry =
                   geometryData |> OptionService.unsafeGetJsonSerializedValue;

                 let (
                   positionAccessor,
                   accessorArr,
                   bufferViewArr,
                   byteOffset,
                   arrayBufferArr,
                 ) =
                   _buildGeometryAttributeBufferData(
                     (
                       name,
                       sabRelativePath,
                       dependencyRelation,
                       allSabDependentGeometryNameMap,
                     ),
                     dataViewArr,
                     GenerateSceneGraphType.Vertex,
                     sceneAssetBundleContent,
                     (
                       ABBufferViewUtils.isNoneAccessorIndex,
                       ABBufferViewUtils.buildNoneBufferViewIndex,
                       accessor => accessor,
                       accessor => accessor,
                     ),
                     (
                       imageBufferViewIndex,
                       position,
                       accessorArr,
                       bufferViewArr,
                       byteOffset,
                       arrayBufferArr,
                     ),
                   );

                 let (
                   normalAccessor,
                   accessorArr,
                   bufferViewArr,
                   byteOffset,
                   arrayBufferArr,
                 ) =
                   _buildGeometryAttributeBufferData(
                     (
                       name,
                       sabRelativePath,
                       dependencyRelation,
                       allSabDependentGeometryNameMap,
                     ),
                     dataViewArr,
                     GenerateSceneGraphType.Normal,
                     sceneAssetBundleContent,
                     (
                       OptionService.isJsonSerializedValueNone,
                       () => None,
                       accessor =>
                         OptionService.unsafeGetJsonSerializedValue(accessor),
                       accessor => Some(accessor),
                     ),
                     (
                       imageBufferViewIndex,
                       normal,
                       accessorArr,
                       bufferViewArr,
                       byteOffset,
                       arrayBufferArr,
                     ),
                   );

                 let (
                   texCoordAccessor,
                   accessorArr,
                   bufferViewArr,
                   byteOffset,
                   arrayBufferArr,
                 ) =
                   _buildGeometryAttributeBufferData(
                     (
                       name,
                       sabRelativePath,
                       dependencyRelation,
                       allSabDependentGeometryNameMap,
                     ),
                     dataViewArr,
                     GenerateSceneGraphType.TexCoord,
                     sceneAssetBundleContent,
                     (
                       OptionService.isJsonSerializedValueNone,
                       () => None,
                       accessor =>
                         OptionService.unsafeGetJsonSerializedValue(accessor),
                       accessor => Some(accessor),
                     ),
                     (
                       imageBufferViewIndex,
                       texCoord,
                       accessorArr,
                       bufferViewArr,
                       byteOffset,
                       arrayBufferArr,
                     ),
                   );

                 let (
                   indexAccessor,
                   accessorArr,
                   bufferViewArr,
                   byteOffset,
                   arrayBufferArr,
                 ) =
                   _buildGeometryIndexBufferData(
                     (
                       name,
                       sabRelativePath,
                       dependencyRelation,
                       allSabDependentGeometryNameMap,
                     ),
                     dataViewArr,
                     sceneAssetBundleContent,
                     (
                       imageBufferViewIndex,
                       index,
                       accessorArr,
                       bufferViewArr,
                       byteOffset,
                       arrayBufferArr,
                     ),
                   );

                 (
                   geometryArr
                   |> ArrayService.push(
                        {
                          ...geometry,
                          position: positionAccessor,
                          normal: normalAccessor,
                          texCoord: texCoordAccessor,
                          index: indexAccessor,
                        }
                        ->Some,
                      ),
                   arrayBufferArr,
                   accessorArr,
                   bufferViewArr,
                   byteOffset,
                 );
               },
           ([||], [||], [||], [||], imageAlignedByteLength),
         );

    (
      geometryArr,
      arrayBufferArr,
      accessorArr,
      bufferViewArr,
      bufferViewArr |> Js.Array.length === 0 ?
        imageAlignedByteLength :
        SABUtils.computeBufferViewDataByteLength(bufferViewArr),
    );
  };

  let removeSABDuplicateBufferData =
      (
        dependencyRelation,
        (allSabDependentImageNameMap, allSabDependentGeometryNameMap),
        (sabRelativePath, sab),
      ) => {
    let (wdFileContent, _, buffer) =
      BufferUtils.decodeWDB(sab, AssembleWholeWDBSystem.checkWDB);

    let sceneAssetBundleContent: SABType.sceneAssetBundleContent =
      wdFileContent |> Js.Json.parseExn |> Obj.magic;

    let (
      imageArr,
      imageBufferViewArr,
      imageArrayBufferArr,
      imageAlignedByteLength,
    ) =
      _removeImageDuplicateBufferData(
        (dependencyRelation, allSabDependentImageNameMap, sabRelativePath),
        sceneAssetBundleContent,
        buffer,
      );

    let (
      geometryArr,
      geometryArrayBufferArr,
      geometryAccessorArr,
      geometryBufferViewArr,
      bufferTotalAlignedByteLength,
    ) =
      _removeGeometryDuplicateBufferData(
        (dependencyRelation, allSabDependentGeometryNameMap, sabRelativePath),
        (imageAlignedByteLength, imageBufferViewArr),
        sceneAssetBundleContent,
        buffer,
      );

    let jsonUint8Array =
      BuildSABJsonDataSystem.buildJsonUint8Array(
        {
          ...sceneAssetBundleContent,
          images: imageArr |> Js.Array.length === 0 ? None : Some(imageArr),
          geometrys: geometryArr,
          bufferViews:
            Js.Array.concat(geometryBufferViewArr, imageBufferViewArr),
          accessors: geometryAccessorArr,
        }: SABType.sceneAssetBundleContent,
      );

    GenerateSABSystem.generateSAB(
      (
        (imageBufferViewArr, geometryBufferViewArr),
        imageArrayBufferArr
        |> Js.Array.map(arrayBuffer => Uint8Array.fromBuffer(arrayBuffer)),
        geometryArrayBufferArr,
      ),
      bufferTotalAlignedByteLength,
      jsonUint8Array,
    );
  };
};

let removeDuplicateBufferData =
    (
      dependencyRelation,
      (
        (allRabDependentImageNameMap, allRabDependentGeometryNameMap),
        (allSabDependentImageNameMap, allSabDependentGeometryNameMap),
      ),
      (sabDataArr, rabDataArr),
    ) => (
  sabDataArr
  |> Js.Array.map(((sabRelativePath, sab) as data) =>
       (
         sabRelativePath,
         SAB.removeSABDuplicateBufferData(
           dependencyRelation,
           (allSabDependentImageNameMap, allSabDependentGeometryNameMap),
           data,
         ),
       )
     ),
  rabDataArr
  |> Js.Array.map(((rabRelativePath, rab) as data) =>
       (
         rabRelativePath,
         RAB.removeRABDuplicateBufferData(
           dependencyRelation,
           (allRabDependentImageNameMap, allRabDependentGeometryNameMap),
           data,
         ),
       )
     ),
);