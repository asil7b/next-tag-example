import React from 'react';
import Link from 'next/link';

const Tag = React.forwardRef(function Tag(props, ref) {
  const {
    children,
    href,
    replace = false,
    scroll = true,
    prefetch,
    ...other
  } = props;

  return (
    <Link
      ref={ref}
      href={href}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      {...other}
    >
      {children}
    </Link>
  );
});

export default Tag;
