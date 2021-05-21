import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, ContactShadows, Environment } from '@react-three/drei'
import { proxy, useSnapshot } from 'valtio'
import { HexColorPicker } from 'react-colorful'
import Header from './Header.js'

const state = proxy({
  current: null,
  items: {
    Body: '#1a1917',
    TuningKeys: '#ff0000',
    PickGuard001: '#ff0000',
    PickGuardScrews001: '#ff0000',
    NeckWood001: '#FFFFFF',
    Bridge001: '#ff0000',
    TuningKeys: '#fff700'
  }
})

function Guitar(props) {
  const group = useRef()
  const snap = useSnapshot(state)
  const { nodes, materials } = useGLTF('/telecaster.glb')
  const [hovered, set] = useState(null)

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      onPointerOver={(e) => {
        e.stopPropagation(), set(e.object.material.name)
      }}
      onPointerOut={(e) => {
        e.intersections.length === 0 && set(null)
      }}
      onPointerDown={(e) => {
        e.stopPropagation()
        state.current = e.object.material.name
      }}
      onPointerMissed={(e) => {
        state.current = null
      }}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh castShadow receiveShadow material-color={snap.items.Body} geometry={nodes.Body.geometry} material={materials.Body} />
        <mesh
          castShadow
          receiveShadow
          material-color={snap.items.PickGuard001}
          geometry={nodes.PickGuard001.geometry}
          material={materials.PickGuard}
        />
        <mesh
          castShadow
          receiveShadow
          material-color={snap.items.PickGuardScrews001}
          geometry={nodes.PickGuardScrews001.PickGuard001}
          material={materials.PickGuardScrews}
        />
        <mesh castShadow receiveShadow geometry={nodes.defaultMaterial004.geometry} material={materials.material} />
        <mesh
          castShadow
          receiveShadow
          material-color={snap.items.NeckWood001}
          geometry={nodes.NeckWood001.geometry}
          material={materials.NeckWood}
        />
        <mesh castShadow receiveShadow geometry={nodes.defaultMaterial007.geometry} material={materials.Strings} />
        <mesh castShadow receiveShadow geometry={nodes.defaultMaterial008.geometry} material={materials.lambert1} />
        <mesh
          castShadow
          receiveShadow
          material-color={snap.items.Bridge001}
          geometry={nodes.Bridge001.geometry}
          material={materials.Bridge}
        />
        <mesh castShadow receiveShadow geometry={nodes.StrapStuds.geometry} material={materials.StrapStuds} />
        <mesh
          castShadow
          receiveShadow
          material-color={snap.items.TuningKeys}
          geometry={nodes.TuningKeys.geometry}
          material={materials.TuningKeys}
        />
      </group>
    </group>
  )
}

function Picker() {
  const snap = useSnapshot(state)
  return (
    <div>
      <HexColorPicker className="picker" color={snap.items[snap.current]} onChange={(color) => (state.items[snap.current] = color)} />
      <h1>{snap.current}</h1>
    </div>
  )
}

export default function App() {
  return (
    <>
      <Picker />
      <Header />
      <Canvas pixelRatio={2.0}>
        <ambientLight intensity={0.6} />
        <spotLight intensity={0.4} position={[5, 20, 20]} />
        <Suspense fallback={null}>
          <Guitar />
          <ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={10} height={10} blur={2} far={1} />
          <Environment files="royal_esplanade_1k.hdr" />
        </Suspense>
        <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false} />
      </Canvas>
    </>
  )
}
