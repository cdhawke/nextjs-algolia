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
import qs from 'qs';
import {
  searchStateFromRouterQuery,
  searchStateToRouterQuery,
} from '../util/search-helpers';

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
    router.push({
      pathname: '/search',
      query: searchStateToRouterQuery(searchState),
    });
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
