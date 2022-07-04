import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import { onFetchImages } from "../../redux/actions/images";

import "./Home.scss";

const Home = ({ _onFetchImages, imagesList, totalCount }) => {
  const [searchedInput, setSearchedInput] = useState();
  const [pageNo, setPageNo] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(null);

  useEffect(() => {
    _onFetchImages({ type: searchedInput, pageNo: pageNo });
  }, [searchedInput]);

  useEffect(() => {
    const data = Math.round(totalCount / 8);
    const temp = [];

    for (let i = 0; i < data; i++) {
      temp.push(i + 1);
    }

    setTotalPageCount(temp);
  }, [totalCount, imagesList]);

  const updatePageNo = (count) => {
    setPageNo(count);
    _onFetchImages({ type: searchedInput, pageNo: count });
  };

  return (
    <div className="container">
      <div className="row form-section">
        <form>
          <input
            type="text"
            placeholder="Search..."
            name="searchedInput"
            value={searchedInput}
            onChange={(e) => setSearchedInput(e.target.value)}
          />
          <div className="search-icon">
            <SearchIcon />
          </div>
        </form>
        <div className="tab-selection">
          <div
            role="presentation"
            className="tabs-item"
            onClick={() => setSearchedInput("mountain")}
          >
            Mountain
          </div>
          <div
            role="presentation"
            className="tabs-item"
            onClick={() => setSearchedInput("beaches")}
          >
            Beaches
          </div>
          <div
            role="presentation"
            className="tabs-item"
            onClick={() => setSearchedInput("birds")}
          >
            Birds
          </div>
          <div
            role="presentation"
            className="tabs-item"
            onClick={() => setSearchedInput("food")}
          >
            Food
          </div>
        </div>
      </div>
      <h1>
        <span>{searchedInput && searchedInput} </span>Pictures
      </h1>
      <div className="row images-section">
        {imagesList?.map((images, index) => (
          <div key={index} className="images-list">
            <img src={images.url} alt="smple-images" />
          </div>
        ))}
      </div>
      { !searchedInput && (
        <div className="pagination">
        {totalPageCount?.map((count) => (
          <button
            key={count}
            onClick={() => updatePageNo(count)}
            className="images-list"
          >
            {count}
          </button>
        ))}
      </div>
      )
      }
    </div>
  );
};

const mapStateToProps = ({ images }) => {
  const { listLoading, imagesList, totalCount } = images;
  return { listLoading, imagesList, totalCount };
};

const mapDispatchToProps = {
  _onFetchImages: onFetchImages,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
