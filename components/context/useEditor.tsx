import { useState, useCallback } from "react";
import {
  BackgroundTab,
  ScreenSize,
  Shadow,
  TextStyle,
  ValidationError,
} from "@/lib/types";
import { backgroundUrls, screenSizes } from "@/lib/constants";

// Define the default settings object
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
  validationError: {
    customHeight: "",
    customWidth: "",
  },
};

export function useEditorState() {
  // Image states
  const [image, setImage] = useState<string | null>(defaultSettings.image);
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);
  const [imagePosition, setImagePosition] = useState(
    defaultSettings.imagePosition
  );
  const [zoom, setZoom] = useState(defaultSettings.zoom);
  const [transparency, setTransparency] = useState(
    defaultSettings.transparency
  );
  const [borderRadius, setBorderRadius] = useState(
    defaultSettings.borderRadius
  );

  // Background states
  const [backgroundTab, setBackgroundTab] = useState<BackgroundTab>(
    defaultSettings.backgroundTab
  );
  const [background, setBackground] = useState(defaultSettings.background);
  const [isCustomBackground, setIsCustomBackground] = useState(false);
  const [isUrlFormat, setIsUrlFormat] = useState<boolean>(true);
  const [customImg, setCustomImg] = useState<string>("");
  const [backgroundImage, setBackgroundImage] =
    useState<HTMLImageElement | null>(null);
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);

  // Color states
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

  // Screen size states
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

  // Shadow state
  const [shadow, setShadow] = useState<Shadow>(defaultSettings.shadow);

  // Text states
  const [text, setText] = useState(defaultSettings.text);
  const [textStyle, setTextStyle] = useState<TextStyle>(
    defaultSettings.textStyle
  );
  const [textPosition, setTextPosition] = useState(
    defaultSettings.textPosition
  );

  // UI states
  const [isDragging, setIsDragging] = useState(false);
  const [dragTarget, setDragTarget] = useState<"image" | "text" | null>(null);
  const [browsedFile, setIsBrowsedFile] = useState(false);
  const [displayFileName, setDisplayFileName] = useState<string>("");
  const [scale, setScale] = useState(1);
  const [format, setDownloadFormat] = useState<"png" | "jpg" | "svg" | "pdf">(
    defaultSettings.format
  );

  const handleReset = useCallback(() => {
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
  }, []);

  return {
    // Image states
    image,
    setImage,
    loadedImage,
    setLoadedImage,
    imagePosition,
    setImagePosition,
    zoom,
    setZoom,
    transparency,
    setTransparency,
    borderRadius,
    setBorderRadius,

    // Background states
    backgroundTab,
    setBackgroundTab,
    background,
    setBackground,
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

    // Color states
    customColor1,
    setCustomColor1,
    customColor2,
    setCustomColor2,
    customColor3,
    setCustomColor3,
    gradientAngle,
    setGradientAngle,

    // Screen size states
    screenSize,
    setScreenSize,
    customWidth,
    setCustomWidth,
    customHeight,
    setCustomHeight,
    presetScreenSize,
    setPresetScreenSize,
    validationError,
    setValidationError,

    // Shadow state
    shadow,
    setShadow,

    // Text states
    text,
    setText,
    textStyle,
    setTextStyle,
    textPosition,
    setTextPosition,

    // UI states
    isDragging,
    setIsDragging,
    dragTarget,
    setDragTarget,
    browsedFile,
    setIsBrowsedFile,
    displayFileName,
    setDisplayFileName,
    scale,
    setScale,
    format,
    setDownloadFormat,

    // Reset function
    handleReset,
  };
}
