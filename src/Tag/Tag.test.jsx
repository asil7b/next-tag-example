import React from 'react';
import { render } from '@testing-library/react';
import Tag from '.';

describe('<Tag />', () => {
  it('Tag renders correctly', () => {
    const { asFragment } = render(<Tag href="/tag/react/">react</Tag>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Tag respects given props', () => {
    const { asFragment } = render(
      <Tag
        href="/tag/react/"
        prefetch={false}
        title="React Tag"
      >
        react
      </Tag>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
