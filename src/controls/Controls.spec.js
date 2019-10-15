import React from 'react';
import * as rtl from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Controls from './Controls';

let wrapper;

const mockHandler = jest.fn();
beforeEach(() => {
  const state = {
    locked: false,
    closed: false
  };
  wrapper = rtl.render(
    <Controls
      toggleClosed={mockHandler}
      toggleLocked={mockHandler}
      locked={state.locked}
      closed={state.closed}
    />
  );
});

afterEach(rtl.cleanup);

describe('Controls component', () => {
  test('matches the snapshot!', () => {
    expect(wrapper.container).toMatchSnapshot();
  });

  it('renders the buttons', () => {
    expect(wrapper.queryByText(/lock gate/i)).toBeInTheDocument();
    expect(wrapper.queryByText(/close gate/i)).toBeInTheDocument();
  });

  it('gate can not be opened or closed when locked ', () => {
    expect(wrapper.queryByText(/close gate/i)).toBeInTheDocument();
    expect(wrapper.queryByText(/lock gate/i)).toBeInTheDocument();
    rtl.fireEvent.click(wrapper.queryByText(/close gate/i));

    expect(mockHandler.mock.calls.length).toBe(1);
  });
});
