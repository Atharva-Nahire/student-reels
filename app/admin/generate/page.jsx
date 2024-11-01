"use client";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubmissionsTable from "./SubmissionsTable";
import { listenToSubmissions } from "./firebaseservice";
import { Input } from "@/components/ui/input";
import axios from "axios";


export default function AdminPanel() {
  const [submissions, setSubmissions] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = listenToSubmissions(searchQuery, lastVisible, itemsPerPage, currentPage, setSubmissions, setLastVisible, setLoading);
    return () => unsubscribe(); // Clean up listener on component unmount
  }, [currentPage, searchQuery]);


  const handleEdit = (submission) => {
    setEditingId(submission.id);
    setEditForm(submission);
  };

  const handleDelete = async (submission) => {
    const docRef = doc(db, "employee-data", submission.id);

    // Handle delete functionality
    toast.warn("Data Deleted");
    await deleteDoc(docRef);

  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
    setLastVisible(null);
  };
const unPublishNewVideo = async (submission) => {
  toast.loading("Reject Video");
  const docRef = doc(db, "employee-data", submission.id);
  await updateDoc(docRef, {
    generatedVideoUrl: null,
    rejected: true,
  });
  toast.dismiss();
};

const generateNewVideo = async (submission) => {
  try {
    const toastId = toast.loading("Processing Video");
    toast.loading("Please Wait for Video to be Processed!");
    const response = await axios.post(
      "http://localhost:8000/upload",
      // "http://localhost:8000/upload",
      {
        imageUrl: submission.overlayUploadUrl,
        videoUrl: submission.videoUploadUrl,
        submissionId: submission.id,
      },
      {
        timeout: 120000, // Set timeout to 120 seconds (120000 milliseconds)
        onUploadProgress: (progressEvent) => {
          const progressPercentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          toast.update(toastId, {
            progress: progressPercentage / 100,
            render: `Processing (${progressPercentage}% complete)`,
          });
        },
      }
    );

    console.log(response.data);
    toast.dismiss();
    console.log(response.data.url, "the video url ---------------");

    // const docRef = doc(db, "employee-data", submission.id);
    // alert();
    // await updateDoc(docRef, {
    //   generatedVideoUrl: response.data.url, // Assuming the API returns a generated video URL
    // });

    toast.success("Video Added to Gallery");
  } catch (error) {
    if (axios.isCancel(error)) {
      console.error("Request was cancelled");
    } else if (error.code === "ECONNABORTED") {
      console.error("Timeout occurred");
      toast.error("The request timed out. Please try again.");
    } else {
      console.error("Error uploading files:", error);
      toast.error("An error occurred while uploading files.");
    }
  }
};

  return (
    <div className="flex h-screen bg-gray-100">
      <ToastContainer />
      <div className="flex-1 p-10 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Employee Submissions</h1>
        <Input type="text" placeholder="Search by doctor name..." value={searchQuery} onChange={handleSearch} className="p-2 border rounded w-full" />
        {loading ? <p>Loading...</p> : <SubmissionsTable submissions={submissions} handleEdit={handleEdit} handleDelete={handleDelete} handlePublish={generateNewVideo} handleUnpublish={unPublishNewVideo} />}
      </div>
    </div>
  );
}
