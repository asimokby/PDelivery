import React from "react";
import Header from "./Header";
import PageCore from "./PageCore";
import ActionCall from "./ActionButtonHeader";
import Footer from "./Footer";
import About from "../AboutPg/About";
class MainContent extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ActionCall />
        <PageCore />
        <About />
        <Footer />
      </div>
    );
  }
}
export default MainContent;
