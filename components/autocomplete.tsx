import { autocomplete, AutocompleteOptions } from '@algolia/autocomplete-js';
import React, {
  createElement,
  Fragment,
  ReactElement,
  useEffect,
  useRef,
} from 'react';
import { render } from 'react-dom';

/**
 * Autocomplete is a custom component that implements the @algolia/autocomplete-js
 *
 * @param {Omit<AutocompleteOptions<any>, 'container'>} {
 *   ...props
 * } default AutocompleteOptions without the container property. We want container to be specified within
 * this component, so don't want to be forced to pass it as an option.
 * @return {*}
 */
export const Autocomplete = ({
  ...props
}: Omit<AutocompleteOptions<any>, 'container'>) => {
  const containerRef = useRef<HTMLDivElement>(null);

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
};
