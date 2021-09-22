#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415926

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

mat2 rotate2d (float angle) {
    return mat2(cos(angle), -sin(angle),
                sin(angle), cos(angle));
}

float square(vec2 pos, float size) {
  vec2 s = vec2(0.5) - vec2(size);
  vec2 edges = step(s, pos);
  edges *= step(s, 1.-pos);
  return edges.x * edges.y;
}

mat2 scale(vec2 scaleFactor) {
  return mat2(scaleFactor.x, 0.,
              0., scaleFactor.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.);
    vec2 translate = vec2(cos(u_time)*.5, cos(u_time)*.5);
    st -= vec2(0.5);
    st = rotate2d(PI * 0.25 * u_time) * st;
    st += 0.5;
    st += translate;
    st.y -= 0.2;
    st -= vec2(0.5);
    st = scale(vec2(sin(u_time)+1.5)) * st;
    st += vec2(0.5);
    
    color = vec3(sin(u_time)*st.x, sin(u_time)*st.y, 0.);
    color += vec3(square(st, 0.125));
    gl_FragColor = vec4(color,1.0);
}