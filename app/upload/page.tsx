"use client";

import { useState } from "react";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
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
              <Input id="doctorName" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} required />
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
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
