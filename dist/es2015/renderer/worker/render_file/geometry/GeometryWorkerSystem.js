import { createMap } from "../../../../utils/objectUtils";
import { getUIntArrayClass, getDrawMode as getDrawModeUtils, getIndexType as getIndexTypeUtils, getIndicesCount as getIndicesCountUtils, getVerticesCount as getVerticesCountUtils, hasIndices as hasIndicesUtils, getIndexTypeSize as getIndexTypeSizeUtils, createBufferViews } from "../../../utils/geometry/geometryUtils";
import { ensureFunc, it, requireCheckFunc } from "../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { isValidVal } from "../../../../utils/arrayUtils";
import { getSlice } from "../../../../utils/typeArrayUtils";
export var getVertices = ensureFunc(function (vertices, index, GeometryWorkerData) {
    it("vertices should exist", function () {
        expect(vertices).exist;
    });
}, function (index, GeometryWorkerData) {
    return GeometryWorkerData.verticesCacheMap[index];
});
export var getIndices = ensureFunc(function (indices, index, GeometryWorkerData) {
    it("indices should exist", function () {
        expect(indices).exist;
    });
}, function (index, GeometryWorkerData) {
    return GeometryWorkerData.indicesCacheMap[index];
});
export var updatePointCacheDatas = function (verticesInfoList, indicesInfoList, GeometryWorkerData) {
    _updatePointCacheData(verticesInfoList, GeometryWorkerData.vertices, GeometryWorkerData.verticesCacheMap);
    _updatePointCacheData(indicesInfoList, GeometryWorkerData.indices, GeometryWorkerData.indicesCacheMap);
};
var _updatePointCacheData = function (infoList, points, cacheMap) {
    for (var _i = 0, infoList_1 = infoList; _i < infoList_1.length; _i++) {
        var info = infoList_1[_i];
        var index = info.index, dataArr = getSlice(points, info.startIndex, info.endIndex);
        cacheMap[index] = dataArr;
    }
};
export var resetPointCacheDatas = function (verticesInfoList, indicesInfoList, GeometryWorkerData) {
    GeometryWorkerData.verticesCacheMap = createMap();
    GeometryWorkerData.indicesCacheMap = createMap();
    _setPointCacheData(verticesInfoList, GeometryWorkerData.vertices, GeometryWorkerData.verticesCacheMap);
    _setPointCacheData(indicesInfoList, GeometryWorkerData.indices, GeometryWorkerData.indicesCacheMap);
};
export var setPointCacheDatas = function (verticesInfoList, indicesInfoList, GeometryWorkerData) {
    _setPointCacheData(verticesInfoList, GeometryWorkerData.vertices, GeometryWorkerData.verticesCacheMap);
    _setPointCacheData(indicesInfoList, GeometryWorkerData.indices, GeometryWorkerData.indicesCacheMap);
};
var _setPointCacheData = requireCheckFunc(function (infoList, points, cacheMap) {
    it("infoList should has no invalid value", function () {
        for (var _i = 0, infoList_2 = infoList; _i < infoList_2.length; _i++) {
            var info = infoList_2[_i];
            expect(isValidVal(info)).true;
        }
    });
}, function (infoList, points, cacheMap) {
    for (var i = 0, len = infoList.length; i < len; i++) {
        var info = infoList[i], dataArr = getSlice(points, info.startIndex, info.endIndex);
        cacheMap[i] = dataArr;
    }
});
export var getIndexType = getIndexTypeUtils;
export var getIndexTypeSize = getIndexTypeSizeUtils;
export var hasIndices = function (index, GeometryWorkerData) { return hasIndicesUtils(index, getIndices, GeometryWorkerData); };
export var getDrawMode = getDrawModeUtils;
export var getVerticesCount = function (index, GeometryWorkerData) { return getVerticesCountUtils(index, getVertices, GeometryWorkerData); };
export var getIndicesCount = function (index, GeometryWorkerData) { return getIndicesCountUtils(index, getIndices, GeometryWorkerData); };
export var initData = function (buffer, indexType, indexTypeSize, DataBufferConfig, GeometryWorkerData) {
    GeometryWorkerData.verticesWorkerInfoList = [];
    GeometryWorkerData.indicesWorkerInfoList = [];
    GeometryWorkerData.verticesCacheMap = createMap();
    GeometryWorkerData.indicesCacheMap = createMap();
    GeometryWorkerData.indexType = indexType;
    GeometryWorkerData.indexTypeSize = indexTypeSize;
    createBufferViews(buffer, DataBufferConfig.geometryDataBufferCount, getUIntArrayClass(indexType), GeometryWorkerData);
};
//# sourceMappingURL=GeometryWorkerSystem.js.map