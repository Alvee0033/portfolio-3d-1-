"use client"

import { Suspense, useState, useRef, useEffect, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, OrbitControls, PerspectiveCamera, useGLTF, Text, Float, Stars, Cloud } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import { Loader } from "@/components/loader"
import { ProfileSection } from "@/components/profile-section"
import { SkillsSection } from "@/components/skills-section"
import { EducationSection } from "@/components/education-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Navigation } from "@/components/navigation"
import { MobileNav } from "@/components/mobile-nav"
import { useMobile } from "@/hooks/use-mobile"
import { ClientMouseFollower } from "@/components/client-components"
import * as THREE from "three"

// Animated floating particles
function FloatingParticles({ count = 100 }) {
  const points = useRef<THREE.Points>(null)

  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.y = clock.getElapsedTime() * 0.05
      points.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.025) * 0.1
    }
  })

  const particlePositions = useMemo(() => {
    const positions = []
    for (let i = 0; i < count; i++) {
      positions.push(
        (Math.random() - 0.5) * 30, // x
        (Math.random() - 0.5) * 30, // y
        (Math.random() - 0.5) * 30, // z
      )
    }
    return new Float32Array(positions)
  }, [count])

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={particlePositions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#ffffff" transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

// Animated skill cubes
function SkillCubes() {
  const cubes = [
    { position: [-3, 0, 0], color: "#ff5e5e", delay: 0 },
    { position: [-1, 0, 0], color: "#5e8aff", delay: 0.2 },
    { position: [1, 0, 0], color: "#5eff8a", delay: 0.4 },
    { position: [3, 0, 0], color: "#ffff5e", delay: 0.6 },
  ]

  return (
    <group>
      {cubes.map((cube, index) => (
        <Float key={index} speed={1.5} rotationIntensity={0.5} floatIntensity={0.5} position={cube.position}>
          <mesh rotation={[0, Math.PI / 4, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={cube.color} emissive={cube.color} emissiveIntensity={0.5} toneMapped={false} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

// Scene component
function Scene({ activeSection }: { activeSection: string }) {
  const { scene } = useGLTF("/assets/3d/duck.glb")
  const groupRef = useRef<THREE.Group>(null)

  return (
    <group ref={groupRef} position={[0, -2, 0]}>
      {/* Background sphere */}
      <mesh position={[0, 0, -10]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[20, 64, 64]} />
        <meshStandardMaterial color="#050816" side={THREE.BackSide} />
      </mesh>

      {/* Stars background */}
      <Stars radius={50} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />

      {/* Decorative clouds */}
      <Cloud opacity={0.2} speed={0.4} width={10} depth={1.5} segments={20} position={[-10, 5, -5]} />
      <Cloud opacity={0.2} speed={0.4} width={10} depth={1.5} segments={20} position={[10, 5, -5]} />

      {/* Floating particles */}
      <FloatingParticles count={150} />

      {/* Section-specific 3D content */}
      {activeSection === "bio" && (
        <group position={[0, 0, 0]}>
          <mesh position={[0, 0, 0]} scale={2}>
            <torusGeometry args={[1.5, 0.05, 16, 100]} />
            <meshStandardMaterial color="#915eff" emissive="#915eff" emissiveIntensity={0.5} toneMapped={false} />
          </mesh>
        </group>
      )}

      {activeSection === "skills" && <SkillCubes />}

      {activeSection === "education" && (
        <group position={[0, 0, 0]}>
          <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
            <Text
              position={[0, 2, 0]}
              fontSize={0.5}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              font="/fonts/Geist_Bold.json"
            >
              Education
            </Text>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[2, 2, 0.5, 32]} />
              <meshStandardMaterial color="#5e5eff" emissive="#5e5eff" emissiveIntensity={0.5} toneMapped={false} />
            </mesh>
          </Float>
        </group>
      )}

      {activeSection === "projects" && (
        <group position={[0, 0, 0]}>
          <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
            <primitive object={scene.clone()} position={[0, -1, 0]} scale={2} />
            <pointLight position={[0, 2, 0]} color="#ff9d5e" intensity={5} />
          </Float>
        </group>
      )}

      {activeSection === "contact" && (
        <group position={[0, 0, 0]}>
          <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[1.5, 32, 32]} />
              <meshStandardMaterial
                color="#5effff"
                emissive="#5effff"
                emissiveIntensity={0.5}
                toneMapped={false}
                wireframe={true}
              />
            </mesh>
          </Float>
        </group>
      )}
    </group>
  )
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("bio")
  const [isLoading, setIsLoading] = useState(true)
  const isMobile = useMobile()
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)

    // Preload assets
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="relative w-full h-screen bg-black overflow-hidden">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="absolute top-0 left-0 w-full h-full z-0">
            <Canvas shadows dpr={[1, 2]}>
              <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
              <ambientLight intensity={0.3} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.8} castShadow />
              <Suspense fallback={null}>
                <Scene activeSection={activeSection} />
                <Environment preset="night" />
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  rotateSpeed={0.5}
                  autoRotate
                  autoRotateSpeed={0.5}
                  minPolarAngle={Math.PI / 2.5}
                  maxPolarAngle={Math.PI / 1.5}
                />
              </Suspense>
            </Canvas>
          </div>

          <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
            {isMobile ? (
              <MobileNav activeSection={activeSection} setActiveSection={setActiveSection} />
            ) : (
              <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="absolute bottom-0 left-0 w-full h-[70vh] pointer-events-auto"
              >
                {activeSection === "bio" && <ProfileSection />}
                {activeSection === "skills" && <SkillsSection />}
                {activeSection === "education" && <EducationSection />}
                {activeSection === "projects" && <ProjectsSection />}
                {activeSection === "contact" && <ContactSection />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Cursor glow effect */}
          <div className="cursor-glow fixed w-64 h-64 rounded-full pointer-events-none z-50 opacity-20 bg-gradient-to-r from-purple-500 to-blue-500 blur-3xl" />
          {isBrowser && <ClientMouseFollower />}
        </>
      )}
    </main>
  )
}

