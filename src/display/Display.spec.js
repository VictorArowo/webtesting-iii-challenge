import React from 'react';
import * as rtl from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './Display';

let wrapper;

beforeEach(() => {
  wrapper = rtl.render(<Display closed={true} locked={true} />);
});

afterEach(rtl.cleanup);

describe('Display component', () => {
  it('matches the snapshot!', () => {
    expect(wrapper.container).toMatchSnapshot();
  });

  it('displays closed if closed prop is true', () => {
    expect(wrapper.queryByText(/closed/i)).toBeInTheDocument();
  });

  it('displays locked if locked prop is true', () => {
    expect(wrapper.queryByText(/\blocked\b/i)).toBeInTheDocument();
  });
  it('displays open if closed prop is false', () => {
    wrapper = rtl.render(<Display closed={false} locked={false} />);
    expect(wrapper.queryByText(/open/i)).toBeInTheDocument();
  });

  it('displays unlocked if locked prop is false', () => {
    wrapper = rtl.render(<Display closed={false} locked={false} />);
    expect(wrapper.queryByText(/unlocked/i)).toBeInTheDocument();
  });
});
