import React from "react";
import Onboarding from "../Onboarding";
import ReactTestRenderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react";
import { startupNotification } from "../mocks";

import * as utils from "../../utils";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { keysInit } from "react-keys";
import IndexReducer from "../../index.reducers";
import { fireBinderEvent } from "../../helper";

function renderWithRedux(
  ui,
  { initialState, store = createStore(IndexReducer, initialState) } = {}
) {
  keysInit({ store: store });
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store
  };
}

describe.only("Onboarding component", () => {
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
    const { getByText, getByAltText } = renderWithRedux(
      <Onboarding startupNotification={startupNotification} />
    );
    const imgNode = getByAltText("onboarding-img");
    fireEvent.click(getByText(/Next/i));

    expect(imgNode.src).toEqual(
      "https://thumb.canalplus.pro/bran/unsafe/450x200/image/44/2/2_onboarding.59442.jpg"
    );
  });

  it("should update the displayed image if the user clicks the 'Test' button", async () => {
    const { getByAltText, getByText } = renderWithRedux(
      <Onboarding startupNotification={startupNotification} />
    );
    const imgNode = getByAltText("onboarding-img");
    fireBinderEvent(getByText(/Enter/i), 13);

    expect(imgNode.src).toEqual(
      "https://thumb.canalplus.pro/bran/unsafe/450x200/image/44/2/2_onboarding.59442.jpg"
    );
  });
});
