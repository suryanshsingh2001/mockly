"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Upload,
  X,
  RotateCcw,
  RotateCcwIcon,
  LinkIcon,
  Sparkles,
} from "lucide-react";
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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import Header from "@/components/shared/Header.v2";
import { ShadowManager, type Shadow } from "@/components/shadow-manager";
import { ScreenSize, ValidationError } from "./types";
import ValidatedInput from "./ValidatedInput";
import { validateInput } from "./utils";
import { TextManager, type TextStyle } from "../text-manager";
import { Card, CardContent } from "../ui/card";
import { Separator } from "@radix-ui/react-select";
import ExportButton from "./buttons/ExportButton";
import { truncateFileName } from "@/lib/utils";
import { backgroundUrls, screenSizes } from "@/lib/constants";
import { getGradientFromImage } from "@/lib/extractColors";
import { useEditorState } from "../context/useEditor";

const validationError = {
  customHeight: "",
  customWidth: "",
} satisfies ValidationError;

type BackgroundTab = "color" | "gradient" | "image";

const defaultSettings = {
  image: null,
  background: backgroundUrls[0],
  backgroundTab: "image" as BackgroundTab,
  customColor1: "#ffffff",
  customColor2: "#000000",
  customColor3: "#000000",
  gradientAngle: 0,
  screenSize: screenSizes[2],
  zoom: 50,
  transparency: 100,
  borderRadius: 0,
  shadow: {
    color: "#000000",
    x: 0,
    y: 0,
    blur: 0,
  },
  imagePosition: { x: 0.5, y: 0.5 },
  text: "",
  textPosition: {
    x: 50,
    y: 50,
  },
  textStyle: {
    textColor: "#000000",
    fontFamily: "Arial",
    bold: false,
    italic: false,
    underline: false,
    applyStroke: false,
    strokeColor: "#fff",
    strokeWidth: 2,
    fontSize: 24,
    letterSpacing: 0,
  },
  format: "png" as "png" | "jpg" | "svg" | "pdf",
  validationError,
};

export default function MockupEditor() {
  const {
    image,
    setImage,
    loadedImage,
    imagePosition,
    setImagePosition,
    zoom,
    setZoom,
    transparency,
    setTransparency,
    borderRadius,
    setBorderRadius,
    shadow,
    setShadow,
    text,
    setText,
    textPosition,
    setTextPosition,
    textStyle,
    setTextStyle,
    screenSize,
    setScreenSize,
    presetScreenSize,
    setPresetScreenSize,
    customHeight,
    setCustomHeight,
    customWidth,
    setCustomWidth,
    gradientAngle,
    setGradientAngle,
    customColor1,
    setCustomColor1,
    customColor2,
    setCustomColor2,
    customColor3,
    setCustomColor3,
    background,
    setBackground,
    backgroundTab,
    setBackgroundTab,
    validationError,
    setValidationError,
    isCustomBackground,
    setIsCustomBackground,
    isUrlFormat,
    setIsUrlFormat,
    customImg,
    setCustomImg,
    backgroundImage,
    setBackgroundImage,
    isBackgroundLoaded,
    setIsBackgroundLoaded,
    isDragging,
    setIsDragging,
    dragTarget,
    setDragTarget,
    setLoadedImage,
    setIsBrowsedFile,
    scale,
    setScale,
    setDisplayFileName,
    displayFileName,
    browsedFile,

  } = useEditorState();

  // Refs for canvas and container elements

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const linkRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<any>(null);

  const customScreenSize = {
    height: Number(customHeight),
    width: Number(customWidth),
  } satisfies ScreenSize;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImageSrc = e.target?.result as string;

        const newImage = new Image();
        newImage.src = newImageSrc;
        newImage.onload = () => setLoadedImage(newImage);
        setImage(newImageSrc);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const onCustomDrop = useCallback((acceptedFiles: File[]) => {
    // Function to handle custom Background Image drop

    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImageSrc = e.target?.result as string;
        setBackground(newImageSrc);
        setIsBrowsedFile(true);
        setDisplayFileName(newImageSrc);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  useEffect(() => {
    if (!image) {
      setLoadedImage(null);
      return;
    }

    const img = new Image();
    img.src = image;
    img.onload = () => setLoadedImage(img);
  }, [image]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const {
    getRootProps: getCustomRootProps,
    getInputProps: getCustomInputProps,
    isDragActive: isCustomDragActive,
  } = useDropzone({
    onDrop: onCustomDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const [format, setDownloadFormat] = useState<"png" | "jpg" | "svg" | "pdf">(
    defaultSettings.format
  );

  const handleClearImage = () => {
    setImage(null);
    setLoadedImage(null);
  };

  const handleReset = () => {
    setImage(defaultSettings.image);
    setBackground(defaultSettings.background);
    setCustomColor1(defaultSettings.customColor1);
    setCustomColor2(defaultSettings.customColor2);
    setCustomColor3(defaultSettings.customColor3);
    setGradientAngle(defaultSettings.gradientAngle);
    setScreenSize(defaultSettings.screenSize);
    setPresetScreenSize(defaultSettings.screenSize);
    setCustomHeight(defaultSettings.screenSize.height.toString());
    setCustomWidth(defaultSettings.screenSize.width.toString());
    setValidationError(defaultSettings.validationError);
    setZoom(defaultSettings.zoom);
    setTransparency(defaultSettings.transparency);
    setBorderRadius(defaultSettings.borderRadius);
    setShadow(defaultSettings.shadow);
    setImagePosition(defaultSettings.imagePosition);
    setText(defaultSettings.text);
    setTextPosition(defaultSettings.textPosition);
    setTextStyle(defaultSettings.textStyle);
    setDownloadFormat(defaultSettings.format);
    setLoadedImage(null);
    setIsCustomBackground(false);
    setBackgroundTab(defaultSettings.backgroundTab);
    setCustomImg("");
    setDisplayFileName("");
  };

  const autoPickColor = async () => {
    if (!image) {
      return;
    }
    getGradientFromImage(image).then((colors) => {
      if (colors) {
        console.log(colors);
        setCustomColor1(colors[0]);
        setCustomColor2(colors[1]);
        setCustomColor3(colors[2]);
        setBackground("gradient");
        setBackgroundTab("gradient");
      }
    });
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
    if (background.startsWith("data:image/") || background.startsWith("http")) {
      const img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.src = background; // No need to set crossOrigin for data URLs
      img.onload = () => {
        setBackgroundImage(img);
        setIsBackgroundLoaded(true);
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

  useEffect(() => {
    const loadImage = (src: string) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setBackgroundImage(img); // Set the image for further use
        setIsBackgroundLoaded(true);
      };
      img.onerror = () => {
        console.error("Failed to load image");
        setBackgroundImage(null); // Reset in case of error
        setIsBackgroundLoaded(false);
      };
    };
    if (customImg !== undefined && customImg !== null) {
      if (customImg.trim() === "") {
        setIsUrlFormat(true);
        setBackground(defaultSettings.background);
      } else if (
        customImg?.startsWith("http") ||
        customImg?.startsWith("data:image/")
      ) {
        loadImage(customImg);
        setIsUrlFormat(true);
        setBackground(customImg);
      } else {
        setIsUrlFormat(false);
        setBackgroundImage(null);
        setIsBackgroundLoaded(false);
      }
    }
  }, [customImg]);

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
      gradient.addColorStop(0.33, customColor2);
      gradient.addColorStop(1, customColor3);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    screenSize.width,
    screenSize.height,
    isBackgroundLoaded,
    backgroundImage,
    background,
    borderRadius,
    loadedImage,
    textStyle,
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
    drawCanvas(); // Redraw the canvas whenever text position changes
  }, [drawCanvas]);

  const drawImage = (ctx: CanvasRenderingContext2D) => {
    if (loadedImage) {
      const scale = zoom / 100;
      const w = loadedImage.width * scale;
      const h = loadedImage.height * scale;
      const x = imagePosition.x;
      const y = imagePosition.y;

      // Draw shadow
      if (shadow.blur > 0) {
        ctx.save();

        ctx.shadowColor = shadow.color;
        ctx.shadowBlur = shadow.blur;
        ctx.shadowOffsetX = shadow.x;
        ctx.shadowOffsetY = shadow.y;

        if (borderRadius > 0) {
          // Shadow the image with border radius
          ctx.beginPath();
          ctx.roundRect(x, y, w, h, borderRadius);
          ctx.fillStyle = shadow.color;
          ctx.fill();
        } else {
          // Shadow the image without border radius
          // Allows for a more accurate shadow on transparent images
          ctx.globalAlpha = transparency / 100;
          ctx.drawImage(loadedImage, x, y, w, h);
        }

        ctx.restore();
      }

      ctx.save();
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, borderRadius);
      ctx.clip();
      ctx.globalAlpha = transparency / 100;
      ctx.drawImage(loadedImage, x, y, w, h);
      ctx.restore();
    }
  };

  const drawText = (ctx: CanvasRenderingContext2D) => {
    if (text) {
      const fontWeight = textStyle.bold ? "bold" : "normal";
      const fontStyle = textStyle.italic ? "italic" : "normal";
      const fontSize = `${textStyle.fontSize}px`;
      const fontFamily = textStyle.fontFamily;

      ctx.font = `${fontStyle} ${fontWeight} ${fontSize} ${fontFamily}`;
      ctx.fillStyle = textStyle.textColor; // Text fill color

      const letterSpacing = textStyle.letterSpacing;
      let currentX = textPosition.x; // Store a copy of the x position

      // Draw each character individually with spacing
      for (let i = 0; i < text.length; i++) {
        const char = text[i];

        // Conditionally apply the border (stroke) if applyStroke is true
        if (textStyle.applyStroke) {
          ctx.strokeStyle = textStyle.strokeColor; // Border color
          ctx.lineWidth = textStyle.strokeWidth; // Border width
          ctx.strokeText(char, currentX, textPosition.y);
        }

        // Draw the filled text
        ctx.fillText(char, currentX, textPosition.y);

        currentX += ctx.measureText(char).width + letterSpacing; // Move to the next position
      }

      // Draw underline (if applicable)
      if (textStyle.underline) {
        const totalTextWidth = currentX - textPosition.x; // Total width of the spaced text
        const underlineY = textPosition.y + 3; // Position of the underline

        ctx.beginPath(); // Begin a new path for the underline
        ctx.moveTo(textPosition.x, underlineY);
        ctx.lineTo(textPosition.x + totalTextWidth, underlineY);
        ctx.strokeStyle = ctx.fillStyle;
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // Cleanup event listeners
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    image,
    text,
    scale,
    loadedImage,
    imagePosition.x,
    imagePosition.y,
    textPosition.x,
    textPosition.y,
    isDragging,
    dragTarget,
  ]);

  const handleMouseDown = (e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / scale;
      const y = (e.clientY - rect.top) / scale;

      if (image && isPointInImage(x, y)) {
        setIsDragging(true);
        setDragTarget("image");
        offsetRef.current = {
          x: x - imagePosition.x,
          y: y - imagePosition.y,
        };
        e.preventDefault();
      } else if (text && isPointInText(x, y)) {
        setIsDragging(true);
        setDragTarget("text");
        offsetRef.current = { x: x - textPosition.x, y: y - textPosition.y };
        e.preventDefault();
      }
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) / scale;
        const y = (e.clientY - rect.top) / scale;

        if (dragTarget === "image" && loadedImage) {
          setImagePosition({
            x: x - offsetRef.current.x,
            y: y - offsetRef.current.y,
          });
        } else if (dragTarget === "text") {
          setTextPosition({
            x: x - offsetRef.current.x,
            y: y - offsetRef.current.y,
          });
        }
      }
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
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
      const fontWeight = textStyle.bold ? "bold" : "normal";
      const fontStyle = textStyle.italic ? "italic" : "normal";
      const fontSize = `${textStyle.fontSize}px`;
      const fontFamily = textStyle.fontFamily;

      if (ctx) {
        ctx.font = `${fontFamily}${fontStyle} ${fontWeight} ${fontSize} `;
        const metrics = ctx.measureText(text);

        return (
          x >= textPosition.x &&
          x <= textPosition.x + metrics.width &&
          y >= textPosition.y - textStyle.fontSize &&
          y <= textPosition.y
        );
      }
    }
    return false;
  };

  const handlePresetSizeChange = (value: string) => {
    const size = screenSizes[parseInt(value)];
    setPresetScreenSize(size);
    setScreenSize(size);
  };

  const handleScreenSizeTabChange = (tab: "preset" | "custom") => {
    const { success: isHeightCorrect } = validateInput(customHeight);
    const { success: isWidthCorrect } = validateInput(customWidth);
    const success = isHeightCorrect && isWidthCorrect;

    const size =
      tab === "preset" || !success ? presetScreenSize : customScreenSize;

    if (!success && !isHeightCorrect) {
      setCustomHeight(size.height.toString());
    }
    if (!success && !isWidthCorrect) {
      setCustomWidth(size.width.toString());
    }
    setScreenSize(size);
    setValidationError(defaultSettings.validationError);
  };

  const customBackgroundClick = () => {
    setIsCustomBackground(!isCustomBackground);
  };

  const deleteUploadedImage = () => {
    setBackground(defaultSettings.background);
    setDisplayFileName("");
    setIsBrowsedFile(false);
  };

  const handleTextFocus = () => {
    if (fileRef.current) {
      fileRef.current.value = "";
      setIsBrowsedFile(false);
      setDisplayFileName("");
    }
  };

  const handleFileFocus = () => {
    setCustomImg("");
    if (linkRef.current) {
      linkRef.current.value = "";
      setDisplayFileName("");
    }
  };

  useEffect(() => {
    if (displayFileName === "") {
      setIsBrowsedFile(false);
    }
  }, [displayFileName]);

  return (
    <div className="flex flex-col px-6">
      <Header />
      <main className="container mx-auto h-screen ">
        <div className="flex flex-col lg:flex-row gap-8 ">
          <div className="w-full lg:w-1/4 space-y-8  overflow-y-auto h-full p-2 ">
            <div className="">
              <Label htmlFor="image-upload" className="block mb-4 text-md">
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

              {image && (
                <div className="flex items-center justify-start mt-2 group">
                  <button
                    onClick={() => {
                      setImagePosition({
                        x: 0,
                        y: 0,
                      });
                    }}
                    className="text-sm text-muted-foreground hover:underline flex flex-row flex-nowrap gap-1 items-center"
                  >
                    <RotateCcwIcon
                      size="1em"
                      className="group-hover:-rotate-90 transition-transform duration-300"
                    />{" "}
                    Reset image position
                  </button>
                </div>
              )}
            </div>
            <div className="w-full">
              <div className="flex items-center justify-between  mb-2">
                <Label htmlFor="background" className="block text-md">
                  Background
                </Label>

                <Button
                  onClick={autoPickColor}
                  variant={"default"}
                  size={"sm"}
                  className="text-white font-semibold rounded transition transform hover:scale-105"
                >
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Auto Pick
                  </>
                </Button>
              </div>

              <Tabs
                defaultValue="image"
                value={backgroundTab}
                onValueChange={(value) => {
                  setBackgroundTab(value as BackgroundTab);
                }}
                className="w-full"
              >
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
                      <Input
                        type="color"
                        value={customColor3}
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

                <TabsContent value="image">
                  <Tabs
                    defaultValue="preset"
                    className="w-full max-w-3xl mx-auto"
                  >
                    <TabsList className="grid w-full grid-cols-2 bg-primary text-slate-950 rounded-2xl ">
                      <TabsTrigger value="preset" className="rounded-2xl">
                        Preset
                      </TabsTrigger>
                      <TabsTrigger value="custom" className="rounded-2xl">
                        Custom
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="preset" className="mt-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {backgroundUrls.map((url, index) => (
                          <div
                            key={index}
                            className={`relative aspect-video cursor-pointer overflow-hidden rounded-lg ${
                              background === url ? "ring-2 ring-primary" : ""
                            }`}
                            onClick={() => setBackground(url)}
                          >
                            <img
                              src={url}
                              alt={`Background ${index + 1}`}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="custom" className="mt-4">
                      <Card>
                        <CardContent className="p-6">
                          <div className="space-y-6">
                            <div className="space-y-2">
                              <Label
                                htmlFor="image-url"
                                className="text-sm font-medium"
                              >
                                Image URL
                              </Label>
                              <div className="relative">
                                <Input
                                  id="image-url"
                                  type="text"
                                  placeholder="Paste image link here"
                                  className="pr-10"
                                  value={customImg}
                                  onChange={(e) => setCustomImg(e.target.value)}
                                  onFocus={handleTextFocus}
                                  ref={linkRef}
                                />
                                <LinkIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                              </div>
                              {!isUrlFormat && customImg !== "" && (
                                <p className="text-red-500 text-sm">
                                  Invalid URL format
                                </p>
                              )}
                            </div>

                            <div className="flex items-center justify-center">
                              <Separator className="flex-grow" />
                              <span className="px-3 text-sm text-gray-500">
                                OR
                              </span>
                              <Separator className="flex-grow" />
                            </div>

                            <div
                              {...getCustomRootProps()}
                              className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
                            >
                              <input {...getCustomInputProps()} />
                              {browsedFile ? (
                                <div className="flex items-center justify-between">
                                  <span className="text-sm truncate flex-1">
                                    {truncateFileName(displayFileName)}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={deleteUploadedImage}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              ) : (
                                <div>
                                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                  <p className="mt-2 text-sm text-gray-500">
                                    Drag & drop or click to upload
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </TabsContent>
              </Tabs>
            </div>
            <div className="w-full">
              <Label htmlFor="screen-size" className="block mb-4 text-md">
                Screen Size
              </Label>
              <Tabs defaultValue="preset" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger
                    value="preset"
                    onClick={() => handleScreenSizeTabChange("preset")}
                  >
                    Preset
                  </TabsTrigger>
                  <TabsTrigger
                    value="custom"
                    onClick={() => handleScreenSizeTabChange("custom")}
                  >
                    Custom
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="preset">
                  <Select
                    onValueChange={(value) => handlePresetSizeChange(value)}
                    value={screenSizes.indexOf(presetScreenSize).toString()}
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
                </TabsContent>
                <TabsContent value="custom">
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <ValidatedInput
                        placeholder="Width"
                        className="w-1/2 h-10"
                        value={customWidth}
                        setValue={setCustomWidth}
                        setError={(msg) =>
                          setValidationError({
                            ...validationError,
                            customWidth: msg,
                          })
                        }
                        onSuccess={() => setScreenSize(customScreenSize)}
                      />
                      <ValidatedInput
                        placeholder="Height"
                        className="w-1/2 h-10"
                        value={customHeight}
                        setValue={setCustomHeight}
                        setError={(msg) =>
                          setValidationError({
                            ...validationError,
                            customHeight: msg,
                          })
                        }
                        onSuccess={() => setScreenSize(customScreenSize)}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <div className="mt-2">
                {validationError.customWidth && (
                  <p className="text-red-500 text-sm font-medium leading-none">
                    {validationError.customWidth}
                  </p>
                )}
                {validationError.customHeight && (
                  <p className="text-red-500 text-sm font-medium leading-none text-right">
                    {validationError.customHeight}
                  </p>
                )}
              </div>
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="shadow">
                      Shadow: {shadow.blur ? shadow.blur : 0}px
                    </Label>
                    <ShadowManager
                      shadowValue={shadow}
                      setShadowValue={setShadow}
                    />
                  </div>
                  <Slider
                    id="shadow"
                    min={0}
                    max={50}
                    step={1}
                    value={[shadow.blur]}
                    onValueChange={(value) =>
                      setShadow((prevShadow) => ({
                        ...prevShadow,
                        blur: value[0],
                      }))
                    }
                  />
                </div>
              </TabsContent>
              <TabsContent value="text" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="text">Text</Label>
                  <div className="flex flex-row flex-nowrap gap-2 items-center justify-between">
                    <Input
                      id="text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Enter text"
                    />
                    <TextManager
                      value={textStyle}
                      onChange={(value: TextStyle) => setTextStyle(value)}
                    />
                  </div>
                  {text && (
                    <div className="flex items-center justify-start mt-2 group">
                      <button
                        onClick={() => {
                          setTextPosition({
                            x: 50,
                            y: 50,
                          });
                        }}
                        className="text-sm text-muted-foreground hover:underline flex flex-row flex-nowrap gap-1 items-center"
                      >
                        <RotateCcwIcon
                          size="1em"
                          className="group-hover:-rotate-90 transition-transform duration-300"
                        />{" "}
                        Reset text position
                      </button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex space-x-2 w-full">
              <ExportButton canvasRef={canvasRef} handleReset={handleReset} />

              <Button
                onClick={() => handleReset()}
                variant="outline"
                className="w-1/2"
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
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
