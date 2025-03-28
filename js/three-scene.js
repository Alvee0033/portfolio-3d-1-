import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

// Three.js Scene
let scene, camera, renderer, controls
let particles, stars, skillCubes, educationCylinder, projectsSphere, contactSphere
let mixer, clock
let activeSection = "bio"

// Initialize Three.js scene
function initThreeScene() {
  // Create scene
  scene = new THREE.Scene()

  // Create camera
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 10

  // Create renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.shadowMap.enabled = true

  // Add renderer to DOM
  const container = document.getElementById("canvas-container")
  container.appendChild(renderer.domElement)

  // Add orbit controls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableZoom = false
  controls.enablePan = false
  controls.rotateSpeed = 0.5
  controls.autoRotate = true
  controls.autoRotateSpeed = 0.5
  controls.minPolarAngle = Math.PI / 2.5
  controls.maxPolarAngle = Math.PI / 1.5

  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
  scene.add(ambientLight)

  const spotLight = new THREE.SpotLight(0xffffff, 0.8)
  spotLight.position.set(10, 10, 10)
  spotLight.angle = 0.15
  spotLight.penumbra = 1
  spotLight.castShadow = true
  scene.add(spotLight)

  // Add background sphere
  const backgroundGeometry = new THREE.SphereGeometry(20, 64, 64)
  const backgroundMaterial = new THREE.MeshStandardMaterial({
    color: 0x050816,
    side: THREE.BackSide,
  })
  const backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial)
  backgroundMesh.position.set(0, 0, -10)
  scene.add(backgroundMesh)

  // Create floating particles
  createFloatingParticles()

  // Create stars
  createStars()

  // Create section-specific 3D content
  createBioContent()
  createSkillsContent()
  createEducationContent()
  createProjectsContent()
  createContactContent()

  // Set initial section
  updateThreeScene("bio")

  // Initialize clock for animations
  clock = new THREE.Clock()

  // Handle window resize
  window.addEventListener("resize", onWindowResize)

  // Start animation loop
  animate()
}

// Create floating particles
function createFloatingParticles() {
  const particlesGeometry = new THREE.BufferGeometry()
  const particlesCount = 150
  const posArray = new Float32Array(particlesCount * 3)

  for (let i = 0; i < particlesCount * 3; i += 3) {
    posArray[i] = (Math.random() - 0.5) * 30
    posArray[i + 1] = (Math.random() - 0.5) * 30
    posArray[i + 2] = (Math.random() - 0.5) * 30
  }

  particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    color: 0xffffff,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true,
  })

  particles = new THREE.Points(particlesGeometry, particlesMaterial)
  scene.add(particles)
}

// Create stars background
function createStars() {
  const starsGeometry = new THREE.BufferGeometry()
  const starsCount = 5000
  const posArray = new Float32Array(starsCount * 3)

  for (let i = 0; i < starsCount * 3; i += 3) {
    const radius = 50
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI

    posArray[i] = radius * Math.sin(phi) * Math.cos(theta)
    posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta)
    posArray[i + 2] = radius * Math.cos(phi)
  }

  starsGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

  const starsMaterial = new THREE.PointsMaterial({
    size: 0.2,
    color: 0xffffff,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
  })

  stars = new THREE.Points(starsGeometry, starsMaterial)
  scene.add(stars)
}

// Create bio section content
function createBioContent() {
  const torusGeometry = new THREE.TorusGeometry(1.5, 0.05, 16, 100)
  const torusMaterial = new THREE.MeshStandardMaterial({
    color: 0x915eff,
    emissive: 0x915eff,
    emissiveIntensity: 0.5,
    toneMapped: false,
  })

  const torus = new THREE.Mesh(torusGeometry, torusMaterial)
  torus.scale.set(2, 2, 2)
  torus.visible = false
  torus.userData = { section: "bio" }
  scene.add(torus)

  return torus
}

// Create skills section content
function createSkillsContent() {
  const group = new THREE.Group()
  group.userData = { section: "skills" }

  const cubes = [
    { position: [-3, 0, 0], color: 0xff5e5e },
    { position: [-1, 0, 0], color: 0x5e8aff },
    { position: [1, 0, 0], color: 0x5eff8a },
    { position: [3, 0, 0], color: 0xffff5e },
  ]

  cubes.forEach((cube) => {
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshStandardMaterial({
      color: cube.color,
      emissive: cube.color,
      emissiveIntensity: 0.5,
      toneMapped: false,
    })

    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(cube.position[0], cube.position[1], cube.position[2])
    mesh.rotation.set(0, Math.PI / 4, 0)
    group.add(mesh)
  })

  group.visible = false
  scene.add(group)

  return group
}

// Create education section content
function createEducationContent() {
  const group = new THREE.Group()
  group.userData = { section: "education" }

  const cylinderGeometry = new THREE.CylinderGeometry(2, 2, 0.5, 32)
  const cylinderMaterial = new THREE.MeshStandardMaterial({
    color: 0x5e5eff,
    emissive: 0x5e5eff,
    emissiveIntensity: 0.5,
    toneMapped: false,
  })

  const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial)
  group.add(cylinder)

  // Add text (simplified for this example)
  const textMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(4, 1),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 }),
  )
  textMesh.position.set(0, 2, 0)
  group.add(textMesh)

  group.visible = false
  scene.add(group)

  return group
}

// Create projects section content
function createProjectsContent() {
  // Create a group for projects section
  const group = new THREE.Group()
  group.userData = { section: "projects" }

  // Create a placeholder sphere for the duck model
  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
  const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0xff9d5e,
    emissive: 0xff9d5e,
    emissiveIntensity: 0.5,
    toneMapped: false,
  })

  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
  group.add(sphere)

  // Add point light
  const pointLight = new THREE.PointLight(0xff9d5e, 5)
  pointLight.position.set(0, 2, 0)
  group.add(pointLight)

  group.visible = false
  scene.add(group)

  // Load actual model if available
  try {
    const loader = new GLTFLoader()
    loader.load(
      "./assets/models/duck.glb",
      (gltf) => {
        group.remove(sphere) // Remove placeholder
        gltf.scene.scale.set(2, 2, 2)
        gltf.scene.position.set(0, -1, 0)
        group.add(gltf.scene)
      },
      undefined,
      (error) => {
        console.error("An error occurred loading the model:", error)
      },
    )
  } catch (error) {
    console.warn("GLTF Loader not available or model not found, using placeholder")
  }

  return group
}

// Create contact section content
function createContactContent() {
  const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32)
  const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x5effff,
    emissive: 0x5effff,
    emissiveIntensity: 0.5,
    toneMapped: false,
    wireframe: true,
  })

  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
  sphere.visible = false
  sphere.userData = { section: "contact" }
  scene.add(sphere)

  return sphere
}

// Update scene based on active section
function updateThreeScene(section) {
  activeSection = section

  // Hide all section-specific content
  scene.children.forEach((child) => {
    if (child.userData && child.userData.section) {
      child.visible = child.userData.section === section
    }
  })
}

// Make updateThreeScene available globally
window.updateThreeScene = updateThreeScene

// Handle window resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

// Animation loop
function animate() {
  requestAnimationFrame(animate)

  const delta = clock.getDelta()

  // Rotate particles
  if (particles) {
    particles.rotation.y += 0.002
    particles.rotation.x = Math.sin(clock.getElapsedTime() * 0.025) * 0.1
  }

  // Rotate stars
  if (stars) {
    stars.rotation.y += 0.0005
  }

  // Update mixer if available
  if (mixer) {
    mixer.update(delta)
  }

  // Float effect for section content
  scene.children.forEach((child) => {
    if (child.userData && child.userData.section === activeSection) {
      child.position.y = Math.sin(clock.getElapsedTime()) * 0.1
      if (child instanceof THREE.Group) {
        child.rotation.y += 0.005
      }
    }
  })

  controls.update()
  renderer.render(scene, camera)
}

// Initialize scene when page is loaded
window.addEventListener("load", initThreeScene)

// Create a placeholder profile image if needed
function createPlaceholderImage() {
  const canvas = document.createElement("canvas")
  canvas.width = 200
  canvas.height = 200
  const ctx = canvas.getContext("2d")

  // Draw gradient background
  const gradient = ctx.createLinearGradient(0, 0, 200, 200)
  gradient.addColorStop(0, "#915eff")
  gradient.addColorStop(1, "#5e8aff")
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 200, 200)

  // Draw text
  ctx.fillStyle = "white"
  ctx.font = "24px Arial"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText("Profile", 100, 100)

  return canvas.toDataURL()
}

// Create .nojekyll file for GitHub Pages
// This is just a note - you'll need to manually create this file in your repository
// to prevent GitHub Pages from processing your site with Jekyll

