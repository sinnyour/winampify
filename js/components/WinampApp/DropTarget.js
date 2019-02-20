import React from "react";
import { connect } from "react-redux";
import { addTrackFromURI } from "../../actionCreators";

class DropTarget extends React.Component {
  constructor(props) {
    super(props);
    this.handleDrop = this.handleDrop.bind(this);
    this._ref = this._ref.bind(this);
  }

  supress(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    e.dataTransfer.effectAllowed = "copyMove";
  }

  handleDrop(e) {
    e.preventDefault();
    const files = JSON.parse(e.dataTransfer.getData("files"));
    files.map((file, index) => this.props.addTrackFromURI(file.uri, index));
  }

  _ref(node) {
    this._node = node;
  }

  render() {
    const {
      // eslint-disable-next-line no-shadow, no-unused-vars
      loadFilesFromReferences,
      // eslint-disable-next-line no-shadow, no-unused-vars
      handleDrop,
      // eslint-disable-next-line no-shadow, no-unused-vars
      addTrackFromURI,
      ...passThroughProps
    } = this.props;
    return (
      <div
        {...passThroughProps}
        onDragStart={this.supress}
        onDragEnter={this.supress}
        onDragOver={this.supress}
        onDrop={this.handleDrop}
        ref={this._ref}
      />
    );
  }
}
const mapStateToProps = state => ({
  playlist: state.playlist,
  explorer: state.explorer
});
const mapDispatchToProps = dispatch => ({
  addTrackFromURI: (id, index) => {
    dispatch(addTrackFromURI(id, index));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropTarget);