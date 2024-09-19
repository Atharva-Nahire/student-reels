"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, startAfter, limit, getDocs, doc, updateDoc, where } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "@/config/firebase";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      onLogin();
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-4 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <Input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
        </div>
        <Button type="submit" className="w-full mt-6">
          Login
        </Button>
      </form>
    </div>
  );
}
export default function AdminPanel() {
  const [submissions, setSubmissions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [lastVisible, setLastVisible] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewContent, setPreviewContent] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const handlePreview = (content, type) => {
    setPreviewContent({ url: content, type });
  };

  const generateNewVideo = async (submission) => {
    try {
      const response = await axios.post("https://heartday.hubscommunity.com/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progressPercentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          // toast.loading(progressPercentage +  "% video uploaded");
          toast.update(toastId, {
            progress: progressPercentage / 100, // Toast progress expects a value between 0 and 1
            render: `Processing (${progressPercentage}% complete)`, // Update the message dynamically
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

      const docRef = doc(db, "employee-data", submission.id);
      await updateDoc(docRef, {
        generatedVideoUrl,
      });

      toast.success("Video Processing completed");

      // };
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("An error occurred while uploading files.");
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="flex h-screen bg-gray-100">
          <ToastContainer />
          {/* Sidebar */}
          <div className="w-64 bg-white shadow-md">
            <div className="p-4">
              <h2 className="text-xl font-semibold">Admin Panel</h2>
            </div>
            <nav className="mt-4 flex flex-col">
              <a href="#" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
                Dashboard
              </a>
              <a href="/" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
                Logout
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
                        <td className="p-2">
                          {editingId === submission.id ? (
                            <select onChange={handleChange} name="speciality" value={editForm.speciality} required>
                              <option value="interventional-cardiologist">Interventional Cardiologist</option>
                              <option value="cardiologist">Cardiologist</option>
                              <option value="consulting-physician">Consulting Physician</option>
                            </select>
                          ) : (
                            submission.speciality
                          )}
                        </td>
                        <td className="p-2">{editingId === submission.id ? <input type="text" name="hospitalName" value={editForm.hospitalName} onChange={handleChange} className="border p-1" /> : submission.hospitalName}</td>
                        <td className="p-2">{editingId === submission.id ? <input type="text" name="city" value={editForm.city} onChange={handleChange} className="border p-1" /> : submission.city}</td>
                        <td className="p-2">{submission.employeeId}</td>
                        <td className="p-2">
                          <Dialog>
                            <DialogTrigger>
                              <img src={submission.overlayUploadUrl} alt="Overlay" className="w-16 h-16 object-cover cursor-pointer" onClick={() => handlePreview(submission.overlayUploadUrl, "image")} />
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <img src={submission.overlayUploadUrl} alt="Overlay" className="w-full h-auto" />
                            </DialogContent>
                          </Dialog>
                        </td>
                        <td className="p-2">
                          <Dialog>
                            <DialogTrigger>
                              <img src={submission.documentUploadUrl} alt="Document" className="w-16 h-16 object-cover cursor-pointer" onClick={() => handlePreview(submission.documentUploadUrl, "image")} />
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <img src={submission.documentUploadUrl} alt="Document" className="w-full h-auto" />
                            </DialogContent>
                          </Dialog>
                        </td>
                        <td className="p-2">
                          <Dialog>
                            <DialogTrigger>
                              <video src={submission.videoUploadUrl} className="w-16 h-16 cursor-pointer" onClick={() => handlePreview(submission.videoUploadUrl, "video")} />
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <video src={submission.videoUploadUrl} className="w-full h-auto" controls />
                            </DialogContent>
                          </Dialog>
                        </td>
                        <td className="p-2">{formatDate(submission.timestamp)}</td>
                        <td className="p-2">
                          {editingId === submission.id ? (
                            <button onClick={handleUpdate} className="bg-green-500 text-white px-2 py-1 rounded">
                              Save
                            </button>
                          ) : (
                            <>
                              <button onClick={() => handleEdit(submission)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                                Edit
                              </button>
                              <button onClick={() => generateNewVideo(submission)} className="bg-blue-500 text-white px-2 py-1 rounded">
                                Publish Video
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
      ) : (
        <LoginForm onLogin={() => setIsLoggedIn(true)} />
      )}
    </>
  );
}
