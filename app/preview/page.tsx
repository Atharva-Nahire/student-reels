"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const previewData = data ? JSON.parse(decodeURIComponent(data)) : null;

  if (!previewData) {
    return <div className="container mx-auto p-6 text-center text-gray-700 bg-gray-100 rounded-lg shadow-md">No preview data available.</div>;
  }

  return (
    <div className=" mx-auto bg-white shadow-lg rounded-lg">
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
      <div className="pt-8"></div>
      <div className="grid container gap-8">
      <h1 className="text-3xl font-bold mb-2 text-gray-900">{previewData.doctorName}</h1>
      <h1>Your video has been submitted successfully. Video will reviewed and published under menu "All Submissions" in few days.</h1>
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
          </div>
        </div>
      </div>
    </div>
  );
}
