/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import withProgressBar from 'components/ProgressBar';

const AppWrapper = styled.div`
  max-width: 100%;
  min-height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

export function App(props) {
  return (
    <AppWrapper className="publication-studio-app-wrapper">
      <Helmet
        titleTemplate="%s - Publication Studio"
        defaultTitle="Publication Studio"
        meta={[
          { name: 'description', content: 'Publication Studio' },
        ]}
      />
      {React.Children.toArray(props.children)}
    </AppWrapper>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default withProgressBar(App);
