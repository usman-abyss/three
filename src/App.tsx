import { Physics } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import Box from "./components/Box";
import Plane from "./components/Plane";
import { getRandomUUID } from "./utils/crypto";
import { useRecoilState, useRecoilValue } from "recoil";
import { boxesState } from "./state";
import { delay, getRandomColor } from "./utils";
import { Cordinate } from "./types";

export default function App() {
  const HEIGHT_INIT = 0.4;
  const DEPTH_INIT = 7;
  const DELAY_DUR = 100;

  const [loading, setLoading] = useState(false);

  const [depth, setDepth] = useState(DEPTH_INIT);
  const [depthCopy, setDepthCopy] = useState(DEPTH_INIT);

  const [boxes, setBoxes] = useRecoilState(boxesState);

  const [step, setStep] = useState(0);

  const boom = async () => {
    setLoading(true);
    for (let i = step; i < depthCopy - step; i++) {
      for (let j = step; j < depthCopy - step; j++) {
        createNewBox(i, j);
      }
      await delay(DELAY_DUR);
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
      <div className="my-5 space-x-2 pl-5">
        <button className="btn btn-primary" disabled={loading} onClick={boom}>
          BOOM
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
      <Canvas
        style={{
          height: "89vh",
          backgroundColor: "gray",
        }}
        camera={{
          position: [1, 1, 12],
        }}
      >
        <ambientLight intensity={0.5} />
        <Physics>
          <Plane />
          {boxes.map((box, i) => (
            <Box
              key={box.id}
              color={box.color}
              onClick={() => {
                setBoxes((prev) => prev.filter((e) => e.id !== box.id));
              }}
              cords={box.cords}
            />
          ))}
          <OrbitControls />
        </Physics>
      </Canvas>
    </>
  );
}
