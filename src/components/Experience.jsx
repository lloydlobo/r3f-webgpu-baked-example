// Source: https://www.youtube.com/watch?v=w2XvGYxQiOk
"use strict"

import {useEffect, useState} from "react"

import {CameraControls, Environment, Gltf, useGLTF} from "@react-three/drei"
import {useControls} from "leva"
import {useThree} from "@react-three/fiber"
import {degToRad} from "three/src/math/MathUtils.js"
import {Html} from "@react-three/drei"

function joinURL(...parts) {
    return parts
        .map(p => p.replace(/^\/+|\/+$/g, "")) // remove leading/trailing slashes
        .join("/")
}

const baseURL = import.meta.env.BASE_URL || "/"

const AssetPath = {
    Gltf: {
        LivingRoom: joinURL(baseURL, "models", "Living-room.glb"),
        LivingRoomBaked: joinURL(baseURL, "models", "Living-room_baked.glb"),
    },
}

const ModelErrorBoundary = ({children, fallback}) => {
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        const handleError = () => setHasError(true)
        window.addEventListener("error", handleError)
        return () => window.removeEventListener("error", handleError)
    }, [])

    return !hasError ? children : (<Html center>
        <div style={{color: "red", fontSize: "16px"}}>
            {fallback || "Failed to load model!"}
        </div>
    </Html>)
}

export const Experience = () => {
    const controls = useThree((state) => state.controls)
    const {showBakedScene} = useControls({showBakedScene: true})
    const animate = async () => {
        controls.setLookAt(8, 8, 8, 3, 0, 0)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        controls.smoothTime = 0.6
        await controls.setLookAt(1.2, 0.5, 1.2, 0, 0.2, 0, true)
    }

    useEffect(() => {
        if (!controls) return
        animate()
    }, [controls])

    return (<>
        <CameraControls makeDefault maxDistance={8} minDistance={1} minPolarAngle={0} maxPolarAngle={degToRad(80)}/>
        <Environment preset={"dawn"} background={true} blur={3}/>
        <ModelErrorBoundary>
            <Gltf
                src={showBakedScene ? AssetPath.Gltf.LivingRoomBaked : AssetPath.Gltf.LivingRoom}
                receiveShadow={true}
                castShadow={true}/>
        </ModelErrorBoundary>
    </>)
}

useGLTF.preload(AssetPath.Gltf.LivingRoomBaked)
useGLTF.preload(AssetPath.Gltf.LivingRoom)
