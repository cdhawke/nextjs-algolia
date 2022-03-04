import { FC, useMemo } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import Link from 'next/link';
import styles from './layout.module.scss';
import clsx from 'clsx';
import { Autocomplete } from './autocomplete';
import { useSearchContext } from '../contexts/search';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import { client } from '../util/search-client';

export const Header: FC = () => {
  const { searchState, setSearchState } = useSearchContext();

  const plugins = useMemo(() => {
    const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
      key: 'search',
      limit: 3,
      transformSource({ source }) {
        console.log(source);
        return {
          ...source,
          onSelect(params) {
            setSearchState((searchState) => ({
              ...searchState,
              query: params.item.label,
            }));
          },
        };
      },
    });

    return [
      recentSearchesPlugin,
      createQuerySuggestionsPlugin({
        searchClient: client,
        indexName: 'instant_search_demo_query_suggestions',

        getSearchParams() {
          return recentSearchesPlugin.data
            ? recentSearchesPlugin.data.getAlgoliaSearchParams({
                hitsPerPage: 5,
              })
            : {};
        },
        transformSource({ source }) {
          return {
            ...source,
            onSelect(params) {
              setSearchState((searchState) => ({
                ...searchState,
                query: params.item.query,
              }));
            },
          };
        },
      }),
    ];
    // We never want our plugins to update after they've been declared.
    // It will always be the same AutocompletePlugin[]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          initialState={searchState}
          openOnFocus={true}
          onSubmit={({ state }) => {
            // OnSubmitParams isn't exported from @algolia/autocomplete-js, so type is inferred.
            setSearchState((oldSearchState) => ({
              ...oldSearchState,
              query: state.query,
            }));
          }}
          onReset={() =>
            setSearchState((oldSearchState) => ({
              ...oldSearchState,
              query: '',
            }))
          }
          plugins={plugins}
        />
      </Container>
    </Navbar>
  );
};
