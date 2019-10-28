import React, { Component } from "react";

import { replace } from "../utils";

class Onboarding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlideIndex: 0
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
          <div>
            <img
              className="slideShow-image"
              src={currentSlideImgSrc}
              alt="onboarding-img"
            />
            <button onClick={this.next}>Next</button>
            <button onClick={this.onLeaveOnboarding}>Leave</button>
          </div>
        );

      default:
        return null;
    }
  }
}

export default Onboarding;
