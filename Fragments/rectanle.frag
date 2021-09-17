#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    float left = smoothstep(0.05,0.1,st.x);
    float bottom = smoothstep(0.05,0.1,st.y);
    float right = smoothstep(0.05,0.1, 1.-st.x);
    float top = smoothstep(0.05,0.1, 1.-st.y);
    color = vec3(((st.x<.1)||(st.x>.9))||((st.y<.1)||(st.y>.9))?left * bottom * right * top:1.0-(left * bottom * right * top));
    // color = vec3(left * bottom * right * top);
    gl_FragColor = vec4(color,1.0);
}