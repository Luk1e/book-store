import { Copy, Grid, List, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import debounce from "lodash/debounce"; 

const Controls = ({
  seed,
  setSeed,
  language,
  setLanguage,
  likesPerBook,
  setLikesPerBook,
  reviewsPerBook,
  setReviewsPerBook,
  viewMode,
  setViewMode,
  onExport,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(true);

  // Debounced functions
  const debouncedSetSeed = debounce((val) => setSeed(Math.round(val)), 500);
  const debouncedSetLikes = debounce((val) => setLikesPerBook(val), 500);
  const debouncedSetReviews = debounce((val) => setReviewsPerBook(val), 500);

  useEffect(() => {
    const checkWidth = () => setIsWideScreen(window.innerWidth >= 1024);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const languages = [
    { value: "en", label: "English (US)" },
    { value: "ru", label: "Russian" },
    { value: "fr", label: "French" },
  ];

  const handleBlurOrEnter = (e, callback) => {
    if (e.type === "blur" || e.key === "Enter") {
      const value = parseFloat(e.target.value);
      if (!isNaN(value)) callback(value);
    }
  };

  const InputField = ({ label, value, onChange, placeholder }) => (
    <div className="flex flex-col sm:flex-row items-center gap-2">
      <label className="text-sm text-gray-600">{label}</label>
      <input
        type="text"
        defaultValue={value}
        onBlur={(e) => handleBlurOrEnter(e, onChange)}
        onKeyDown={(e) => handleBlurOrEnter(e, onChange)}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="p-2 border rounded w-24"
      />
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow divide-y divide-gray-100">
      <div className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="p-2 border rounded w-36"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>

            <InputField
              label="Seed"
              value={seed}
              onChange={(val) => debouncedSetSeed(val)}
              placeholder="Enter seed"
            />

            <button
              onClick={() => navigator.clipboard.writeText(seed.toString())}
              className="p-2 hover:bg-gray-100 rounded"
              aria-label="Copy seed"
            >
              <Copy className="h-4 w-4" />
            </button>

            {isWideScreen && (
              <>
                <InputField
                  label="Likes"
                  value={likesPerBook}
                  onChange={(val) => debouncedSetLikes(val)}
                  placeholder="Enter likes"
                />
                <InputField
                  label="Reviews"
                  value={reviewsPerBook}
                  onChange={(val) => debouncedSetReviews(val)}
                  placeholder="Enter reviews"
                />
              </>
            )}
          </div>

          <div className="flex gap-2 items-center">
            <button
              onClick={onExport}
              className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm whitespace-nowrap"
            >
              Export CSV
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid" ? "bg-blue-500 text-white" : "bg-gray-100"
                }`}
                aria-label="Grid view"
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${
                  viewMode === "list" ? "bg-blue-500 text-white" : "bg-gray-100"
                }`}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {!isWideScreen && (
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="mt-4 text-sm text-gray-500 flex items-center gap-1 hover:text-gray-700"
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                showAdvanced ? "rotate-180" : ""
              }`}
            />
            {showAdvanced ? "Hide" : "Show"} advanced options
          </button>
        )}
      </div>

      {!isWideScreen && showAdvanced && (
        <div className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <InputField
              label="Likes"
              value={likesPerBook}
              onChange={(val) => debouncedSetLikes(val)}
              placeholder="Enter likes"
            />
            <InputField
              label="Reviews"
              value={reviewsPerBook}
              onChange={(val) => debouncedSetReviews(val)}
              placeholder="Enter reviews"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Controls;
