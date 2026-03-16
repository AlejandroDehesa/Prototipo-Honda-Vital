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
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
        const extraOffset = 16;
        const targetTop = target.getBoundingClientRect().top + window.scrollY;
        const top = Math.max(targetTop - navbarHeight - extraOffset, 0);

        window.scrollTo({
          top,
          behavior: 'smooth'
        });
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
