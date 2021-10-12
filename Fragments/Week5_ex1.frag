#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(1523.9898,78.233)))*
        43458.809);
}
void main() {
    vec2 coord = gl_FragCoord.xy/u_resolution.xy;
    float rnd = random(coord);
    gl_FragColor = vec4(vec3(rnd),1.0);
}