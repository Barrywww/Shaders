#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
float epsilon=.00001;
float min_param_a=0.+epsilon;
float max_param_a=1.-epsilon;
float min_param_b=0.;
float max_param_b=1.;

float plot(vec2 st,float pct){
    return smoothstep(pct-.02,pct,st.y)-
    smoothstep(pct,pct+.02,st.y);
}

float doubleCircleSigmoid(float x,float a){
    float min_param_a=0.;
    float max_param_a=1.;
    a=max(min_param_a,min(max_param_a,a));
    
    float y;
    if(x<=a){
        y=a-sqrt(a*a-x*x);
    }else{
        y=a+sqrt(pow(1.-a,2.)-pow(x-1.,2.));
    }
    return y;
}

float doubleOddPolynomialSeat(float x,float a,float b,int n){
    a=min(max_param_a,max(min_param_a,a));
    b=min(max_param_b,max(min_param_b,b));
    
    int p=2*n+1;
    float y;
    if(x<=a){
        y=b-b*pow(1.-x/a,float(p));
    }else{
        y=b+(1.-b)*pow((x-a)/(1.-a),float(p));
    }
    return y;
}

float doubleEllipticSeat(float x,float a,float b){
    a=max(min_param_a,min(max_param_a,a));
    b=max(min_param_b,min(max_param_b,b));
    
    float y;
    if(x<=a){
        y=(b/a)*sqrt(pow(a,2.)-pow((x-a),2.));
    }else{
        y=1.-((1.-b)/(1.-a))*sqrt(pow(1.-a,2.)-pow(x-a,2.));
    }
    return y;
}

float quadraticBezier(float x,float a,float b){
    a=max(0.,min(1.,a));
    b=max(0.,min(1.,b));
    if(a==.5){
        a+=epsilon;
    }
    
    // solve t from x (an inverse operation)
    float om2a=1.-2.*a;
    float t=(sqrt(a*a+om2a*x)-a)/om2a;
    float y;
    y=(1.-2.*b)*(t*t)+(2.*b)*t;
    return y;
}

float expImpulse(float x,float k)
{
    float h=k*x;
    return h*exp(1.-h);
}

float gain(float x,float k)
{
    float a=.5*pow(2.*((x<.5)?x:1.-x),k);
    return(x<.5)?a:1.-a;
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution;
    
    // float y=doubleOddPolynomialSeat(st.x,.5,.5,1);
    float y=doubleEllipticSeat(st.x,.1,.5);
    // float y=quadraticBezier(st.x,.6,0.);
    // float y=expImpulse(st.x,5.);
    // float y=gain(st.x,3.);
    // float y=doubleCircleSigmoid(st.x,0.3);
    
    vec3 color=vec3(y);
    
    float pct=plot(st,y);
    color=(1.-pct)*color+pct*vec3(0.,1.,0.);
    
    gl_FragColor=vec4(color,1.);
}