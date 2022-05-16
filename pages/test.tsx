import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import CountUp from 'react-countup';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* eslint-disable */

function Stars(props) {
  const ref = useRef(null);
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.5 })
  );
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#ffa0e0"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function Box(props: JSX.IntrinsicElements['mesh']) {
  // This reference will give us direct access to the THREE.Mesh object
  const ref = useRef<THREE.Mesh>(null!);
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame((state, delta) => (ref.current.rotation.x += 0.01));

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

const Test = () => {
  const circulatingSupplyRef = useRef(0);
  const [circulatingSupply, setCirculatingSupply] = useState(0);
  const [totalSupplyFetch, setTotalSupplyFetch] = useState(0);
  useEffect(() => {
    const circulatingSupplyFetch = async () => {
      const res = await axios.get(
        'http://localhost:5000/api/terra/circulatingSupply'
      );

      setCirculatingSupply(res.data.data);
    };
    const totalSupplyFetch = async () => {
      const res = await axios.get(
        'http://localhost:5000/api/terra/totalSupply'
      );

      setTotalSupplyFetch(res.data.data);
    };
    circulatingSupplyFetch();
    totalSupplyFetch();
  }, []);

  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <>
      <div id="canvas-container">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Stars />
        </Canvas>
      </div>
      <CountUp
        start={0}
        end={circulatingSupply}
        duration={2.75}
        separator=","
        decimals={4}
        decimal="."
        prefix=""
        suffix=""
        onEnd={() => console.log('Ended! 👏')}
        onStart={() => console.log('Started! 💨')}
      >
        {({ countUpRef, start }) => (
          <div>
            <span ref={countUpRef} />
          </div>
        )}
      </CountUp>
      <CountUp
        start={0}
        end={totalSupplyFetch}
        duration={2.75}
        separator=","
        decimals={4}
        decimal="."
        prefix=""
        suffix=""
        onEnd={() => console.log('Ended! 👏')}
        onStart={() => console.log('Started! 💨')}
      >
        {({ countUpRef, start }) => (
          <div>
            <span ref={countUpRef} />
          </div>
        )}
      </CountUp>
    </>
  );
};
export default Test;
