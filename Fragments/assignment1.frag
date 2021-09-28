#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415926

uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_mouse;

// background color
vec4 darkblue = vec4(0., 0., 0.09, 1.);

// for rotating the canvas
mat2 rotate2d (float angle) {
    return mat2(cos(angle), -sin(angle),
                sin(angle), cos(angle));
}

// circle shape funtion
float circle (vec2 pos, float radius){
     float d = distance(vec2(0.5), pos);
     return step(d, radius * 0.5);   
}

// to create random noise
// somehow 1-d random was not working, use this 2-d and take .x value instead.
float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

void main() {
	// standarize the canvas and zoom
    vec2 st = gl_FragCoord.xy / u_resolution.xy * 5.;
    vec4 color = vec4(0.);

	// add rotation
    st -= 1.5;
    st = rotate2d(PI * 0.09 * u_time) * st;
    st += 1.5;

	// add grid
    vec2 grid = fract(st);

	// control the direction of animation
	// boundary value: 0.7, > 0.7, take sin(u_time) as animation, cos(u_time) otherwise.
    int direction = random(grid) > .7 ? 1 : 0;

	// sin(u_time) * 20 here is used to create the larger particle field
    float c = circle(grid, .1 * clamp(abs(direction == 1 ? sin(u_time * 0.7)*20. : cos(u_time  * 0.7)), 0., 15.));

	// control the alpha value for the stars, make them blink.
    float alpha = sin(u_time  * 0.7);
    color += vec4(c, 0.6, 0.2, alpha);
    color = color.x != 0. ? color : darkblue;
    color = pow(color, vec4(0.5)); 
    gl_FragColor = vec4(color);
}