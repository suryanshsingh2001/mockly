import {
  ImagePlus,
  Monitor,
  ZoomIn,
  Type,
  Palette,
  Layers,
  Share,
  Sparkles,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { title } from "process";

export default function FeatureSection() {
  const features = [
    {
      icon: <ImagePlus className="h-10 w-10 mb-4 text-primary" />,
      title: "Instant Mockups",
      description:
        "Upload, tweak, done. It's like magic, but without the wand.",
      className: "md:col-span-2 md:row-span-2",
    },
    {
      icon: <Monitor className="h-10 w-10 mb-4 text-primary" />,
      title: "Multi-device Preview",
      description:
        "Instantly see how your designs look on any screen size—because nobody has time for resizing.",
      className: "md:col-span-2",
    },
    {
      icon: <ZoomIn className="h-10 w-10 mb-4 text-primary" />,
      title: "Zoom & Place",
      description:
        "Put your screenshots exactly where you want, and zoom in like a pro—minus the struggle.",
    },
    {
      icon: <Type className="h-10 w-10 mb-4 text-primary" />,
      title: "Text & Style",
      description:
        "Add text, pick your font, and make it pop. Because plain screenshots are so last year.",
    },
    {
      icon: <Palette className="h-10 w-10 mb-4 text-primary" />,
      title: "Custom Colors",
      description:
        "Choose from a wide palette or create your own. Your mockups, your style.",
      className: "md:col-span-2",
    },
    {
      icon: <Layers className="h-10 w-10 mb-4 text-primary" />,
      title: "No Watermarks",
      description:
        "No ugly watermarks, no strings attached. Just beautiful mockups, ready to use.",
    },
    {
      icon: <Share className="h-10 w-10 mb-4 text-primary" />,
      title: "Easy Export",
      description:
        "Share your creations with a single click. Available in all the formats you need.",
    },
    {
      icon: <Sparkles className="h-10 w-10 mb-4 text-primary" />,
      title: "Video Editor (Coming Soon)",
      description:
        "Turn your screenshots into stunning videos. Because sometimes, a picture is not enough.",
      className: "md:col-span-2",
    },
    {
      icon: <MoreHorizontal className="h-10 w-10 mb-4 text-primary" />,
      title: "And More",
      description:
        "We're always adding new features to make your experience even better. Stay tuned!",
      className: "md:col-span-2",
    },
  ];

  return (
    <section
      id="features"
      className="w-full py-12 md:py-24 lg:py-32 bg-secondary/20"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Feature-Packed, Yet Lazy-Friendly
            </h2>
            <p className="max-w-[900px] text-muted-foreground text-base sm:text-lg md:text-xl">
              Everything you need to create professional-looking screenshots and
              mockups
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                "group relative overflow-hidden rounded-xl bg-background/50 p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1",
                feature.className
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/50 to-secondary/50 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative z-10">
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
