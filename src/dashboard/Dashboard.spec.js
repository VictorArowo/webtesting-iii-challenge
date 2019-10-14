import React from 'react';
import * as rtl from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Dashboard from './Dashboard';

let wrapper;

beforeEach(() => {
  wrapper = rtl.render(<Dashboard />);
});

afterEach(rtl.cleanup);

describe('Dashboard component', () => {
  test('matches the snapshot!', () => {
    expect(wrapper.container).toMatchSnapshot();
  });

  it('unlocked when component first mounts', () => {
    expect(wrapper.queryByText(/unlocked/i)).toBeInTheDocument();
    expect(wrapper.queryByText(/\blocked\b/i)).not.toBeInTheDocument();
  });

  it('open when component first mounts', () => {
    expect(wrapper.queryByText(/open/i)).toBeInTheDocument();
    expect(wrapper.queryByText(/closed/i)).not.toBeInTheDocument();
  });

  it('gate can not be opened or closed when locked ', () => {
    rtl.fireEvent.click(wrapper.queryByText(/close gate/i));
    rtl.fireEvent.click(wrapper.queryByText(/lock gate/i));

    expect(wrapper.queryByText(/open gate/i)).toBeDisabled();
    expect(wrapper.queryByText(/close gate/i)).not.toBeInTheDocument();
    expect(wrapper.queryByText(/locked/i)).toBeInTheDocument();
  });
  it('lock gate is disabled when gate is open', () => {
    rtl.fireEvent.click(wrapper.queryByText(/close gate/i));
    rtl.fireEvent.click(wrapper.queryByText(/open gate/i));

    expect(wrapper.queryByText(/lock gate/i)).toBeDisabled();
  });
});
