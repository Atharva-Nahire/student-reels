"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function UploadPage() {
  const [doctorName, setDoctorName] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [city, setCity] = useState("");
  const [document, setDocument] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);


  useEffect(() => {
    drawImage();
  }, [image, doctorName, speciality, hospitalName, city]);

  const drawImage = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);

        ctx!.font = "42px Fontwax";
        ctx!.fillStyle = "white";
        ctx!.textAlign = "start";
        ctx!.textBaseline = "middle";
        ctx!.strokeStyle = "black";
        ctx!.lineWidth = 2;

        ctx!.fillText(doctorName, 150, canvas.height - 200);
        ctx!.textAlign = "center";
        ctx!.font = "42px Fontwax";
        ctx!.fillText(speciality, 350, canvas.height - 130);
        ctx!.fillText(hospitalName, 350, canvas.height - 90);
        ctx!.fillText(city, 350, canvas.height - 50);
      };

      // Set image source to static path
      img.src = "/overlay.png";
    }
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
      link.download = "doctor_info.png";
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      doctorName,
      speciality,
      hospitalName,
      city,
      document,
      video,
    });
    alert("Data submitted successfully!");
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Upload Doctor Information</CardTitle>
          <CardDescription>Please fill in the doctor's details and upload required files</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="doctorName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Doctor Name
              </label>
              <Input id="doctorName" value={doctorName ? `${doctorName}` : ""} onChange={(e) => setDoctorName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label htmlFor="speciality" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Speciality
              </label>
              <Select onValueChange={setSpeciality} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select speciality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cardiologist">Cardiologist</SelectItem>
                  <SelectItem value="interventional-cardiologist">Interventional Cardiologist</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="hospitalName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Hospital Name
              </label>
              <Input id="hospitalName" value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label htmlFor="city" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                City
              </label>
              <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label htmlFor="document" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Upload Document (Visiting Card / Prescription)
              </label>
              <Input id="document" type="file" onChange={(e) => setDocument(e.target.files?.[0] || null)} required />
            </div>
            <div className="space-y-2">
              <label htmlFor="video" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Upload Doctor Video
              </label>
              <Input id="video" type="file" accept="video/*" onChange={(e) => setVideo(e.target.files?.[0] || null)} required />
            </div>

            {
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Preview:</h3>
                <canvas ref={canvasRef} className="max-w-full h-auto" />
                <Button onClick={handleDownload} className="w-full">
                  Download Image
                </Button>
              </div>
            }
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
