"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  Upload,
  X,
  RotateCcw,
  RotateCcwIcon,
  LinkIcon,
  Sparkles,
  Plus,
  Minus,
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
import { Header } from "@/components/layout/LandingHeader";
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
import { BackgroundGradient } from "../layout/background-gradient";


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
  const [image, setImage] = useState<string | null>(defaultSettings.image);

  const [backgroundTab, setBackgroundTab] = useState<BackgroundTab>(
    defaultSettings.backgroundTab
  );
  const [background, setBackground] = useState(defaultSettings.background);
  const [isCustomBackground, setIsCustomBackground] = useState(false);
  const [isUrlFormat, setIsUrlFormat] = useState<boolean>(true);
  const [customImg, setCustomImg] = useState<string>("");
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);
  const [backgroundImage, setBackgroundImage] =
    useState<HTMLImageElement | null>(null);
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);
  const [customColor1, setCustomColor1] = useState(
    defaultSettings.customColor1
  );
  const [customColor2, setCustomColor2] = useState(
    defaultSettings.customColor2
  );
  const [customColor3, setCustomColor3] = useState(
    defaultSettings.customColor3
  );
  const [gradientAngle, setGradientAngle] = useState(
    defaultSettings.gradientAngle
  );
  const [screenSize, setScreenSize] = useState<ScreenSize>(
    defaultSettings.screenSize
  );
  const [customWidth, setCustomWidth] = useState(
    defaultSettings.screenSize.width.toString()
  );
  const [customHeight, setCustomHeight] = useState(
    defaultSettings.screenSize.height.toString()
  );
  const [presetScreenSize, setPresetScreenSize] = useState(
    defaultSettings.screenSize
  );
  const [validationError, setValidationError] = useState<ValidationError>(
    defaultSettings.validationError
  );
  const [zoom, setZoom] = useState(defaultSettings.zoom);
  const [transparency, setTransparency] = useState(
    defaultSettings.transparency
  );
  const [borderRadius, setBorderRadius] = useState(
    defaultSettings.borderRadius
  );
  const [shadow, setShadow] = useState<Shadow>(defaultSettings.shadow);
  const [scale, setScale] = useState(1);
  const [imagePosition, setImagePosition] = useState(
    defaultSettings.imagePosition
  );
  const [text, setText] = useState(defaultSettings.text);
  const [textStyle, setTextStyle] = useState<TextStyle>(
    defaultSettings.textStyle
  );
  const [textPosition, setTextPosition] = useState(
    defaultSettings.textPosition
  );

  const [browsedFile, setIsBrowsedFile] = useState(false);
  const [displayFileName, setDisplayFileName] = useState<string>("");
  const [textMetrics, setTextMetrics] = useState<{
    width: number;
    height: number;
  } | null>(null);

  // Refs for canvas and container elements

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const linkRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Drag state as refs — never rendered, no re-render needed
  const isDraggingRef = useRef(false);
  const dragTargetRef = useRef<"image" | "text" | null>(null);

  // Mirrors of state values read inside event handlers
  const scaleRef = useRef(scale);
  const imageRef = useRef(image);
  const textRef = useRef(text);
  const loadedImageRef = useRef(loadedImage);
  const zoomRef = useRef(zoom);
  const imagePositionRef = useRef(imagePosition);
  const textPositionRef = useRef(textPosition);
  const textMetricsRef = useRef(textMetrics);

  // Hover state for overlay visibility
  const [hoveredTarget, setHoveredTarget] = useState<"image" | "text" | null>(null);
  const hoveredTargetRef = useRef<"image" | "text" | null>(null);

  // Ref for the inner preview div (non-passive wheel listener)
  const innerDivRef = useRef<HTMLDivElement>(null);

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
    setHoveredTarget(null);
  };

  const autoPickColor = async () => {
    if (!image) {
      return;
    }
    getGradientFromImage(image).then((colors) => {
      if (colors) {
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
      img.onload = () => {
        setBackgroundImage(img); // Set the image for further use
        setIsBackgroundLoaded(true);
      };
      img.onerror = () => {
        console.error("Failed to load image");
        setBackgroundImage(null); // Reset in case of error
        setIsBackgroundLoaded(false);
      };
      img.src = src;
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

  // Keep handler refs in sync with latest state
  useEffect(() => { scaleRef.current = scale; }, [scale]);
  useEffect(() => { imageRef.current = image; }, [image]);
  useEffect(() => { textRef.current = text; }, [text]);
  useEffect(() => { loadedImageRef.current = loadedImage; }, [loadedImage]);
  useEffect(() => { zoomRef.current = zoom; }, [zoom]);
  useEffect(() => { imagePositionRef.current = imagePosition; }, [imagePosition]);
  useEffect(() => { textPositionRef.current = textPosition; }, [textPosition]);
  useEffect(() => { textMetricsRef.current = textMetrics; }, [textMetrics]);
  useEffect(() => { hoveredTargetRef.current = hoveredTarget; }, [hoveredTarget]);

  useEffect(() => {
    const el = innerDivRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setZoom(prev => Math.max(10, Math.min(200, prev + (e.deltaY < 0 ? 10 : -10))));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const shadowDeps = useMemo(
    () => [shadow.color, shadow.x, shadow.y, shadow.blur],
    [shadow.color, shadow.x, shadow.y, shadow.blur]
  );

  const textStyleDeps = useMemo(
    () => [
      textStyle.textColor,
      textStyle.fontFamily,
      textStyle.fontSize,
      textStyle.bold,
      textStyle.italic,
      textStyle.underline,
      textStyle.applyStroke,
      textStyle.strokeColor,
      textStyle.strokeWidth,
      textStyle.letterSpacing,
    ],
    [
      textStyle.textColor,
      textStyle.fontFamily,
      textStyle.fontSize,
      textStyle.bold,
      textStyle.italic,
      textStyle.underline,
      textStyle.applyStroke,
      textStyle.strokeColor,
      textStyle.strokeWidth,
      textStyle.letterSpacing,
    ]
  );

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
    ...textStyleDeps,
    ...shadowDeps,
    text,
    textPosition.x,
    textPosition.y,
    gradientAngle,
    customColor1,
    customColor2,
    customColor3,
    zoom,
    transparency,
    imagePosition.x,
    imagePosition.y,
  ]);

  useEffect(() => {
    drawCanvas(); // Redraw the canvas whenever text position changes
  }, [drawCanvas]);

  const drawImage = (ctx: CanvasRenderingContext2D) => {
    if (loadedImage) {
      if (loadedImage) {
        ctx.save(); // Single save

        const scale = zoom / 100;
        const w = loadedImage.width * scale;
        const h = loadedImage.height * scale;
        const x = imagePosition.x;
        const y = imagePosition.y;

        // Apply all transformations at once
        ctx.globalAlpha = transparency / 100;

        if (shadow.blur > 0) {
          ctx.shadowColor = shadow.color;
          ctx.shadowBlur = shadow.blur;
          ctx.shadowOffsetX = shadow.x;
          ctx.shadowOffsetY = shadow.y;
        }

        if (borderRadius > 0) {
          ctx.beginPath();
          ctx.roundRect(x, y, w, h, borderRadius);
          ctx.clip();
        }

        ctx.drawImage(loadedImage, x, y, w, h);
        ctx.restore(); // Single restore
      }
    }
  };

  const handleMouseDown = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / scaleRef.current;
      const y = (e.clientY - rect.top) / scaleRef.current;

      if (imageRef.current && isPointInImage(x, y)) {
        isDraggingRef.current = true;
        dragTargetRef.current = "image";
        setHoveredTarget("image");
        offsetRef.current = {
          x: x - imagePositionRef.current.x,
          y: y - imagePositionRef.current.y,
        };
        e.preventDefault();
      } else if (textRef.current && isPointInText(x, y)) {
        isDraggingRef.current = true;
        dragTargetRef.current = "text";
        setHoveredTarget("text");
        offsetRef.current = {
          x: x - textPositionRef.current.x,
          y: y - textPositionRef.current.y,
        };
        e.preventDefault();
      }
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scaleRef.current;
    const y = (e.clientY - rect.top) / scaleRef.current;

    if (isDraggingRef.current) {
      if (dragTargetRef.current === "image" && loadedImageRef.current) {
        setImagePosition({
          x: x - offsetRef.current.x,
          y: y - offsetRef.current.y,
        });
      } else if (dragTargetRef.current === "text") {
        setTextPosition({
          x: x - offsetRef.current.x,
          y: y - offsetRef.current.y,
        });
      }
    } else {
      const hit: "image" | "text" | null =
        isPointInImage(x, y) ? "image" : isPointInText(x, y) ? "text" : null;
      if (hit !== hoveredTargetRef.current) {
        setHoveredTarget(hit);
      }
    }
  }, []);

  const handleMouseUp = useCallback((_e: MouseEvent) => {
    isDraggingRef.current = false;
    dragTargetRef.current = null;
  }, []);

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp]);

  const isPointInImage = (x: number, y: number) => {
    const img = loadedImageRef.current;
    if (img) {
      const w = img.width * (zoomRef.current / 100);
      const h = img.height * (zoomRef.current / 100);
      return (
        x >= imagePositionRef.current.x &&
        x <= imagePositionRef.current.x + w &&
        y >= imagePositionRef.current.y &&
        y <= imagePositionRef.current.y + h
      );
    }
    return false;
  };

  // Update metrics when text or style changes
  useEffect(() => {
    if (text && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        const fontWeight = textStyle.bold ? "bold" : "normal";
        const fontStyle = textStyle.italic ? "italic" : "normal";
        ctx.font = `${fontStyle} ${fontWeight} ${textStyle.fontSize}px ${textStyle.fontFamily}`;
        const metrics = ctx.measureText(text);
        setTextMetrics({
          width: metrics.width + (text.length - 1) * textStyle.letterSpacing,
          height: textStyle.fontSize,
        });
      }
    }
  }, [text, textStyle]);

  const drawText = (ctx: CanvasRenderingContext2D) => {
    if (!text) return;

    ctx.save();

    const fontWeight = textStyle.bold ? "bold" : "normal";
    const fontStyle = textStyle.italic ? "italic" : "normal";
    ctx.font = `${fontStyle} ${fontWeight} ${textStyle.fontSize}px ${textStyle.fontFamily}`;
    ctx.fillStyle = textStyle.textColor;

    // If no letter spacing, use optimized single draw
    if (textStyle.letterSpacing === 0) {
      if (textStyle.applyStroke) {
        ctx.strokeStyle = textStyle.strokeColor;
        ctx.lineWidth = textStyle.strokeWidth;
        ctx.strokeText(text, textPosition.x, textPosition.y);
      }
      ctx.fillText(text, textPosition.x, textPosition.y);
    } else {
      // Use character-by-character only when needed
      let currentX = textPosition.x;
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (textStyle.applyStroke) {
          ctx.strokeStyle = textStyle.strokeColor;
          ctx.lineWidth = textStyle.strokeWidth;
          ctx.strokeText(char, currentX, textPosition.y);
        }
        ctx.fillText(char, currentX, textPosition.y);
        currentX += ctx.measureText(char).width + textStyle.letterSpacing;
      }
    }

    // Optimized underline
    if (textStyle.underline) {
      const textWidth = textMetrics?.width || ctx.measureText(text).width;
      ctx.beginPath();
      ctx.moveTo(textPosition.x, textPosition.y + 3);
      ctx.lineTo(textPosition.x + textWidth, textPosition.y + 3);
      ctx.strokeStyle = textStyle.textColor;
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    ctx.restore();
  };

  const isPointInText = (x: number, y: number) => {
    const metrics = textMetricsRef.current;
    if (metrics) {
      return (
        x >= textPositionRef.current.x &&
        x <= textPositionRef.current.x + metrics.width &&
        y >= textPositionRef.current.y - metrics.height &&
        y <= textPositionRef.current.y
      );
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
    <div className="flex flex-col min-h-screen relative">
      <BackgroundGradient
        primaryColor="indigo-600"
        secondaryColor="blue-500"
        accentColor="violet-400"
        gridOpacity="0.02"
        disableShapes
        className="absolute inset-0"
      />
      <Header />
      <main className="container mx-auto flex-1 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 py-8">
          <div className="w-full lg:w-1/4 space-y-8 overflow-y-auto h-full p-2">
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
                          setCustomColor3(e.target.value);
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
              ref={innerDivRef}
              className={`relative overflow-hidden ${hoveredTarget !== null ? "cursor-grab active:cursor-grabbing" : ""}`}
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

              {/* Image selection overlay */}
              {loadedImage && (
                <div
                  className={`absolute pointer-events-none border-2 border-dashed transition-colors duration-150 ${
                    hoveredTarget === "image" ? "border-white/90" : "border-white/25"
                  }`}
                  style={{
                    left: imagePosition.x * scale,
                    top: imagePosition.y * scale,
                    width: loadedImage.width * (zoom / 100) * scale,
                    height: loadedImage.height * (zoom / 100) * scale,
                  }}
                >
                  <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-white rounded-sm shadow-sm" />
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-sm shadow-sm" />
                  <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-white rounded-sm shadow-sm" />
                  <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-white rounded-sm shadow-sm" />
                </div>
              )}

              {/* Text selection overlay */}
              {text && textMetrics && (
                <div
                  className={`absolute pointer-events-none border-2 border-dashed transition-colors duration-150 ${
                    hoveredTarget === "text" ? "border-blue-400/90" : "border-blue-400/25"
                  }`}
                  style={{
                    left: textPosition.x * scale,
                    top: (textPosition.y - textMetrics.height) * scale,
                    width: textMetrics.width * scale,
                    height: textMetrics.height * scale,
                  }}
                />
              )}

              {/* In-preview zoom controls */}
              {loadedImage && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-0.5 bg-black/60 backdrop-blur-sm text-white rounded-full px-1 py-1 z-10 select-none">
                  <button
                    onClick={() => setZoom(prev => Math.max(10, prev - 10))}
                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-xs font-medium tabular-nums w-10 text-center">{zoom}%</span>
                  <button
                    onClick={() => setZoom(prev => Math.min(200, prev + 10))}
                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
