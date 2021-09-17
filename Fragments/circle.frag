#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
void main(){
  vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;
    // pct = distance(st,vec2(0.5)) * 2. * (cos(u_time * 5.));
    pct = pow(distance(st, vec2(0.4)), distance(st, vec2(0.6))) * 1.2;
    float pct1 = 0.5 + (distance(st, vec2(0.4)), distance(st, vec2(0.6))) * 1.2;
    vec3 color = vec3(smoothstep(0.5, 0.55, pct) - smoothstep(0.56, 0.8 ,pct), abs(sin(u_time)), abs(sin(u_time)));
    vec3 color1 = vec3(smoothstep(0.5, 0.55, pct1) - smoothstep(0.56, 0.8 ,pct1), abs(sin(u_time)), abs(sin(u_time)));

  gl_FragColor = vec4(1. -(color+color1), 1.0 );
}