precision mediump float;

uniform vec2 uMouse;
uniform sampler2D uImage;
uniform sampler2D uDepthMap;

varying vec2 vUv;

vec4 linearTosRGB( in vec4 value ) {
  return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}


void main() {
   vec4 depthDistortion = texture2D(uDepthMap, vUv);
   float parallaxMult = depthDistortion.r;

   vec2 parallax = (uMouse) * parallaxMult;

   vec4 original = texture2D(uImage, (vUv + parallax));
   gl_FragColor = linearTosRGB(original);
}