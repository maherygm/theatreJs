import { OrbitControls, ScrollControls, useScroll } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React from "react";
import FantasyBook from "../modelComponents/FantasyBook";

import { getProject, val } from "@theatre/core";
import {
  SheetProvider,
  PerspectiveCamera,
  useCurrentSheet,
} from "@theatre/r3f";

import flyThroughState from "../fly2.json";

const MyScenne = () => {
  const sheet = getProject("Fly Through 2", { state: flyThroughState }).sheet(
    "Scene"
  );
  return (
    <Canvas gl={{ preserveDrawingBuffer: true }}>
      <ScrollControls pages={5} damping={1} maxSpeed={1}>
        <SheetProvider sheet={sheet}>
          <Scene />
        </SheetProvider>
      </ScrollControls>
    </Canvas>
  );
};

export default MyScenne;

//
//

function Scene(parameters) {
  const sheet = useCurrentSheet();
  const scroll = useScroll();

  useFrame(() => {
    ///the length of our sequence
    const sequenceLength = val(sheet.sequence.pointer.length);

    //update the position of theplayhead in the sequence as a fraction of its whole length
    sheet.sequence.position = scroll.offset * sequenceLength;
  });
  return (
    <>
      <color attach="background" args={["black"]} />

      <ambientLight />
      <FantasyBook />
      <PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        position={[0, 0, 0]}
        fov={90}
        near={0.1}
        far={70}
      />
    </>
  );
}
