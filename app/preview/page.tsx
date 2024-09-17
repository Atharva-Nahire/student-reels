"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const previewData = data ? JSON.parse(decodeURIComponent(data)) : null;

  if (!previewData) {
    return <div className="container mx-auto p-4">No preview data available.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{previewData.doctorName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Details</h2>
          <p>
            <strong>Speciality:</strong> {previewData.speciality}
          </p>
          <p>
            <strong>Hospital:</strong> {previewData.hospitalName}
          </p>
          <p>
            <strong>City:</strong> {previewData.city}
          </p>
          <p>
            <strong>Employee ID:</strong> {previewData.employeeId}
          </p>
          <p>
            <strong>Timestamp:</strong> {new Date(previewData.timestamp).toLocaleString()}
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Uploaded Files</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Video</h3>
              <video controls className="w-full max-w-md">
                <source src={previewData.videoUploadUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div>
              <h3 className="font-semibold">Document</h3>
              <img src={previewData.documentUploadUrl} alt="Uploaded Document" width={300} height={200} className="object-contain" />
            </div>
            <div>
              <h3 className="font-semibold">Overlay</h3>
              <img src={previewData.overlayUploadUrl} alt="Uploaded Overlay" width={300} height={200} className="object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
