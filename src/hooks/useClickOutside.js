import { useRef, useEffect } from 'react';

export default onClickOutside => {
  const ref = useRef();

  useEffect(() => {
    const onPointerDown = e => {
      if (ref && ref.current && !ref.current.contains(e.target)) {
        onClickOutside(e);
      }
    };

    if (window.PointerEvent) {
      document.addEventListener('pointerdown', onPointerDown);
    } else {
      document.addEventListener('mousedown', onPointerDown);
      document.addEventListener('touchstart', onPointerDown);
    }

    return () => {
      if (window.PointerEvent) {
        document.addEventListener('pointerdown', onPointerDown);
      } else {
        document.removeEventListener('mousedown', onPointerDown);
        document.removeEventListener('touchstart', onPointerDown);
      }
    };
  }, [onClickOutside]);

  return ref;
};
