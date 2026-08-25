(() => {
  'use strict';
  const canvas = document.getElementById('finaleTunnel');
  if (!canvas) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const options = {antialias:false,alpha:false,depth:false,stencil:false,powerPreference:'high-performance'};
  const gl = canvas.getContext('webgl2', options) || canvas.getContext('webgl', options);
  if (!gl) { canvas.parentElement?.classList.add('no-gl'); canvas.remove(); return; }
  canvas.dataset.renderer = 'webgl-raymarching';

  const vertex = `
    attribute vec2 aPos;
    void main(){gl_Position=vec4(aPos,0.0,1.0);}
  `;
  const fragment = `
    precision highp float;
    precision highp int;
    uniform vec2 uResolution;
    uniform float uTime;
    uniform float uInitialDepth;
    uniform float uSafeMinimum;
    uniform float uFieldTimeRate;
    uniform float uForwardTravelRate;
    uniform float uDomainStrength;
    uniform float uDomainScale;
    uniform float uDomainAttenuation;
    uniform float uCameraFocalLength;
    uniform float uFieldSlope;
    uniform float uFieldDetailScale;
    uniform float uDistanceBase;
    uniform float uDistanceDepthFactor;
    uniform float uExposureScale;
    const int TRACE_STEP_COUNT=50;
    const int TRACE_START_INDEX=30;
    const int DOMAIN_LAYER_COUNT=3;
    vec2 screenCoord(vec2 fragCoord){vec2 viewport=max(uResolution,vec2(1.0));return(2.0*fragCoord-viewport)/viewport.y;}
    vec3 viewRay(vec2 screenPosition){return normalize(vec3(screenPosition,uCameraFocalLength));}
    vec3 deform(vec3 samplePosition,float depth,float timeValue,float tracePhase){
      vec3 warped=samplePosition;
      for(int layer=0;layer<DOMAIN_LAYER_COUNT;++layer){
        float octave=float(layer+2);float frequency=octave*uDomainScale;float attenuation=octave+uDomainAttenuation;
        vec3 phase=warped.yzx*frequency-depth+timeValue+tracePhase;
        warped+=sin(phase)*(uDomainStrength/attenuation);
      }
      return warped;
    }
    float fieldDistance(vec3 warped,float localDepth,float rayDepth){
      float primary=abs(warped.y+localDepth*uFieldSlope);
      vec3 secondary=sin(warped-rayDepth)/uFieldDetailScale;
      vec4 field=vec4(primary,secondary);
      float norm=uDistanceBase+rayDepth*rayDepth*uDistanceDepthFactor;
      return max(length(field)/norm,uSafeMinimum);
    }
    vec3 palette(float phase){return .9+sin(phase*1.3-vec3(4.8,-.4,1.2));}
    vec3 light(vec3 color,float distance,float depth){
      float safeDepth=max(depth,uInitialDepth);
      float density=max(distance*distance*safeDepth,uSafeMinimum);
      vec3 concentrated=color/density;
      vec3 glow=distance*depth/vec3(1.0,.812,.6);
      return concentrated+glow;
    }
    vec3 tone(vec3 hdr){
      vec3 value=clamp(hdr/uExposureScale,vec3(-10.0),vec3(10.0));
      vec3 exponential=exp(2.0*value);
      return clamp((exponential-1.0)/max(exponential+1.0,vec3(uSafeMinimum)),0.0,1.0);
    }
    void main(){
      vec2 screen=screenCoord(gl_FragCoord.xy);vec3 ray=viewRay(screen);
      float fieldTime=uTime*uFieldTimeRate;float travel=uTime*uForwardTravelRate;
      float depth=uInitialDepth;vec3 accumulated=vec3(0.0);
      for(int trace=TRACE_START_INDEX;trace<TRACE_STEP_COUNT;++trace){
        float phase=float(trace)+13.0;vec3 position=ray*depth;vec3 moving=position;moving.z+=travel;
        vec3 warped=deform(moving,depth,fieldTime,phase);float localDepth=warped.z-travel;
        float distance=fieldDistance(warped,localDepth,depth);accumulated+=light(palette(phase),distance,depth);depth+=distance;
      }
      gl_FragColor=vec4(tone(accumulated),1.0);
    }
  `;

  function compile(type, source) {
    const shader = gl.createShader(type); gl.shaderSource(shader, source); gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { console.error('finale tunnel shader:', gl.getShaderInfoLog(shader)); return null; }
    return shader;
  }
  const vs = compile(gl.VERTEX_SHADER, vertex), fs = compile(gl.FRAGMENT_SHADER, fragment);
  if (!vs || !fs) { canvas.remove(); return; }
  const program = gl.createProgram(); gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { console.error('finale tunnel link:', gl.getProgramInfoLog(program)); canvas.remove(); return; }
  gl.useProgram(program);
  const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,3,-1,-1,3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program,'aPos'); gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
  const names=['uResolution','uTime','uInitialDepth','uSafeMinimum','uFieldTimeRate','uForwardTravelRate','uDomainStrength','uDomainScale','uDomainAttenuation','uCameraFocalLength','uFieldSlope','uFieldDetailScale','uDistanceBase','uDistanceDepthFactor','uExposureScale'];
  const uniforms=Object.fromEntries(names.map(name=>[name,gl.getUniformLocation(program,name)]));
  const values={uInitialDepth:1.46,uSafeMinimum:.0001,uFieldTimeRate:.10,uForwardTravelRate:.23,uDomainStrength:1.69,uDomainScale:3.84,uDomainAttenuation:3.86,uCameraFocalLength:.22,uFieldSlope:-.10,uFieldDetailScale:4.60,uDistanceBase:2.60,uDistanceDepthFactor:.45,uExposureScale:2000};
  Object.entries(values).forEach(([name,value])=>gl.uniform1f(uniforms[name],value));
  let raf=0, frameCount=0, startTime=performance.now();
  const resize=()=>{const width=canvas.clientWidth,height=canvas.clientHeight;if(!width||!height)return;const w=Math.round(width),h=Math.round(height);if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h);gl.uniform2f(uniforms.uResolution,w,h);}};
  const draw=time=>{resize();gl.uniform1f(uniforms.uTime,(time-startTime)/1000);gl.drawArrays(gl.TRIANGLES,0,3);frameCount+=1;canvas.dataset.frames=String(frameCount);raf=requestAnimationFrame(draw);};
  const start=()=>{if(!raf)raf=requestAnimationFrame(draw);};
  const stop=()=>{if(raf){cancelAnimationFrame(raf);raf=0;}};
  const still=time=>{resize();gl.uniform1f(uniforms.uTime,time);gl.drawArrays(gl.TRIANGLES,0,3);canvas.dataset.frames='1';};
  addEventListener('resize',()=>{resize();if(reduced)still(8);},{passive:true});
  if(reduced){still(8);return;}
  if('IntersectionObserver' in globalThis){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>entry.isIntersecting?start():stop());},{rootMargin:'120px'});observer.observe(document.querySelector('.brand-finale')||canvas);}else start();
})();
