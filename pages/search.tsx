import type { GetServerSideProps, NextPage } from 'next';
import qs from 'qs';
import { Form, Container, Row, Col } from 'react-bootstrap';
import {
  Panel,
  Menu,
  RefinementList,
  Hits,
  Pagination,
  Highlight,
  InstantSearch,
  connectSearchBox,
  InstantSearchProps,
} from 'react-instantsearch-dom';
import { findResultsState } from 'react-instantsearch-dom/server';
import { useSearchContext } from '../contexts/search';
import { client } from '../util/search-client';
import { createUrl, searchStateFromRouterQuery } from '../util/search-helpers';

function Hit({ ...props }) {
  return (
    <article>
      <h1>
        <Highlight hit={props.hit} attribute="name" />
      </h1>
      <p>
        <Highlight hit={props.hit} attribute="description" />
      </p>
    </article>
  );
}

const VirtualSearchBox = connectSearchBox(() => null);

const HawkeSearch: NextPage<InstantSearchProps> = ({
  resultsState,
  searchState: initialState,
  ...props
}: InstantSearchProps) => {
  const { searchState, setSearchState } = useSearchContext();

  console.log();
  return (
    <InstantSearch
      {...props}
      searchClient={client}
      indexName="instant_search"
      searchState={initialState || searchState}
      resultsState={resultsState}
      onSearchStateChange={setSearchState}
      createURL={createUrl}
    >
      <VirtualSearchBox />
      <Container>
        <Row>
          <Col>
            <div className="search-panel">
              <div className="search-panel__filters">
                <Panel header="Categories">
                  <Menu attribute="categories" />
                </Panel>

                <Panel header="Brands">
                  <RefinementList attribute="brand" />
                </Panel>
              </div>

              <div className="search-panel__results">
                <Hits hitComponent={Hit} />

                <div className="pagination">
                  <Pagination />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </InstantSearch>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const initialState = searchStateFromRouterQuery(query);
  const resultsState = await findResultsState(HawkeSearch, {
    searchClient: client,
    searchState: initialState,
    indexName: 'instant_search',
  });

  // https://github.com/vercel/next.js/issues/11993
  // next.js doesn't like the findResultsState object return, so we need to pre-serialize the results
  // so that next' serialization checks pass.
  return {
    props: {
      searchState: initialState,
      resultsState: JSON.parse(JSON.stringify(resultsState)),
    }, // will be passed to the page component as props
  };
};

export default HawkeSearch;
