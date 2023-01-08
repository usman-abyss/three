import { useBox } from "@react-three/cannon";
import { ThreeEvent } from "@react-three/fiber";
import { Cordinate } from "../types";

interface Props {
  cords: Cordinate;
  onClick: ((event: ThreeEvent<MouseEvent>) => void) | undefined;
  color: string;
}

export default function Box({ onClick, color, cords: { x, y, z } }: Props) {
  const [ref] = useBox(() => ({
    mass: 4,
    position: [x, y, z],
    // position: [Math.random() * 10, 20, 1],
    // position: [Math.random(), 10, Math.random()],
    // position: [1, 10, 1],
    // ...props,
  }));

  return (
    <mesh ref={ref as any} onClick={onClick}>
      <boxGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
