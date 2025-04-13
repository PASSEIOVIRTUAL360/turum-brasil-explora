
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Panorama360ViewerProps {
  imageUrl: string;
  className?: string;
}

const Panorama360Viewer: React.FC<Panorama360ViewerProps> = ({ imageUrl, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    
    // Create sphere geometry
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); // Invert the sphere so the image is on the inside
    
    // Load texture
    const texture = new THREE.TextureLoader().load(imageUrl);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    
    // Create and add sphere mesh
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    
    // Position camera in center
    camera.position.set(0, 0, 0);
    
    // Create controls for mouse/touch interaction
    let isUserInteracting = false;
    let onPointerDownMouseX = 0, onPointerDownMouseY = 0;
    let lon = 0, onPointerDownLon = 0;
    let lat = 0, onPointerDownLat = 0;
    let phi = 0, theta = 0;
    
    // Handle interaction events
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      isUserInteracting = true;
      
      const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
      const clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
      
      onPointerDownMouseX = clientX;
      onPointerDownMouseY = clientY;
      
      onPointerDownLon = lon;
      onPointerDownLat = lat;
    };
    
    const onPointerMove = (event: MouseEvent | TouchEvent) => {
      if (!isUserInteracting) return;
      
      const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
      const clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
      
      lon = (onPointerDownMouseX - clientX) * 0.1 + onPointerDownLon;
      lat = (clientY - onPointerDownMouseY) * 0.1 + onPointerDownLat;
    };
    
    const onPointerUp = () => {
      isUserInteracting = false;
    };
    
    // Add event listeners
    containerRef.current.addEventListener('mousedown', onPointerDown);
    containerRef.current.addEventListener('touchstart', onPointerDown);
    document.addEventListener('mousemove', onPointerMove);
    document.addEventListener('touchmove', onPointerMove);
    document.addEventListener('mouseup', onPointerUp);
    document.addEventListener('touchend', onPointerUp);
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Update camera position based on interaction
      lat = Math.max(-85, Math.min(85, lat));
      phi = THREE.MathUtils.degToRad(90 - lat);
      theta = THREE.MathUtils.degToRad(lon);
      
      camera.position.x = 100 * Math.sin(phi) * Math.cos(theta);
      camera.position.y = 100 * Math.cos(phi);
      camera.position.z = 100 * Math.sin(phi) * Math.sin(theta);
      
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Remove event listeners
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousedown', onPointerDown);
        containerRef.current.removeEventListener('touchstart', onPointerDown);
      }
      document.removeEventListener('mousemove', onPointerMove);
      document.removeEventListener('touchmove', onPointerMove);
      document.removeEventListener('mouseup', onPointerUp);
      document.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('resize', handleResize);
      
      // Dispose resources
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, [imageUrl]);
  
  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full ${className || ''}`}
      style={{ minHeight: '300px' }}
    />
  );
};

export default Panorama360Viewer;
