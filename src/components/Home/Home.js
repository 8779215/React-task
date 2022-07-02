import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import SearchIcon from '@material-ui/icons/Search';
import { onFetchImages } from "../../redux/actions/images";

import "./Home.scss";

const Home = ({ _onFetchImages, listLoading, imagesList }) => {
  const [searchedInput, setSearchedInput] = useState("");

  useEffect(() => {
    _onFetchImages({ type: searchedInput });
  }, [searchedInput]);

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
      <h1><span>{searchedInput} </span>Pictures</h1>
      <div className="row images-section">
        { imagesList?.map((images, index) => (
              <div key={index} className="images-list">
                  <img src={images.url} alt="smple-images" />
              </div>
            ))
          }
      </div>
    </div>
  );
};

const mapStateToProps = ({ images }) => {
  const { listLoading, imagesList } = images;
  return { listLoading, imagesList };
};

const mapDispatchToProps = {
  _onFetchImages: onFetchImages,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
