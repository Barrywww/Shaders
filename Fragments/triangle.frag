#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    float left = step(st.y, st.x);
    float bottom = step(0.1,st.y);
    float right = step(st.y, 1.-st.x);
    float top = step(st.y, 1.-st.y);
    color = vec3( left * bottom * right * top);
    gl_FragColor = vec4(color,1.0);
}