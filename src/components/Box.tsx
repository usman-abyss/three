import { useBox } from "@react-three/cannon";
import { useRecoilState } from "recoil";
import { boxesState } from "../state";
import { Color } from "three";
import { IBox } from "../types";

interface Props {
  box: IBox;
}

export default function Box({
  box: {
    id: boxId,
    color,
    cords: { x, y, z },
  },
}: Props) {
  const [, setBoxes] = useRecoilState(boxesState);

  const [ref] = useBox(() => ({
    mass: 4,
    position: [x, y, z],
    // position: [Math.random() * 10, 20, 1],
    // position: [Math.random(), 10, Math.random()],
    // position: [1, 10, 1],
    // ...props,
  }));

  return (
    <mesh
      ref={ref as any}
      onClick={() => {
        setBoxes((prev) => prev.filter((e) => e.id !== boxId));
      }}
    >
      <boxGeometry />
      <meshStandardMaterial color={new Color(color)} />
    </mesh>
  );
}
