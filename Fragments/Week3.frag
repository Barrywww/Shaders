#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 hsv(float h,float s,float v) {
    vec2 st = gl_FragCoord.xy/u_resolution.xy * 2.0 - 1.;
    return mix(vec3(1.), clamp(abs(mod(st.y*sin(u_time)*3.+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,0.0,1.0),s)*v;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy * 2.0 - 1.;
    st *= 10.0;
    float radius = smoothstep(-0.5, 0.5, sin(u_time))+1.0;
    vec2 rep = vec2(2.0,5.0);
    vec2 p = mod(st, rep) - 0.5*rep;
    float c = smoothstep(0.1, 0.0, abs(length(p)-radius));
    gl_FragColor = vec4(hsv(radius, 1.0, c), 1.0);
}