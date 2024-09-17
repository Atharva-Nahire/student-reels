"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const previewData = data ? JSON.parse(decodeURIComponent(data)) : null;

  if (!previewData) {
    return <div className="container mx-auto p-6 text-center text-gray-700 bg-gray-100 rounded-lg shadow-md">No preview data available.</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">{previewData.doctorName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Details</h2>
          <p className="mb-2">
            <strong>Speciality:</strong> {previewData.speciality}
          </p>
          <p className="mb-2">
            <strong>Hospital:</strong> {previewData.hospitalName}
          </p>
          <p className="mb-2">
            <strong>City:</strong> {previewData.city}
          </p>
          <p className="mb-2">
            <strong>Employee ID:</strong> {previewData.employeeId}
          </p>
          <p className="mb-2">
            <strong>Timestamp:</strong> {new Date(previewData.timestamp).toLocaleString()}
          </p>

          <div>
            <h3 className="font-semibold mb-2 text-gray-700">Overlay</h3>
            <img src={previewData.overlayUploadUrl} alt="Uploaded Overlay" width={300} height={200} className="object-contain rounded-lg shadow-md" />
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Uploaded Files</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2 text-gray-700">Video</h3>
              <video controls className="w-full h-auto rounded-lg border border-gray-300">
                <source src={previewData.videoUploadUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gray-700">Document</h3>
              <img src={previewData.documentUploadUrl} alt="Uploaded Document" width={300} height={200} className="object-contain rounded-lg shadow-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
