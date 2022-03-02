import { autocomplete } from '@algolia/autocomplete-js';
import React, {
  createElement,
  Fragment,
  ReactElement,
  useEffect,
  useRef,
} from 'react';
import { render } from 'react-dom';

export function Autocomplete({ ...props }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const search = autocomplete({
      container: containerRef.current,
      renderer: { createElement, Fragment },
      render({ children }, root) {
        render(children as ReactElement, root);
      },
      ...props,
    });

    return () => {
      search.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} />;
}
