import type { Dispatch, SetStateAction } from "react";

type Props = {
  page: number;
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
};

const Pagination = ({ page, totalPages, setPage }: Props) => {
  return (
    <nav className="pagination">
      <button
        onClick={() => setPage((p) => Math.max(0, p - 1))}
        disabled={page === 0}
      >
        ←
      </button>
      <span>
        {page + 1} / {totalPages}
      </span>
      <button
        onClick={() => setPage((p) => p + 1)}
        disabled={page + 1 >= totalPages}
      >
        →
      </button>
    </nav>
  );
};

export default Pagination;
