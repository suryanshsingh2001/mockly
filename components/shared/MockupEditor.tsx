'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { saveAs } from 'file-saver'
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Upload, X, Download, RotateCcw } from 'lucide-react'
import Header from '@/components/layout/Header'

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

const screenSizes = [
  { name: 'Mobile', width: 375, height: 667 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Desktop', width: 1440, height: 900 },
]

const defaultSettings = {
  image: null,
  background: 'transparent',
  customColor1: '#ffffff',
  customColor2: '#000000',
  gradientAngle: 0,
  screenSize: screenSizes[2],
  zoom: 100,
  transparency: 100,
  borderRadius: 0,
  shadow: 0,
}

export default function MockupEditor() {
  const [image, setImage] = useState<string | null>(defaultSettings.image)
  const [background, setBackground] = useState(defaultSettings.background)
  const [customColor1, setCustomColor1] = useState(defaultSettings.customColor1)
  const [customColor2, setCustomColor2] = useState(defaultSettings.customColor2)
  const [gradientAngle, setGradientAngle] = useState(defaultSettings.gradientAngle)
  const [screenSize, setScreenSize] = useState(defaultSettings.screenSize)
  const [zoom, setZoom] = useState(defaultSettings.zoom)
  const [transparency, setTransparency] = useState(defaultSettings.transparency)
  const [borderRadius, setBorderRadius] = useState(defaultSettings.borderRadius)
  const [shadow, setShadow] = useState(defaultSettings.shadow)
  const [scale, setScale] = useState(1)
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setImage(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {'image/*': []},
    multiple: false
  })

  const handleDownload = () => {
    if(canvasRef.current) {
      const image = new Image()
      image.setAttribute('crossOrigin', 'anonymous')
      image.src = canvasRef.current.toDataURL("image/png")

      const filename = `screenshot${Date.now()}.png`
      saveAs(image.src, filename)
    }
  }

  const handleClearImage = () => {
    setImage(null)
  }

  const handleReset = () => {
    setImage(defaultSettings.image)
    setBackground(defaultSettings.background)
    setCustomColor1(defaultSettings.customColor1)
    setCustomColor2(defaultSettings.customColor2)
    setGradientAngle(defaultSettings.gradientAngle)
    setScreenSize(defaultSettings.screenSize)
    setZoom(defaultSettings.zoom)
    setTransparency(defaultSettings.transparency)
    setBorderRadius(defaultSettings.borderRadius)
    setShadow(defaultSettings.shadow)
  }

  const updateCanvasScale = useCallback(() => {
    if (containerRef.current && canvasRef.current) {
      const containerWidth = containerRef.current.clientWidth
      const containerHeight = containerRef.current.clientHeight
      const canvasAspectRatio = screenSize.width / screenSize.height
      const containerAspectRatio = containerWidth / containerHeight

      let newScale
      if (containerAspectRatio > canvasAspectRatio) {
        newScale = containerHeight / screenSize.height
      } else {
        newScale = containerWidth / screenSize.width
      }

      setScale(Math.min(newScale, 1))
    }
  }, [screenSize.width, screenSize.height])

  useEffect(() => {
    updateCanvasScale()
    window.addEventListener('resize', updateCanvasScale)
    return () => window.removeEventListener('resize', updateCanvasScale)
  }, [updateCanvasScale])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (canvas && ctx) {
      canvas.width = screenSize.width
      canvas.height = screenSize.height

      // Draw background
      if (background.startsWith('http')) {
        const img = new Image()
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          drawImage()
        }
        img.setAttribute('crossOrigin', 'anonymous')
        img.src = background
      } else if (background === 'gradient') {
        const gradient = ctx.createLinearGradient(
          0, 0,
          Math.cos(gradientAngle * Math.PI / 180) * canvas.width,
          Math.sin(gradientAngle * Math.PI / 180) * canvas.height
        )
        gradient.addColorStop(0, customColor1)
        gradient.addColorStop(1, customColor2)
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        drawImage()
      } else {
        ctx.fillStyle = background
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        drawImage()
      }
    }
  }, [image, background, customColor1, customColor2, gradientAngle, screenSize, zoom, transparency, borderRadius, shadow])

  const drawImage = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (canvas && ctx && image) {
      const img = new Image()
      img.onload = () => {
        const scale = zoom / 100
        const w = img.width * scale
        const h = img.height * scale
        const x = (canvas.width - w) / 2
        const y = (canvas.height - h) / 2

        ctx.save()
        ctx.beginPath()
        ctx.roundRect(x, y, w, h, borderRadius)
        ctx.clip()
        ctx.globalAlpha = transparency / 100
        ctx.drawImage(img, x, y, w, h)
        ctx.restore()

        // Draw shadow
        if (shadow > 0) {
          ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
          ctx.shadowBlur = shadow
          ctx.shadowOffsetX = 0
          ctx.shadowOffsetY = 0
          ctx.strokeRect(x, y, w, h)
        }
      }
      img.src = image
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/4 space-y-4">
            <div>
              <Label htmlFor="image-upload" className="block mb-2">Upload Image</Label>
              <div 
                {...getRootProps()} 
                className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                  isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'
                }`}
              >
                <input {...getInputProps()} id="image-upload" />
                {image ? (
                  <div className="flex items-center justify-center">
                    <img src={image} alt="Uploaded" className="max-h-24 max-w-full" />
                    <Button variant="ghost" size="icon" onClick={handleClearImage} className="ml-2">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2">Drag & drop an image here, or click to select one</p>
                  </div>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="background" className="block mb-2">Background</Label>
              <Tabs defaultValue="color" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="color">Color</TabsTrigger>
                  <TabsTrigger value="gradient">Gradient</TabsTrigger>
                  <TabsTrigger value="image">Image</TabsTrigger>
                </TabsList>
                <TabsContent value="color">
                  <Input
                    type="color"
                    value={background === 'gradient' ? customColor1 : background}
                    onChange={(e) => setBackground(e.target.value)}
                    className="w-full h-10"
                  />
                </TabsContent>
                <TabsContent value="gradient">
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <Input
                        type="color"
                        value={customColor1}
                        onChange={(e) => {
                          setCustomColor1(e.target.value)
                          setBackground('gradient')
                        }}
                        className="w-1/2 h-10"
                      />
                      <Input
                        type="color"
                        value={customColor2}
                        onChange={(e) => {
                          setCustomColor2(e.target.value)
                          setBackground('gradient')
                        }}
                        className="w-1/2 h-10"
                      />
                    </div>
                    <Slider
                      min={0}
                      max={360}
                      step={1}
                      value={[gradientAngle]}
                      onValueChange={(value) => {
                        setGradientAngle(value[0])
                        setBackground('gradient')
                      }}
                    />
                    <p className="text-sm text-gray-500">Angle: {gradientAngle}°</p>
                  </div>
                </TabsContent>
                <TabsContent value="image" className="grid grid-cols-4 gap-2">
                  {backgroundUrls.map((url, index) => (
                    <div
                      key={index}
                      className="relative aspect-video cursor-pointer overflow-hidden rounded-lg"
                      onClick={() => setBackground(url)}
                    >
                      <img src={url} alt={`Background ${index + 1}`} className="object-cover w-full h-full" />
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
            <div>
              <Label htmlFor="screen-size" className="block mb-2">Screen Size</Label>
              <Select
                onValueChange={(value) => setScreenSize(screenSizes[parseInt(value)])}
                value={screenSizes.indexOf(screenSize).toString()}
              >
                <SelectTrigger id="screen-size">
                  <SelectValue placeholder="Select screen size" />
                </SelectTrigger>
                <SelectContent>
                  {screenSizes.map((size, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {size.name} ({size.width}x{size.height})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="zoom" className="block mb-2">Zoom: {zoom}%</Label>
              <Slider
                id="zoom"
                min={10}
                max={200}
                step={1}
                value={[zoom]}
                onValueChange={(value) => setZoom(value[0])}
              />
            </div>
            <div>
              <Label htmlFor="transparency" className="block mb-2">Transparency: {transparency}%</Label>
              <Slider
                id="transparency"
                min={0}
                max={100}
                step={1}
                value={[transparency]}
                onValueChange={(value) => setTransparency(value[0])}
              />
            </div>
            <div>
              <Label htmlFor="border-radius" className="block mb-2">Border Radius: {borderRadius}px</Label>
              <Slider
                id="border-radius"
                min={0}
                max={50}
                step={1}
                value={[borderRadius]}
                onValueChange={(value) => setBorderRadius(value[0])}
              />
            </div>
            <div>
              <Label htmlFor="shadow" className="block mb-2">Shadow: {shadow}px</Label>
              <Slider
                id="shadow"
                min={0}
                max={50}
                step={1}
                value={[shadow]}
                onValueChange={(value) => setShadow(value[0])}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleDownload} className="w-full" disabled={!image}>
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
              <Button onClick={handleReset} variant="outline" className="w-full">
                <RotateCcw className="mr-2 h-4 w-4" /> Reset
              </Button>
            </div>
          </div>
          <div ref={containerRef} className="w-full lg:w-3/4 border rounded-lg p-4 flex items-center justify-center bg-gray-100 h-[calc(100vh-12rem)] lg:h-auto">
            <div className="relative overflow-hidden" style={{ width: `${screenSize.width * scale}px`, height: `${screenSize.height * scale}px` }}>
              <canvas
                ref={canvasRef}
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}