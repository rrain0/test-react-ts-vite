
/*
Uniforms provide the same data for each vertex.
Attributes provide individual data for each vertex.
*/


// Auto injected attributes:

// Position of current vertex
//attribute vec3 position;

// UV coordinates is a coordinate system that allows you to position a 2D texture on a 3D object.
// Each UV coordinate references a pixel of a given texture and ranges from 0 to 1.
// The process of mapping a 2D texture on a 3D shape is also referred to as UV Mapping.
//attribute vec2 uv;




varying vec2 vUv;

void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
