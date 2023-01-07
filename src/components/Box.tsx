import { useBox } from "@react-three/cannon";
import { ThreeEvent } from "@react-three/fiber";

interface Props {
  x: number;
  y: number;
  z: number;
  onClick: ((event: ThreeEvent<MouseEvent>) => void) | undefined;
  color: string;
}

export default function Box(props: Props) {
  const [ref] = useBox(() => ({
    mass: 4,
    position: [props.x, props.y, props.z],
    // position: [Math.random() * 10, 20, 1],
    // position: [Math.random(), 10, Math.random()],
    // position: [1, 10, 1],
    // ...props,
  }));

  return (
    <mesh ref={ref as any} onClick={props.onClick}>
      <boxGeometry />
      <meshStandardMaterial color={props.color} />
    </mesh>
  );
}
