import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function getPageNumbers(current, totalPages) {
  const delta = 1;
  const range = [];
  for (
    let i = Math.max(1, current - delta);
    i <= Math.min(totalPages, current + delta);
    i++
  ) {
    range.push(i);
  }
  if (range[0] > 2) range.unshift("...");
  if (range[0] !== 1) range.unshift(1);
  if (range[range.length - 1] < totalPages - 1) range.push("...");
  if (range[range.length - 1] !== totalPages) range.push(totalPages);
  return range;
}

export default function Pagination({ page, totalPages, setPage, loading }) {
  const pageNumbers = getPageNumbers(page, totalPages);
  return (
    <div className="flex items-center gap-1 flex-wrap">
      <button
        className="px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1 || loading}
        aria-label="Previous page"
      >
        <MdChevronLeft size={20} />
      </button>
      {pageNumbers.map((num, idx) =>
        num === "..." ? (
          <span
            key={"ellipsis-" + idx}
            className="px-2 text-gray-400 select-none"
          >
            ...
          </span>
        ) : (
          <button
            key={num}
            className={`px-3 py-1 rounded-full transition font-medium ${
              num === page
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-200"
            }`}
            onClick={() => setPage(num)}
            disabled={num === page || loading}
          >
            {num}
          </button>
        )
      )}
      <button
        className="px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        disabled={page === totalPages || loading}
        aria-label="Next page"
      >
        <MdChevronRight size={20} />
      </button>
    </div>
  );
}
