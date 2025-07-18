import React from 'react';
import PropTypes from 'prop-types';
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

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  replace: PropTypes.bool,
  scroll: PropTypes.bool,
  prefetch: PropTypes.bool,
}

export default Tag;
