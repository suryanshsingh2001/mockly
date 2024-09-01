"use client"

// import React, { useState, useCallback, useEffect, useRef } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { AlertCircle, Download, Image, Video } from 'lucide-react';
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
// import { Button } from '@/components/ui/button';
// import html2canvas from 'html2canvas';
// import { saveAs } from 'file-saver';
// import Slider from 'rc-slider';
// import 'rc-slider/assets/index.css';
// import { motion } from 'framer-motion';

// // List of free-to-use background image URLs
// const backgroundUrls = [
//   "https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&h=900&fit=crop",
//   "https://images.unsplash.com/photo-1560015534-cee980ba7e13?w=1600&h=900&fit=crop",
//   "https://images.unsplash.com/photo-1501696461415-6bd6660c6742?w=1600&h=900&fit=crop",
//   "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1600&h=900&fit=crop",
//   "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=1600&h=900&fit=crop",
//   "https://images.unsplash.com/photo-1557682260-96773eb01377?w=1600&h=900&fit=crop",
//   "https://images.unsplash.com/photo-1557682268-e3955ed5d83f?w=1600&h=900&fit=crop",
//   "https://images.unsplash.com/photo-1557683311-eac922347aa1?w=1600&h=900&fit=crop"
// ];

// const backgrounds = backgroundUrls.map((url, i) => ({ id: i, name: `Background ${i + 1}`, url }));

// const effects = [...Array(100)].map((_, i) => ({ id: i, name: `Effect ${i + 1}`, filter: `blur(${i % 10}px)` }));

// const ScreenshotEditor = () => {
//   const [screenshot, setScreenshot] = useState<string | null>(null);
//   const [selectedBackground, setSelectedBackground] = useState<{ id: number; name: string; url: string } | null>(null);
//   const [selectedEffect, setSelectedEffect] = useState<{ id: number; name: string; filter: string } | null>(null);
//   const [screenSize, setScreenSize] = useState<string>('desktop');
//   const [zoom, setZoom] = useState<number>(0.9);
//   const previewRef = useRef<HTMLDivElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [previewScale, setPreviewScale] = useState(1);

//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     const file = acceptedFiles[0];
//     const reader = new FileReader();
//     reader.onload = (event: ProgressEvent<FileReader>) => {
//       if (event.target?.result) {
//         setScreenshot(event.target.result.toString());
//       }
//     };
//     reader.readAsDataURL(file);
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   const handleBackgroundSelect = (background: { id: number; name: string; url: string }) => {
//     setSelectedBackground(background);
//   };

//   const handleEffectSelect = (effect: { id: number; name: string; filter: string }) => {
//     setSelectedEffect(effect);
//   };

//   const handleScreenSizeChange = (size: string) => {
//     setScreenSize(size);
//   };

//   const handleDownload = () => {
//     if (previewRef.current) {
//       html2canvas(previewRef.current, { useCORS: true }).then(canvas => {
//         canvas.toBlob(blob => {
//           if (blob) saveAs(blob, "screenshot.png");
//         });
//       });
//     }
//   };

//   const handleConvertToGif = () => {
//     console.log('Converting to GIF');
//   };

//   const handleConvertToVideo = () => {
//     console.log('Converting to video');
//   };

//   useEffect(() => {
//     if (previewRef.current) {
//       previewRef.current.style.backgroundImage = selectedBackground ? `url(${selectedBackground.url})` : 'none';
//       previewRef.current.style.backgroundSize = 'cover';
//       previewRef.current.style.backgroundRepeat = 'no-repeat';
//       previewRef.current.style.filter = selectedEffect ? selectedEffect.filter : 'none';
//     }
//   }, [selectedBackground, selectedEffect]);

//   const getPreviewDimensions = () => {
//     switch (screenSize) {
//       case 'mobile':
//         return { width: 375, height: 667, border: '8px' };
//       case 'tablet':
//         return { width: 768, height: 1024, border: '12px' };
//       case 'desktop':
//       default:
//         return { width: 1024, height: 768, border: '16px' };
//     }
//   };

//   useEffect(() => {
//     const updatePreviewScale = () => {
//       if (containerRef.current && previewRef.current) {
//         const containerWidth = containerRef.current.clientWidth;
//         const containerHeight = containerRef.current.clientHeight;
//         const { width, height } = getPreviewDimensions();
//         const scaleX = containerWidth / width;
//         const scaleY = containerHeight / height;
//         const scale = Math.min(scaleX, scaleY, 1);
//         setPreviewScale(scale);
//       }
//     };

//     updatePreviewScale();
//     window.addEventListener('resize', updatePreviewScale);
//     return () => window.removeEventListener('resize', updatePreviewScale);
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
//             <div key={bg.id} className="cursor-pointer" onClick={() => handleBackgroundSelect(bg)}>
//               <div className={`border-2 ${selectedBackground === bg ? 'border-black' : 'border-transparent'} hover:border-gray-700`}>
//                 <img src={bg.url} alt={bg.name} className="w-full h-10 object-cover" />
//               </div>
//             </div>
//           ))}
//         </div>
//         <h2 className="text-xl font-bold mt-6 mb-4">Screen Size</h2>
//         <div className="flex justify-between items-center space-x-2">
//           {['mobile', 'tablet', 'desktop'].map((size) => (
//             <Button
//               key={size}
//               onClick={() => handleScreenSizeChange(size)}
//               variant={screenSize === size ? 'solid' : 'outline'}
//               className={`text-xs py-1 px-2 capitalize ${screenSize === size ? 'bg-black text-white' : 'border border-gray-300 text-black'} hover:bg-gray-700 hover:text-white`}
//             >
//               {size}
//             </Button>
//           ))}
//         </div>
//         {screenshot && (
//             <div className="mt-4 w-full flex items-center">
//               <label className="mr-2">Zoom:</label>
//               <Slider
//                 min={0.5}
//                 max={2}
//                 step={0.1}
//                 value={zoom}
//                 // @ts-ignore
//                 onChange={(value) => setZoom(value)}
//                 className="flex-1"
//               />
//             </div>
//           )}
//       </motion.div>

//       {/* Main Content */}
//       <motion.div
//         className="flex-1 p-8 overflow-y-auto"
//         ref={containerRef}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.5, duration: 0.5 }}
//       >
//         <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center h-[650px] flex flex-col items-center justify-center">
//           <input {...getInputProps()} />
//           <div
//             ref={previewRef}
//             className="flex items-center justify-center"
//             style={{
//               width: `${previewDimensions.width}px`,
//               height: `${previewDimensions.height}px`,
//               transform: `scale(${previewScale})`,
//               transformOrigin: 'center',
//               backgroundSize: 'cover',
//               backgroundRepeat: 'no-repeat',
//               backgroundPosition: 'center',
//               overflow: 'hidden',
//             }}
//           >
//             {screenshot ? (
//               <img
//                 src={screenshot}
//                 alt="Uploaded screenshot"
//                 className="max-w-full max-h-full"
//                 style={{ transform: `scale(${zoom})` }}
//               />
//             ) : isDragActive ? (
//               <p>Drop the screenshot here ...</p>
//             ) : (
//               <p className='text-gray-600'>Drag &apos;n&apos; drop a screenshot here, or click to select one</p>
//             )}
//           </div>
//         </div>
//         <div className="mt-4 space-x-2">
//           <Button onClick={handleDownload} disabled={!screenshot} className="bg-black text-white hover:bg-gray-700">
//             <Download className="mr-2 h-4 w-4 text-white" /> Download
//           </Button>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default ScreenshotEditor;


import React, { useCallback, useEffect, useRef, useState } from "react"
import { saveAs } from "file-saver"
import html2canvas from "html2canvas"
import { AlertCircle, Download, Image, PlusIcon, Video, X } from "lucide-react"
import Slider from "rc-slider"
import { useDropzone } from "react-dropzone"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

import "rc-slider/assets/index.css"
import { motion } from "framer-motion"
import { SketchPicker } from "react-color"

// List of free-to-use background image URLs
const backgroundUrls = [
  "https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&h=900&fit=crop",
  "https://images.unsplash.com/photo-1560015534-cee980ba7e13?w=1600&h=900&fit=crop",
  "https://images.unsplash.com/photo-1501696461415-6bd6660c6742?w=1600&h=900&fit=crop",
  "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1600&h=900&fit=crop",
  "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=1600&h=900&fit=crop",
  "https://images.unsplash.com/photo-1557682260-96773eb01377?w=1600&h=900&fit=crop",
  "https://images.unsplash.com/photo-1557682268-e3955ed5d83f?w=1600&h=900&fit=crop",
  "https://images.unsplash.com/photo-1557683311-eac922347aa1?w=1600&h=900&fit=crop",
]

const backgrounds = backgroundUrls.map((url, i) => ({
  id: i,
  name: `Background ${i + 1}`,
  url,
}))

const effects = [...Array(100)].map((_, i) => ({
  id: i,
  name: `Effect ${i + 1}`,
  filter: `blur(${i % 10}px)`,
}))

const ScreenshotEditor = () => {
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [selectedBackground, setSelectedBackground] = useState<{
    id: number
    name: string
    url: string | null
  } | null>(null)
  const [backgroundColor, setBackgroundColor] = useState<string>("")
  const [selectedEffect, setSelectedEffect] = useState<{
    id: number
    name: string
    filter: string
  } | null>(null)
  const [screenSize, setScreenSize] = useState<string>("desktop")
  const [zoom, setZoom] = useState<number>(0.9)
  const [transparency, setTransparency] = useState<number>(1)
  const [borderRadius, setBorderRadius] = useState<number>(0)
  const [shadow, setShadow] = useState<number>(0)
  const previewRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [previewScale, setPreviewScale] = useState(1)
  const [showColorPicker, setShowColorPicker] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    const reader = new FileReader()
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target?.result) {
        setScreenshot(event.target.result.toString())
      }
    }
    reader.readAsDataURL(file)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const handleBackgroundSelect = (background: {
    id: number
    name: string
    url: string | null
  }) => {
    setSelectedBackground(background)
    setBackgroundColor("") // Reset color picker when a background is selected
  }

  const handleColorChange = (color: { hex: string }) => {
    setBackgroundColor(color.hex)
    setSelectedBackground(null) // Reset background selection when color is picked
  }

  const handleEffectSelect = (effect: {
    id: number
    name: string
    filter: string
  }) => {
    setSelectedEffect(effect)
  }

  const handleScreenSizeChange = (size: string) => {
    setScreenSize(size)
  }

  const handleDownload = () => {
    if (previewRef.current) {
      html2canvas(previewRef.current, { useCORS: true }).then((canvas) => {
        canvas.toBlob((blob) => {
          if (blob) saveAs(blob, "screenshot.png")
        })
      })
    }
  }

  useEffect(() => {
    if (previewRef.current) {
      if (selectedBackground && selectedBackground.url) {
        previewRef.current.style.backgroundImage = `url(${selectedBackground.url})`
        previewRef.current.style.backgroundColor = ""
      } else if (backgroundColor) {
        previewRef.current.style.backgroundColor = backgroundColor
        previewRef.current.style.backgroundImage = ""
      }
      previewRef.current.style.backgroundSize = "cover"
      previewRef.current.style.backgroundRepeat = "no-repeat"
      previewRef.current.style.filter = selectedEffect
        ? selectedEffect.filter
        : "none"
    }
  }, [selectedBackground, selectedEffect, backgroundColor])

  const getPreviewDimensions = () => {
    switch (screenSize) {
      case "mobile":
        return { width: 375, height: 667, border: "8px" }
      case "tablet":
        return { width: 768, height: 1024, border: "12px" }
      case "desktop":
      default:
        return { width: 1024, height: 768, border: "16px" }
    }
  }

  useEffect(() => {
    const updatePreviewScale = () => {
      if (containerRef.current && previewRef.current) {
        const containerWidth = containerRef.current.clientWidth
        const containerHeight = containerRef.current.clientHeight
        const { width, height } = getPreviewDimensions()
        const scaleX = containerWidth / width
        const scaleY = containerHeight / height
        const scale = Math.min(scaleX, scaleY, 1)
        setPreviewScale(scale)
      }
    }

    updatePreviewScale()
    window.addEventListener("resize", updatePreviewScale)
    return () => window.removeEventListener("resize", updatePreviewScale)
  }, [screenSize])

  const previewDimensions = getPreviewDimensions()

  return (
    <motion.div
      className="flex h-screen bg-gray-100 text-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left Sidebar */}
      <motion.div
        className="w-64 bg-white p-4 shadow-md overflow-y-auto"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-bold mb-4">Backgrounds</h2>
        <div className="grid grid-cols-4 gap-4">
          {backgrounds.map((bg) => (
            <div
              key={bg.id}
              className="cursor-pointer"
              onClick={() => handleBackgroundSelect(bg)}
            >
              <div
                className={`border-2 ${
                  selectedBackground === bg
                    ? "border-black"
                    : "border-transparent"
                } hover:border-gray-700`}
              >
                <img
                  src={bg.url}
                  alt={bg.name}
                  className="w-full h-10 object-cover"
                />
              </div>
            </div>
          ))}
          <div
            className="cursor-pointer flex justify-center items-center border-2 border-dashed border-gray-400 rounded-md h-10"
            onClick={() => setShowColorPicker(!showColorPicker)}
          >
            {showColorPicker ? (
              <X className="text-gray-400" />
            ) : (
              <PlusIcon className="text-gray-400" />
            )}
          </div>
        </div>
        {showColorPicker && (
          <div className="mt-2" onClick={(e) => e.stopPropagation()}>
            <SketchPicker
              color={backgroundColor}
              onChangeComplete={handleColorChange}
            />
          </div>
        )}
        <h2 className="text-xl font-bold mt-6 mb-4">Screen Size</h2>
        <div className="flex justify-between items-center space-x-2">
          {["mobile", "tablet", "desktop"].map((size) => (
            <Button
              key={size}
              onClick={() => handleScreenSizeChange(size)}
              // @ts-ignore
              variant={"default"}
              className={`text-xs py-1 px-2 capitalize ${
                screenSize === size
                  ? "bg-black text-white"
                  : "border border-gray-300 text-black"
              } hover:bg-gray-700 hover:text-white`}
            >
              {size}
            </Button>
          ))}
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Image Adjustments</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Zoom</label>
              <Slider
                min={0.5}
                max={2}
                step={0.1}
                value={zoom}
                onChange={(value) => setZoom(value as number)}
                railStyle={{ backgroundColor: "gray" }}
                trackStyle={[{ backgroundColor: "black" }]}
                handleStyle={[
                  { borderColor: "black", backgroundColor: "black" },
                ]}
              />
            </div>
            <div>
              <label className="block mb-2">Transparency</label>
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={transparency}
                
                onChange={(value) => setTransparency(value as number)}
                railStyle={{ backgroundColor: "gray" }}
                trackStyle={[{ backgroundColor: "black" }]}
                handleStyle={[
                  { borderColor: "black", backgroundColor: "black" },
                ]}
              />
            </div>
            <div>
              <label className="block mb-2">Border Radius</label>
              <Slider
                min={0}
                max={50}
                step={1}
                value={borderRadius}
                onChange={(value) => setBorderRadius(value as number)}
                railStyle={{ backgroundColor: "gray" }}
                trackStyle={[{ backgroundColor: "black" }]}
                handleStyle={[
                  { borderColor: "black", backgroundColor: "black" },
                ]}
              />
            </div>
            <div>
              <label className="block mb-2">Shadow</label>
              <Slider
                min={0}
                max={20}
                step={1}
                value={shadow}
                onChange={(value) => setShadow(value as number)}
                railStyle={{ backgroundColor: "gray" }}
                trackStyle={[{ backgroundColor: "black" }]}
                handleStyle={[
                  { borderColor: "black", backgroundColor: "black" },
                ]}
              />
            </div>
            {/* <motion.div 
            className="relative bg-black text-white p-4 rounded-lg shadow-lg hover:shadow-2xl transform hover:-rotate-2 transition duration-300 ease-in-out"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.a
            href="https://Easyui.pro"
              className="absolute -inset-1 rounded-lg"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              style={{
                boxShadow: "0 0 8px 2px rgba(255, 255, 255, 0.3)",
                borderRadius: "inherit",
              }}
            ></motion.a>
            <a href="https://Easyui.pro" className='font-bold'>🌟 Click here to get 50+ free web templates</a>
            {/* <a href="https://Easyui.pro" className="underline">Check it out now</a> */}
            {/* </motion.div> */}
            <motion.div
              className="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-0 rounded-xl shadow-xl overflow-hidden"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.div
                className="absolute inset-0 opacity-10 blur-sm"
                animate={{ backgroundPosition: ["0% 0%", "100% 100%"], backgroundSize: ["150% 150%", "100% 100%"] }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 30 }}
                style={{ backgroundImage: 'url("/api/placeholder/800/600")' }}
              />
              <div className="relative z-10 p-4">
                <motion.div
                  className="text-xl font-extrabold mb-1"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  Introducing Easy UI 
                </motion.div>
                <motion.p
                  className="text-md mb-3"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="font-semibold">Collection of 50+ FREE Website Templates That Convert 🌟</span> 
                </motion.p>
                <motion.a
                  href="https://Easyui.pro"
                  className="inline-flex items-center bg-white text-purple-600 font-medium py-2 px-4 rounded hover:bg-opacity-80 transition duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="flex-1 p-8 overflow-y-auto"
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center h-[650px] flex flex-col items-center justify-center"
        >
          <input {...getInputProps()} />
          <div
            ref={previewRef}
            className="flex items-center justify-center"
            style={{
              width: `${previewDimensions.width}px`,
              height: `${previewDimensions.height}px`,
              transform: `scale(${previewScale})`,
              transformOrigin: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              overflow: "hidden",
            }}
          >
            {screenshot ? (
              <img
                src={screenshot}
                alt="Uploaded screenshot"
                className="max-w-full max-h-full"
                style={{
                  transform: `scale(${zoom})`,
                  opacity: transparency,
                  borderRadius: `${borderRadius}px`,
                  boxShadow: `0 0 ${shadow}px rgba(0, 0, 0, 0.5)`,
                }}
              />
            ) : isDragActive ? (
              <p>Drop the screenshot here ...</p>
            ) : (
              <p className="text-gray-600">
                Drag &apos;n&apos; drop a screenshot here, or click to select one
              </p>
            )}
          </div>
        </div>
        <div className="mt-4 space-x-2">
          <Button
            onClick={handleDownload}
            disabled={!screenshot}
            className="bg-black text-white hover:bg-gray-700"
          >
            <Download className="mr-2 h-4 w-4 text-white" /> Download
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ScreenshotEditor
