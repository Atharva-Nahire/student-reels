//@ts-nocheck
"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import Image from "next/image"; // Assuming you're using Next.js for image optimization
import { Home, Hospital } from "lucide-react";

interface Submission {
  id: string;
  doctorName: string;
  city: string;
  hospitalName: string;
  generatedVideoUrl: string;
  videoThumbnailUrl: string; // Add thumbnail URL for faster load
  timestamp: Date; // Use Firebase Timestamp type
}

interface GalleryClientProps {
  submissions: Submission[];
}

const GalleryClient: React.FC<GalleryClientProps> = ({ submissions }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const submissionsPerPage = 6;

  // Filter submissions by search term
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((submission) => submission.doctorName.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm, submissions]);

  // Pagination logic
  const totalSubmissions = filteredSubmissions.length;
  const totalPages = Math.ceil(totalSubmissions / submissionsPerPage);

  const paginatedSubmissions = useMemo(() => {
    const startIndex = (currentPage - 1) * submissionsPerPage;
    const endIndex = startIndex + submissionsPerPage;
    return filteredSubmissions.slice(startIndex, endIndex);
  }, [filteredSubmissions, currentPage]);

  // Group submissions by date
  const groupedByDate = useMemo(() => {
    return paginatedSubmissions.reduce((acc: Record<string, Submission[]>, submission) => {
      const formattedDate = format(submission.timestamp, "MMMM d, yyyy");
      if (!acc[formattedDate]) {
        acc[formattedDate] = [];
      }
      acc[formattedDate].push(submission);
      return acc;
    }, {});
  }, [paginatedSubmissions]);

  // Pagination Handler
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="mx-auto font-display">
      <motion.header initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-natcoblue text-primary-foreground sticky top-0 z-10 shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4">
          <h1 className="text-xl md:text-3xl font-bold">World Heart Day 2024 Gallery</h1>
          <img src="/logo.png" alt="Logo" className="h-12" />
        </div>
      </motion.header>
      <div className="text-center mb-4">
        <p className="text-gray-500">Total Submissions: {totalSubmissions}</p>
        <input type="text" placeholder="Search doctors..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border p-2 mb-4 w-full sm:w-1/2" />
      </div>

      <AnimatePresence>
        {Object.keys(groupedByDate).length > 0 ? (
          Object.keys(groupedByDate).map((date) => (
            <div key={date} className="mb-6 container">
              <h2 className="text-lg font-bold mt-4">{date}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedByDate[date].map((submission) => (
                  <motion.div key={submission.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="border rounded-lg shadow-md p-4">
                    {/* Fast video loading using thumbnail as poster */}
                    <video
                      src={submission.generatedVideoUrl.replaceAll(".nyc3", ".nyc3.cdn")}
                      className="w-full aspect-video mb-4 rounded-md object-cover"
                      // poster={submission.videoThumbnailUrl} // Poster for faster load
                      controls
                      // className="w-full h-48 object-cover mb-2"
                    />

                    <p className="font-semibold text-2xl">Dr. {submission.doctorName}</p>
                    <div className="flex gap-2 flex-col pt-4">
                      <div className="flex justify-between w-full ">
                        <p className="font-sm flex  gap-2">
                          <Hospital /> {submission.hospitalName}, {submission.city}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No submissions found matching the search criteria.</p>
        )}
      </AnimatePresence>
<Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange}/>

      <motion.footer initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-natcoblue text-white p-2 md:p-6 mt-12 fixed w-full bottom-0">
        <div className="container mx-auto text-center text-sm">
          © 2024 World Heart Day.
          <br /> All rights reserved.
          <br />
        </div>
      </motion.footer>
    </div>
  );
};

export default GalleryClient;



const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const [customPage, setCustomPage] = useState("");

  const goToCustomPage = () => {
    const pageNumber = parseInt(customPage);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      handlePageChange(pageNumber);
      setCustomPage(""); // Reset the input after navigating
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-6 mb-20">
      {/* Custom Page Input */}
      {/* <div className="flex items-center space-x-2">
        <input type="number" placeholder="Go to page..." value={customPage} onChange={(e) => setCustomPage(e.target.value)} className="px-4 py-2 border rounded-lg text-center" min="1" max={totalPages} />
        <button onClick={goToCustomPage} className="px-4 py-2 bg-green-500 text-white rounded-lg">
          Go
        </button>
      </div> */}

      {/* Pagination Controls */}
      <div className="flex items-center space-x-2">
        {/* Start Page */}
        {currentPage > 3 && (
          <>
            <button onClick={() => handlePageChange(1)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg">
              1
            </button>
            {currentPage > 4 && <span className="px-2">...</span>} {/* Ellipsis */}
          </>
        )}

        {/* Previous Button */}
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Previous
        </button>

        {/* Middle Pages */}
        {currentPage > 2 && (
          <button onClick={() => handlePageChange(currentPage - 1)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg">
            {currentPage - 1}
          </button>
        )}

        {/* Current Page */}
        <span className="px-4 py-2 bg-blue-500 text-white rounded-lg">{currentPage}</span>

        {/* Next Middle Pages */}
        {currentPage < totalPages - 1 && (
          <button onClick={() => handlePageChange(currentPage + 1)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg">
            {currentPage + 1}
          </button>
        )}

        {/* Next Button */}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Next
        </button>

        {/* End Page */}
        {currentPage < totalPages - 2 && (
          <>
            {currentPage < totalPages - 3 && <span className="px-2">...</span>}
            <button onClick={() => handlePageChange(totalPages)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg">
              {totalPages}
            </button>
          </>
        )}
      </div>

      {/* Page Summary */}
      <div className="text-gray-600 text-sm">
        Showing page {currentPage} of {totalPages}
      </div>
    </div>
  );
};


