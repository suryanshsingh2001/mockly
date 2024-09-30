import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Settings2Icon } from "lucide-react";

export type Shadow = {
  x: number;
  y: number;
  spread: number;
  blur: number;
};

interface ShadowManagerProps {
  defaultValue: Shadow;
  onChange: (value: Shadow) => void;
}

export const ShadowManager: React.FC<ShadowManagerProps> = ({
  defaultValue,
  onChange,
}) => {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [xValue, setXValue] = useState(defaultValue.x);
  const [yValue, setYValue] = useState(defaultValue.y);
  const [spreadValue, setSpreadValue] = useState(defaultValue.spread);
  const [blurValue, setBlurValue] = useState(defaultValue.blur);

  // Function to handle state change and propagate values
  const handleInputChange = (newValues: Partial<Shadow>) => {
    const updatedShadow = {
      x: xValue,
      y: yValue,
      spread: spreadValue,
      blur: blurValue,
      ...newValues,
    };
    onChange(updatedShadow);
  };

  return (
    <Popover open={popoverVisible} onOpenChange={setPopoverVisible}>
      <PopoverTrigger className="p-1.5 hover:bg-input rounded">
        <Settings2Icon size="1.25rem" />
      </PopoverTrigger>

      <PopoverContent className="w-60" align="start">
        <div className="grid grid-cols-5 gap-4">
          <Label
            htmlFor="xoffset"
            className="col-span-2 flex items-center text-nowrap"
          >
            X-Offset
          </Label>
          <Input
            id="xoffset"
            type="number"
            className="col-span-3"
            value={xValue}
            onChange={(e) => {
              const newValue = parseInt(e.target.value);
              setXValue(newValue);
              handleInputChange({ x: newValue });
            }}
          />

          <Label
            htmlFor="yoffset"
            className="col-span-2 flex items-center text-nowrap"
          >
            Y-Offset
          </Label>
          <Input
            id="yoffset"
            type="number"
            className="col-span-3"
            value={yValue}
            onChange={(e) => {
              const newValue = parseInt(e.target.value);
              setYValue(newValue);
              handleInputChange({ y: newValue });
            }}
          />

          <Label
            htmlFor="spread"
            className="col-span-2 flex items-center text-nowrap"
          >
            Spread
          </Label>
          <Input
            id="spread"
            type="number"
            className="col-span-3"
            value={spreadValue}
            onChange={(e) => {
              const newValue = parseInt(e.target.value);
              setSpreadValue(newValue);
              handleInputChange({ spread: newValue });
            }}
          />

          <Label
            htmlFor="blur"
            className="col-span-2 flex items-center text-nowrap"
          >
            Blur
          </Label>
          <Input
            id="blur"
            type="number"
            className="col-span-3"
            value={blurValue}
            onChange={(e) => {
              const newValue = parseInt(e.target.value);
              setBlurValue(newValue);
              handleInputChange({ blur: newValue });
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
