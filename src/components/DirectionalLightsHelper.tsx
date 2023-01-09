import { useState } from "react";
import { useRecoilState } from "recoil";
import { directionLightsCordsState } from "../state";

export default function DirectionalLightsHelper() {
  const [lCords, setLCords] = useRecoilState(directionLightsCordsState);

  return (
    <div>
      <p>Directional Light Helper</p>
      <input
        type="range"
        className="input input-range"
        min={1}
        max={100}
        value={lCords.x}
        onChange={(e) =>
          setLCords((prev) => ({ ...prev, x: Number(e.target.value) }))
        }
      />
      <input
        type="range"
        className="input input-range"
        min={1}
        max={100}
        value={lCords.y}
        onChange={(e) =>
          setLCords((prev) => ({ ...prev, y: Number(e.target.value) }))
        }
      />
      <input
        type="range"
        className="input input-range"
        min={1}
        max={100}
        value={lCords.z}
        onChange={(e) =>
          setLCords((prev) => ({ ...prev, z: Number(e.target.value) }))
        }
      />
    </div>
  );
}
