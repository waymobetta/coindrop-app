import React from "react";
import "./TaskDescriptions.css";
import Info from "../components/Info";

export const AdChainArchaeologist = () => {
  return (
    <div className="TaskAuthor">
      <div className="lander">
        <h1>adChain</h1>
        <p
          className="TaskTitle">
          archaeologist
        </p>
        <br />
        <Info
          className="InfoDescription"
          description={
          "this is the test description of the adChain archaeologist task"
        } />
      </div>
    </div>
  );
}

export const AdChainAcknowledged = () => {
  return (
    <div className="TaskAuthor">
      <div className="lander">
        <h1>adChain</h1>
        <p
          className="TaskTitle">
          acknowledged
        </p>
        <br />
        <Info
          className="InfoDescription"
          description={
            "this is a test description of the adChain acknowledged task"
          } />
      </div>
    </div>
  );
}

export const ColonyContributor = () => {
  return (
    <div className="TaskAuthor">
      <div className="lander">
        <h1>colony</h1>
        <p
          className="TaskTitle">
          contributor
        </p>
        <br />
        <Info
          className="InfoDescription"
          description={
            "this is a test description of the colony contributor task"
          } />
      </div>
    </div>
  );
}
