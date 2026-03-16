import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ScrollLink = ({ to, className, children, ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (event) => {
    event.preventDefault();

    const targetId = to.replace(/^#/, '');

    const scrollToTarget = () => {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    if (location.pathname !== '/') {
      navigate('/');
      window.setTimeout(scrollToTarget, 150);
      return;
    }

    scrollToTarget();
  };

  return (
    <a href={to} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};

export default ScrollLink;
