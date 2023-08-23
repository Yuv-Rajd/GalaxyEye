// Function to check if two line segments intersect
const doSegmentsIntersect = (p1, p2, q1, q2) => {
  const o1 = orientation(p1, p2, q1);
  const o2 = orientation(p1, p2, q2);
  const o3 = orientation(q1, q2, p1);
  const o4 = orientation(q1, q2, p2);

  if (o1 !== o2 && o3 !== o4) {
    return true;
  }

  if (o1 === 0 && onSegment(p1, q1, p2)) return true;
  if (o2 === 0 && onSegment(p1, q2, p2)) return true;
  if (o3 === 0 && onSegment(q1, p1, q2)) return true;
  if (o4 === 0 && onSegment(q1, p2, q2)) return true;

  return false;
};

// Function to check if a point lies on a line segment
const onSegment = (p, q, r) => {
  return (
    q[0] <= Math.max(p[0], r[0]) &&
    q[0] >= Math.min(p[0], r[0]) &&
    q[1] <= Math.max(p[1], r[1]) &&
    q[1] >= Math.min(p[1], r[1])
  );
};

// Function to calculate orientation of three points
const orientation = (p, q, r) => {
  const val = (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1]);
  if (val === 0) return 0;
  return val > 0 ? 1 : 2;
};

// Function to check if two polygons overlap
export const doPolygonsOverlap = (polygon1, polygon2) => {
  console.log(polygon1);
  for (let i = 0; i < polygon1.length - 1; i++) {
    for (let j = 0; j < polygon2.length; j++) {
      if (
        doSegmentsIntersect(
          polygon1[i],
          polygon1[(i + 1) % polygon1.length],
          polygon2[j],
          polygon2[(j + 1) % polygon2.length]
        )
      ) {
        return true;
      }
    }
  }

  return false;
};
