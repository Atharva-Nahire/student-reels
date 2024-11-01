import { collection, query, orderBy, where, limit, startAfter, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebase";

export const listenToSubmissions = (searchQuery, lastVisible, itemsPerPage, currentPage, setSubmissions, setLastVisible, setLoading) => {
  setLoading(true);
  let q;

  if (searchQuery) {
    q = query(collection(db, "volunteer-data"), where("studentName", ">=", searchQuery), where("studentName", "<=", searchQuery + "\uf8ff"), orderBy("studentName"), limit(itemsPerPage));
  } else {
    q = query(collection(db, "volunteer-data"), orderBy("timestamp", "desc"), limit(itemsPerPage));

    if (lastVisible && currentPage > 1) {
      q = query(collection(db, "volunteer-data"), orderBy("timestamp", "desc"), startAfter(lastVisible), limit(itemsPerPage));
    }
  }

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const submissionsData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setSubmissions(submissionsData);
    setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    setLoading(false);
  });

  return unsubscribe;
};
