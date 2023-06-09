import React from "react";

function Card({ data }) {
  return (
    <div className="main flex">
      {data.map((data, key) => (
        <div className="container" key={key}>
          <img className="image" src={data.urls.small} alt={data.alt_description} />
          <h4>Photo by {data.user.name}</h4>
        </div>
      ))}
    </div>
  );
}

export default Card;
