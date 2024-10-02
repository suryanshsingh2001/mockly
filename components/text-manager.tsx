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
import { Settings2Icon, Bold, Italic, Underline } from "lucide-react"
import { Slider } from "./ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export type TextStyle = {
  textColor: string;
  fontFamily: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  stroke: boolean;
  strokeColor: string;
  fontSize: number;
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
      bold: value.bold,
      italic: value.italic,
      underline: value.underline,
      stroke: value.stroke,
      strokeColor: value.strokeColor,
      fontSize: value.fontSize,
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
        className="w-60 flex flex-col gap-4 p-4" // Increased gap and added padding for spacing
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
            size={"lg"}
            type="multiple"
            className="col-span-4 flex gap-2 justify-start" 
            value={[
              ...(textStyleValue.bold ? ['bold'] : []),
              ...(textStyleValue.italic ? ['italic'] : []),
              ...(textStyleValue.underline ? ['underline'] : [])
            ]}
            onValueChange={(value) => {
              console.log("value: ", value);
              setTextStyleValue({ 
                ...textStyleValue, 
                bold: value.includes('bold'),
                italic: value.includes('italic'),
                underline: value.includes('underline')
              });
              handleInputChange({ 
                bold: value.includes('bold'),
                italic: value.includes('italic'),
                underline: value.includes('underline')
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
          </ToggleGroup>

          <Label 
            htmlFor="font-weight"
            className="col-span-2 flex items-center text-nowrap"
          >
            Font Family
          </Label>
          <Select
            onValueChange={(value) =>setTextStyleValue({...textStyleValue, fontFamily: value}) }
            value={textStyleValue.fontFamily}
          >
            <SelectTrigger id="font-family" className="col-span-4 flex gap-2 justify-start">
              <SelectValue placeholder="Select font family" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Arial">Arial</SelectItem>
              <SelectItem value="Helvetica">Helvetica</SelectItem>
              <SelectItem value="Lora">Lora</SelectItem>
              <SelectItem value="Montserrat">Montserrat</SelectItem>
              <SelectItem value="Tahoma">Tahoma</SelectItem>
            </SelectContent>
          </Select>

          <Label
            htmlFor="textcolor"
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
          <Label>
            {textStyleValue.fontSize}px
          </Label>
        </div>
      </PopoverContent>

    </Popover>
  );
};
