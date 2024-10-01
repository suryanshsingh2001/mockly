"use client";

import React, { useState, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Upload } from "lucide-react";

export default function VideoEditor() {
  const [video, setVideo] = useState<string | null>(null);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(100);
  const [muted, setMuted] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [textOverlay, setTextOverlay] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setVideo(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "video/*": [] },
  });

  const handleTrimChange = (values: number[]) => {
    setTrimStart(values[0]);
    setTrimEnd(values[1]);
    if (videoRef.current) {
      videoRef.current.currentTime =
        (videoRef.current.duration * values[0]) / 100;
    }
  };

  const handleBrightnessChange = (value: number[]) => {
    setBrightness(value[0]);
  };

  return (
    // <div className="container mx-auto max-w-screen-lg pt-3">
    <main className="mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4 p-2 overflow-y-auto h-full">
          <Label htmlFor="video-upload" className="block mb-4">
            Video Upload
          </Label>
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
          {video && (
            <div className="mt-4">
              <Button
                onClick={() => setVideo(null)}
                variant="secondary"
                className="w-full"
              >
                Change/Remove Video
              </Button>
            </div>
          )}
          {video && (
            <div className="space-y-8 mt-4">
              <Label>Trim Video</Label>
              <Slider
                min={0}
                max={100}
                step={1}
                value={[trimStart, trimEnd]}
                onValueChange={handleTrimChange}
              />
              <div className="flex items-center space-x-2">
                <Switch id="mute" checked={muted} onCheckedChange={setMuted} />
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
        <div className="relative mt-2 w-full lg:w-3/4 border rounded-lg flex items-center justify-center bg-secondary overflow-hidden min-h-[342px] h-fit">
          {video && (
            <video
              ref={videoRef}
              src={video}
              controls
              className="w-full rounded-lg"
              style={{ filter: `brightness(${brightness}%)` }}
              muted={muted}
            />
          )}
          {textOverlay && (
            <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded">
              {textOverlay}
            </div>
          )}
        </div>
      </div>
    </main>
    // </div>
  );
}
