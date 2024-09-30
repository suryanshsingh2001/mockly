import React, { useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Settings2Icon } from "lucide-react";

interface ShadowManagerProps {
  defaultValue: number;
  onChange: (value: number) => void;
}

const ShadowManager: React.FC<ShadowManagerProps> = ({
  defaultValue,
  onChange,
}) => {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const xValue = useRef(0);
  const yValue = useRef(0);
  const spreadValue = useRef(0);
  const blurValue = useRef(defaultValue);

  return (
    <Popover open={popoverVisible} onOpenChange={setPopoverVisible}>
      <PopoverTrigger className="p-1.5 hover:bg-input rounded">
        <Settings2Icon size="1.25rem" />
      </PopoverTrigger>

      <PopoverContent className="w-60" align="start">
        <div className="grid grid-cols-5 gap-4">
          <Label
            htmlFor="spread"
            className="col-span-2 flex items-center text-nowrap"
          >
            X-Offset
          </Label>
          <Input
            id="xoffset"
            type="number"
            className="col-span-3"
            value={xValue.current}
            onChange={(e) => (xValue.current = parseInt(e.target.value))}
          />

          <Label
            htmlFor="spread"
            className="col-span-2 flex items-center text-nowrap"
          >
            Y-Offset
          </Label>
          <Input
            id="yoffset"
            type="number"
            className="col-span-3"
            value={yValue.current}
            onChange={(e) => (yValue.current = parseInt(e.target.value))}
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
            value={spreadValue.current}
            onChange={(e) => (spreadValue.current = parseInt(e.target.value))}
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
            value={blurValue.current}
            onChange={(e) => (blurValue.current = parseInt(e.target.value))}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ShadowManager;
