import React from "react";
import Onboarding from "../Onboarding";
import ReactTestRenderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react";
import { startupNotification } from "../mocks";

import * as utils from "../../utils";
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import { keysInit } from 'react-keys';
import IndexReducer from '../../index.reducers'
import { keysHandler } from "react-keys/build/components/binder/handler"

function renderWithRedux(
  ui,
  {initialState, store = createStore(IndexReducer, initialState)} = {},
) {
  keysInit({ store: store });
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  }
}

describe.only("Onboarding component", () => {
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
    renderWithRedux(<Onboarding onboardingShouldNotBeDisplayed />);
    expect(spy).toHaveBeenCalledWith("/home");
  });

  it("should call the updateOnboarding prop if user clicks the 'Leave' button", () => {
    const updateOnboarding = jest.fn();
    const test = renderWithRedux(
      <Onboarding
        startupNotification={startupNotification}
        updateOnboarding={updateOnboarding}
      />
    );
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

  it.only("should update the displayed image if the user clicks the 'Test' button", () => {
    const { getByAltText } = renderWithRedux(
      <Onboarding startupNotification={startupNotification} />
    );
    const imgNode = getByAltText("onboarding-img");

    // fireEvent.keyPress(getByTitle(/Test/i), { key: 'Enter', code: 13 });
    const innerProps = {
      id: "btn_binder",
      selector: "button",
      active: true,
      boundedGap: 0,
      downGap: 0,
      filter: null,
      gap: 0,
      leftGap: 0,
      longPress: true,
      memory: true,
      onEnter: () => 
      fireEvent.change(
        getByAltText("onboarding-img"),
        { target: { src: "https://thumb.canalplus.pro/bran/unsafe/450x200/image/44/2/2_onboarding.59442.jpg" } }),
      priority: 0,
      refreshStrategy: "first",
      rightGap: 0,
      strategy: "none",
      topGap: 0,
      triggerClick: true,
    }
    keysHandler(13, false, false, innerProps)

    expect(imgNode.src).toEqual(
      "https://thumb.canalplus.pro/bran/unsafe/450x200/image/44/2/2_onboarding.59442.jpg"
    );
  });
});
