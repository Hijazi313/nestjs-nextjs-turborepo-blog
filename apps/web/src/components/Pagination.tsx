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
  return <div>Pagination</div>;
};

export default Pagination;
