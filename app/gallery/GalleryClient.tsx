"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

interface Submission {
  id: string;
  doctorName: string;
  generatedVideoUrl: string;
  timestamp: Date;
}

interface GalleryClientProps {
  submissions:  Submission[];
}

const GalleryClient: React.FC<GalleryClientProps> = ({ submissions }) => {
  const [searchTerm, setSearchTerm] = useState("");
const filteredSubmissions = submissions;

  return (
    <div>
      <input type="text" placeholder="Search doctors..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border p-2 mb-4" />

      <AnimatePresence>
        {filteredSubmissions.length > 0 ? (
          filteredSubmissions.map((submission) => (
            <motion.div key={submission.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h3>{submission.doctorName}</h3>
              <video src={submission.generatedVideoUrl} controls />
              <p>{format(submission.timestamp, "MMMM d, yyyy h:mm a")}</p> {/* Display formatted date */}
            </motion.div>
          ))
        ) : (
          <p>No submissions found matching the search criteria.</p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryClient;
