import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import Box from "./components/Box";
import Plane from "./components/Plane";
import { getRandomUUID } from "./utils/crypto";
import { useRecoilState } from "recoil";
import { boxesState, directionLightsCordsState } from "./state";
import { delay, getRandomColor } from "./utils";
import DirectionalLightsHelper from "./components/DirectionalLightsHelper";

export default function App() {
  const HEIGHT_INIT = 0.4;
  const DEPTH_INIT = 7;
  const DELAY_DUR = 100;

  const [loading, setLoading] = useState(false);

  const [depth, setDepth] = useState(DEPTH_INIT);
  const [depthCopy, setDepthCopy] = useState(DEPTH_INIT);

  const [boxes, setBoxes] = useRecoilState(boxesState);
  const [lCords] = useRecoilState(directionLightsCordsState);

  const [step, setStep] = useState(0);

  const boom = async () => {
    setLoading(true);
    for (let i = step; i < depthCopy - step; i++) {
      for (let j = step; j < depthCopy - step; j++) {
        createNewBox(i, j);
      }
      // await delay(DELAY_DUR);
    }
    setDepth((prev) => prev - 2);
    setStep((prev) => prev + 1);
    setLoading(false);
  };

  const clearBoxes = () => {
    setBoxes([]);
    setDepth(DEPTH_INIT);
    setDepthCopy(DEPTH_INIT);
    setStep(0);
  };

  const createNewBox = (x: number, z: number) => {
    setBoxes((prev) => [
      ...prev,
      {
        id: getRandomUUID(),
        color: getRandomColor(),
        cords: {
          x,
          z,
          y: HEIGHT_INIT + step,
        },
      },
    ]);
  };

  return (
    <>
      <h1 className="text-7xl text-center">Pyramid Creator</h1>
      <div className="flex justify-center gap-5">
        <div className="my-5 space-x-2 pl-5">
          <button className="btn btn-primary" disabled={loading} onClick={boom}>
            Create Pyramid
          </button>
          <button
            className="btn btn-primary"
            disabled={loading}
            onClick={clearBoxes}
          >
            Clear
          </button>

          <input
            type="number"
            min={0}
            max={115}
            step={2}
            value={depth}
            onChange={(e) => {
              const val = Number(e.target.value);
              setDepth(val);
              setDepthCopy(val);
              setStep(0);
              setBoxes([]);
            }}
            className="input input-primary"
          />
          <p>Number of boxes: {boxes.length}</p>
        </div>
        <DirectionalLightsHelper />
      </div>

      <Canvas
        style={{
          height: "89vh",
          backgroundColor: "gray",
        }}
        camera={{
          position: [11.72, 7.5, 3.7],
        }}
      >
        <ambientLight intensity={0.1} />
        <directionalLight
          position={[lCords.x, lCords.y, lCords.z]}
          intensity={1}
        />
        <Physics>
          <Plane />
          {boxes.map((box, i) => (
            <Box key={box.id} box={box} />
          ))}
          <OrbitControls />
        </Physics>
      </Canvas>
    </>
  );
}
