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
  shadowValue: Shadow;
  setShadowValue: React.Dispatch<React.SetStateAction<Shadow>>
}

export const ShadowManager: React.FC<ShadowManagerProps> = ({
  shadowValue,
  setShadowValue,
}) => {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleInputChange = (newValues: Partial<Shadow>) => {
    const updatedShadow = {
      x: shadowValue.x,
      y: shadowValue.y,
      color: shadowValue.color,
      blur: shadowValue.blur,
      ...newValues,
    };
    setShadowValue(updatedShadow);
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

  const handleBlur = () => {
    const updatedShadow = {
      ...shadowValue, 
      x: shadowValue.x ? shadowValue.x : 0,
      y: shadowValue.y ? shadowValue.y : 0, 
      blur: shadowValue.blur ? shadowValue.blur : 0 
    }
    setShadowValue(updatedShadow);
  }

  return (
    <Popover open={popoverVisible} onOpenChange={setPopoverVisible}>
      <PopoverTrigger className="p-1.5 hover:bg-input rounded">
        <Settings2Icon size="1.25rem" />
      </PopoverTrigger>

      <PopoverContent
        className="w-60 flex flex-col gap-2"
        align={isMobile ? "end" : "start"}
      >
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Shadow Settings</h4>
          <p className="text-sm text-muted-foreground leading-tight">
            Tweak how the shadow is applied.
          </p>
        </div>

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
            onBlur={handleBlur}
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
            onBlur={handleBlur}
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
            min={0}
            value={shadowValue.blur}
            onChange={(e) => {
              const newValue = parseInt(e.target.value);
              setShadowValue({ ...shadowValue, blur: newValue });
              handleInputChange({ blur: newValue });
            }}
            onBlur={handleBlur}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
