import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Character from "../../components/Character";
import Searchbar from "../../components/Searchbar";
import Pagination from "../../components/Pagination.js";
import "./style.css";

const Characters = ({
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

  // get data from Marvel API, changing each pageNumber

  useEffect(() => {
    setShowModal(false);
    setIsLoading(true);
    const fetchData = async () => {
      const response = await axios.get(
        `https://marvel-by-julie.herokuapp.com/characters?offset=${skipping}`
      );

      setData(response.data.data);
      setIsLoading(false);
    };
    fetchData();
  }, [pageNumber]);

  return (
    <>
      <img
        alt="marvel-characters"
        src="https://www.zupimages.net/up/20/08/8shv.png"
        className="cover-img"
      />
      <div className="wrapper">
        <Searchbar searchReference="character" handleSearch={handleSearch} />
        <section>
          {isLoading === true ? (
            <div className="loader">
              <p> Loading...</p>
            </div>
          ) : (
            <>
              {searchData && searchData.length > 0 ? (
                <ul className="d-flex wrap">
                  {searchData.map((character, i) => {
                    return (
                      <Character
                        {...character}
                        key={character.id}
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
                    {data.results.map((character, i) => {
                      return (
                        <Character
                          {...character}
                          key={character.id}
                          favorites={favorites}
                          addFavorite={addFavorite}
                          removeFavorite={removeFavorite}
                        />
                      );
                    })}
                  </ul>
                  <Pagination
                    limit={limit}
                    totalPosts={data.total}
                    paginate={paginate}
                    pageNumber={pageNumber}
                  />
                </>
              )}
            </>
          )}{" "}
        </section>
      </div>
    </>
  );
};

export default Characters;
