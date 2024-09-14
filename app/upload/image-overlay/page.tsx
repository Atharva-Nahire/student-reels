"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Component() {
  const [name, setName] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (image && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        ctx!.font = "42px Arial";
        ctx!.fillStyle = "white";
        ctx!.textAlign = "start";
        ctx!.textBaseline = "middle";
        ctx!.strokeStyle = "black";
        ctx!.lineWidth = 2;
        // ctx!.strokeText(name, 30, canvas.height - 200);
        ctx!.fillText(name, 120, canvas.height - 200);
      };
      img.src = image;
    }
  }, [image, name]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement("a");
      link.download = "name_overlay.png";
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <Label htmlFor="name">Enter Name:</Label>
        <Input id="name" type="text" value={name} onChange={handleNameChange} placeholder="Enter name" className="mt-1" />
      </div>
      <div className="mb-4">
        <Label htmlFor="image">Upload Image:</Label>
        <Input id="image" type="file" onChange={handleImageUpload} accept="image/*" className="mt-1" />
      </div>
      {image && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Preview:</h2>
          <canvas ref={canvasRef} className="max-w-full h-auto" />
          <Button onClick={handleDownload} className="mt-4">
            Download Image
          </Button>
        </div>
      )}
    </div>
  );
}
