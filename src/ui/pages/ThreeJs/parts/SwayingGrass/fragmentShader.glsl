precision mediump float;

uniform sampler2D u_texture;
uniform float u_time;

uniform float u_strength;
uniform float u_horizonHeight;
uniform float u_phaseDifference;
uniform float u_phase;
uniform float u_speed;

varying vec4 v_posFrom0To1;

void main() {
  float shift =
    u_strength * (v_posFrom0To1.y - u_horizonHeight)
    * sin((u_time + u_phase) * u_speed + v_posFrom0To1.x * u_phaseDifference);
  gl_FragColor = texture2D(u_texture, v_posFrom0To1.xy + shift);
}

