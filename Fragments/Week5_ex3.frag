#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.14159265358979323846
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}
vec2 flipCoordinates(in vec2 st, in float index){
    if (index > 0.75) {
        st = vec2(1.0) - st;
    } else if (index > 0.5) {
        st = vec2(1.0-st.x,st.y);
    } else if (index > 0.25) {
        st = 1.0-vec2(1.0-st.x,st.y);
    }
    return st;
}
void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st *= 10.0;
    vec2 ipos = floor(st);  // integer
    vec2 fpos = fract(st);  // fraction
    vec2 tile = flipCoordinates(fpos, random( ipos ));
    float color = 0.0;
    // draw lines
    color = smoothstep(tile.x-0.3,tile.x,tile.y)-
            smoothstep(tile.x,tile.x+0.3,tile.y);
    gl_FragColor = vec4(vec3(color),1.0);
    // uncomment this line to see coordinate systems
    //gl_FragColor = vec4(vec3(tile.x, tile.y, 0.),1.0);
}