import { useEffect, useRef } from 'react';

// Animated gradient background — replicates Framer "Animated Gradient Background"
// Parameters: Color #7C3AED × 3, Shape: Stripes, Swirl: 58, Softness: 100,
//             Scale: 0.5, Speed: 30, Offset: 60, Noise: 0.1
// Rendered as a fixed full-viewport WebGL canvas that fades out at 80 vh.

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
      mix(hash(i),                 hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  void main() {
    vec2 uv   = gl_FragCoord.xy / u_res;
    float asp = u_res.x / u_res.y;

    // WebGL y=0 is BOTTOM. Centre at ~30% from screen top → uv.y = 0.70.
    // Scale x by aspect so the distance metric matches screen proportions.
    vec2 c = (uv - vec2(0.5, 0.70)) * vec2(asp, 1.0);

    // Swirl: 58 — gentle twist that decays with radius
    float r   = length(c);
    float ang = atan(c.y, c.x) + 0.58 * exp(-r * 3.0);
    vec2 sw   = r * vec2(cos(ang), sin(ang));

    // Very slow drift (speed: 30)
    float t = u_time * 0.012;

    // Subtle organic noise
    float n = noise(sw * 2.5 + vec2(t * 0.30, t * 0.22)) * 0.07;

    // Glow radius scales with aspect so it always fills the full width.
    // 16:9 (asp≈1.78) → edge≈0.98  |  ultrawide (asp≈2.4) → edge≈1.32
    float edge = asp * 0.55;
    float glow = 1.0 - smoothstep(0.0, edge, r);
    glow = pow(glow, 0.80); // exponent < 1 spreads glow wider from centre

    float pattern = clamp(glow + n * glow * 0.4, 0.0, 1.0);

    // #7C3AED
    vec3 purple = vec3(0.486, 0.227, 0.929);
    vec3 bg     = vec3(0.039, 0.039, 0.039);

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

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_res');
    const uTime = gl.getUniformLocation(prog, 'u_time');

    // Use window dimensions — canvas is fixed full-viewport
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener('resize', resize);
    resize();

    let raf = 0;
    const start = performance.now();

    const draw = () => {
      const t = reduceMotion ? 0 : (performance.now() - start) / 1000;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!reduceMotion) raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        display: 'block',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 65%, transparent 80%)',
        maskImage: 'linear-gradient(to bottom, black 0%, black 65%, transparent 80%)',
      }}
    />
  );
}
