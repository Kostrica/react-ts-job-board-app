import React from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import './Pagination.scss';

const Pagination = ({ openedPage, pageCount }: any) => {
  let navigate = useNavigate();

  const handlePageClick = (event: any) => {
    const selectedPage: number = event.selected + 1;

    navigate(`/${selectedPage}`);
  };

  return (
    <div className="mb-[64px] mt-[41px]">
      <ReactPaginate
        className="flex justify-center bg-[#FFFFFF] rounded-lg shadow-3xl"
        nextLabel="&rsaquo;"
        previousLabel="&lsaquo;"
        breakLabel="..."
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={3}
        forcePage={openedPage - 1}
        pageCount={Math.ceil(pageCount)}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
  );
};

export default React.memo(Pagination);
