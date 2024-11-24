import { useState, useEffect, useRef } from "react";
import { generateBooks } from "../utils/bookGenerator";
import BookRow from "./BookRow";
import BookGrid from "./BookGrid";
import Controls from "./Controls";
import Papa from "papaparse";

const BookListing = () => {
  const [books, setBooks] = useState([]);
  const [seed, setSeed] = useState(58933423);
  const [language, setLanguage] = useState("en");
  const [likesPerBook, setLikesPerBook] = useState(5);
  const [reviewsPerBook, setReviewsPerBook] = useState(2);
  const [page, setPage] = useState(0);
  const [viewMode, setViewMode] = useState("list");
  const [loading, setLoading] = useState(false);

  const observerTarget = useRef(null);

  useEffect(() => {
    setBooks([]);
    setPage(0);
  }, [seed, language, likesPerBook, reviewsPerBook]);

  useEffect(() => {
    const newBooks = generateBooks(
      seed,
      page,
      language,
      likesPerBook,
      reviewsPerBook
    );
    setBooks((prev) => [...prev, ...newBooks]);
  }, [page, seed, language, likesPerBook, reviewsPerBook]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setLoading(true);
          setPage((prev) => prev + 1);
          setLoading(false);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  const handleExport = () => {
    const csv = Papa.unparse(
      books.map((book) => ({
        id: book.id,
        isbn: book.isbn,
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        likes: book.likes,
        reviews: book.reviews.length,
      }))
    );

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "books.csv";
    link.click();
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <Controls
        seed={seed}
        setSeed={setSeed}
        language={language}
        setLanguage={setLanguage}
        likesPerBook={likesPerBook}
        setLikesPerBook={setLikesPerBook}
        reviewsPerBook={reviewsPerBook}
        setReviewsPerBook={setReviewsPerBook}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onExport={handleExport}
      />

      <div className="mt-6">
        {viewMode === "list" ? (
          <div className="space-y-2">
            {books.map((book, index) => (
              <BookRow key={index} book={book} index={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.map((book) => (
              <BookGrid key={index} book={book} />
            ))}
          </div>
        )}

        <div ref={observerTarget} className="h-10" />

        {loading && (
          <div className="text-center py-4">Loading more books...</div>
        )}
      </div>
    </div>
  );
};

export default BookListing;
