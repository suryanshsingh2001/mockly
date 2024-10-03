import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Settings2Icon, Bold, Italic, Underline, TypeOutline } from "lucide-react"
import { Slider } from "./ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export type TextStyle = {
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
};

export const TextManager = (props: any) => {
  const { value, onChange } = props;

  const [popoverVisible, setPopoverVisible] = useState(false);
  const [textStyleValue, setTextStyleValue] = useState<TextStyle>(value);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setTextStyleValue(value);
  }, [value]);

  const handleInputChange = (newValues: Partial<TextStyle>) => {
    const updatedTextStyle = {
      textColor: value.textColor,
      fontFamily: value.fontFamily,
      bold: value.bold,
      italic: value.italic,
      underline: value.underline,
      applyStroke: value.applyStroke,
      strokeColor: value.strokeColor,
      strokeWidth: value.strokeWidth,
      fontSize: value.fontSize,
      letterSpacing: value.letterSpacing,
      ...newValues,
    };
    onChange(updatedTextStyle);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Popover open={popoverVisible} onOpenChange={setPopoverVisible}>
      <PopoverTrigger className="p-1.5 hover:bg-input rounded">
        <Settings2Icon size="1.25rem" />
      </PopoverTrigger>

      <PopoverContent
        className="w-60 flex flex-col gap-4 p-4"
        align={isMobile ? "end" : "start"}
      >
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Text Style</h4>
          <p className="text-sm text-muted-foreground leading-tight">
            Tweak how the text is applied.
          </p>
        </div>

        <div className="grid grid-cols-5 gap-4 items-center">
          <ToggleGroup
            size={"sm"}
            type="multiple"
            className="col-span-5 flex gap-1 justify-start"
            value={[
              ...(textStyleValue.bold ? ['bold'] : []),
              ...(textStyleValue.italic ? ['italic'] : []),
              ...(textStyleValue.underline ? ['underline'] : []),
              ...(textStyleValue.applyStroke ? ['stroke'] : [])
            ]}
            onValueChange={(value) => {
              console.log("value: ", value);
              setTextStyleValue({
                ...textStyleValue,
                bold: value.includes('bold'),
                italic: value.includes('italic'),
                underline: value.includes('underline'),
                applyStroke: value.includes('stroke')
              });
              handleInputChange({
                bold: value.includes('bold'),
                italic: value.includes('italic'),
                underline: value.includes('underline'),
                applyStroke: value.includes('stroke')
              });
            }}
          >
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">
              <Underline className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="stroke" aria-label="Toggle stroke">
              <TypeOutline className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>

          <Label
            htmlFor="font-family"
            className="col-span-2 flex items-center text-nowrap"
          >
            Font Family
          </Label>
          <Select
            onValueChange={(value) => {
              console.log("Text: ", value);
              setTextStyleValue({ ...textStyleValue, fontFamily: value });
              handleInputChange({ fontFamily: value });
            }}
            value={textStyleValue.fontFamily}
          >
            <SelectTrigger id="font-family" className="col-span-3 flex gap-2 justify-start">
              <SelectValue placeholder="Select font family" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Arial">Arial</SelectItem>
              <SelectItem value="Impact">Impact</SelectItem>
              <SelectItem value="Georgia">Georgia</SelectItem>
              <SelectItem value="Trebuchet MS">Trebuchet MS</SelectItem>
              <SelectItem value="Courier New">Courier New</SelectItem>
              <SelectItem value="Comic Sans MS">Comic Sans MS</SelectItem>
            </SelectContent>
          </Select>

          <Label
            htmlFor="text-color"
            className="col-span-2 flex items-center text-nowrap"
          >
            Text Color
          </Label>
          <Input
            id="text-color"
            type="color"
            value={textStyleValue.textColor}
            onChange={(e) => {
              const newValue = e.target.value;
              setTextStyleValue({ ...textStyleValue, textColor: newValue });
              handleInputChange({ textColor: newValue });
            }}
            className="col-span-3"
          />

          <Label
            htmlFor="font-size"
            className="col-span-2 flex items-center text-nowrap"
          >
            Font Size:
          </Label>
          <Slider
            className="col-span-2"
            id="font-size"
            min={12}
            max={72}
            step={1}
            value={[textStyleValue.fontSize]}
            onValueChange={(value) => {
              setTextStyleValue({ ...textStyleValue, fontSize: value[0] });
              handleInputChange({ fontSize: value[0] });
            }}
          />
          <Label className="col-span-1">
            {textStyleValue.fontSize}px
          </Label>

          <Label
            htmlFor="letter-spacing"
            className="col-span-2 flex items-center text-nowrap"
          >
            Spacing:
          </Label>
          <Slider
            className="col-span-2"
            id="letter-spacing"
            min={0}
            max={30}
            step={1}
            value={[textStyleValue.letterSpacing]}
            onValueChange={(value) => {
              setTextStyleValue({ ...textStyleValue, letterSpacing: value[0] });
              handleInputChange({ letterSpacing: value[0] });
            }}
          />
          <Label className="col-span-1">
            {textStyleValue.letterSpacing}
          </Label>

          <div className={`flex flex-col col-span-5 transition-opacity ${textStyleValue.applyStroke ? 'opacity-100' : 'opacity-50'}`}>
            <div className={`flex gap-4 items-center`}>
              <Label
                htmlFor="stroke-color"
                className=" text-nowrap"
              >
                Stroke Color:
              </Label>
              <Input
                id="stroke-color"
                type="color"
                value={textStyleValue.strokeColor}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setTextStyleValue({ ...textStyleValue, strokeColor: newValue });
                  handleInputChange({ strokeColor: newValue });
                }}
                disabled={!textStyleValue.applyStroke}
                className=""
              />
            </div>

            <div className={`flex gap-4 items-center mt-4`}>
              <Label
                htmlFor="stroke-width"
                className="text-nowrap"
              >
                Thickness:
              </Label>
              <Slider
                className="col-span-2"
                id="stroke-width"
                min={0}
                max={20}
                step={1}
                value={[textStyleValue.strokeWidth]}
                onValueChange={(value) => {
                  setTextStyleValue({ ...textStyleValue, strokeWidth: value[0] });
                  handleInputChange({ strokeWidth: value[0] });
                }}
                disabled={!textStyleValue.applyStroke}
              />
              <Label className="col-span-1">
                {textStyleValue.strokeWidth}
              </Label>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
