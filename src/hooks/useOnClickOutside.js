/* useOnClickOutside.js */
import React, { useEffect } from 'react';

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    // console.log(ref);

    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      handler(e);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      // 컴포넌트가 언마운트 됐을 때 리턴 실행 (이벤트리스너들 삭제)
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);

  return <div>useOnClickOutside</div>;
}

export default useOnClickOutside;
