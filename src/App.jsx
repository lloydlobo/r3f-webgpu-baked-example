import {Suspense, useState} from "react"

import * as THREE from "three/webgpu"
import {Canvas, extend} from "@react-three/fiber"
import {Loader} from "@react-three/drei"
import {WebGPURenderer} from "three/webgpu"

import {Experience} from "./components/Experience"

function App() {
    const [frameloop, setFrameloop] = useState("never")
    return (
        <>
            <Loader/>
            <Canvas
                shadows
                camera={{position: [3, 3, 3], fov: 30}}
                frameloop={frameloop}
                gl={(props) => {
                    extend(THREE);
                    const renderer = new WebGPURenderer({
                        ...props,
                        powerPreference: "high-performance",
                        antialias: true,
                        alpha: false,
                        stencil: false,
                        shadowMap: true,
                    })
                    renderer.init().then(() => {
                        setFrameloop("always")
                    })
                    return renderer
                }}
            >
                <color attach="background" args={["#111"]}/>
                <Suspense>
                    <Experience/>
                </Suspense>
            </Canvas>
        </>
    )
}

export default App
