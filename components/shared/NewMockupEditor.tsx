"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { saveAs } from "file-saver";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Upload, X, Download, RotateCcw, Type } from "lucide-react";
import Header from "@/components/layout/Header";

const backgroundUrls = [
  "https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&h=900&fit=crop",
  "https://images.unsplash.com/photo-1560015534-cee980ba7e13?w=1600&h=900&fit=crop",
  "https://images.unsplash.com/photo-1501696461415-6bd6660c6742?w=1600&h=900&fit=crop",
  "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1600&h=900&fit=crop",
  "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=1600&h=900&fit=crop",
  "https://images.unsplash.com/photo-1557682260-96773eb01377?w=1600&h=900&fit=crop",
  "https://images.unsplash.com/photo-1557682268-e3955ed5d83f?w=1600&h=900&fit=crop",
  "https://images.unsplash.com/photo-1557683311-eac922347aa1?w=1600&h=900&fit=crop",
];

const screenSizes = [
  { name: "Mobile", width: 375, height: 667 },
  { name: "Tablet", width: 768, height: 1024 },
  { name: "Desktop", width: 1440, height: 900 },
];

const defaultSettings = {
  image: null,
  background: backgroundUrls[0],
  customColor1: "#ffffff",
  customColor2: "#000000",
  gradientAngle: 0,
  screenSize: screenSizes[2],
  zoom: 50,
  transparency: 100,
  borderRadius: 0,
  shadow: 0,
  imagePosition: { x: 0.5, y: 0.5 },
  text: "",
  textPosition: { x: 50, y: 50 },
  fontSize: 24,
  fontWeight: "normal",
  textColor: "#000000",
};

export default function MockupEditor() {
  const [image, setImage] = useState<string | null>(defaultSettings.image);
  const [background, setBackground] = useState(defaultSettings.background);
  const [customColor1, setCustomColor1] = useState(
    defaultSettings.customColor1
  );
  const [customColor2, setCustomColor2] = useState(
    defaultSettings.customColor2
  );
  const [gradientAngle, setGradientAngle] = useState(
    defaultSettings.gradientAngle
  );
  const [screenSize, setScreenSize] = useState(defaultSettings.screenSize);
  const [zoom, setZoom] = useState(defaultSettings.zoom);
  const [transparency, setTransparency] = useState(
    defaultSettings.transparency
  );
  const [borderRadius, setBorderRadius] = useState(
    defaultSettings.borderRadius
  );
  const [shadow, setShadow] = useState(defaultSettings.shadow);
  const [scale, setScale] = useState(1);
  const [imagePosition, setImagePosition] = useState(
    defaultSettings.imagePosition
  );
  console.log(imagePosition);
  const [text, setText] = useState(defaultSettings.text);
  const [textPosition, setTextPosition] = useState(
    defaultSettings.textPosition
  );
  const [fontSize, setFontSize] = useState(defaultSettings.fontSize);
  const [fontWeight, setFontWeight] = useState(defaultSettings.fontWeight);
  const [textColor, setTextColor] = useState(defaultSettings.textColor);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragTarget, setDragTarget] = useState<"image" | "text" | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleDownload = () => {
    if (canvasRef.current) {
      const image = new Image();
      image.setAttribute("crossOrigin", "anonymous");
      image.src = canvasRef.current.toDataURL("image/png");

      const filename = `screenshot${Date.now()}.png`;
      saveAs(image.src, filename);
    }
  };

  const handleClearImage = () => {
    setImage(null);
  };

  const handleReset = () => {
    setImage(defaultSettings.image);
    setBackground(defaultSettings.background);
    setCustomColor1(defaultSettings.customColor1);
    setCustomColor2(defaultSettings.customColor2);
    setGradientAngle(defaultSettings.gradientAngle);
    setScreenSize(defaultSettings.screenSize);
    setZoom(defaultSettings.zoom);
    setTransparency(defaultSettings.transparency);
    setBorderRadius(defaultSettings.borderRadius);
    setShadow(defaultSettings.shadow);
    setImagePosition(defaultSettings.imagePosition);
    setText(defaultSettings.text);
    setTextPosition(defaultSettings.textPosition);
    setFontSize(defaultSettings.fontSize);
    setFontWeight(defaultSettings.fontWeight);
    setTextColor(defaultSettings.textColor);
  };

  const updateCanvasScale = useCallback(() => {
    if (containerRef.current && canvasRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      const canvasAspectRatio = screenSize.width / screenSize.height;
      const containerAspectRatio = containerWidth / containerHeight;

      let newScale;
      if (containerAspectRatio > canvasAspectRatio) {
        newScale = containerHeight / screenSize.height;
      } else {
        newScale = containerWidth / screenSize.width;
      }

      setScale(Math.min(newScale, 1));
    }
  }, [screenSize.width, screenSize.height]);

  useEffect(() => {
    updateCanvasScale();
    window.addEventListener("resize", updateCanvasScale);
    return () => window.removeEventListener("resize", updateCanvasScale);
  }, [updateCanvasScale]);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      canvas.width = screenSize.width;
      canvas.height = screenSize.height;

      // Draw background
      if (background.startsWith("http")) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          drawImage(ctx);
          drawText(ctx);
        };
        img.setAttribute("crossOrigin", "anonymous");
        img.src = background;
      } else if (background === "gradient") {
        const gradient = ctx.createLinearGradient(
          0,
          0,
          Math.cos((gradientAngle * Math.PI) / 180) * canvas.width,
          Math.sin((gradientAngle * Math.PI) / 180) * canvas.height
        );
        gradient.addColorStop(0, customColor1);
        gradient.addColorStop(1, customColor2);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawImage(ctx);
        drawText(ctx);
      } else {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawImage(ctx);
        drawText(ctx);
      }
    }
  }, [
    image,
    background,
    customColor1,
    customColor2,
    gradientAngle,
    screenSize,
    zoom,
    transparency,
    borderRadius,
    shadow,
    imagePosition,
    text,
    textPosition,
    fontSize,
    fontWeight,
    textColor,
  ]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvas?.getContext("2d");
  //   if (canvas && ctx) {
  //     canvas.width = screenSize.width;
  //     canvas.height = screenSize.height;

  //     // Draw background
  //     if (background.startsWith("http")) {
  //       const img = new Image();
  //       img.onload = () => {
  //         ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  //         drawImage();
  //         drawText();
  //       };
  //       img.setAttribute("crossOrigin", "anonymous");
  //       img.src = background;
  //     } else if (background === "gradient") {
  //       const gradient = ctx.createLinearGradient(
  //         0,
  //         0,
  //         Math.cos((gradientAngle * Math.PI) / 180) * canvas.width,
  //         Math.sin((gradientAngle * Math.PI) / 180) * canvas.height
  //       );
  //       gradient.addColorStop(0, customColor1);
  //       gradient.addColorStop(1, customColor2);
  //       ctx.fillStyle = gradient;
  //       ctx.fillRect(0, 0, canvas.width, canvas.height);
  //       drawImage();
  //       drawText();
  //     } else {
  //       ctx.fillStyle = background;
  //       ctx.fillRect(0, 0, canvas.width, canvas.height);
  //       drawImage();
  //       drawText();
  //     }
  //   }
  // }, [
  //   image,
  //   background,
  //   customColor1,
  //   customColor2,
  //   gradientAngle,
  //   screenSize,
  //   zoom,
  //   transparency,
  //   borderRadius,
  //   shadow,
  //   imagePosition,
  //   text,
  //   textPosition,
  //   fontSize,
  //   fontWeight,
  //   textColor,
  // ]);

  const drawImage = (ctx: CanvasRenderingContext2D) => {
    if (image) {
      const img = new Image();
      img.onload = () => {
        const scale = zoom / 100;
        const w = img.width * scale;
        const h = img.height * scale;
        const x = imagePosition.x;
        const y = imagePosition.y;

        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, borderRadius);
        ctx.clip();
        ctx.globalAlpha = transparency / 100;
        ctx.drawImage(img, x, y, w, h);
        ctx.restore();

        // Draw shadow
        if (shadow > 0) {
          ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
          ctx.shadowBlur = shadow;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          ctx.strokeRect(x, y, w, h);
        }
      };
      img.src = image;
    }
  };

  const drawText = (ctx: CanvasRenderingContext2D) => {
    if (text) {
      ctx.font = `${fontWeight} ${fontSize}px Arial`;
      ctx.fillStyle = textColor;
      ctx.fillText(text, textPosition.x, textPosition.y);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / scale;
      const y = (e.clientY - rect.top) / scale;

      if (image && isPointInImage(x, y)) {
        setIsDragging(true);
        setDragTarget("image");
      } else if (text && isPointInText(x, y)) {
        setIsDragging(true);
        setDragTarget("text");
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) / scale;
        const y = (e.clientY - rect.top) / scale;

        if (dragTarget === "image") {
          setImagePosition({ x, y });
        } else if (dragTarget === "text") {
          setTextPosition({ x, y });
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragTarget(null);
  };

  const isPointInImage = (x: number, y: number) => {
    if (image) {
      const img = new Image();
      img.src = image;
      const w = img.width * (zoom / 100);
      const h = img.height * (zoom / 100);
      return (
        x >= imagePosition.x &&
        x <= imagePosition.x + w &&
        y >= imagePosition.y &&
        y <= imagePosition.y + h
      );
    }
    return false;
  };

  const isPointInText = (x: number, y: number) => {
    if (text) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (ctx) {
        ctx.font = `${fontWeight} ${fontSize}px Arial`;
        const metrics = ctx.measureText(text);
        return (
          x >= textPosition.x &&
          x <= textPosition.x + metrics.width &&
          y >= textPosition.y - fontSize &&
          y <= textPosition.y
        );
      }
    }
    return false;
  };

  

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-2">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/4 space-y-8 h-screen">
            <div>
              <Label htmlFor="image-upload" className="block mb-4">
                Upload Image
              </Label>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? "border-primary bg-primary/10"
                    : "border-gray-300 hover:border-primary"
                }`}
              >
                <input {...getInputProps()} id="image-upload" />
                {image ? (
                  <div className="flex items-center justify-center">
                    <img
                      src={image}
                      alt="Uploaded"
                      className="max-h-24 max-w-full"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleClearImage}
                      className="ml-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2">
                      Drag & drop an image here, or click to select one
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="background" className="block mb-4">
                Background
              </Label>
              <Tabs defaultValue="color" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="color">Color</TabsTrigger>
                  <TabsTrigger value="gradient">Gradient</TabsTrigger>
                  <TabsTrigger value="image">Image</TabsTrigger>
                </TabsList>
                <TabsContent value="color">
                  <Input
                    type="color"
                    value={
                      background === "gradient" ? customColor1 : background
                    }
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
                          setCustomColor1(e.target.value);
                          setBackground("gradient");
                        }}
                        className="w-1/2 h-10"
                      />
                      <Input
                        type="color"
                        value={customColor2}
                        onChange={(e) => {
                          setCustomColor2(e.target.value);
                          setBackground("gradient");
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
                        setGradientAngle(value[0]);
                        setBackground("gradient");
                      }}
                    />
                    <p className="text-sm text-gray-500">
                      Angle: {gradientAngle}°
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="image" className="grid grid-cols-4 gap-2">
                  {backgroundUrls.map((url, index) => (
                    <div
                      key={index}
                      className="relative aspect-video cursor-pointer overflow-hidden rounded-lg"
                      onClick={() => setBackground(url)}
                    >
                      <img
                        src={url}
                        alt={`Background ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
            <div>
              <Label htmlFor="screen-size" className="block mb-4">
                Screen Size
              </Label>
              <Select
                onValueChange={(value) =>
                  setScreenSize(screenSizes[parseInt(value)])
                }
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

          

            <Tabs defaultValue="design" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="text">Text</TabsTrigger>
              </TabsList>
              <TabsContent value="design" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="zoom">Zoom: {zoom}%</Label>
                  <Slider
                    id="zoom"
                    min={10}
                    max={200}
                    step={1}
                    value={[zoom]}
                    onValueChange={(value) => setZoom(value[0])}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transparency">
                    Transparency: {transparency}%
                  </Label>
                  <Slider
                    id="transparency"
                    min={0}
                    max={100}
                    step={1}
                    value={[transparency]}
                    onValueChange={(value) => setTransparency(value[0])}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="border-radius">
                    Border Radius: {borderRadius}px
                  </Label>
                  <Slider
                    id="border-radius"
                    min={0}
                    max={50}
                    step={1}
                    value={[borderRadius]}
                    onValueChange={(value) => setBorderRadius(value[0])}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shadow">Shadow: {shadow}px</Label>
                  <Slider
                    id="shadow"
                    min={0}
                    max={50}
                    step={1}
                    value={[shadow]}
                    onValueChange={(value) => setShadow(value[0])}
                  />
                </div>
              </TabsContent>
              <TabsContent value="text" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="text">Text</Label>
                  <Input
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="font-size">Font Size: {fontSize}px</Label>
                  <Slider
                    id="font-size"
                    min={12}
                    max={72}
                    step={1}
                    value={[fontSize]}
                    onValueChange={(value) => setFontSize(value[0])}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="font-weight">Font Weight</Label>
                  <Select
                    onValueChange={(value) => setFontWeight(value)}
                    value={fontWeight}
                  >
                    <SelectTrigger id="font-weight">
                      <SelectValue placeholder="Select font weight" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="bold">Bold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="text-color">Text Color</Label>
                  <Input
                    id="text-color"
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-full h-10"
                  />
                </div>
              </TabsContent>
            </Tabs>




            <div className="flex space-x-2">
              <Button
                onClick={handleDownload}
                className="w-full"
                disabled={!image && !text}
              >
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full"
              >
                <RotateCcw className="mr-2 h-4 w-4" /> Reset
              </Button>


              </div>
          </div>

          <div
            ref={containerRef}
            className="w-full lg:w-3/4 border rounded-lg flex items-center justify-center bg-secondary h-[calc(100vh-12rem)] overflow-auto"
          >
            <div
              className="relative rounded-lg"  
              style={{
                width: `${screenSize.width * scale}px`,
                height: `${screenSize.height * scale}px`,
              }}
            >
              <canvas
                ref={canvasRef}
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
