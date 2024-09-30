import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Settings2Icon } from "lucide-react";

export type Shadow = {
  color: string;
  x: number;
  y: number;
  blur: number;
};

interface ShadowManagerProps {
  value: Shadow;
  onChange: (value: Shadow) => void;
}

export const ShadowManager: React.FC<ShadowManagerProps> = ({
  value,
  onChange,
}) => {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [shadowValue, setShadowValue] = useState<Shadow>(value);

  useEffect(() => {
    setShadowValue(value);
  }, [value]);

  const handleInputChange = (newValues: Partial<Shadow>) => {
    const updatedShadow = {
      x: shadowValue.x,
      y: shadowValue.y,
      color: shadowValue.color,
      blur: shadowValue.blur,
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
            htmlFor="color"
            className="col-span-2 flex items-center text-nowrap"
          >
            Color
          </Label>
          <Input
            id="color"
            type="color"
            className="col-span-3"
            value={shadowValue.color}
            onChange={(e) => {
              const newValue = e.target.value;
              setShadowValue({ ...shadowValue, color: newValue });
              handleInputChange({ color: newValue });
            }}
          />

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
            value={shadowValue.x}
            onChange={(e) => {
              const newValue = parseInt(e.target.value);
              setShadowValue({ ...shadowValue, x: newValue });
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
            value={shadowValue.y}
            onChange={(e) => {
              const newValue = parseInt(e.target.value);
              setShadowValue({ ...shadowValue, y: newValue });
              handleInputChange({ y: newValue });
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
            value={shadowValue.blur}
            onChange={(e) => {
              const newValue = parseInt(e.target.value);
              setShadowValue({ ...shadowValue, blur: newValue });
              handleInputChange({ blur: newValue });
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
