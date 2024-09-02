import Image from 'next/image';


interface ICustomImage {
    src: string;
    alt: string;
    zoom: number;
    transparency: number;
    borderRadius: number;
    shadow: number;
}

const ImageViewer = ({ src, alt, zoom, transparency, borderRadius, shadow } : ICustomImage) => {
  return (
    <div
      style={{
        transform: `scale(${zoom})`,
        opacity: transparency,
        borderRadius: `${borderRadius}px`,
        boxShadow: `0 0 ${shadow}px rgba(0, 0, 0, 0.5)`,
        overflow: 'hidden',
        maxWidth: '100%',
        maxHeight: '100%',
      }}
    >
      <Image
        src={src}
        alt={alt}
        layout="responsive"
        objectFit="contain"
        width={500}  // Set a default width
        height={500} // Set a default height
        className="max-w-full max-h-full"
      />
    </div>
  );
};

export default ImageViewer;