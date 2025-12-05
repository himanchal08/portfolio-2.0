"use client";

import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useAspect, useTexture } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three/webgpu";
import { bloom } from "three/examples/jsm/tsl/display/BloomNode.js";
import { Mesh, Points, Color } from "three";

import {
  abs,
  blendScreen,
  float,
  mod,
  mx_cell_noise_float,
  oneMinus,
  smoothstep,
  texture,
  uniform,
  uv,
  vec2,
  vec3,
  pass,
} from "three/tsl";

const TEXTUREMAP = { src: "/textures/img-4.png" };
const DEPTHMAP = { src: "/textures/raw-4.webp" };

extend(THREE as any);

// Post Processing component
export const PostProcessing = ({
  strength = 1,
  threshold = 1,
  fullScreenEffect = true,
}: {
  strength?: number;
  threshold?: number;
  fullScreenEffect?: boolean;
}) => {
  const { gl, scene, camera } = useThree();
  const progressRef = useRef({ value: 0 });

  const render = useMemo(() => {
    const postProcessing = new THREE.PostProcessing(gl as any);
    const scenePass = pass(scene, camera);
    const scenePassColor = scenePass.getTextureNode("output");
    const bloomPass = bloom(scenePassColor, strength, 0.5, threshold);

    // Add bloom effect
    const final = scenePassColor.add(bloomPass);

    postProcessing.outputNode = final;

    return postProcessing;
  }, [camera, gl, scene, strength, threshold, fullScreenEffect]);

  useFrame(({ clock }) => {
    render.renderAsync();
  }, 1);

  return null;
};

const WIDTH = 300;
const HEIGHT = 300;

export const Particles = () => {
  const count = 200;
  const mesh = useRef<Points>(null);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const color = new Color();

    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Gradient generation: Blue to Cyan/Purple
      const hue = 0.55 + Math.random() * 0.15; // 0.55 to 0.70 (Cyan-Blue-Purpleish)
      color.setHSL(hue, 0.9, 0.6);

      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }
    return { positions: pos, colors: cols };
  }, []);

  useFrame(({ clock, pointer }) => {
    if (mesh.current) {
      mesh.current.rotation.y = clock.getElapsedTime() * 0.05;
      mesh.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;

      mesh.current.rotation.x += pointer.y * 0.05;
      mesh.current.rotation.y += pointer.x * 0.05;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
export const Blob = () => {
  const [rawMap, depthMap] = useTexture([TEXTUREMAP.src, DEPTHMAP.src]);

  const meshRef = useRef<Mesh>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (rawMap && depthMap) {
      setVisible(true);
    }
  }, [rawMap, depthMap]);

  const { material, uniforms } = useMemo(() => {
    const uPointer = uniform(new THREE.Vector2(0));
    const uProgress = uniform(0);

    const strength = 0.01;

    const tDepthMap = texture(depthMap);

    const tMap = texture(
      rawMap,
      uv().add(tDepthMap.r.mul(uPointer).mul(strength))
    );

    const aspect = float(WIDTH).div(HEIGHT);
    const tUv = vec2(uv().x.mul(aspect), uv().y);

    const tiling = vec2(120.0);
    const tiledUv = mod(tUv.mul(tiling), 2.0).sub(1.0);

    const brightness = mx_cell_noise_float(tUv.mul(tiling).div(2));

    const dist = float(tiledUv.length());
    const dot = float(smoothstep(0.5, 0.49, dist)).mul(brightness);

    const depth = tDepthMap.r;

    const flow = oneMinus(smoothstep(0, 0.05, abs(depth.sub(uProgress))));

    const bgMask = tMap.a;
    const mask = dot.mul(flow).mul(vec3(0, 0, 1)).mul(bgMask).mul(15.0);

    const final = blendScreen(tMap, mask);

    const material = new THREE.MeshBasicNodeMaterial({
      colorNode: final,
      transparent: true,
      opacity: 0,
    });

    return {
      material,
      uniforms: {
        uPointer,
        uProgress,
      },
    };
  }, [rawMap, depthMap]);

  const [w, h] = useAspect(WIDTH, HEIGHT);

  useFrame(({ clock }) => {
    uniforms.uProgress.value =
      Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5;

    if (
      meshRef.current &&
      "material" in meshRef.current &&
      meshRef.current.material
    ) {
      const mat = meshRef.current.material as any;
      if ("opacity" in mat) {
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, visible ? 1 : 0, 0.07);
      }
    }
  });

  useFrame(({ pointer }) => {
    uniforms.uPointer.value = pointer;
  });

  const scaleFactor = 0.4;
  return (
    <mesh
      ref={meshRef}
      scale={[w * scaleFactor, h * scaleFactor, 1]}
      material={material as any}
    >
      <planeGeometry />
    </mesh>
  );
};

export const SentientSphere = () => {
  return (
    <div className="h-svh">
      <Canvas
        flat
        gl={
          (async (props: any) => {
            const renderer = new THREE.WebGPURenderer(props as any);
            await renderer.init();
            return renderer;
          }) as any
        }
      >
        <PostProcessing fullScreenEffect={true} />
        <Blob />
        <Particles />
      </Canvas>
    </div>
  );
};

export default SentientSphere;
