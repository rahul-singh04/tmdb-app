import React from "react";
import profile_dummy from "../images/dummy1.jpg";
import poster from "../images/posterNotFound.jpg";
export const Multisearchcard = (props) => {
  const count = Object.keys(props.item).length;
  let person = false;
  if (count === 10) {
    person = true;
  } else {
    person = false;
  }
  return (
    <>
      <div className="multiSearch_card">
        <div className="multiSearch_image">
          {person ? (
            <img
              src={
                props.item.profile_path === null
                  ? profile_dummy
                  : `https://image.tmdb.org/t/p/original${props.item.profile_path}`
              }
              className=""
              alt="Poster Not Found"
            ></img>
          ) : (
            <img
              src={
                props.item.poster_path === null
                  ? poster
                  : `https://image.tmdb.org/t/p/original${props.item.poster_path}`
              }
              className=""
              alt="Poster Not Found"
            ></img>
          )}
          <img
            src={
              props.item.profile_path === null
                ? profile_dummy
                : `https://image.tmdb.org/t/p/original${
                    person ? props.item.profile_path : props.item.poster_path
                  }`
            }
            className=""
            alt="Poster Not Found"
          ></img>
        </div>
        <div className="multiSearch_info">
          <span className="multiSearchMovieTitleOrName">
            {person ? props.item.name : props.item.title}
          </span>
          <span
            className="multiSearchReleaseDateOrGender"
            style={{ color: "#a6a6a6" }}
          >
            {person ? `Gender: ` : `Release Date: `}
            {person
              ? props.item.gender === 2
                ? `Male`
                : "Female"
              : props.item.release_date}
          </span>
          <span className="multiSearchOverviewOrProfession">
            {person ? `Profession: ` : ""}
            {person
              ? props.item.known_for_department
              : props.item.overview.length < 300
              ? props.item.overview
              : `${props.item.overview.substr(0, 300)}.....`}
          </span>
          <span className="multiSearchPopularity">
            Popularity: {<span>{props.item.popularity}</span>}
          </span>
        </div>
      </div>
    </>
  );
};
