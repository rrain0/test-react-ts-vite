precision mediump float;

// auto injected by react three fiber
//attribute vec3 position;
//attribute vec? modelMatrix;
//attribute vec? modelPosition;
//attribute vec? projectionMatrix;

varying vec4 v_posFrom0To1;

//varying vec2 vUv;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;
  v_posFrom0To1 = vec4(
    (projectionPosition.x + 1.0) / 2.0,
    (projectionPosition.y + 1.0) / 2.0,
    0.0,
    1.0
  );

  //vUv = uv;
}


