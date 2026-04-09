import { useEffect, useRef } from 'react';

// Animated gradient background — Framer params: #7C3AED × 3, Stripes, Swirl 58,
// Softness 100, Scale 0.5, Speed 30, Offset 60.
//
// Design intent:
//  - gradient source is ABOVE the viewport top — the whole top edge is in the bright zone
//  - flows downward, fading naturally toward the bottom
//  - scroll-driven opacity: fully visible at 0, gone by 100 vh of scroll

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
      mix(hash(i),                  hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  // 3-octave FBM for organic variation
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 3; i++) {
      v += a * noise(p);
      p  = p * 2.1 + vec2(5.2, 1.3);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv   = gl_FragCoord.xy / u_res;
    float asp = u_res.x / u_res.y;

    // Source sits ABOVE the top of the viewport (WebGL y=1 is top).
    // This means the entire top edge of the canvas is inside the bright zone —
    // gradient "flows down" from the top rather than looking like a centred blob.
    vec2 c = (uv - vec2(0.5, 1.15)) * vec2(asp * 0.85, 1.0);

    // Swirl: 58
    float r   = length(c);
    float ang = atan(c.y, c.x) + 0.58 * exp(-r * 2.5);
    vec2 sw   = r * vec2(cos(ang), sin(ang));

    // Very slow drift (speed: 30)
    float t = u_time * 0.012;

    // FBM noise — drives the organic variation the user asked for
    float n = fbm(sw * 2.2 + vec2(t * 0.22, t * 0.14))        // low freq shape
            + fbm(sw * 4.5 - vec2(t * 0.13, t * 0.27)) * 0.4; // high freq detail

    // Wide radial falloff — fills full viewport width from above-top source
    float glow = 1.0 - smoothstep(0.0, asp * 0.80, r);
    glow = pow(glow, 0.55);

    // Height fade: strong at top (uv.y = 1), weak at bottom (uv.y = 0)
    // Uses a gentle power curve so the upper 50 % stays bright
    float heightFade = pow(uv.y, 0.4);
    glow *= mix(0.2, 1.0, heightFade);

    // Modulate with FBM for texture/variation
    glow *= 0.55 + n * 0.45;

    glow = clamp(glow, 0.0, 1.0);

    vec3 purple = vec3(0.486, 0.227, 0.929); // #7C3AED
    vec3 bg     = vec3(0.039, 0.039, 0.039); // #0a0a0a

    gl_FragColor = vec4(mix(bg, purple, glow), 1.0);
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

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener('resize', resize);
    resize();

    // Scroll-driven fade: fully visible at 0, gone by 100 vh of scroll.
    // Starts fading at 70 vh so it's a gradual disappearance, not a snap.
    const onScroll = () => {
      const fraction = window.scrollY / window.innerHeight;
      const fadeStart = 0.7;
      const opacity = fraction < fadeStart ? 1 : Math.max(0, 1 - (fraction - fadeStart) / (1 - fadeStart));
      canvas.style.opacity = String(opacity);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // apply immediately in case page loaded mid-scroll

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
      window.removeEventListener('scroll', onScroll);
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
        // Soft bottom fade within the canvas itself — scroll listener handles
        // the full disappearance as the user scrolls into the content.
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 40%, rgba(0,0,0,0.6) 70%, transparent 92%)',
        maskImage: 'linear-gradient(to bottom, black 0%, black 40%, rgba(0,0,0,0.6) 70%, transparent 92%)',
      }}
    />
  );
}
