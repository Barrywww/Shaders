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

 float circle (vec2 pos, float radius){
     float d = distance(vec2(0.5), pos);
     return step(d, radius * 0.5);   
 }

 vec2 rotate2d (vec2 pos, float angle) {
    pos -= 0.5;
    pos = mat2(cos(angle), -sin(angle),
                sin(angle), cos(angle)) * pos;
    pos += 0.5;
    return pos;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.);
    st *= 5.;
    st -= 0.5;
    st = rotate2d(vec2(0.5), PI * 0.15 * u_time) * st;
    // st += 0.5;
    vec2 grid = fract(st);
    grid = rotate2d(grid, fract(u_time * 0.5) * PI * 2.);
    color = vec3(grid.x, grid.y, 0.);
    color += vec3(square(grid, .25));
    // color += vec3(circle(grid, .6));
    gl_FragColor = vec4(color,1.0);
}