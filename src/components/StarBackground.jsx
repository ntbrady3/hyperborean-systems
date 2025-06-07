import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import img from '../assets/Untitled1.png';

export const StarBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    // Scene
    const scene = new THREE.Scene();
    const fog = new THREE.Fog(0x000000, .5, 2);
    scene.fog = fog;

    // Objects
    const geometry = new THREE.PlaneGeometry(6, 2, 256, 256);

    // Load texture
    const gridTexture = new THREE.TextureLoader().load(img);
    const gridTexture2 = new THREE.TextureLoader().load(img);

    // Material for the solid black fill
    const solidMaterial = new THREE.MeshStandardMaterial({
      displacementMap: gridTexture,
      displacementScale: 0.2,
      color: 0x000000,
      metalness: 0.96,
      roughness: 0.5,
      wireframe: false,
      transparent: false,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });

    const solidMaterial2 = new THREE.MeshStandardMaterial({
      displacementMap: gridTexture2,
      displacementScale: 0.2,
      color: 0x000000,
      metalness: 0.96,
      roughness: 0.5,
      wireframe: false,
      transparent: false,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });

    // Material for the wireframe lines
    const wireframeMaterial = new THREE.MeshStandardMaterial({
      displacementMap: gridTexture,
      displacementScale: 0.2,
      color: 0x4682b4,
      wireframe: true,
      transparent: false,
      depthWrite: false,
    });

    const wireframeMaterial2 = new THREE.MeshStandardMaterial({
      displacementMap: gridTexture2,
      displacementScale: 0.2,
      color: 0x4682b4,
      wireframe: true,
      transparent: false,
      depthWrite: false,
    });

    // Plane 1: Solid mesh + Wireframe overlay
    const planeSolid = new THREE.Mesh(geometry, solidMaterial);
    planeSolid.rotation.x = -Math.PI * 0.5;
    planeSolid.position.y = 0.0;
    planeSolid.position.z = 0.15;

    const planeWireframe = new THREE.Mesh(geometry, wireframeMaterial);
    planeWireframe.rotation.x = -Math.PI * 0.5;
    planeWireframe.position.y = 0.0;
    planeWireframe.position.z = 0.15;

    // Plane 2: Solid mesh + Wireframe overlay
    const plane2Solid = new THREE.Mesh(geometry, solidMaterial2);
    plane2Solid.rotation.x = -Math.PI * 0.5;
    plane2Solid.position.y = 0.0;
    plane2Solid.position.z = -1.85;

    const plane2Wireframe = new THREE.Mesh(geometry, wireframeMaterial2);
    plane2Wireframe.rotation.x = -Math.PI * 0.5;
    plane2Wireframe.position.y = 0.0;
    plane2Wireframe.position.z = -1.85;

    // Add all meshes to the scene
    scene.add(planeSolid);
    scene.add(planeWireframe);
    scene.add(plane2Solid);
    scene.add(plane2Wireframe);

    // Light
    const ambientLight = new THREE.AmbientLight("#ffffff", 1.5);
    scene.add(ambientLight);

    // Sizes
    const sizes = {
      width: canvas.clientWidth,
      height: canvas.clientHeight,
    };

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.01,
      20
    );
    camera.position.x = -0.35;
    camera.position.y = 0.03;
    camera.position.z = 1.10;
    scene.add(camera);

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.enabled = true;

    // Mouse position tracking for look direction
    let mouseX = 0;
    let mouseY = 0;
    let targetLookOffsetX = 0;
    let currentLookOffsetX = 0;
    let targetLookOffsetY = 0;
    let currentLookOffsetY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2;
      targetLookOffsetX = mouseX * 0.3;
      targetLookOffsetY = mouseY * 0.3;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Handle resize
    const handleResize = () => {
      sizes.width = canvas.clientWidth;
      sizes.height = canvas.clientHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();

    // Theme transition logic
    const lightFogColor = new THREE.Color('#000000');
    const darkFogColor = new THREE.Color('#000000');
    const lightWireframeColor = new THREE.Color("hsl(180, 100%, 50%)");
    const darkWireframeColor = new THREE.Color("hsl(180, 100%, 50%)");
    let targetFogColor = new THREE.Color();
    let currentFogColor = new THREE.Color();
    let targetWireframeColor = new THREE.Color();
    let currentWireframeColor = new THREE.Color();
    const transitionSpeed = 0.05;

    // Check initial theme
    const isDarkMode = document.documentElement.classList.contains("dark");
    targetFogColor.copy(isDarkMode ? darkFogColor : lightFogColor);
    currentFogColor.copy(targetFogColor);
    fog.color.copy(currentFogColor);
    targetWireframeColor.copy(isDarkMode ? darkWireframeColor : lightWireframeColor);
    currentWireframeColor.copy(targetWireframeColor);
    wireframeMaterial.color.copy(currentWireframeColor);
    wireframeMaterial2.color.copy(currentWireframeColor);

    // Observe theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const isDarkMode = document.documentElement.classList.contains("dark");
          targetFogColor.copy(isDarkMode ? darkFogColor : lightFogColor);
          targetWireframeColor.copy(
            isDarkMode ? darkWireframeColor : lightWireframeColor
          );
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Animation loop
    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Scroll the planes
      planeSolid.position.z = (elapsedTime * 0.15) % 2;
      planeWireframe.position.z = (elapsedTime * 0.15) % 2;
      plane2Solid.position.z = ((elapsedTime * 0.15) % 2) - 2;
      plane2Wireframe.position.z = ((elapsedTime * 0.15) % 2) - 2;

      // Update camera position
      camera.position.x = -0.35;
      camera.position.y = 0.3;
      camera.position.z = 1.1;

      const directionX = 0;
      const directionY = 0.02;
      const directionZ = -1;

      currentLookOffsetX += (targetLookOffsetX - currentLookOffsetX);
      currentLookOffsetY += (targetLookOffsetY - currentLookOffsetY);

      const lookAtX = camera.position.x + directionX * 10 + currentLookOffsetX;
      const lookAtY = camera.position.y + directionY * 10 + currentLookOffsetY;
      const lookAtZ = camera.position.z + directionZ;
      camera.lookAt(lookAtX, lookAtY, lookAtZ);

      // Interpolate colors for smooth transition
      currentFogColor.lerp(targetFogColor, transitionSpeed);
      fog.color.copy(currentFogColor);
      currentWireframeColor.lerp(targetWireframeColor, transitionSpeed);
      wireframeMaterial.color.copy(currentWireframeColor);
      wireframeMaterial2.color.copy(currentWireframeColor);

      // Render
      renderer.render(scene, camera);

      // Continue animation
      window.requestAnimationFrame(tick);
    };
    tick();

    // Cleanup on unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      renderer.dispose();
      scene.traverse((object) => {
        if (object.isMesh) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });
    };
  }, []);

  return (
    <div className="star-background-container">
      <canvas
        ref={canvasRef}
        className="webgl bg-background"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />
      {/* Generate stars dynamically */}
      <div className="css-starfield">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className={`star star-layer-${(i % 3) + 1}`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              zIndex:0  ,
            }}
          />
        ))}
      </div>
    </div>
  );
};