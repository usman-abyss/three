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
  const CORD_STEP = 1.05;
  const HEIGHT = 2;
  const DELAY_DUR = 200;
  const DEPTH_INIT = 5;

  const [loading, setLoading] = useState(false);

  const [depth, setDepth] = useState(DEPTH_INIT);

  const [cords, setCords] = useState<Cordinate>({
    x: CORD_STEP,
    z: CORD_STEP,
    y: HEIGHT,
  });

  const [boxes, setBoxes] = useRecoilState(boxesState);

  const calculateCords = (c: Cordinate, _depth: number): Cordinate => {
    const offset = DEPTH_INIT - Math.sqrt(_depth);
    const limit = Math.sqrt(_depth);
    const copy = { ...c };
    if (copy.z > limit) {
      copy.z = CORD_STEP;
      copy.x += CORD_STEP;
    } else copy.z += CORD_STEP;

    return copy;
  };

  const boom = async () => {
    // let i = 0;
    // setLoading(true);
    // const boomInterval = setInterval(() => {
    //   if (i === 99) {
    //     setLoading(false);
    //     clearInterval(boomInterval);
    //   }
    //   createNewBox();
    //   i++;
    // }, DELAY);
    setLoading(true);
    for (let i = 0; i < Math.pow(depth, 2); i++) {
      await delay(DELAY_DUR);
      createNewBox();
    }
    clearCords();
    setLoading(false);

    setDepth((prev) => prev - 2);
  };

  const clearCords = () => {
    setCords({
      x: CORD_STEP,
      z: CORD_STEP,
      y: HEIGHT,
    });
  };

  const clearBoxes = () => {
    setBoxes([]);
    clearCords();
    setDepth(DEPTH_INIT);
  };

  const createNewBox = () => {
    setBoxes((prev) => [
      ...prev,
      {
        id: getRandomUUID(),
        color: getRandomColor(),
      },
    ]);
    setCords((prev) => calculateCords(prev, Math.pow(depth, 2)));
  };

  const onlyEvens = () => {
    setBoxes((prev) => prev.filter((_, i) => i % 2 === 0));
  };

  return (
    <>
      <div className="my-5 space-x-2">
        <button
          className="btn btn-primary"
          disabled={loading}
          onClick={createNewBox}
        >
          Add Box
        </button>
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
        <button
          className="btn btn-primary"
          disabled={loading}
          onClick={onlyEvens}
        >
          Only Evens
        </button>
        <p>Number of boxes: {boxes.length}</p>
        <pre>{JSON.stringify(cords, null, 4)}</pre>
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
              x={cords.x}
              y={cords.y}
              z={cords.z}
            />
          ))}
          <OrbitControls />
        </Physics>
      </Canvas>
    </>
  );
}
