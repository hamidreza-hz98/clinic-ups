"use client";

import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const vertexShader = `
  attribute vec2 a_position;
  varying vec2 v_uv;

  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_light_mode;
  varying vec2 v_uv;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  void main() {
    vec2 uv = v_uv;
    vec2 aspect = vec2(u_resolution.x / max(u_resolution.y, 1.0), 1.0);
    vec2 mouse = u_mouse / max(u_resolution, vec2(1.0));
    vec2 center = mix(vec2(0.5), mouse, 0.12);
    float distanceFromCenter = length((uv - center) * aspect);
    float angle = atan(uv.y - center.y, uv.x - center.x);
    float energy = 0.0;

    for (float i = 0.0; i < 5.0; i++) {
      vec2 point = vec2(0.5) + 0.3 * vec2(
        cos(u_time * 0.2 + i * 1.2),
        sin(u_time * 0.3 + i * 0.8)
      );
      float pointDistance = length((uv - point) * aspect);
      energy += 0.002 / (pointDistance * pointDistance + 0.001);
    }

    float flow = sin(angle * 5.0 + u_time + distanceFromCenter * 10.0) * 0.5 + 0.5;
    flow *= exp(-distanceFromCenter * 2.8);

    vec2 gridUv = uv * vec2(42.0, 26.0);
    vec2 gridLine = abs(fract(gridUv) - 0.5);
    float grid = smoothstep(0.46, 0.5, max(gridLine.x, gridLine.y));
    grid *= 0.035 * smoothstep(1.1, 0.15, distanceFromCenter);

    vec3 colorDark = vec3(0.016, 0.027, 0.043);
    vec3 colorBlue = vec3(0.004, 0.255, 0.494);
    vec3 colorCyan = vec3(0.0, 0.86, 0.91);
    vec3 darkFinal = mix(colorDark, colorBlue, flow * 0.18 + energy * 0.08);
    darkFinal += colorCyan * grid;
    darkFinal += hash(uv + u_time * 0.01) * 0.018;

    vec3 colorMilk = vec3(0.969, 0.953, 0.918);
    vec3 colorLogoBlue = vec3(0.004, 0.255, 0.494);
    vec3 colorLogoRed = vec3(0.871, 0.051, 0.067);
    vec3 lightFinal = mix(colorMilk, colorLogoBlue, flow * 0.055 + energy * 0.018);
    lightFinal += colorLogoBlue * grid * 0.65;
    lightFinal += colorLogoRed * energy * 0.006;
    lightFinal += hash(uv + u_time * 0.01) * 0.008;
    lightFinal = mix(lightFinal, vec3(1.0), 0.15);

    float edgeFade = smoothstep(1.05, 0.25, distanceFromCenter);
    darkFinal = mix(colorDark, darkFinal, 0.42 + edgeFade * 0.58);
    lightFinal = mix(colorMilk, lightFinal, 0.5 + edgeFade * 0.5);
    vec3 finalColor = mix(darkFinal, lightFinal, u_light_mode);
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function EnergyShaderBackground() {
  const canvasRef = useRef(null);
  const theme = useTheme();
  const lightMode = theme.palette.mode === "light";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const gl = canvas.getContext("webgl", { alpha: false, antialias: false });
    if (!gl) return undefined;

    const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexShader);
    const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
    if (!vertex || !fragment) return undefined;

    const program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      return undefined;
    }

    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const timeUniform = gl.getUniformLocation(program, "u_time");
    const resolutionUniform = gl.getUniformLocation(program, "u_resolution");
    const mouseUniform = gl.getUniformLocation(program, "u_mouse");
    const lightModeUniform = gl.getUniformLocation(program, "u_light_mode");
    const mouse = { x: 0, y: 0 };
    let frameId = 0;
    let stopped = false;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.floor(canvas.clientWidth * ratio));
      const height = Math.max(1, Math.floor(canvas.clientHeight * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      if (!mouse.x && !mouse.y) {
        mouse.x = width / 2;
        mouse.y = height / 2;
      }
    };

    const handlePointerMove = (event) => {
      const bounds = canvas.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      mouse.x = ((event.clientX - bounds.left) / bounds.width) * canvas.width;
      mouse.y = (1 - (event.clientY - bounds.top) / bounds.height) * canvas.height;
    };

    const render = (timestamp = 0) => {
      if (stopped) return;
      resize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(timeUniform, timestamp * 0.001);
      gl.uniform2f(resolutionUniform, canvas.width, canvas.height);
      gl.uniform2f(mouseUniform, mouse.x, mouse.y);
      gl.uniform1f(lightModeUniform, lightMode ? 1 : 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    render();

    return () => {
      stopped = true;
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, [lightMode]);

  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        bgcolor: "background.default",
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: (activeTheme) => activeTheme.palette.mode === "light"
            ? "linear-gradient(180deg, rgba(247,243,234,.04), rgba(247,243,234,.22) 56%, #F7F3EA 100%)"
            : "linear-gradient(180deg, rgba(4,7,11,.12), rgba(4,7,11,.56) 56%, var(--landing-bg) 100%)",
        },
      }}
    >
      <Box component="canvas" ref={canvasRef} sx={{ width: "100%", height: "100%", display: "block" }} />
    </Box>
  );
}
