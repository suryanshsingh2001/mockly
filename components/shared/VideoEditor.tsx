"use client"

import React, { useState, useRef, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function VideoEditor() {
  const [video, setVideo] = useState<string | null>(null)
  const [trimStart, setTrimStart] = useState(0)
  const [trimEnd, setTrimEnd] = useState(100)
  const [muted, setMuted] = useState(false)
  const [brightness, setBrightness] = useState(100)
  const [textOverlay, setTextOverlay] = useState('')
  const videoRef = useRef<HTMLVideoElement>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setVideo(URL.createObjectURL(file))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'video/*': [] } })

  const handleTrimChange = (values: number[]) => {
    setTrimStart(values[0])
    setTrimEnd(values[1])
    if (videoRef.current) {
      videoRef.current.currentTime = (videoRef.current.duration * values[0]) / 100
    }
  }

  const handleBrightnessChange = (value: number[]) => {
    setBrightness(value[0])
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">Video Editor</h1>
      
      {!video ? (
        <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the video file here ...</p>
          ) : (
            <p>Drag 'n' drop a video file here, or click to select a file</p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <video 
              ref={videoRef}
              src={video} 
              controls 
              className="w-full rounded-lg"
              style={{ filter: `brightness(${brightness}%)` }}
              muted={muted}
            />
            {textOverlay && (
              <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded">
                {textOverlay}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Trim Video</Label>
            <Slider 
              min={0} 
              max={100} 
              step={1} 
              value={[trimStart, trimEnd]}
              onValueChange={handleTrimChange}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="mute" 
              checked={muted}
              onCheckedChange={setMuted}
            />
            <Label htmlFor="mute">Mute Audio</Label>
          </div>
          
          <div className="space-y-2">
            <Label>Brightness</Label>
            <Slider 
              min={0} 
              max={200} 
              step={1} 
              value={[brightness]}
              onValueChange={handleBrightnessChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="text-overlay">Text Overlay</Label>
            <Input 
              id="text-overlay"
              value={textOverlay}
              onChange={(e) => setTextOverlay(e.target.value)}
              placeholder="Enter text overlay"
            />
          </div>
          
          <Button className="w-full">Export Video</Button>
        </div>
      )}
    </div>
  )
}