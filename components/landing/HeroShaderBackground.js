"use client";

import { useEffect, useRef } from "react";
import { Box } from "@mui/material";

const vertexShaderSource = `
attribute vec2 a_position;
varying vec2 v_texCoord;

void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 v_texCoord;

#define BRAND_BLUE vec3(0.0, 0.45, 0.8)
#define BRAND_RED vec3(0.87, 0.05, 0.07)
#define DEEP_NAVY vec3(0.02, 0.05, 0.1)

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

void main() {
  vec2 uv = v_texCoord;
  float time = u_time * 0.2;
  vec2 mouse = u_mouse / u_resolution;

  vec2 gridUv = uv * 40.0;
  float grid = smoothstep(0.02, 0.0, abs(fract(gridUv.x - 0.5) - 0.5)) +
               smoothstep(0.02, 0.0, abs(fract(gridUv.y - 0.5) - 0.5));

  float flow = 0.0;
  for (float i = 1.0; i < 4.0; i++) {
    float speed = 1.0 + i * 0.3;
    float y = sin(uv.x * (2.0 + i) + time * speed) * 0.15 + 0.5;
    flow += smoothstep(0.08, 0.0, abs(uv.y - y)) * (0.4 / i);
  }

  float dist = distance(uv, mouse);
  float glow = smoothstep(0.3, 0.0, dist) * 0.2;

  float n = noise(uv * 15.0 + time);
  float particles = smoothstep(0.98, 1.0, n);

  vec3 color = DEEP_NAVY;
  color = mix(color, BRAND_BLUE, grid * 0.05);
  color = mix(color, BRAND_BLUE, flow * 0.3);
  color += BRAND_BLUE * glow;
  color = mix(color, BRAND_RED, particles * 0.2);

  float vignette = smoothstep(1.5, 0.5, length(uv - 0.5));
  color *= vignette;

  gl_FragColor = vec4(color, 1.0);
}
`;

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

export default function HeroShaderBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return undefined;

    const syncSize = () => {
      const width = canvas.clientWidth || 1280;
      const height = canvas.clientHeight || 720;

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => syncSize())
        : null;

    if (resizeObserver) {
      resizeObserver.observe(canvas);
    }

    syncSize();

    const program = gl.createProgram();
    gl.attachShader(program, compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource));
    gl.attachShader(program, compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, "u_time");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const mouseLocation = gl.getUniformLocation(program, "u_mouse");

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let frameId = 0;

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const normalizedX = (event.clientX - rect.left) / rect.width;
      const normalizedY = 1 - (event.clientY - rect.top) / rect.height;

      mouseX = normalizedX * canvas.width;
      mouseY = normalizedY * canvas.height;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const render = (time) => {
      if (!resizeObserver) {
        syncSize();
      }

      gl.viewport(0, 0, canvas.width, canvas.height);

      if (timeLocation) {
        gl.uniform1f(timeLocation, time * 0.001);
      }

      if (resolutionLocation) {
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      }

      if (mouseLocation) {
        gl.uniform2f(mouseLocation, mouseX, mouseY);
      }

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }

      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <Box
      component="canvas"
      ref={canvasRef}
      sx={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}
