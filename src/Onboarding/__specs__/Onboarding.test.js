import React from "react";
import Onboarding from "../Onboarding";
import ReactTestRenderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react";
import { startupNotification } from "../mocks";

import * as utils from "../../utils";

describe("Onboarding component", () => {
  describe("Snapshots", () => {
    it("should render snapshot - react-test-renderer", () => {
      const renderer = ReactTestRenderer.create(
        <Onboarding startupNotification={startupNotification} />
      );
      expect(renderer.toJSON()).toMatchSnapshot();
    });

    it("should render snapshot - @testing-library/react", () => {
      const { asFragment } = render(
        <Onboarding startupNotification={startupNotification} />
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it("should render null - react-test-renderer", () => {
      const renderer = ReactTestRenderer.create(<Onboarding />);
      expect(renderer.toJSON()).toMatchSnapshot();
    });

    it("should render null  - @testing-library/react", () => {
      const { asFragment } = render(<Onboarding />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it("should redirect to home", () => {
    const spy = jest.spyOn(utils, "replace");
    render(<Onboarding onboardingShouldNotBeDisplayed />);
    expect(spy).toHaveBeenCalledWith("/home");
  });

  it("should call the updateOnboarding prop if user clicks the 'Leave' button", () => {
    const updateOnboarding = jest.fn();
    const test = render(
      <Onboarding
        startupNotification={startupNotification}
        updateOnboarding={updateOnboarding}
      />
    );
    console.log(test);
    fireEvent.click(test.getByText(/Leave/i));
    expect(updateOnboarding).toHaveBeenCalledWith({
      alreadyDisplayed: true
    });
  });

  it("should update the displayed image if the user clicks the 'Next' button", () => {
    const { getByText, getByAltText } = render(
      <Onboarding startupNotification={startupNotification} />
    );
    const imgNode = getByAltText("onboarding-img");
    fireEvent.click(getByText(/Next/i));

    expect(imgNode.src).toEqual(
      "https://thumb.canalplus.pro/bran/unsafe/450x200/image/44/2/2_onboarding.59442.jpg"
    );
  });
});
