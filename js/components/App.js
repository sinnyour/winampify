import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Explorer from "./Explorer";
import "../../css/winamp.css";
import ImageModal from "./ImageModal";
import Desktop from "./Desktop";
import WinampApp from "./WinampApp";

const App = ({ closed, isModalOpen, imageSource, closeModal }) => {
  if (closed) {
    return null;
  }

  return (
    <div role="application" id="winamp2-js">
      <WinampApp />
      <Desktop />
      <Explorer />
      {isModalOpen && (
        <ImageModal image={imageSource} onClick={() => closeModal()} />
      )}
    </div>
  );
};

App.propTypes = {
  container: PropTypes.instanceOf(Element)
};
const mapDispatchToProps = dispatch => ({
  closeModal: () => {
    dispatch({ type: "CLOSE_MODAL" });
  }
});

const mapStateToProps = state => ({
  closed: state.display.closed,
  equalizer: state.windows.equalizer,
  playlist: state.windows.playlist,
  openWindows: new Set(state.windows.openGenWindows),
  isModalOpen: state.display.isModalOpen,
  imageSource: state.display.imageSource
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
