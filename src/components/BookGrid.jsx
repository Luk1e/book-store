import { ThumbsUp, MessageSquare } from "lucide-react";

const BookGrid = ({ book }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
      <div
        className="w-full h-56 rounded-t-lg flex items-center justify-center text-white transition-transform duration-200 hover:scale-[1.02]"
        style={{ backgroundColor: book.coverColor }}
      >
        <div className="p-6 text-center">
          <div className="font-bold text-lg mb-2">{book.title}</div>
          <div className="text-sm opacity-90">{book.author}</div>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-gray-800">{book.title}</h3>
          <p className="text-gray-600">{book.author}</p>
          <p className="text-gray-500 text-sm">{book.publisher}</p>
        </div>

        <div className="text-sm text-gray-500 font-mono">{book.isbn}</div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ThumbsUp className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-gray-600">{book.likes}</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-600">{book.reviews.length}</span>
          </div>
        </div>

        {book.reviews.length > 0 && (
          <div className="pt-2">
            <div className="text-sm font-medium text-gray-700 mb-3">
              Recent Reviews
            </div>
            {book.reviews.slice(0, 2).map((review, index) => (
              <div key={index} className="mb-3 last:mb-0">
                <p className="text-sm text-gray-600 italic">
                  {review.text.slice(0, 100)}
                  {review.text.length > 100 && "..."}
                </p>
                <p className="text-xs text-gray-500 mt-1">— {review.author}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default BookGrid;
