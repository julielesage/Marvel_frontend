import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

import ComicBook from "../../components/ComicBook";
import Searchbar from "../../components/Searchbar";
import Pagination from "../../components/Pagination";

const Comics = ({
  setShowModal,
  favorites,
  addFavorite,
  removeFavorite,
  searchData,
  handleSearch,
  isLoading,
  setIsLoading,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const { pageNumber } = useParams();
  const history = useHistory();

  // pagination limit=70 & offset=skipping

  const [limit, setLimit] = useState(100);
  let skipping = 0;
  if (pageNumber > 1) skipping = (pageNumber - 1) * 100;

  const paginate = (pageNumber) => {
    history.push("/characters_" + pageNumber);
  };

  // get data from Marvel API

  useEffect(() => {
    setShowModal(false);

    const fetchData = async () => {
      setIsLoading(true);
      const response = await axios.get(
        `https://marvel-by-julie.herokuapp.com/comics?offset=${skipping}`
      );

      setData(response.data.data.results);

      setIsLoading(false);
    };
    fetchData();
  }, [pageNumber]);

  return (
    <>
      <img
        className="cover-top"
        src="https://www.kissmygeek.com/wp-content/uploads/2015/09/C_header-1024x585.jpg"
        alt="comics"
      />
      <div className="wrapper">
        <div className="top-space">
          <Searchbar
            searchReference="comic"
            className="comic-searchbar"
            handleSearch={handleSearch}
          />
        </div>

        <section>
          {isLoading === true ? (
            <div className="loader">
              <p> Loading...</p>
            </div>
          ) : (
            <>
              {searchData && searchData.length > 0 ? (
                <ul className="d-flex wrap">
                  {searchData.map((book, i) => {
                    return (
                      <ComicBook
                        {...book}
                        key={book.id}
                        favorites={favorites}
                        addFavorite={addFavorite}
                        removeFavorite={removeFavorite}
                      />
                    );
                  })}
                </ul>
              ) : (
                <>
                  <ul className="d-flex wrap">
                    {data.map((book, i) => {
                      return (
                        <li key={book.id}>
                          <ComicBook
                            {...book}
                            favorites={favorites}
                            addFavorite={addFavorite}
                            removeFavorite={removeFavorite}
                          />
                        </li>
                      );
                    })}
                  </ul>
                  <Pagination
                    limit={limit}
                    totalPosts={data.total}
                    paginate={paginate}
                    pageNumber={pageNumber}
                    setCurrentPage={setCurrentPage}
                  />
                </>
              )}
            </>
          )}
        </section>
      </div>
    </>
  );
};

export default Comics;
