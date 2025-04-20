export type BackgroundTab = "color" | "gradient" | "image";

export interface ScreenSize {
  width: number;
  height: number;
  name?: string;
}

export interface Shadow {
  color: string;
  x: number;
  y: number;
  blur: number;
}

export interface TextStyle {
  textColor: string;
  fontFamily: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  applyStroke: boolean;
  strokeColor: string;
  strokeWidth: number;
  fontSize: number;
  letterSpacing: number;
}

export interface ValidationError {
  customHeight: string;
  customWidth: string;
}