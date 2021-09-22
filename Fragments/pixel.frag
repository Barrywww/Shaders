#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
#define PI 3.1415926
float square(vec2 pos, float size) {
    vec2 s = vec2(.5) - vec2(size);
    vec2 edges = step(s, pos);
    edges *= step(s, 1.-pos);
    return edges.x * edges.y;
}
vec2 rotate2d(vec2 pos, float angle) {
  pos -= vec2(.5);
  pos = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * pos;
  pos += vec2(.5);
  return pos;
}

 float circle (vec2 pos, float radius){
     float d = distance(vec2(0.5), pos);
     return step(d, radius * 0.5);   
 }

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.);
    vec2 translate_l = vec2(cos(u_time)*.5, cos(u_time)*.5);
    vec2 translate_r = vec2(cos(u_time)*.5, cos(u_time)*.5);
    
    st *= 8.;
    st.x += step(1., mod(st.y , 2.0)) * u_time;
    st.x += step(1., mod(st.y + 1., 2.0)) * -u_time;
    
    st.y += step(1., mod(st.x , 2.0)) * u_time;
    st.y += step(1., mod(st.x + 1., 2.0)) * -u_time;
    vec2 grid = fract(st);
    vec2 grid1 = fract(st + 0.5);
    color = vec3(grid.x, grid.y, 0.);
    color += vec3(square(grid, .3));
    color += vec3(circle(grid1, 0.9));
    gl_FragColor = vec4(color,1.0);
}