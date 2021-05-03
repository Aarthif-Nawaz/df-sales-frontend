import React from "react";
import Particles from "react-particles-js"
import ParticleConfig from "../Assets/Config/particlesjs-config"

export default function ParticleBackground() {
    return (
        <Particles style={{ position: "absolute" }}
        height="100%"
        width="100%" params={ParticleConfig}></Particles>
    );
}
