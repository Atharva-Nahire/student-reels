"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { collection, query, orderBy, startAfter, limit, getDocs, where, Timestamp } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "@/config/firebase";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, subDays, subWeeks, subMonths, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface Submission {
  id: string;
  doctorName: string;
  hospitalName: string;
  city: string;
  timestamp: Timestamp;
  generatedVideoUrl: string;
}

export default function ImprovedAdminPanel() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [searchParams, setSearchParams] = useState({
    doctorName: "",
    hospitalName: "",
    city: "",
  });
  const [timeFilter, setTimeFilter] = useState("all");
  const observer = useRef<IntersectionObserver | null>(null);
  const [groupedSubmissions, setGroupedSubmissions] = useState<{ [key: string]: Submission[] }>({});
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const itemsPerPage = 18;

  useEffect(() => {
    fetchSubmissions();
    countGeneratedVideos();
  }, [timeFilter, searchParams]);

  useEffect(() => {
    console.log(submissions)
    groupSubmissionsByDate();
  }, [submissions]);

  const countGeneratedVideos = async () => {
    try {
      const q = query(collection(db, "volunteer-data"), where("generatedVideoUrl", "!=", null));
      const querySnapshot = await getDocs(q);
      const counted = querySnapshot.docs.length;
      console.log(`Number of entries with generatedVideoUrl: ${count}`);
      setCount(counted);
    } catch (error) {
      console.error("Error counting generated videos:", error);
      return null;
    }
  };
const fetchSubmissions = async () => {
  setLoading(true);
  let q = query(collection(db, "volunteer-data"), where("generatedVideoUrl","!=",null));

  // Apply time filter
  if (timeFilter !== "all") {
    // ... (existing time filter logic)
  }

  const querySnapshot = await getDocs(q);
  const submissions = querySnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Submission)
  );

  // Apply client-side filters
  const filteredSubmissions = submissions.filter((submission) => {
    let matchAllCriteria = true;

    if (searchParams.doctorName && submission.doctorName.toLowerCase().indexOf(searchParams.doctorName.toLowerCase()) === -1) {
      matchAllCriteria = false;
    }
    if (searchParams.hospitalName && submission.hospitalName.toLowerCase().indexOf(searchParams.hospitalName.toLowerCase()) === -1) {
      matchAllCriteria = false;
    }
    if (searchParams.city && submission.city.toLowerCase().indexOf(searchParams.city.toLowerCase()) === -1) {
      matchAllCriteria = false;
    }
    return matchAllCriteria;
  });

  setSubmissions((prev) => [...prev, ...filteredSubmissions]);
  setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
  setHasMore(querySnapshot.docs.length === itemsPerPage);
  setLoading(false);
};



  const groupSubmissionsByDate = () => {
    const grouped = submissions.reduce((acc, submission) => {
      const date = format(submission.timestamp.toDate(), "yyyy-MM-dd");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(submission);
      return acc;
    }, {} as { [key: string]: Submission[] });
    setGroupedSubmissions(grouped);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
    resetSearch();
  };

  const handleTimeFilterChange = (value: string) => {
    setTimeFilter(value);
    resetSearch();
  };

  const resetSearch = () => {
    setSubmissions([]);
    setLastVisible(null);
    setHasMore(true);
  };

  const lastSubmissionElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchSubmissions();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <ToastContainer />


      <main className="flex-grow container mx-auto p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mb-8 flex flex-wrap gap-4">
          <Input type="text" name="doctorName" placeholder="Search by doctor name" value={searchParams.doctorName} onChange={handleSearch} className="max-w-xs bg-white/80 backdrop-blur-sm" />
          <Input type="text" name="hospitalName" placeholder="Search by hospital name" value={searchParams.hospitalName} onChange={handleSearch} className="max-w-xs bg-white/80 backdrop-blur-sm" />
          <Input type="text" name="city" placeholder="Search by city" value={searchParams.city} onChange={handleSearch} className="max-w-xs bg-white/80 backdrop-blur-sm" />
        </motion.div>

        <AnimatePresence>
          {Object.entries(groupedSubmissions).map(([date, dateSubmissions], index, array) => (
            <motion.div key={date} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">{format(new Date(date), "MMMM d, yyyy")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {dateSubmissions.map((submission, subIndex) => (
                  <motion.div key={submission.id} ref={index === array.length - 1 && subIndex === dateSubmissions.length - 1 ? lastSubmissionElementRef : null} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Card className="p-4 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <Dialog>
                        <DialogTrigger asChild>
                          <div className="cursor-pointer">
                            {submission.generatedVideoUrl ? (
                              <video src={submission.generatedVideoUrl.replaceAll(".nyc3", ".nyc3.cdn")} className="w-full aspect-video mb-4 rounded-md object-cover" />
                            ) : (
                              <div className="w-full aspect-video bg-muted flex items-center justify-center mb-4 rounded-md">Processing Video</div>
                            )}
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">{submission.generatedVideoUrl && <video controls autoPlay src={submission.generatedVideoUrl.replaceAll(".nyc3", ".nyc3.cdn")} className="w-full aspect-video rounded-md" />}</DialogContent>
                      </Dialog>
                      <h3 className="font-bold text-xl text-gray-800 mb-2">Dr. {submission.doctorName}</h3>
                      <p className="text-sm text-gray-600 mb-1">{submission.hospitalName}</p>
                      <p className="text-sm text-gray-600 mb-1">{submission.city}</p>
                      <p className="text-sm text-gray-500">{format(submission.timestamp.toDate(), "MMM d, yyyy HH:mm")}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center text-lg text-gray-600 mt-8">
            Loading more submissions...
          </motion.p>
        )}
        {!hasMore && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-xl pb-10 font-semibold text-gray-800 mt-8">
            {count?.toString()} videos published
          </motion.p>
        )}
      </main>

    </div>
  );
}
