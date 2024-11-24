import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  BookOpen,
  MessageSquare,
} from "lucide-react";

const BookRow = ({ book, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md transition-all duration-200 hover:shadow-lg">
      <div
        className="grid grid-cols-5 gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div className="text-gray-400">
            {expanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </div>
          <span className="font-medium text-gray-600">#{index + 1}</span>
        </div>
        <div className="text-gray-600 font-mono text-sm">{book.isbn}</div>
        <div className="font-medium text-gray-800">{book.title}</div>
        <div className="text-gray-600">{book.author}</div>
        <div className="text-gray-500 text-sm">{book.publisher}</div>
      </div>

      {expanded && (
        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <div className="flex gap-6">
            <div
              className="w-48 h-64 rounded-lg shadow-lg flex items-center justify-center text-white transition-transform duration-200 hover:scale-105"
              style={{ backgroundColor: book.coverColor }}
            >
              <div className="p-6 text-center">
                <div className="font-bold text-lg mb-2">{book.title}</div>
                <div className="text-sm opacity-90">{book.author}</div>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4 text-blue-500" />
                  <span className="text-gray-700">{book.likes} likes</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-green-500" />
                  <span className="text-gray-700">
                    {book.reviews.length} reviews
                  </span>
                </div>
              </div>

              {book.reviews.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-gray-700 font-medium flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Reviews
                  </h3>
                  {book.reviews.map((review, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-sm"
                    >
                      <p className="text-gray-600 text-sm italic">
                        {review.text}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs text-gray-400">—</span>
                        <span className="text-sm text-gray-500">
                          {review.author}
                        </span>
                        <span className="text-xs text-gray-400">·</span>
                        <span className="text-xs text-gray-500">
                          {review.company}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookRow;
