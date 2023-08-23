import { booleanOverlap, intersect, polygon } from "@turf/turf";

export const checkIntersect = (polygon1, startPoint, endPoint) => {
  var newPolygon = [
    [
      [startPoint[0], startPoint[1]],
      [startPoint[0], endPoint[1]],
      [endPoint[0], startPoint[1]],
      [endPoint[0], endPoint[1]],
      [startPoint[0], startPoint[1]],
    ],
  ];

  var polygon1 = polygon(polygon1);
  var polygon2 = polygon(newPolygon);
  const polygonsIntersect = intersect(polygon2, polygon1);
  const polyOverlap = booleanOverlap(polygon1, polygon2);
  if (polyOverlap) {
    console.log("now", polyOverlap);
  }
  if (polygonsIntersect !== undefined && polygonsIntersect !== null) {
    return true;
  }
};
