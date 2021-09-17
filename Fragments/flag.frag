#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.14159265359
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
// vec3 colorA = vec3(0.1,0.,0.512);
// vec3 colorB = vec3(1.000,0.533,0.224);
vec3 colorA = vec3(0.,0.,0.);
vec3 colorB = vec3(1.,1.,1.);

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}
void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(.1);
    vec3 pct = vec3(1.+st.x);
    pct.r = smoothstep(fract(st.x*5.5), 0.5, sin(u_time));
    pct.g = st.y;
    pct.b = smoothstep(fract(st.y*3.5), 0.5, sin(u_time));
    color = mix(colorA, colorB, pct);
    // color = mix(colorA, colorB, pct*1.2*abs(sin(u_time)));
    
    gl_FragColor = vec4(color,1.);
}