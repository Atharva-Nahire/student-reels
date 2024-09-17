//@ts-nocheck
"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "@/config/firebase";
import Link from "next/link";
import { toast } from "react-toastify";

const s3Client = new S3Client({
  endpoint: process.env.NEXT_PUBLIC_AWS_ENDPOINT,
  forcePathStyle: false,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

const uploadObject = async (file: File | Blob) => {
  const params = {
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
    Key: `submissions/${process.env.NEXT_PUBLIC_WHITE_LABEL_FOR}/${Date.now()}_${file.name}`,
    Body: file,
    ACL: "public-read",
  };

  try {
    // const toastId = toast.loading("Uploading Image");
    const data = await s3Client.send(new PutObjectCommand(params));
    // toast.dismiss(toastId);
    // toast.success("File Uploaded, do not close this page");
    const uploadedObjectUrl = `https://${params.Bucket}.${process.env.NEXT_PUBLIC_AWS_REGION}.cdn.digitaloceanspaces.com/${params.Key}`;
    return { data, url: uploadedObjectUrl };
  } catch (err) {
    console.log("Error Uploading object", err);
  }
};

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
  const [isMounted, setIsMounted] = useState(false);

  // Ensure the code runs on the client side by setting isMounted to true
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    drawImage();
  }, [image, doctorName, speciality, hospitalName, city]);

  const validateVideo = (file: File): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      // Check file size (max 15MB)
      // const maxSize = 100 * 1024 * 1024; // 15MB in bytes
      // if (file.size > maxSize) {
      //   setVideoError("Video size exceeds 100MB limit");
      //   resolve(false);
      //   return;
      // }

      // Check file type (only MP4 allowed)
      const allowedTypes = ["video/mp4"];
      if (!allowedTypes.includes(file.type)) {
        setVideoError("Only MP4 videos are allowed");
        resolve(false);
        return;
      }

      // Ensure the code runs only on the client-side
      if (typeof window !== "undefined") {
        if (!videoRef.current) {
          videoRef.current = document.createElement("video");
        }

        const video = videoRef.current;
        const videoURL = URL.createObjectURL(file);
        video.src = videoURL;

        video.onloadedmetadata = () => {
          // Check video resolution (1080p)
          // if (video.videoWidth !== 1920 || video.videoHeight !== 1080) {
          //   setVideoError("Video resolution must be 1920x1080 (1080p) Horizontal");
          //   resolve(false);
          //   return;
          // }

          // Check frame rate (30fps)
          // const frameRate = video.videoHeight / video.duration;
          // if (Math.round(frameRate) !== 30) {
          //   setVideoError("Video frame rate must be 30fps");
          //   resolve(false);
          //   return;
          // }

          // Check duration (max 40 seconds)
          if (video.duration > 70) {
            setVideoError("Video duration exceeds 60 seconds limit");
            resolve(false);
            return;
          }

          // Check aspect ratio (16:9)
          // const aspectRatio = video.videoWidth / video.videoHeight;
          // if (aspectRatio !== 16 / 9) {
          //   setVideoError("Video must have a 16:9 aspect ratio");
          //   resolve(false);
          //   return;
          // }

          // Check if the video is in landscape mode
          if (video.videoWidth < video.videoHeight) {
            setVideoError("Video must be in landscape mode (horizontal layout)");
            resolve(false);
            return;
          }

          // Reset error if all validations pass
          setVideoError(null);
          resolve(true);
        };

        video.onerror = () => {
          setVideoError("There was an error loading the video");
          resolve(false);
        };
      }
    });
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (!validateVideo(file)) return;
      setVideo(file);
    }
  };

  useEffect(() => {
    if (!videoUploaded) return;

    const fetchVideo = async () => {
      toast.success("Fetching the transformed video");
      const res = await axios.get("http://64.227.132.145:30008/video", {
        responseType: "blob", // Changed from "blob" to "stream"
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
        ctx!.fillText(speciality.toUpperCase().replaceAll("-", " "), 150, canvas.height - 130);
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
    // toast.loading("Uploading Video");
    // toast.warn("Uploading to Cloud Storage");

    uploadObject(video);
    uploadObject(document);
    const formData = new FormData();

    // Convert canvas to blob
    const canvasBlob = await new Promise<Blob | null>((resolve) => canvasRef.current?.toBlob(resolve));
    if (canvasBlob) {
      uploadObject(canvasBlob);
      formData.append("overlay", canvasBlob, "doctor_info.png");
    }

    formData.append("video", video);
    formData.append("document", document);
    const toastId = toast("Uploading Video", {
      progress: 0,
      autoClose: false, // Don't auto-close the toast
    });

    try {
      const response = await axios.post("http://64.227.132.145:30008/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progressPercentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          // toast.loading(progressPercentage +  "% video uploaded");
          toast.update(toastId, {
            progress: progressPercentage / 100, // Toast progress expects a value between 0 and 1
            render: `Uploading Video (${progressPercentage}% complete)`, // Update the message dynamically
          });
        },
      });
      toast.update(toastId, {
        render: "Upload Complete, do not refresh the page until the video processes", // Change the message to upload complete
        //  type: toast.success, // Change the toast type to success
        autoClose: 12000, // Set autoClose time to 3 seconds
      });
      console.log(response.data);
      toast.dismiss();
      toast.success("video submitted successfully!");
      const generatedVideoUrl = response.data.url;

      // Add data to Firestore
      const docRef = await addDoc(collection(db, "employee-data"), {
        doctorName,
        speciality,
        hospitalName,
        city,
        employeeId,
        generatedVideoUrl,
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
      toast.dismiss();
      // };
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("An error occurred while uploading files.");
    }
  };

  return (
    <div>
      <div className="h-20 w-full"></div>
      <div className="h-12 w-full bg-natcored  font-bolder fixed top-0 flex justify-between items-center text-white">
        <div className="">
          <img src="/logo.png" className="h-16 w-auto" />
        </div>
        <div className="">
          <Link href="/video" className="px-2 text-sm">
            All Submissions
          </Link>
          <Link href="/" className="pr-1 text-sm">
            Logout
          </Link>
        </div>
      </div>
      <div className="container py-2">
        EmployeeId: {employeeId}
        <br />
        {/* Name: {employeeId} */}
      </div>
      <div className="container text-natcoblue mx-auto p-4 w-full flex flex-col md:flex-row">
        <Card className=" max-w-full mx-auto md:w-1/2">
          <CardHeader>
            <CardTitle className="text-natcoblue">Upload Doctor Information</CardTitle>
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
                    <SelectItem value="consulting-physician">Consulting Physician</SelectItem>
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
                <Input id="document" type="file" accept="image/*" onChange={(e) => setDocument(e.target.files?.[0] || null)} required />
              </div>
              <div className="space-y-2 pt-4">
                <label htmlFor="video" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Upload Doctor Video
                </label>
                <div className="text-sm text-natcoblue py-4">
                  Recommended Video settings - MP4 (H.264) <br />
                  {/* - 1080p (1920x1080) <br /> */}
                  {/* - 30fps <br /> */}
                  <p>
                    - max size 100MB <br />- max duration - <b>60 seconds</b> <br />
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
              <Button type="submit" className="w-full bg-natcoblue">
                Submit video
              </Button>
            </form>
          </CardContent>
        </Card>
        <div className="md:w-1/2 pt-20">
          {!videoUploaded && (
            <div className="space-y-2 relative w-full">
              <h3 className="text-sm font-medium">Video Title Preview:</h3>
              <canvas ref={canvasRef} className="max-w-full absolute h-auto bg-transparent border border-black" />

              <video ref={videoRef} autoPlay className="absolute w-full -z-10" controls width="600">
                Your browser does not support the video tag.
              </video>
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
