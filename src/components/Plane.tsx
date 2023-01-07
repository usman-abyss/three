import { usePlane } from "@react-three/cannon";
import { DoubleSide } from "three";

export default function Plane(props: any) {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));
  return (
    <mesh ref={ref as any}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial side={DoubleSide} color="lightblue" />
    </mesh>
  );
}
