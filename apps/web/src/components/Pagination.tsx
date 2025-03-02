import Link from "next/link";
import { calculatePageNumbers } from "../lib/pagination";
import { cn } from "../lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

type Props = {
  totalPages: number;
  currentPage: number;
  pageNeighbors?: number;
  className?: string;
};
const Pagination = ({
  totalPages,
  currentPage,
  className,
  pageNeighbors = 2,
}: Props) => {
  const pageNumbers = calculatePageNumbers({
    totalPages,
    pageNeighbors,
    currentPage,
  });
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {currentPage !== 1 && (
        <button
          className={cn(
            "px-2 py-2 border border-gray-300 rounded-md bg-slate-200"
          )}
        >
          <Link href={`?page=${currentPage - 1}`}>
            <ChevronLeftIcon className="w-4" />
            {/* <span className="text-gray-700">Previous</span> */}
          </Link>
        </button>
      )}
      {pageNumbers.map((pageNumber, index) => {
        return (
          <button
            key={index}
            className={cn(
              "px-3 py-1 border border-gray-300 rounded-md hover:text-sky-600",
              {
                "bg-slate-200":
                  pageNumber !== currentPage && pageNumber !== "...",
                "text-white bg-blue-500": pageNumber !== currentPage,
              }
            )}
          >
            <Link href={`?page=${pageNumber}`}>{pageNumber}</Link>
          </button>
        );
      })}
      {currentPage !== totalPages && (
        <button
          className={cn(
            "px-2 py-2 border border-gray-300 rounded-md bg-slate-200"
          )}
        >
          <Link href={`?page=${currentPage + 1}`}>
            {/* <span className="text-gray-700">Next</span> */}
            <ChevronRightIcon className="w-4" />
          </Link>
        </button>
      )}
    </div>
  );
};

export default Pagination;
