import { useEffect, useRef } from 'react';

// Animated gradient background — replicates the Framer "Animated Gradient Background" component
// Parameters: Color #7C3AED × 3, Shape: Stripes, Swirl: 58, Softness: 100,
//             Scale: 0.5, Speed: 30, Offset: 60, Noise: 0.1

const VERT = /* glsl */ `
  attribute vec2 a_pos;
  void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = /* glsl */ `
  precision mediump float;
  uniform vec2  u_res;
  uniform float u_time;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i),              hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  void main() {
    vec2 uv  = gl_FragCoord.xy / u_res;
    float asp = u_res.x / u_res.y;

    // Centre of glow — shifted upward to match Offset: 60
    vec2 c = (uv - vec2(0.5, 0.38)) * vec2(asp, 1.0);

    // Swirl: 58  →  0.58 rad of twist that falls off with radius
    float r   = length(c);
    float ang = atan(c.y, c.x) + 0.58 * exp(-r * 2.8);
    vec2 sw   = r * vec2(cos(ang), sin(ang));

    // Speed: 30  →  very slow drift (barely perceptible)
    float t = u_time * 0.012;

    // Noise: 0.1 amplitude
    float n = noise(sw * 3.0 + vec2(t * 0.35, t * 0.25)) * 0.08;

    // Shape: Stripes — soft parallel bands in the swirled space
    float stripe = sin(sw.x * 9.42 + sw.y * 4.71 + t) * 0.5 + 0.5;

    // Radial falloff — Scale: 0.5 means glow covers ~50% of canvas height
    //                  Softness: 100 → very smooth edge (no hard cutoff)
    float glow = 1.0 - smoothstep(0.0, 0.58, r * 1.7);
    glow = pow(glow, 1.05);

    // Blend stripes in very subtly (softness:100 flattens them almost entirely)
    float pattern = mix(glow, glow * (0.88 + stripe * 0.12), 0.18) + n * glow;
    pattern = clamp(pattern, 0.0, 1.0);

    // #7C3AED = rgb(124, 58, 237)
    vec3 purple = vec3(0.486, 0.227, 0.929);
    vec3 bg     = vec3(0.039, 0.039, 0.039); // #0a0a0a

    gl_FragColor = vec4(mix(bg, purple, pattern), 1.0);
  }
`;

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

export function HeroShader({ reduceMotion }: { reduceMotion: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compileShader(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compileShader(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // Full-screen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_res');
    const uTime = gl.getUniformLocation(prog, 'u_time');

    const ro = new ResizeObserver(() => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    });
    ro.observe(canvas);

    // Kick off initial resize before first frame
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);

    let raf = 0;
    const start = performance.now();

    const draw = () => {
      // If reduced motion, render one static frame and stop
      const t = reduceMotion ? 0 : (performance.now() - start) / 1000;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!reduceMotion) raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      style={{ display: 'block' }}
    />
  );
}
