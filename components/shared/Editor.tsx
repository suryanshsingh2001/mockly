"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Upload, X, Download, RotateCcw, Type, Star } from "lucide-react";
import Header from "@/components/layout/Header";
import { Textarea } from "../ui/textarea";

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
  format: "png" as "png" | "jpg" | "svg" | "pdf",
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

  //Complete and rating
  const [complete, setComplete] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);
  const [backgroundImage, setBackgroundImage] =
    useState<HTMLImageElement | null>(null);
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = new Image();
        newImage.src = e.target?.result as string;
        newImage.onload = () => setLoadedImage(newImage);
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  useEffect(() => {
    if (image) {
      const img = new Image();
      img.onload = () => {
        setLoadedImage(img);
      };
      img.src = image;
    } else {
      setLoadedImage(null);
    }
  }, [image]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const [format, setDownloadFormat] = useState<"png" | "jpg" | "svg" | "pdf">(
    defaultSettings.format
  );

  const handleDownload = (format: "png" | "jpg" | "svg" | "pdf") => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;

      if (format === "png" || format === "jpg") {
        const mimeType = format === "png" ? "image/png" : "image/jpeg";
        const imageData = canvas.toDataURL(mimeType);
        const filename = `screenshot${Date.now()}.${format}`;
        saveAs(imageData, filename);
      } else if (format === "svg") {
        // Convert canvas to SVG data
        const svgWidth = canvas.width;
        const svgHeight = canvas.height;

        const svgData = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">
                           <foreignObject width="100%" height="100%">
                             <img xmlns="http://www.w3.org/1999/xhtml" src="${canvas.toDataURL(
                               "image/png"
                             )}" width="${svgWidth}" height="${svgHeight}"/>
                           </foreignObject>
                         </svg>`;
        const svgBlob = new Blob([svgData], {
          type: "image/svg+xml;charset=utf-8",
        });
        const filename = `screenshot${Date.now()}.svg`;
        saveAs(svgBlob, filename);
      } else if (format === "pdf") {
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const pdf = new jsPDF({
          orientation: imgWidth > imgHeight ? "landscape" : "portrait",
          unit: "px",
          format: [imgWidth, imgHeight],
        });

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        const filename = `screenshot${Date.now()}.pdf`;
        pdf.save(filename);
      }

      setComplete(true);
    }
  };

  const handleClearImage = () => {
    setImage(null);
  };

  const handleCloseDialog = () => {
    setComplete(false);
    setRating(0);
    setComment("");
  };

  const handleSubmitFeedback = () => {
    // Here you would typically send the rating and comment to your backend
    console.log("Rating:", rating);
    console.log("Comment:", comment);
    handleCloseDialog();
    handleReset();
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
    setDownloadFormat(defaultSettings.format);
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

  useEffect(() => {
    if (background.startsWith("http")) {
      const img = new Image();
      img.src = background;

      img.onload = () => {
        setBackgroundImage(img);
        setIsBackgroundLoaded(true); // Mark as loaded
        console.log("Background image loaded");
      };

      img.onerror = () => {
        console.error("Failed to load background image");
        setBackgroundImage(null);
        setIsBackgroundLoaded(false);
      };
    } else {
      setBackgroundImage(null);
      setIsBackgroundLoaded(false);
    }
  }, [background]);

  const drawBackgroundImage = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (isBackgroundLoaded && backgroundImage) {
      ctx.drawImage(backgroundImage, 0, 0, ctx.canvas.width, ctx.canvas.height);
    } else if (background === "gradient") {
      const gradient = ctx.createLinearGradient(
        0,
        0,
        Math.cos((gradientAngle * Math.PI) / 180) * screenSize.width,
        Math.sin((gradientAngle * Math.PI) / 180) * screenSize.height
      );
      gradient.addColorStop(0, customColor1);
      gradient.addColorStop(1, customColor2);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, screenSize.width, screenSize.height);
    } else {
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, screenSize.width, screenSize.height);
    }

    drawImage(ctx);
    drawText(ctx);
  };

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      canvas.width = screenSize.width;
      canvas.height = screenSize.height;

      drawBackgroundImage(ctx);
    }

    requestAnimationFrame(drawCanvas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    screenSize.width,
    screenSize.height,
    isBackgroundLoaded,
    backgroundImage,
    background,
    loadedImage,
    fontWeight,
    fontSize,
    textColor,
    text,
    textPosition.x,
    textPosition.y,
    gradientAngle,
    customColor1,
    customColor2,
    zoom,
    transparency,
    imagePosition.x,
    imagePosition.y,
    shadow,
  ]);

  useEffect(() => {
    drawCanvas(); // Trigger canvas redraw on updates
  }, [drawCanvas]);

  const drawImage = (ctx: CanvasRenderingContext2D) => {
    if (loadedImage) {
      const scale = zoom / 100;
      const w = loadedImage.width * scale;
      const h = loadedImage.height * scale;

      ctx.save();
      ctx.globalAlpha = transparency / 100;
      ctx.drawImage(loadedImage, imagePosition.x, imagePosition.y, w, h);
      ctx.restore();

      // Draw shadow
      if (shadow > 0) {
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        ctx.shadowBlur = shadow;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.strokeRect(imagePosition.x, imagePosition.y, w, h);
      }
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

        if (dragTarget === "image" && loadedImage) {
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
      <main className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/4 space-y-8 overflow-y-auto h-full p-2">
            <div className="">
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
                    {
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={image}
                        alt="Uploaded"
                        className="max-h-24 max-w-full"
                      />
                    }
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
            <div className="w-full">
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
                      onClick={() => {
                        setBackground(url);
                      }}
                    >
                      {
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={url}
                          alt={`Background ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                      }
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
              {/* <Button
                onClick={handleDownload}
                className="w-full"
                disabled={!image && !text}
              >
                <Download className="mr-2 h-4 w-4" /> Download
              </Button> */}
              {/* <select
                value={format}
                onChange={(e) =>
                  setDownloadFormat(
                    e.target.value as "png" | "jpg" | "svg" | "pdf"
                  )
                }
                className="mb-4 p-2 border border-gray-300 rounded-md"
              >
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
                <option value="svg">SVG</option>
                <option value="pdf">PDF</option>
              </select>
              <Button
                onClick={() => handleDownload(format)}
                className="w-full"
                disabled={!image && !text}
              >
                <Download className="mr-2 h-4 w-4" /> Download
              </Button> */}
              <Select
                value={format}
                onValueChange={(value) =>
                  setDownloadFormat(value as "png" | "jpg" | "svg" | "pdf")
                }
              >
                <SelectTrigger className="mb-4 p-2 border  rounded-md">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="jpg">JPG</SelectItem>
                  <SelectItem value="svg">SVG</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>

              <Button
                onClick={() => handleDownload(format)}
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
            className="w-full lg:w-3/4 border rounded-lg flex items-center justify-center bg-secondary h-[calc(100vh-12rem)] overflow-hidden"
          >
            <div
              className="relative overflow-hidden"
              style={{
                width: `${screenSize.width * scale}px`,
                height: `${screenSize.height * scale}px`,
              }}
            >
              <canvas
                className=""
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

      <Dialog open={complete} onOpenChange={setComplete}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Thank you for using Mockly!</DialogTitle>
            <DialogDescription>
              We&apos;d love to hear your feedback. How was your experience?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-8 h-8 cursor-pointer transition-colors ${
                    star <= rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            <Textarea
              id="comment"
              placeholder="Leave a comment (optional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button onClick={handleSubmitFeedback}>Submit Feedback</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
