// "use client";

// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { saveAs } from "file-saver";
// import html2canvas from "html2canvas";
// import { X, Plus, Download } from "lucide-react";
// import Slider from "rc-slider";
// import { useDropzone } from "react-dropzone";

// import { Button } from "@/components/ui/button";

// import "rc-slider/assets/index.css";
// import { motion } from "framer-motion";
// import { SketchPicker } from "react-color";

// // List of free-to-use background image URLs
// const backgroundUrls = [
//   "https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&h=900&fit=crop",
//   "https://images.unsplash.com/photo-1560015534-cee980ba7e13?w=1600&h=900&fit=crop",
//   "https://images.unsplash.com/photo-1501696461415-6bd6660c6742?w=1600&h=900&fit=crop",
//   "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1600&h=900&fit=crop",
//   "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=1600&h=900&fit=crop",
//   "https://images.unsplash.com/photo-1557682260-96773eb01377?w=1600&h=900&fit=crop",
//   "https://images.unsplash.com/photo-1557682268-e3955ed5d83f?w=1600&h=900&fit=crop",
//   "https://images.unsplash.com/photo-1557683311-eac922347aa1?w=1600&h=900&fit=crop",
// ];

// const backgrounds = backgroundUrls.map((url, i) => ({
//   id: i,
//   name: `Background ${i + 1}`,
//   url,
// }));

// const effects = Array.from({ length: 100 }, (_, i) => ({
//   id: i,
//   name: `Effect ${i + 1}`,
//   filter: `blur(${i % 10}px)`,
// }));

// const ScreenshotEditor: React.FC = () => {
//   const [screenshot, setScreenshot] = useState<string | null>(null);
//   const [selectedBackground, setSelectedBackground] = useState<typeof backgrounds[0] | null>(null);
//   const [backgroundColor, setBackgroundColor] = useState<string>("");
//   const [selectedEffect, setSelectedEffect] = useState<typeof effects[0] | null>(null);
//   const [screenSize, setScreenSize] = useState<string>("desktop");
//   const [zoom, setZoom] = useState<number>(0.9);
//   const [transparency, setTransparency] = useState<number >(1);
//   const [borderRadius, setBorderRadius] = useState<number>(0);
//   const [shadow, setShadow] = useState<number>(0);
//   const [previewScale, setPreviewScale] = useState<number>(1);
//   const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

//   const previewRef = useRef<HTMLDivElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);

//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     const file = acceptedFiles[0];
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       if (event.target?.result) {
//         setScreenshot(event.target.result.toString());
//       }
//     };
//     reader.readAsDataURL(file);
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   const handleBackgroundSelect = (background: typeof backgrounds[0]) => {
//     setSelectedBackground(background);
//     setBackgroundColor(""); // Reset color picker when a background is selected
//   };

//   const handleColorChange = (color: { hex: string }) => {
//     setBackgroundColor(color.hex);
//     setSelectedBackground(null); // Reset background selection when color is picked
//   };

//   const handleEffectSelect = (effect: typeof effects[0]) => {
//     setSelectedEffect(effect);
//   };

//   const handleScreenSizeChange = (size: string) => {
//     setScreenSize(size);
//   };

//   const handleDownload = () => {
//     if (previewRef.current) {
//       html2canvas(previewRef.current, { useCORS: true }).then((canvas) => {
//         canvas.toBlob((blob) => {
//           if (blob) saveAs(blob, "screenshot.png");
//         });
//       });
//     }
//   };

//   useEffect(() => {
//     const previewElement = previewRef.current;
//     if (previewElement) {
//       if (selectedBackground?.url) {
//         previewElement.style.backgroundImage = `url(${selectedBackground.url})`;
//         previewElement.style.backgroundColor = "";
//       } else if (backgroundColor) {
//         previewElement.style.backgroundColor = backgroundColor;
//         previewElement.style.backgroundImage = "";
//       }
//       previewElement.style.backgroundSize = "cover";
//       previewElement.style.backgroundRepeat = "no-repeat";
//       previewElement.style.filter = selectedEffect?.filter || "none";
//     }
//   }, [selectedBackground, selectedEffect, backgroundColor]);

//   const getPreviewDimensions = () => {
//     switch (screenSize) {
//       case "mobile":
//         return { width: 375, height: 667, border: "8px" };
//       case "tablet":
//         return { width: 768, height: 1024, border: "12px" };
//       case "desktop":
//       default:
//         return { width: 1024, height: 768, border: "16px" };
//     }
//   };

//   useEffect(() => {
//     const updatePreviewScale = () => {
//       if (containerRef.current && previewRef.current) {
//         const containerWidth = containerRef.current.clientWidth;
//         const containerHeight = containerRef.current.clientHeight;
//         const { width, height } = getPreviewDimensions();
//         const scale = Math.min(containerWidth / width, containerHeight / height, 1);
//         setPreviewScale(scale);
//       }
//     };

//     updatePreviewScale();
//     window.addEventListener("resize", updatePreviewScale);
//     return () => window.removeEventListener("resize", updatePreviewScale);
//   }, [screenSize]);

//   const previewDimensions = getPreviewDimensions();

//   return (
//     <motion.div
//       className="flex h-screen bg-gray-100 text-black"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       {/* Left Sidebar */}
//       <motion.div
//         className="w-64 bg-white p-4 shadow-md overflow-y-auto"
//         initial={{ x: -100 }}
//         animate={{ x: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h2 className="text-xl font-bold mb-4">Backgrounds</h2>
//         <div className="grid grid-cols-4 gap-4">
//           {backgrounds.map((bg) => (
//             <div
//               key={bg.id}
//               className="cursor-pointer"
//               onClick={() => handleBackgroundSelect(bg)}
//             >
//               <div
//                 className={`border-2 ${
//                   selectedBackground === bg
//                     ? "border-black"
//                     : "border-transparent"
//                 } hover:border-gray-700`}
//               >
//                 <img
//                   src={bg.url}
//                   alt={bg.name}
//                   className="w-full h-10 object-cover"
//                 />
//               </div>
//             </div>
//           ))}
//           <div
//             className="cursor-pointer flex justify-center items-center border-2 border-dashed border-gray-400 rounded-md h-10"
//             onClick={() => setShowColorPicker(!showColorPicker)}
//           >
//             {showColorPicker ? (
//               <X className="text-gray-400" />
//             ) : (
//               <Plus className="text-gray-400" />
//             )}
//           </div>
//         </div>
//         {showColorPicker && (
//           <div className="mt-2" onClick={(e) => e.stopPropagation()}>
//             <SketchPicker
//               color={backgroundColor}
//               onChangeComplete={handleColorChange}
//             />
//           </div>
//         )}
//         <h2 className="text-xl font-bold mt-6 mb-4">Screen Size</h2>
//         <div className="flex justify-between items-center space-x-2">
//           {["mobile", "tablet", "desktop"].map((size) => (
//             <Button
//               key={size}
//               onClick={() => handleScreenSizeChange(size)}
//               variant={"default"}
//               className={`text-xs py-1 px-2 capitalize ${
//                 screenSize === size
//                   ? "bg-black text-white"
//                   : "border border-gray-300 text-black"
//               } hover:bg-gray-700 hover:text-white`}
//             >
//               {size}
//             </Button>
//           ))}
//         </div>
//         <div className="mt-6">
//           <h2 className="text-xl font-bold mb-4">Image Adjustments</h2>
//           <div className="space-y-4">
//             <div>
//               <label className="block mb-2">Zoom</label>
//               <Slider
//                 min={0.5}
//                 max={2}
//                 step={0.1}
//                 value={zoom}
//                 onChange={(value) => {setZoom(value as number)}}
//                 railStyle={{ backgroundColor: "gray", height: 2 }}
//                 handleStyle={{
//                   borderColor: "black",
//                   height: 14,
//                   width: 14,
//                   marginLeft: -7,
//                   marginTop: -6,
//                   backgroundColor: "black",
//                 }}
//                 trackStyle={{ backgroundColor: "black", height: 2 }}
//               />
//             </div>
//             <div>
//               <label className="block mb-2">Transparency</label>
//               <Slider
//                 min={0}
//                 max={1}
//                 step={0.05}
//                 value={transparency}
//                 onChange={(value) => setTransparency(value as number)}
//                 railStyle={{ backgroundColor: "gray", height: 2 }}
//                 handleStyle={{
//                   borderColor: "black",
//                   height: 14,
//                   width: 14,
//                   marginLeft: -7,
//                   marginTop: -6,
//                   backgroundColor: "black",
//                 }}
//                 trackStyle={{ backgroundColor: "black", height: 2 }}
//               />
//             </div>
//             <div>
//               <label className="block mb-2">Border Radius</label>
//               <Slider
//                 min={0}
//                 max={50}
//                 step={1}
//                 value={borderRadius}
//                 onChange={(value) => setBorderRadius(value as number)}
//                 railStyle={{ backgroundColor: "gray", height: 2 }}
//                 handleStyle={{
//                   borderColor: "black",
//                   height: 14,
//                   width: 14,
//                   marginLeft: -7,
//                   marginTop: -6,
//                   backgroundColor: "black",
//                 }}
//                 trackStyle={{ backgroundColor: "black", height: 2 }}
//               />
//             </div>
//             <div>
//               <label className="block mb-2">Shadow</label>
//               <Slider
//                 min={0}
//                 max={20}
//                 step={1}
//                 value={shadow}
//                 onChange={(value) => setShadow(value as number)}
//                 railStyle={{ backgroundColor: "gray", height: 2 }}
//                 handleStyle={{
//                   borderColor: "black",
//                   height: 14,
//                   width: 14,
//                   marginLeft: -7,
//                   marginTop: -6,
//                   backgroundColor: "black",
//                 }}
//                 trackStyle={{ backgroundColor: "black", height: 2 }}
//               />
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {/* Right Main Content */}
//       <div className="flex flex-col flex-1 items-center justify-center p-8">
//         <div
//           ref={containerRef}
//           className="relative flex items-center justify-center w-full h-full"
//         >
//           <motion.div
//             ref={previewRef}
//             className="relative flex items-center justify-center bg-white overflow-hidden"
//             style={{
//               width: previewDimensions.width,
//               height: previewDimensions.height,
//               transform: `scale(${previewScale * zoom})`,
//               borderRadius: borderRadius,
//               boxShadow: `0px 0px ${shadow}px rgba(0, 0, 0, 0.2)`,
//               opacity: transparency,
//             }}
//           >
//             {screenshot ? (
//               <img
//                 src={screenshot}
//                 alt="Screenshot"
//                 className="object-contain w-full h-full"
//                 style={{
//                   borderRadius: borderRadius,
//                 }}
//               />
//             ) : (
//               <div
//                 {...getRootProps()}
//                 className="flex items-center justify-center w-full h-full cursor-pointer bg-gray-200 text-gray-500 border-2 border-dashed border-gray-400"
//               >
//                 <input {...getInputProps()} />
//                 {isDragActive ? (
//                   <p>Drop the files here ...</p>
//                 ) : (
//                   <p>Drag & drop a screenshot, or click to select a file</p>
//                 )}
//               </div>
//             )}
//           </motion.div>
//         </div>
//         {screenshot && (
//           <div className="mt-4">
//             <Button onClick={handleDownload} variant={"default"}>
//               <Download className="mr-2 h-4 w-4" />
//               Download
//             </Button>
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default ScreenshotEditor;
