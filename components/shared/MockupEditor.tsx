'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import html2canvas from 'html2canvas'
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { saveAs } from 'file-saver'

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

export default function MockupEditor() {
  const [image, setImage] = useState<string | null>(null)
  const [background, setBackground] = useState('transparent')
  const [customColor1, setCustomColor1] = useState('#ffffff')
  const [customColor2, setCustomColor2] = useState('#000000')
  const [gradientAngle, setGradientAngle] = useState(0)
  const [screenSize, setScreenSize] = useState(screenSizes[2])
  const [zoom, setZoom] = useState(100)
  const [transparency, setTransparency] = useState(100)
  const [borderRadius, setBorderRadius] = useState(0)
  const [shadow, setShadow] = useState(0)
  
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
    const canvas = canvasRef.current
    if (canvas) {
        html2canvas(canvasRef.current, { useCORS: true }).then((canvas) => {
            canvas.toBlob((blob) => {
              if (blob) saveAs(blob, "screenshot.png");
            });
          });
    }
  }

  const handleClearImage = () => {
    setImage(null)
  }

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
        img.src = background
      } else if (background === 'gradient') {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
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
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx && image) {
      const img = new Image();
      img.crossOrigin = "anonymous"; // Add this line
      img.onload = () => {
        const scale = zoom / 100;
        const w = img.width * scale;
        const h = img.height * scale;
        const x = (canvas.width - w) / 2;
        const y = (canvas.height - h) / 2;
  
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, borderRadius);
        ctx.clip();
        ctx.globalAlpha = transparency / 100;
        ctx.drawImage(img, x, y, w, h);
        ctx.restore();
  
        // Draw shadow
        if (shadow > 0) {
          ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
          ctx.shadowBlur = shadow;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          ctx.strokeRect(x, y, w, h);
        }
      };
      img.src = image;
    }
  };

  return (
    <div className="flex-grow container mx-auto p-4 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
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
                      onChange={(e) => setCustomColor1(e.target.value)}
                      className="w-1/2 h-10"
                    />
                    <Input
                      type="color"
                      value={customColor2}
                      onChange={(e) => setCustomColor2(e.target.value)}
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
          <Button onClick={handleDownload} className="w-full">Download Mockup</Button>
        </div>
        <div className="border rounded-lg p-4 flex items-center justify-center bg-gray-100 h-[calc(100vh-12rem)] lg:h-auto">
          <div className="relative w-full h-full overflow-auto">
            <canvas
              ref={canvasRef}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                boxShadow: shadow > 0 ? `0 0 ${shadow}px rgba(0, 0, 0, 0.5)` : 'none',
                borderRadius: `${borderRadius}px`,
                maxWidth: '100%',
                maxHeight: '100%',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}