"use client"

import React, { useState, useRef, useCallback, useEffect, useMemo } from "react"
import { useDropzone } from "react-dropzone"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Maximize, Minimize, Pause, Play, Upload, VideoIcon, Volume2, VolumeX } from 'lucide-react'
import ScreenRecorder from "../screen-recorder"
import Header from "../layout/Header"

export default function VideoEditor() {
  const [video, setVideo] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)
  const [volume, setVolume] = useState<number>(1)
  const [currentVolume, setCurrentVolume] = useState<number>(1)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
  const [showControls, setShowControls] = useState<boolean>(true)
  const [trimStart, setTrimStart] = useState(0)
  const [trimEnd, setTrimEnd] = useState(100)
  const [brightness, setBrightness] = useState(100)
  const [textOverlay, setTextOverlay] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [lastMouseMoveTime, setLastMouseMoveTime] = useState(Date.now())

  const autoplay = useMemo(() => false, [])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setVideo(URL.createObjectURL(file))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "video/*": [] },
  })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateProgress = () => {
      if (video.duration > 0) {
        setProgress((video.currentTime / video.duration) * 100)
      }
    }

    const handleVideoEnd = () => setIsPlaying(false)

    video.addEventListener("timeupdate", updateProgress)
    video.addEventListener("ended", handleVideoEnd)

    if (autoplay) {
      video.play().catch((error) => console.error("Autoplay failed:", error))
    }

    return () => {
      video.removeEventListener("timeupdate", updateProgress)
      video.removeEventListener("ended", handleVideoEnd)
    }
  }, [autoplay, video])

  useEffect(() => {
    const handleMouseMove = () => {
      setLastMouseMoveTime(Date.now())
      setShowControls(true)
    }

    const handleMouseLeave = () => {
      if (isPlaying) {
        setShowControls(false)
      }
    }

    const checkMouseInactivity = () => {
      const currentTime = Date.now()
      if (currentTime - lastMouseMoveTime > 3000 && isFullscreen) {
        setShowControls(false)
      }
    }

    if (playerRef.current) {
      playerRef.current.addEventListener("mousemove", handleMouseMove)
      playerRef.current.addEventListener("mouseleave", handleMouseLeave)
    }

    const inactivityInterval = setInterval(checkMouseInactivity, 1000)

    return () => {
      if (playerRef.current) {
        playerRef.current.removeEventListener("mousemove", handleMouseMove)
        playerRef.current.removeEventListener("mouseleave", handleMouseLeave)
      }
      clearInterval(inactivityInterval)
    }
  }, [isFullscreen, lastMouseMoveTime, isPlaying])

  useEffect(() => {
    if (!isFullscreen) {
      setShowControls(true)
    }
  }, [isFullscreen])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return
    videoRef.current[isPlaying ? 'pause' : 'play']()
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  const handleProgressChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return
    const newTime = (Number(e.target.value) / 100) * videoRef.current.duration
    videoRef.current.currentTime = newTime
    setProgress(Number(e.target.value))
  }, [])

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
    setVolume(isMuted ? currentVolume : 0)
  }, [isMuted, currentVolume])

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return
    const newVolume = Number(e.target.value)
    videoRef.current.volume = newVolume
    setVolume(newVolume)
    setCurrentVolume(newVolume)
    setIsMuted(newVolume === 0)
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (!playerRef.current) return
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }, [])

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

  const handleDownloadVideo = async () => {
    if (!videoRef.current || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const stream = canvas.captureStream()
    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' })

    const chunks: Blob[] = []
    mediaRecorder.ondataavailable = (e) => chunks.push(e.data)
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'edited_video.webm'
      a.click()
      URL.revokeObjectURL(url)
    }

    mediaRecorder.start()

    const video = videoRef.current
    video.currentTime = (video.duration * trimStart) / 100

    const processFrame = () => {
      if (video.currentTime >= (video.duration * trimEnd) / 100) {
        mediaRecorder.stop()
        return
      }

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      ctx.filter = `brightness(${brightness}%)`
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      if (textOverlay) {
        ctx.font = '24px Arial'
        ctx.fillStyle = 'white'
        ctx.fillText(textOverlay, 20, 40)
      }

      video.currentTime += 1 / 30 // Assume 30 fps
      requestAnimationFrame(processFrame)
    }

    video.onseeked = processFrame
    video.currentTime = (video.duration * trimStart) / 100
  }

  return (
    <div className="min-h-screen flex flex-col px-6">
      <Header />

      <main className="container mx-auto flex flex-col lg:flex-row h-screen">
        {!video && (
          <div className="pt-5 w-full">
            <div className="flex flex-row justify-evenly gap-4 items-center w-full">
              <div className="w-2/5 flex flex-col gap-4">
                <Label htmlFor="video-upload">Video Upload</Label>
                <div
                  {...getRootProps()}
                  className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors border-gray-300 hover:border-primary"
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop the video file here ...</p>
                  ) : (
                    <>
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="pt-2">
                        Drag & drop a video here, or click to select one
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div className="font-bold text-xl w-1/5 flex justify-center">
                Or
              </div>
              <div className="flex flex-col gap-4 w-2/5 h-[146px]">
                <Label htmlFor="screen-recorder">Record your screen</Label>
                <div className="border-2 border-dashed rounded-lg p-3 pt-1 text-center border-gray-300 items-center justify-center flex flex-col">
                  <VideoIcon size="3.25em" className="text-gray-400" />
                  <ScreenRecorder
                    onRecordingComplete={(src) => setVideo(src)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {video && (
          <div className="flex flex-col lg:flex-row gap-8 w-full pt-5">
            <div className="space-y-8 w-full lg:w-1/4">
              <div className="space-y-4">
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
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="mute" checked={isMuted} onCheckedChange={toggleMute} />
                <Label htmlFor="mute">Mute Audio</Label>
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
              <Button
                className="w-full"
                onClick={handleDownloadVideo}
              >
                Export Video
              </Button>
            </div>

            <div className="w-full lg:w-3/4 h-fit flex items-center justify-center bg-secondary relative border rounded-lg">
              <div ref={playerRef} className="relative w-full">
                <video
                  ref={videoRef}
                  className="w-full cursor-pointer rounded-lg"
                  src={video}
                  onClick={togglePlay}
                  style={{ filter: `brightness(${brightness}%)` }}
                  muted={isMuted}
                >
                  Your browser does not support the video tag.
                </video>
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center" onClick={togglePlay}>
                    <Play size={64} className="text-white opacity-50" />
                  </div>
                )}
                {textOverlay && (
                  <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded">
                    {textOverlay}
                  </div>
                )}
                <div className={`
                  text-white
                  p-2 w-full absolute
                  bottom-0
                  left-0
                  transition-opacity duration-300 ease-in-out
                  ${showControls ? 'opacity-100' : 'opacity-0'}
                `}>
                  <div className="flex items-center justify-between">
                    <button onClick={togglePlay} className="p-1 bg-transparent border-none cursor-pointer flex items-center justify-center mr-0 text-inherit">
                      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={progress}
                      onChange={handleProgressChange}
                      className="w-full mx-2 cursor-pointer"
                    />
                    <div className="flex items-center">
                      <button onClick={toggleMute} className="p-1">
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-16 mx-2"
                      />
                      <button onClick={toggleFullscreen} className="p-1">
                        {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  )
}