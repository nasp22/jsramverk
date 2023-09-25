import React from "react";
import DelayTableView from "./DelayTableView";
import Map from "./Map";

const MainView = () => {

    let container = document.getElementsByClassName("container");

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    return (
        <>
          <div className="delayed">
            <h1>Försenade tåg</h1>
                <DelayTableView/>
          </div>
          <Map/>
        </>
      );
    }

export default MainView;