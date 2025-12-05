declare module "three/webgpu" {
  export * from "three";

  export class PostProcessing {
    constructor(renderer: any);
    outputNode: any;
    renderAsync(): Promise<void>;
  }

  export class MeshBasicNodeMaterial extends import("three").MeshBasicMaterial {
    constructor(parameters?: any);
    colorNode: any;
  }

  export class WebGPURenderer extends import("three").WebGLRenderer {
    constructor(parameters?: any);
    init(): Promise<void>;
  }
}

declare module "three/tsl" {
  export * from "three/examples/jsm/nodes/Nodes";

  export const abs: any;
  export const blendScreen: any;
  export const float: any;
  export const mod: any;
  export const mx_cell_noise_float: any;
  export const oneMinus: any;
  export const smoothstep: any;
  export const texture: any;
  export const uniform: any;
  export const uv: any;
  export const vec2: any;
  export const vec3: any;
  export const pass: any;
  export const mix: any;
  export const add: any;
  export const step: any;
}

declare module "three/examples/jsm/tsl/display/BloomNode.js" {
  export const bloom: any;
}
