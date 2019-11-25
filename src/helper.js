import { fireEvent } from "@testing-library/react";

export function fireBinderEvent(nodeElem, keyCode) {
  jest.useFakeTimers();
  fireEvent.keyDown(nodeElem, { keyCode });
  fireEvent.keyUp(nodeElem, { keyCode });
  jest.runAllTimers();
}
