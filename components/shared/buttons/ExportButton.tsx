import * as React from "react"
import { ChevronDown, Image, FileImage, FileType, FileText, Star } from "lucide-react"
import { saveAs } from 'file-saver'
import jsPDF from 'jspdf'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface ExportButtonProps {
  canvasRef: React.RefObject<HTMLCanvasElement>
  handleReset: () => void
}

export default function ExportButton({ canvasRef, handleReset }: ExportButtonProps) {
  const [complete, setComplete] = React.useState(false)
  const [rating, setRating] = React.useState(0)
  const [comment, setComment] = React.useState("")
  const [downloadedFormat, setDownloadedFormat] = React.useState<string | null>(null)

  const handleDownload = (format: "png" | "jpg" | "svg" | "pdf") => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;

      let imageData: string | undefined;
      if (format === "png" || format === "jpg") {
        const mimeType = format === "png" ? "image/png" : "image/jpeg";
        imageData = canvas.toDataURL(mimeType);
        const filename = `screenshot${Date.now()}.${format}`;
        saveAs(imageData, filename);
      } else if (format === "svg") {
        // Convert canvas to SVG data
        if (!imageData) imageData = canvas.toDataURL("image/png");

        const svgWidth = canvas.width;
        const svgHeight = canvas.height;
        const svgData = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">
                           <foreignObject width="100%" height="100%">
                             <img xmlns="http://www.w3.org/1999/xhtml" src="${imageData}" width="${svgWidth}" height="${svgHeight}"/>
                           </foreignObject>
                         </svg>`;
        const svgBlob = new Blob([svgData], {
          type: "image/svg+xml;charset=utf-8",
        });
        const filename = `screenshot${Date.now()}.svg`;
        saveAs(svgBlob, filename);
      } else if (format === "pdf") {
        if (!imageData) imageData = canvas.toDataURL("image/png");

        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const pdf = new jsPDF({
          orientation: imgWidth > imgHeight ? "landscape" : "portrait",
          unit: "px",
          format: [imgWidth, imgHeight],
        });

        pdf.addImage(imageData, "PNG", 0, 0, imgWidth, imgHeight);
        const filename = `screenshot${Date.now()}.pdf`;
        pdf.save(filename);
      }

      setDownloadedFormat(format.toUpperCase())
      setComplete(true);
    }
  };

  const handleCloseDialog = () => {
    setComplete(false)
  

    setRating(0)
    setComment("")
    setDownloadedFormat(null)
  }

  const handleSubmitFeedback = () => {
    // Implement feedback submission logic here
    handleCloseDialog()
    handleReset()
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex-1 items-center w-full">
            Export Image
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem onClick={() => handleDownload('png')}>
            <Image className="mr-2 h-4 w-4" />
            <span>PNG</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDownload('jpg')}>
            <FileImage className="mr-2 h-4 w-4" />
            <span>JPG</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDownload('svg')}>
            <FileType className="mr-2 h-4 w-4" />
            <span>SVG</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDownload('pdf')}>
            <FileText className="mr-2 h-4 w-4" />
            <span>PDF</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={complete} onOpenChange={setComplete}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Thank you for using Mockly!</DialogTitle>
            <DialogDescription>
              Your image has been downloaded as {downloadedFormat}. We&apos;d love to hear your feedback. How was your experience?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-8 h-8 cursor-pointer transition-colors ${
                    star <= rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            <Textarea
              id="comment"
              placeholder="Leave a comment (optional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button onClick={handleSubmitFeedback}>Submit Feedback</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}