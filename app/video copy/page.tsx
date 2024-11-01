//@ts-nocheck
"use client";
import { useState, useEffect } from "react";
import { collection, query, orderBy, startAfter, limit, getDocs, doc, updateDoc, where } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "@/config/firebase";
import { Card } from "@/components/ui/card";

export default function AdminPanel() {
  const [submissions, setSubmissions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [lastVisible, setLastVisible] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSubmissions();
  }, [currentPage, searchQuery]);

  const fetchSubmissions = async () => {
    setLoading(true);
    let q;

    if (searchQuery) {
      q = query(collection(db, "employee-data"), where("doctorName", ">=", searchQuery), where("doctorName", "<=", searchQuery + "\uf8ff"), orderBy("doctorName"), limit(itemsPerPage));
    } else {
      q = query(collection(db, "employee-data"), orderBy("timestamp", "desc"), limit(itemsPerPage));

      if (lastVisible && currentPage > 1) {
        q = query(collection(db, "employee-data"), orderBy("timestamp", "desc"), startAfter(lastVisible), limit(itemsPerPage));
      }
    }

    const querySnapshot = await getDocs(q);
    const submissionsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setSubmissions(submissionsData);
    setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    setLoading(false);
  };

  const handleEdit = (submission) => {
    setEditingId(submission.id);
    setEditForm(submission);
  };

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const docRef = doc(db, "employee-data", editingId);
      await updateDoc(docRef, editForm);
      toast.success("Updated successfully!");
      setEditingId(null);
      fetchSubmissions();
    } catch (error) {
      toast.error("Update failed: " + error.message);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp.seconds * 1000).toLocaleString();
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
    setLastVisible(null);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex h-screen">
      <ToastContainer />

      {/* Main Content */}
      <div className="text-xs md:text-2xl justify-around font-bold mb-4 h-20 bg-natcored text-white w-full text-center  flex items-center fixed ">
        <img src="/logo.png" />
        Symbiosis Testimonials 2025 2024
      </div>
      <div className="flex-1 p-10 overflow-auto">
        <div className="h-20 w-full"></div>
        {/* Search Input */}
        <div className="">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div>
                <div className="min-w-full bg-white grid grid-cols-1 md:grid-cols-3 gap-2">
                  {submissions.map((submission) => (
                    <Card py-2 key={submission.id} className="flex justify-center flex-col  ">
                      {submission.generatedVideoUrl ? (
                        <video
                        controls
                          src={submission.generatedVideoUrl}
                          className="py-2"
                        />
                      ) : <div className="py-8 aspect-video text-center">Video is pending Approval</div>}

                      <p className="text-sm pl-2">{editingId === submission.id ? <input type="text" name="doctorName" value={editForm.doctorName} onChange={handleChange} className="border p-1" /> : submission.doctorName}</p>
                      <p className="text-sm pl-2">{editingId === submission.id ? <input type="text" name="hospitalName" value={editForm.hospitalName} onChange={handleChange} className="border p-1" /> : submission.hospitalName}</p>
                      <p className="text-sm pl-2">{new Date(submission.timestamp.seconds * 1000).toLocaleDateString()}</p>
                    </Card>
                  ))}
                </div>
              </div>
              <div className="h-20"></div>

              {/* Pagination Controls */}
              <div className="mt-4 flex justify-between items-center fixed bottom-0 left-0 right-0 bg-white py-2">
                <button onClick={handlePrevPage} disabled={currentPage === 1} className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300">
                  Previous
                </button>
                <span>Page {currentPage}</span>
                <button onClick={handleNextPage} disabled={submissions.length < itemsPerPage} className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300">
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
