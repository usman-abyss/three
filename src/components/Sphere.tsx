import { useBox, useSphere } from "@react-three/cannon";

export default function Sphere(props: any) {
  const [ref] = useSphere(() => ({
    mass: 4,
    position: [Math.random(), 10, Math.random()],
  }));

  return (
    <mesh ref={ref as any} onClick={props.onClick}>
      <sphereGeometry />
      <meshStandardMaterial color={props.color} />
    </mesh>
  );
}
