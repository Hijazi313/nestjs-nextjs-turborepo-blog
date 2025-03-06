import { calculatePageNumbers } from "../../../../lib/pagination";
import { cn } from "../../../../lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

type Props = {
  totalPages: number;
  currentPage: number;
  pageNeighbors?: number;
  setCurrentPage: (page: number) => void;
  className?: string;
};
function CommentPagination({
  totalPages,
  currentPage,
  pageNeighbors = 2,
  setCurrentPage,
  className,
}: Props) {
  const pageNumbers = calculatePageNumbers({
    pageNeighbors,
    currentPage,
    totalPages,
  });
  const handlePageClick = (page: number | string) => {
    if (typeof page === "number" && page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div className={cn(className, "flex items-center justify-center gap-2")}>
      {/* Previous Page button */}
      {currentPage !== 1 && (
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          className={cn(
            "px-2 py-2 border border-gray-300 rounded-md bg-slate-200"
          )}
        >
          <ChevronLeftIcon className="w-4" />
          {/* <span className="text-gray-700">Previous</span> */}
        </button>
      )}
      {/* Middle section buttons */}
      {pageNumbers.map((pageNumber, index) => {
        return (
          <button
            disabled={pageNumber === "..."}
            onClick={() => handlePageClick(pageNumber)}
            key={index}
            className={cn(
              "px-3 py-1 border border-gray-300 rounded-md hover:text-sky-600",
              {
                "bg-slate-200":
                  pageNumber !== currentPage && pageNumber !== "...",
                "text-white bg-blue-500": pageNumber !== currentPage,
                "cursor-not-allowed": pageNumber === "...",
              }
            )}
          >
            {pageNumber === "..." ? (
              <span className="text-gray-500">...</span>
            ) : (
              <span>{pageNumber}</span>
            )}
          </button>
        );
      })}
      {/* Next Page button */}
      {currentPage !== totalPages && (
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          className={cn(
            "px-2 py-2 border border-gray-300 rounded-md bg-slate-200"
          )}
        >
          <ChevronRightIcon className="w-4" />
        </button>
      )}
    </div>
  );
}

export default CommentPagination;
