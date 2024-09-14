"use client"
import { useState, useEffect } from "react";
import { collection, query, orderBy, startAfter, limit, getDocs, doc, updateDoc, where } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from '@/config/firebase';

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
    <div className="flex h-screen bg-gray-100">
      <ToastContainer />
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-semibold">Admin Panel</h2>
        </div>
        <nav className="mt-4">
          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            Dashboard
          </a>
          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            Submissions
          </a>
          <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
            Settings
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Employee Submissions</h1>

        {/* Search Input */}
        <div className="mb-4">
          <input type="text" placeholder="Search by doctor name..." value={searchQuery} onChange={handleSearch} className="p-2 border rounded w-full" />
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="text-left p-2">Doctor Name</th>
                  <th className="text-left p-2">Speciality</th>
                  <th className="text-left p-2">Hospital</th>
                  <th className="text-left p-2">City</th>
                  <th className="text-left p-2">Employee ID</th>
                  <th className="text-left p-2">Overlay</th>
                  <th className="text-left p-2">Document</th>
                  <th className="text-left p-2">Video</th>
                  <th className="text-left p-2">Timestamp</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr key={submission.id}>
                    <td className="p-2">{editingId === submission.id ? <input type="text" name="doctorName" value={editForm.doctorName} onChange={handleChange} className="border p-1" /> : submission.doctorName}</td>
                    <td className="p-2">{editingId === submission.id ? <input type="text" name="speciality" value={editForm.speciality} onChange={handleChange} className="border p-1" /> : submission.speciality}</td>
                    <td className="p-2">{editingId === submission.id ? <input type="text" name="hospitalName" value={editForm.hospitalName} onChange={handleChange} className="border p-1" /> : submission.hospitalName}</td>
                    <td className="p-2">{editingId === submission.id ? <input type="text" name="city" value={editForm.city} onChange={handleChange} className="border p-1" /> : submission.city}</td>
                    <td className="p-2">{submission.employeeId}</td>
                    <td className="p-2">
                      <img src={submission.overlayUrl} alt="Overlay" className="w-16 h-16 object-cover" />
                    </td>
                    <td className="p-2">
                      <img src={submission.documentUrl} alt="Document" className="w-16 h-16 object-cover" />
                    </td>
                    <td className="p-2">
                      <video src={submission.videoUrl} className="w-16 h-16" controls />
                    </td>
                    <td className="p-2">{formatDate(submission.timestamp)}</td>
                    <td className="p-2">
                      {editingId === submission.id ? (
                        <button onClick={handleUpdate} className="bg-green-500 text-white px-2 py-1 rounded">
                          Save
                        </button>
                      ) : (
                        <>
                          <button onClick={() => handleEdit(submission)} className="bg-blue-500 text-white px-2 py-1 rounded">
                            Edit
                          </button>
                          <button onClick={() => console.log("working")} className="bg-blue-500 text-white px-2 py-1 rounded">
                            Generate Video
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="mt-4 flex justify-between items-center">
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
  );
}
