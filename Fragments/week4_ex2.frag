// modified from theBookOfShaders
#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.14159265358979323846
uniform vec2 u_resolution;
uniform float u_time;
// simple square function
float square(vec2 pos, float size) {
    vec2 s = vec2(0.5)-vec2(size);
    vec2 edges = step(s, pos);
    edges *= step(s, 1.0-pos);
    return edges.x * edges.y;
}
vec2 rotate2D (vec2 _st, float _angle) {
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}
vec2 tile (vec2 _st, float _zoom) {
    _st *= _zoom;
    return fract(_st);
}
vec2 rotateTilePattern(vec2 _st){
    //  Scale the coordinate system by 2x2
    _st *= 2.0;
    //  Give each cell an index number
    //  according to its position
    float index = 0.0;
    index += step(1., mod(_st.x,2.0));
    index += step(1., mod(_st.y,2.0))*2.0;
    //      |
    //  2   |   3
    //      |
    //--------------
    //      |
    //  0   |   1
    //      |
    // Make each cell between 0.0 - 1.0
    _st = fract(_st);
    // Rotate each cell according to the index
    if(index == 1.0){
        //  Rotate cell 1 by 90 degrees
        _st = rotate2D(_st,PI*0.5);
    } else if(index == 2.0){
        //  Rotate cell 2 by -90 degrees
        _st = rotate2D(_st,PI*-0.5);
    } else if(index == 3.0){
        //  Rotate cell 3 by 180 degrees
        _st = rotate2D(_st,PI);
    }
    return _st;
}
void main (void) {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    // Increase the tile value below
    vec2 tiles = tile(st,1.0);
    // The uncomment the following line to create
    // the rotated tile pattern
    // tiles = rotateTilePattern(tiles);
    // Make more interesting combinations
    tiles = tile(tiles,1.0);
    tiles = rotate2D(tiles,-PI*u_time*0.25);
    tiles = rotateTilePattern(tiles*2.);
    tiles = rotate2D(tiles,PI*u_time*0.25);
    // step(st.x,st.y) just makes a b&w triangles
    // but you can use whatever design you want.
    vec3 color = vec3(st.x * sin(u_time), st.y * cos(u_time), -st.y * cos(u_time));
    gl_FragColor = vec4(mix(vec3(step(tiles.x,tiles.y)), color, 0.8),1.0);
}