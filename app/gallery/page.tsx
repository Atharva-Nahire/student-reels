// app/gallery/page.tsx
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "@/config/firebase";
import { format } from "date-fns";
import GalleryClient from "./GalleryClient";

// Fetch submissions from Firebase on the server side
async function fetchSubmissions() {
  const q = query(collection(db, "employee-data"), where("generatedVideoUrl", "!=", null));
  const querySnapshot = await getDocs(q);

  const submissions = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    timestamp: doc.data().timestamp.toDate(),
  }));

  return submissions;
}

// Gallery Page - This is a server component
export default async function GalleryPage() {
  const submissions = await fetchSubmissions();

  return (
    <div>
      <GalleryClient submissions={submissions} />
    </div>
  );
}

export const revalidate = 600; // Revalidate every 10 mins to update Firebase data
