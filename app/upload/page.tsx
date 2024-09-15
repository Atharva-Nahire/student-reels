"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "@/config/firebase";
import Link from "next/link";
import { toast } from "react-toastify";

export default function UploadPage() {
  const [doctorName, setDoctorName] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [city, setCity] = useState("");
  const [employeeId, setEmployeeId] = useState<string | null>(null);
  const [document, setDocument] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [videoUploaded, setVideoUploaded] = useState<boolean | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
const [videoError, setVideoError] = useState<string | null>(null);
  useEffect(() => {
    drawImage();
  }, [image, doctorName, speciality, hospitalName, city]);
const validateVideo = (file: File) => {
  // Check file size (max 15MB)
  const maxSize = 15 * 1024 * 1024; // 15MB in bytes
  if (file.size > maxSize) {
    setVideoError("Video size exceeds 15MB limit");
    return false;
  }

  // Check file type
  const allowedTypes = ["video/mp4"];
  if (!allowedTypes.includes(file.type)) {
    setVideoError("Only MP4 videos are allowed");
    return false;
  }

  // Reset error if validation passes
  setVideoError(null);
  return true;
};
const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];

    if (validateVideo(file)) {
      setVideo(file);
      if(document){
//@ts-ignore
      const videoElement = document.createElement("video");
      videoElement.preload = "metadata";
      videoElement.onloadedmetadata = () => {
        window.URL.revokeObjectURL(videoElement.src);
        if (videoElement.duration > 10) {
          setVideoError("Video duration exceeds 10 seconds limit");
          setVideo(null);
        } else if (videoElement.videoWidth !== 1920 || videoElement.videoHeight !== 1080) {
          setVideoError("Video resolution must be 1920x1080 (1080p)");
          setVideo(null);
        }
      };
      videoElement.src = URL.createObjectURL(file);
    }}
  }
};

  useEffect(() => {
    if(!videoUploaded)return;

      const fetchVideo = async () => {
      toast.success("Fetching the transformed video");
      const res = await axios.get("https://sa-bargain-db-run.trycloudflare.com/video", {
        responseType: "blob",   // Changed from "blob" to "stream"
      });

      const videoURL = URL.createObjectURL(new Blob([res.data], { type: "video/mp4" }));
      if (videoRef.current) {
        videoRef.current.src = videoURL;
      }
    };

    fetchVideo();
  }, [videoUploaded]);

useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmployeeId = localStorage.getItem("employeeId");
      setEmployeeId(storedEmployeeId);
    }
  }, []);


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

        ctx!.fillText("Dr. " + doctorName, 150, canvas.height - 200);
        ctx!.textAlign = "start";
        ctx!.font = "42px Fontwax";
        ctx!.fillText(speciality.toUpperCase().replaceAll("-"," "), 150, canvas.height - 130);
        ctx!.fillText(hospitalName, 150, canvas.height - 90);
        ctx!.fillText(city, 150, canvas.height - 50);
      };

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
    if (typeof window === "undefined" || !canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.toBlob((blob) => {
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      if (linkRef.current) {
        linkRef.current.href = url;
        linkRef.current.download = "doctor_info.png";
        linkRef.current.click();
        URL.revokeObjectURL(url);
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canvasRef.current || !document || !video) {
      toast.warn("Please fill in all required fields and upload necessary files.");
      return;
    }
    if (videoError) {
      toast.error(videoError);
      return;
    }
    toast.loading("Uploading Video")
    const formData = new FormData();

    // Convert canvas to blob
    const canvasBlob = await new Promise<Blob | null>((resolve) => canvasRef.current?.toBlob(resolve));
    if (canvasBlob) {
      formData.append("overlay", canvasBlob, "doctor_info.png");
  }

    formData.append("video", video);
    formData.append("document", document);

    try {
      const response = await axios.post("https://sa-bargain-db-run.trycloudflare.com/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
toast.dismiss();
      toast.success("video submitted successfully!");

      // Add data to Firestore
      const docRef = await addDoc(collection(db, "employee-data"), {
        doctorName,
        speciality,
        hospitalName,
        city,
        employeeId,
        // overlayUrl,
        // documentUrl,
        // videoUrl,
        timestamp: new Date(),
      });

      console.log("Document written with ID: ", docRef.id);

toast.success("fetching the new video");
setVideoUploaded(true);
  // const clearFields = () => {
    setDoctorName("");
    setSpeciality("");
    setHospitalName("");
    setCity("");
    setDocument(null);
    setVideo(null);
    setImage(null);
    setVideoUploaded(false);
  // };
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("An error occurred while uploading files.");
    }
  };

  return (
    <div>
      <div className="h-20 w-full"></div>
      <div className="h-12 w-full bg-red-800 fixed top-0 flex justify-around items-center text-white">
        <div className=""></div>
        <Link href="/" className="">
          Logout
        </Link>
      </div>
      <div className="container py-2">
        EmployeeId: {employeeId}
        <br />
        {/* Name: {employeeId} */}
      </div>
      <div className="container mx-auto p-4 w-full flex flex-col md:flex-row">
        <Card className=" max-w-screen mx-auto md:w-1/2">
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
                <div className="flex justify-start gap-4">
                  <p>Dr. </p>
                  <Input id="doctorName" value={doctorName ? `${doctorName}` : ""} onChange={(e) => setDoctorName(e.target.value)} required />
                </div>
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
              <div className="space-y-2 pt-4">
                <label htmlFor="video" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Upload Doctor Video
                </label>
                <div className="text-sm text-black py-4">
                  Recommended Video settings - MP4 (H.264) <br />
                  - 1080p (1920x1080) <br />
                  - 30fps <br />
                  <p>
                    - max size 15MB <br />- max duration - <b>40 seconds</b> <br />
                  </p>
                  <p>
                    - Aspect ratio 16:9 <br />- Landscape mode video <b>(Horizontal Layout)</b> <br />
                  </p>
                </div>
                <Input id="video" type="file" accept="video/mp4" onChange={handleVideoUpload} required />
                {videoError && <p className="text-red-500 text-sm">{videoError}</p>}
              </div>

              <a ref={linkRef} style={{ display: "none" }}>
                Download Link
              </a>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
        <div className="md:w-1/2 pt-20">
          {!videoUploaded && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Preview of how the name appears:</h3>
              <canvas ref={canvasRef} className="max-w-full h-auto bg-black border border-black" />
            </div>
          )}
          {videoUploaded && (
            <Link href="/video" className="underline text-blue-600">
              video{" "}
            </Link>
          )}
          {videoUploaded && (
            <video ref={videoRef} controls width="600">
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
    </div>
  );
}
