import {
  Engine,
  Scene,
  ArcRotateCamera,
  HemisphericLight,
  DirectionalLight,
  Vector3,
  Color3,
  Color4,
  MeshBuilder,
  StandardMaterial,
  SceneLoader,
} from "@babylonjs/core";

// Side-effect import: registers the GLB/GLTF loader plugin.
// Without this, ImportMeshAsync silently fails on .glb files.
import "@babylonjs/loaders/glTF";

// ─── TUNING CONSTANTS ──────────────────────────────────────────────────────────
// Adjust these to calibrate scale and placement without touching load logic.

const ENVIRO_SCALE    = 1.0;
const ENVIRO_POSITION = new Vector3(0, 0, 0);

const WARRIOR_SCALE    = 1.0;
const WARRIOR_POSITION = new Vector3(0, 0, 0);

// Camera starting position: alpha (horizontal), beta (vertical), radius (distance)
const CAM_ALPHA  = -Math.PI / 2;
const CAM_BETA   =  Math.PI / 3.5;
const CAM_RADIUS = 10;
const CAM_TARGET = Vector3.Zero();

// ──────────────────────────────────────────────────────────────────────────────

export function createScene(engine: Engine, canvas: HTMLCanvasElement): Scene {
  const scene = new Scene(engine);
  scene.clearColor = new Color4(0.06, 0.06, 0.09, 1);

  // ─── CAMERA ────────────────────────────────────────────────────────────────
  const camera = new ArcRotateCamera(
    "camera",
    CAM_ALPHA,
    CAM_BETA,
    CAM_RADIUS,
    CAM_TARGET,
    scene
  );
  camera.attachControl(canvas, true);
  camera.lowerRadiusLimit = 1;
  camera.upperRadiusLimit = 30;
  camera.wheelPrecision = 50; // slower scroll zoom — adjust as needed

  // ─── LIGHTS ────────────────────────────────────────────────────────────────
  const ambient = new HemisphericLight("ambient", new Vector3(0, 1, 0), scene);
  ambient.intensity = 0.5;
  ambient.groundColor = new Color3(0.1, 0.1, 0.15);

  const directional = new DirectionalLight("dir", new Vector3(-1, -2, -1), scene);
  directional.intensity = 0.8;

  // ─── ROOM (placeholder geometry) ───────────────────────────────────────────
  // Replace or remove once enviroTest.glb provides the room geometry.
  const ground = MeshBuilder.CreateGround(
    "ground",
    { width: 20, height: 20, subdivisions: 1 },
    scene
  );
  const groundMat = new StandardMaterial("groundMat", scene);
  groundMat.diffuseColor = new Color3(0.2, 0.2, 0.25);
  groundMat.specularColor = Color3.Black();
  ground.material = groundMat;

  // ─── ASSET LOADING ─────────────────────────────────────────────────────────
  // import.meta.env.BASE_URL = "/PJO/" in production, "/" in dev.
  // This is the correct cross-environment way to reference public/ assets with Vite.
  const assetBase = import.meta.env.BASE_URL + "assets/";

  // enviroTest.glb — environment/room mesh
  SceneLoader.ImportMeshAsync("", assetBase, "enviroTest.glb", scene)
    .then((result) => {
      // result.meshes[0] is always __root__ for GLB imports.
      // Scaling __root__ scales the entire model hierarchy.
      const root = result.meshes[0];
      root.scaling.setAll(ENVIRO_SCALE);
      root.position = ENVIRO_POSITION.clone();
      console.log(`[enviroTest] OK — ${result.meshes.length} mesh(es)`);
    })
    .catch((err: unknown) => {
      console.error("[enviroTest] FAILED:", err);
    });

  // warriorTest.glb — character mesh
  SceneLoader.ImportMeshAsync("", assetBase, "warriorTest.glb", scene)
    .then((result) => {
      const root = result.meshes[0];
      root.scaling.setAll(WARRIOR_SCALE);
      root.position = WARRIOR_POSITION.clone();
      console.log(`[warriorTest] OK — ${result.meshes.length} mesh(es)`);
    })
    .catch((err: unknown) => {
      console.error("[warriorTest] FAILED:", err);
    });

  return scene;
}
