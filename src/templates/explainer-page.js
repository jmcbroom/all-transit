import React, { useState } from "react";
import { graphql } from "gatsby";
import { Header, Segment, Button } from "semantic-ui-react";
import SwipeableViews from "react-swipeable-views";
import Layout from "../components/layout";

export default ({ data, pageContext }) => {
  console.log(data);
  let page = data.allExplainersYaml.edges[0].node;

  let [index, setIndex] = useState(0);
  return (
    <Layout
      title={page.subtitle}
    >
      <Segment.Group horizontal attached="top" style={{maxWidth: 800}}>
        <Segment textAlign="left">
          <Button
            icon="arrow left"
            onClick={() => setIndex(index - 1)}
            disabled={index === 0}
          />
          {/* {index > 0 ? <span>{page.pages[index - 1].title}</span> : ``} */}
        </Segment>
        <Segment textAlign="center">
          <Header as="h3">
            {index + 1}. {page.pages[index].title}
          </Header>
        </Segment>
        <Segment textAlign="right">
          <Button
            icon="arrow right"
            onClick={() => setIndex(index + 1)}
            disabled={index + 1 === page.pages.length}
          />
          {/* {index + 1 < page.pages.length ? page.pages[index + 1].title : ``} */}
        </Segment>
      </Segment.Group>
      <SwipeableViews index={index} animateHeight>
        {page.pages.map(p => (
          <Segment>
            {p.elements.map(e => (
              <p>{e.content}</p>
            ))}
          </Segment>
        ))}
      </SwipeableViews>
    </Layout>
  );
};

export const query = graphql`
  query($title: String!) {
    allExplainersYaml(filter: { title: { eq: $title } }) {
      edges {
        node {
          title
          subtitle
          pages {
            title
            subtitle
            slug
            elements {
              type
              content
              name
            }
          }
        }
      }
    }
  }
`;
