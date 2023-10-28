import React, { useEffect, useState } from "react";
import homepageImg from "../images/homepage1.jpg";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Multisearchcard } from "./Multisearchcard";
import TrendingCard from "./TrendingCard";

export default function HomePage() {
  //    const navigate =  useNavigate();
  const [globalSearchBar, setGlobalSearchBar] = useState();
  const [globalsearchParams, setGlobalSearchParams] = useSearchParams({
    query: "",
  });
  const [multiSearchState, setMultiSearchState] = useState([]);

  function handleglobalSearch(event) {
    setGlobalSearchBar(event.target.value.toLowerCase());
  }

  const globalSearch = () => {
    setGlobalSearchParams({ query: globalSearchBar });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      globalSearch();
    }
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/multi?api_key=0a62a91a7346c3452d52fcfbebc81be2&language=en-US&query=${globalsearchParams.get(
          "query"
        )}&page=1&include_adult=true`
      )
      .then((response) => {
        setMultiSearchState(response.data.results);
        // console.log(globalsearchParams.get('query'));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [globalsearchParams]);
  // console.log(multiSearchState);

  const multiSearchCards = multiSearchState.map(function (item) {
    return <Multisearchcard key={item.id} item={item} />;
  });

  //Trending Section
  const [trendingDaily, setTrendingdaily] = useState([]);
  const [dayOrWeek, setdayOrWeek] = useState(true);
  console.log(dayOrWeek);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/all/${
          dayOrWeek ? "day" : "week"
        }?api_key=0a62a91a7346c3452d52fcfbebc81be2`
      )
      .then((response) => {
        setTrendingdaily(response.data.results);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [dayOrWeek]);

  // eslint-disable-next-line
  const trendingCards = trendingDaily.map(function (item) {
    if (item.backdrop_path !== null) {
      return <TrendingCard key={item.id} item={item} />;
    }
  });
  function handleTrendingToggle() {
    setdayOrWeek((prevState) => {
      return !prevState;
    });
  }
  console.log(trendingDaily);
  if (
    globalsearchParams.get("query") === "" ||
    globalsearchParams.get("query") === null
  ) {
    return (
      <>
        <div className="main_container">
          <div className="homepage_container">
            <div className="homepage_img">
              <img src={homepageImg} alt="logo" />
              <div className="overlay">
                <span> Welcome. </span>
                Millions of movies, TV shows and people to discover. Explore
                now.
                <div
                  style={{ marginTop: "1.8rem" }}
                  className="p-1 bg-light rounded rounded-pill shadow-sm mb-4"
                >
                  <div className="input-group">
                    <input
                      type="search"
                      placeholder="Search for Movie, TV show, person...."
                      aria-describedby="button-addon1"
                      className=" form-control border-0 bg-light"
                      id="input"
                      onChange={handleglobalSearch}
                      onKeyDown={handleKeyDown}
                    />
                    <div className="input-group-append">
                      <button
                        id="button-addon1"
                        type="submit"
                        className="btn btn-link text-primary"
                      >
                        <i className="fa fa-search" onClick={globalSearch}></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="trendingHeader">
              <span>Trending</span>
              <div className="toggletrending">
                <span className="toggleText">Today</span>
                <label className="toggle" htmlFor="myToggle">
                  <input
                    className="toggle__input"
                    name=""
                    type="checkbox"
                    id="myToggle"
                    onClick={handleTrendingToggle}
                  />
                  <div className="toggle__fill"></div>
                </label>
                <span className="toggleText">This Week</span>
              </div>
            </div>
            <div className="trendingContainer">{trendingCards}</div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="main_container">
          <div className="multiSearch_container">{multiSearchCards}</div>
        </div>
      </>
    );
  }
}
