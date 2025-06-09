import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import img from '../assets/Untitled1.png';

export const StarBackground = () => {
  const canvasRef = useRef(null);
  const starfieldRef = useRef(null);

  // Function to calculate number of stars based on window size
  const calculateStarCount = () => {
    const area = window.innerWidth * window.innerHeight;
    // Base of 100 stars for a 1920x1080 window, scaled by area
    const baseStars = 200;
    const baseArea = 1920 * 1080;
    const scaleFactor = area / baseArea;
    // Minimum 50 stars, maximum 300 stars, scaled roughly by area
    return Math.min(300, Math.max(50, Math.round(baseStars * scaleFactor)));
  };

  // State for star positions, updated on resize
  const [starPositions, setStarPositions] = useState(() => {
    return Array.from({ length: calculateStarCount() }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }));
  });

  useEffect(() => {
    const canvas = canvasRef.current;

    // Scene
    const scene = new THREE.Scene();
    const fog = new THREE.Fog(0x000000, 0.5, 2);
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

    // Get initial primary color from CSS variable
    const getPrimaryColor = () => {
      const primary = getComputedStyle(document.documentElement).getPropertyValue('--secondary').trim();
      return new THREE.Color(primary);
    };

    // Material for the wireframe lines
    const wireframeMaterial = new THREE.MeshStandardMaterial({
      displacementMap: gridTexture,
      displacementScale: 0.2,
      color: getPrimaryColor(),
      wireframe: true,
      transparent: false,
      depthWrite: false,
    });

    const wireframeMaterial2 = new THREE.MeshStandardMaterial({
      displacementMap: gridTexture2,
      displacementScale: 0.2,
      color: getPrimaryColor(),
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

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Handle resize and update star count
    const handleResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      console.log('Resizing to', sizes.width, sizes.height);
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      // Update star positions based on new window size
      setStarPositions(
        Array.from({ length: calculateStarCount() }, () => ({
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }))
      );
      // Force a render to ensure the canvas updates immediately
      renderer.render(scene, camera);
    };
    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();

    // Primary color transition logic
    const targetWireframeColor = new THREE.Color();
    const currentWireframeColor = new THREE.Color();
    targetWireframeColor.copy(getPrimaryColor());
    currentWireframeColor.copy(targetWireframeColor);
    const transitionSpeed = 0.05;

    // Observe primary color changes
    const observer = new MutationObserver(() => {
      const newColor = getPrimaryColor();
      targetWireframeColor.copy(newColor);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
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

      camera.lookAt(
        camera.position.x + directionX * 10,
        camera.position.y + directionY * 10,
        camera.position.z + directionZ
      );

      // Interpolate wireframe color for smooth transition
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

  // Dynamic meteor creation
  useEffect(() => {
    const createMeteor = () => {
      const meteor = document.createElement('div');
      meteor.className = 'shooting-star';
      const top = Math.random() * 66; // Random top position within 0% to 66% (starfield height)
      const left = Math.random() * 100; // Random left position within 0% to 100%
      meteor.style.top = `${top}%`;
      meteor.style.left = `${left}%`;
      document.querySelector('.css-starfield').appendChild(meteor);
      // Remove meteor after animation completes
      setTimeout(() => meteor.remove(), 500); // Matches animation duration
    };

    // Adjust meteor frequency based on window size
    const area = window.innerWidth * window.innerHeight;
    const baseArea = 1920 * 1080;
    const scaleFactor = area / baseArea;
    // Base probability of 0.5, scaled by area, clamped between 0.2 and 0.8
    const meteorProbability = Math.min(0.8, Math.max(0.2, 0.5 * scaleFactor));

    const interval = setInterval(() => {
      if (Math.random() < meteorProbability) { // Dynamic probability based on window size
        createMeteor();
      }
    }, 1000);

    return () => clearInterval(interval);
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
      {/* CSS starfield with static stars */}
      <div className="css-starfield" ref={starfieldRef}>
        {/* Static stars */}
        {starPositions.map((position, i) => (
          <div
            key={`star-${i}`}
            className={`star star-layer-${(i % 3) + 1}`}
            style={position}
          />
        ))}
      </div>
    </div>
  );
};