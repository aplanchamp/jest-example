import React, { Component } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Binder, getBinderSelectedId } from 'react-keys';
import { replace } from "../utils";


class Onboarding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlideIndex: 0,
    };
  }

  componentDidMount() {
    if (this.props.onboardingShouldNotBeDisplayed) {
      replace("/home");
    }
  }

  onLeaveOnboarding = () => {
    this.props.updateOnboarding({ alreadyDisplayed: true });
  };

  next = () => {
    this.setState({ currentSlideIndex: this.state.currentSlideIndex + 1 });
  };

  onSelect(id) {
    switch (id) {
      case 'btn_id':
          this.setState({ currentSlideIndex: this.state.currentSlideIndex + 1 });
        break;
      default:
        break;
    }
  }

  render() {
    const { startupNotification } = this.props;
    const currentPage = startupNotification && startupNotification.currentPage;
    return currentPage
      ? this.renderTemplateComponent(
          currentPage.displayTemplate,
          startupNotification
        )
      : null;
  }

  renderTemplateComponent(displayTemplate, { slides }) {
    const currentSlide = slides[this.state.currentSlideIndex];
    const currentSlideImgSrc =
      currentSlide && currentSlide.URLImageRegularLandscape
        ? currentSlide.URLImageRegularLandscape.replace(
            "{resolutionXY}",
            "450x200"
          )
        : "";
    switch (displayTemplate) {
      case "slideShow":
        return (
          <div id='rt' title="test">
            <img
              className="slideShow-image"
              src={currentSlideImgSrc}
              alt="onboarding-img"
            />
            <button onClick={this.next}>Next</button>
            <button onClick={this.onLeaveOnboarding}>Leave</button>
            <Binder
              id="btn_binder"
              selector="button"
              memory={true}
              onEnter={({ id }) => this.onSelect(
                id,
              )}
            >
                <button
                  id="btn_id"
                  selected={this.props.selectedId === 'btn_id'}
                >Test</button>
            </Binder>
          </div>
        );

      default:
        return null;
    }
  }
}

const mapStateToProps = createStructuredSelector({
  selectedId: getBinderSelectedId('btn_binder'),
});

export default connect(mapStateToProps)(Onboarding);
