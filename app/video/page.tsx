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

  const itemsPerPage = 18;

  useEffect(() => {
    fetchSubmissions();
    countGeneratedVideos();
  }, [timeFilter, searchParams]);

  useEffect(() => {
    groupSubmissionsByDate();
  }, [submissions]);


const countGeneratedVideos = async () => {
  try {
    const q = query(collection(db, "employee-data"), where("generatedVideoUrl", "!=", null));
    const querySnapshot = await getDocs(q);
    const counted = querySnapshot.docs.length;
    console.log(`Number of entries with generatedVideoUrl: ${count}`);
    setCount(counted);
    // return count;
  } catch (error) {
    console.error("Error counting generated videos:", error);
    return null;
  }
};

  const fetchSubmissions = async () => {
    setLoading(true);
    let q = query(collection(db, "employee-data"));

    // Apply time filter
    if (timeFilter !== "all") {
      const now = new Date();
      let startDate, endDate;
      switch (timeFilter) {
        case "day":
          startDate = startOfDay(now);
          endDate = endOfDay(now);
          break;
        case "week":
          startDate = startOfWeek(now);
          endDate = endOfWeek(now);
          break;
        case "month":
          startDate = startOfMonth(now);
          endDate = endOfMonth(now);
          break;
      }
      q = query(q, where("timestamp", ">=", startDate), where("timestamp", "<=", endDate));
    }

    // Apply search filters
    if (searchParams.doctorName) {
      q = query(q, where("doctorName", ">=", searchParams.doctorName), where("doctorName", "<=", searchParams.doctorName + "\uf8ff"));
    }
    if (searchParams.hospitalName) {
      q = query(q, where("hospitalName", ">=", searchParams.hospitalName), where("hospitalName", "<=", searchParams.hospitalName + "\uf8ff"), where("generatedVideoUrl", "!=", null));
    }
    if (searchParams.city) {
      q = query(q, where("city", ">=", searchParams.city), where("generatedVideoUrl", "!=", null), where("city", "<=", searchParams.city + "\uf8ff"));
    }

    q = query(q, where("generatedVideoUrl", "!=", null), orderBy("generatedVideoUrl"), orderBy("timestamp", "desc"), limit(itemsPerPage));

    if (lastVisible) {
      q = query(q, startAfter(lastVisible));
    }

    const querySnapshot = await getDocs(q);
    const newSubmissions = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Submission)
    );

    setSubmissions((prev) => [...prev, ...newSubmissions]);
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
    <div className="flex flex-col min-h-screen">
      <ToastContainer />

      <header className="bg-primary text-primary-foreground p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">World Heart Day 2024 Gallery</h1>
          <img src="/logo.png" alt="Logo" className="h-10" />
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4">
        <div className="mb-4 flex flex-wrap gap-4">
          <Input type="text" name="doctorName" placeholder="Search by doctor name" value={searchParams.doctorName} onChange={handleSearch} className="max-w-xs" />
          <Input type="text" name="hospitalName" placeholder="Search by hospital name" value={searchParams.hospitalName} onChange={handleSearch} className="max-w-xs" />
          <Input type="text" name="city" placeholder="Search by city" value={searchParams.city} onChange={handleSearch} className="max-w-xs" />
          {/* <Select onValueChange={handleTimeFilterChange} value={timeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All time</SelectItem>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This week</SelectItem>
              <SelectItem value="month">This month</SelectItem>
            </SelectContent>
          </Select> */}
        </div>

        {Object.entries(groupedSubmissions).map(([date, dateSubmissions], index, array) => (
          <div key={date} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{format(new Date(date), "MMMM d, yyyy")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {dateSubmissions.map((submission, subIndex) => (
                <Card key={submission.id} className="p-4" ref={index === array.length - 1 && subIndex === dateSubmissions.length - 1 ? lastSubmissionElementRef : null}>
                  {submission.generatedVideoUrl ? (
                    <video controls src={submission.generatedVideoUrl.replaceAll(".nyc3", ".nyc3.cdn")} className="w-full aspect-video mb-2" />
                  ) : (
                    <div className="w-full aspect-video bg-muted flex items-center justify-center mb-2">Processing Video</div>
                  )}
                  <h3 className="font-bold text-lg">Dr. {submission.doctorName}</h3>
                  <p className="text-sm text-muted-foreground">{submission.hospitalName}</p>
                  <p className="text-sm text-muted-foreground">{submission.city}</p>
                  <p className="text-sm text-muted-foreground">{format(submission.timestamp.toDate(), "MMM d, yyyy HH:mm")}</p>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {loading && <p className="text-center">Loading more submissions...</p>}
        {!hasMore && <p className="text-center">{count?.toString()} video published </p>}
      </main>

      <footer className="bg-muted p-4 mt-8">
        <div className="container mx-auto text-center text-sm text-muted-foreground">© 2024 World Heart Day Gallery. All rights reserved.</div>
      </footer>
    </div>
  );
}
