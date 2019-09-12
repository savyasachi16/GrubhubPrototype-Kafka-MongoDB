import React from "react";
import { Helmet } from "react-helmet";

const TITLE = "Calculator App";

class Title extends React.PureComponent {
  render() {
    return (
      <>
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        <h1 className="jumbotron">{TITLE}</h1>
      </>
    );
  }
}

export default Title;
