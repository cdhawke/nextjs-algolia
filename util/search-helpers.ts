import qs from 'qs';
import { ParsedUrlQuery } from 'querystring';
import { SearchState } from 'react-instantsearch-core';

export const createUrl = (searchState: SearchState) =>
  `/search?${qs.stringify(searchState)}`;

export const pathToSearchState = (path: string) =>
  path.includes('?') ? qs.parse(path.substring(path.indexOf('?') + 1)) : {};

export const searchStateToRouterQuery = (searchState: SearchState) =>
  searchState ? qs.stringify(searchState) : '';

export const searchStateFromRouterQuery = (query: ParsedUrlQuery) =>
  qs.parse(qs.stringify(query));
