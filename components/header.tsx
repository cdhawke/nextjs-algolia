import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './layout.module.scss';
import clsx from 'clsx';
import { Autocomplete } from './autocomplete';
import { SearchState } from 'react-instantsearch-core';
import { useSearchContext } from '../contexts/search';
import qs from 'qs';

type StateEvent = Event & { state: SearchState };

export const Header: FC = () => {
  // const plugins = useMemo(() => {
  //   const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
  //     key: 'search',
  //     limit: 3,
  //     transformSource({ source }) {
  //       return {
  //         ...source,
  //         onSelect(params) {
  //           setSearchState((searchState) => ({
  //             ...searchState,
  //             query: params.item.label,
  //           }));
  //         },
  //       };
  //     },
  //   });

  //   return [
  //     recentSearchesPlugin,
  //     createQuerySuggestionsPlugin({
  //       searchClient,
  //       indexName: 'instant_search_demo_query_suggestions',
  //       getSearchParams() {
  //         return recentSearchesPlugin.data.getAlgoliaSearchParams({
  //           hitsPerPage: 5,
  //         });
  //       },
  //       transformSource({ source }) {
  //         return {
  //           ...source,
  //           onSelect(params) {
  //             setSearchState((searchState) => ({
  //               ...searchState,
  //               query: params.item.query,
  //             }));
  //           },
  //         };
  //       },
  //     }),
  //   ];
  // }, []);

  const router = useRouter();
  const { searchState, setSearchState } = useSearchContext();

  console.log(searchState);
  return (
    <Navbar
      bg="secondary"
      variant="dark"
      expand="md"
      className={clsx(styles.header, 'shadow')}
      collapseOnSelect
      as="header"
    >
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand>Hawkesearch</Navbar.Brand>
        </Link>
        <Autocomplete
          placeholder="Search"
          detachedMediaQuery="none"
          initialState={{
            query: searchState.query,
          }}
          openOnFocus={true}
          onSubmit={({ state }: StateEvent) => {
            const updatedState = { ...searchState, query: state.query };
            setSearchState(updatedState);
            // router.push({
            //   pathname: '/search',
            //   query: qs.stringify(updatedState),
            // });
          }}
          onReset={() =>
            setSearchState((oldSearchState) => ({
              ...oldSearchState,
              query: '',
            }))
          }
          // plugins={plugins}
        />
      </Container>
    </Navbar>
  );
};
