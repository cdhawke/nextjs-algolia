import { useRouter } from 'next/router';
import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { SearchState } from 'react-instantsearch-core';
import {
  searchStateFromRouterQuery,
  searchStateToRouterQuery,
} from '../util/search-helpers';
import nohop from 'nohop';

interface SearchContextProps {
  searchState: SearchState;
  setSearchState: Dispatch<SetStateAction<SearchState>>;
}

const SearchContext = createContext<SearchContextProps>({
  searchState: {},
  setSearchState: () => undefined,
});

const SearchProvider: FC = ({ children }) => {
  const router = useRouter();

  const [searchState, setSearchState] = useState<SearchState>(
    searchStateFromRouterQuery(router.query),
  );

  useEffect(() => {
    if (!searchState || Object.keys(searchState).length === 0) {
      return;
    }

    const routerPush = async () =>
      await router.push({
        pathname: '/search',
        query: searchStateToRouterQuery(searchState),
      });

    // nohop debounces the provided function for the given amount of time.
    // We wait 400 seconds after the search state has been updated in ANY case
    // before actually invoking the router. This is a good catch-all place to
    // debounce, because anything that updates the state will be essentially debounced.
    nohop(routerPush, 400)();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchState]);

  return (
    <SearchContext.Provider value={{ searchState, setSearchState }}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearchContext = () => {
  return useContext(SearchContext);
};

export { SearchProvider, useSearchContext };
