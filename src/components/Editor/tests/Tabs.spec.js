/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at <http://mozilla.org/MPL/2.0/>. */

import Tabs from "../Tabs";

const TabsComponent = Tabs.WrappedComponent;

describe("Tabs", () => {
  let originalRequestIdleCallback;
  let originalSetTimeout;

  beforeEach(() => {
    originalRequestIdleCallback = window.requestIdleCallback;
    originalSetTimeout = window.setTimeout;
    window.setTimeout = jest.fn();
  });

  afterEach(() => {
    window.requestIdleCallback = originalRequestIdleCallback;
    window.setTimeout = originalSetTimeout;
  });

  it("should call original requestIdleCallback", () => {
    window.requestIdleCallback = jest.fn();
    const tabsComponent = new TabsComponent();
    tabsComponent.componentDidMount();
    expect(window.requestIdleCallback.mock.calls).toHaveLength(1);
    expect(window.setTimeout.mock.calls).toHaveLength(0);
  });

  it("should call setTimeout as fallback", () => {
    window.requestIdleCallback = undefined;
    const tabsComponent = new TabsComponent();
    tabsComponent.componentDidMount();
    expect(window.setTimeout.mock.calls).toHaveLength(1);
  });
});
