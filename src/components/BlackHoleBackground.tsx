import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 3000;

function BlackHoleParticles() {
  const points = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, velocities, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    const purple = new THREE.Color("hsl(260, 80%, 60%)");
    const blue = new THREE.Color("hsl(220, 80%, 55%)");
    const white = new THREE.Color("hsl(240, 60%, 85%)");

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const radius = 1.5 + Math.random() * 6;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 1.5 * (1 - (radius - 1.5) / 6);

      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = height;
      positions[i3 + 2] = Math.sin(angle) * radius;

      // Orbital velocity (tangential)
      const speed = (0.3 + Math.random() * 0.5) / Math.sqrt(radius);
      velocities[i3] = -Math.sin(angle) * speed;
      velocities[i3 + 1] = 0;
      velocities[i3 + 2] = Math.cos(angle) * speed;

      // Color gradient: purple near center, blue mid, white far
      const t = (radius - 1.5) / 6;
      const color = t < 0.5
        ? purple.clone().lerp(blue, t * 2)
        : blue.clone().lerp(white, (t - 0.5) * 2);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = 1.5 + Math.random() * 2.5;
    }

    return { positions, velocities, colors, sizes };
  }, []);

  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        },
        vertexShader: `
          attribute float aSize;
          attribute vec3 aColor;
          uniform float uTime;
          uniform float uPixelRatio;
          varying vec3 vColor;
          varying float vAlpha;
          
          void main() {
            vColor = aColor;
            vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
            float dist = length(position.xz);
            vAlpha = smoothstep(8.0, 3.0, dist) * 0.8;
            gl_PointSize = aSize * uPixelRatio * (80.0 / -mvPos.z);
            gl_Position = projectionMatrix * mvPos;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          varying float vAlpha;
          
          void main() {
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;
            float alpha = smoothstep(0.5, 0.1, d) * vAlpha;
            gl_FragColor = vec4(vColor, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  useFrame((_, delta) => {
    if (!points.current) return;
    const pos = points.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const x = pos[i3];
      const z = pos[i3 + 2];
      const radius = Math.sqrt(x * x + z * z);

      // Tangential orbital motion
      const angle = Math.atan2(z, x);
      const speed = (0.15 + 0.3 / Math.max(radius, 0.5)) * delta;
      const newAngle = angle + speed;

      // Slight inward pull
      const newRadius = radius - delta * 0.02;
      const clampedRadius = Math.max(newRadius, 1.2);

      pos[i3] = Math.cos(newAngle) * clampedRadius;
      pos[i3 + 2] = Math.sin(newAngle) * clampedRadius;

      // Reset particles that get too close
      if (clampedRadius <= 1.3) {
        const resetRadius = 5 + Math.random() * 3;
        const resetAngle = Math.random() * Math.PI * 2;
        pos[i3] = Math.cos(resetAngle) * resetRadius;
        pos[i3 + 1] = (Math.random() - 0.5) * 0.8;
        pos[i3 + 2] = Math.sin(resetAngle) * resetRadius;
      }
    }

    points.current.geometry.attributes.position.needsUpdate = true;
    shaderMaterial.uniforms.uTime.value += delta;
  });

  return (
    <points ref={points} material={shaderMaterial}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aColor" args={[colors, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
      </bufferGeometry>
    </points>
  );
}

function GlowCore() {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (mesh.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      mesh.current.scale.set(s, s, s);
    }
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshBasicMaterial color="black" />
    </mesh>
  );
}

const BlackHoleBackground = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 3, 8], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.1} />
        <GlowCore />
        <BlackHoleParticles />
      </Canvas>
    </div>
  );
};

export default BlackHoleBackground;
