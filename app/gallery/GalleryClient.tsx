"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

interface Submission {
  id: string;
  doctorName: string;
  generatedVideoUrl: string;
  timestamp: Date; // Use Firebase Timestamp type
}

interface GalleryClientProps {
  submissions: Submission[];
}

const GalleryClient: React.FC<GalleryClientProps> = ({ submissions }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter submissions by search term
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((submission) => submission.doctorName.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm, submissions]);

  // Group submissions by date
  const groupedByDate = useMemo(() => {
    return filteredSubmissions.reduce((acc: Record<string, Submission[]>, submission) => {
      const formattedDate = format(submission.timestamp, "MMMM d, yyyy"); // Convert Firebase Timestamp to JS Date
      if (!acc[formattedDate]) {
        acc[formattedDate] = [];
      }
      acc[formattedDate].push(submission);
      return acc;
    }, {});
  }, [filteredSubmissions]);

  return (
    <div>
      <input type="text" placeholder="Search doctors..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border p-2 mb-4" />

      <AnimatePresence>
        {Object.keys(groupedByDate).length > 0 ? (
          Object.keys(groupedByDate).map((date) => (
            <div key={date}>
              <h2 className="text-lg font-bold mt-4">{date}</h2>
              {groupedByDate[date].map((submission) => (
                <motion.div key={submission.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-4">
                  <h3>{submission.doctorName}</h3>
                  <video src={submission.generatedVideoUrl} controls className="w-full" />
                  <p>{format(submission.timestamp, "h:mm a")}</p> {/* Show time */}
                </motion.div>
              ))}
            </div>
          ))
        ) : (
          <p>No submissions found matching the search criteria.</p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryClient;
