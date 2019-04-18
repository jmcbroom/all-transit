import React from "react";
import { graphql } from "gatsby";
import {Header, Segment} from 'semantic-ui-react'
import Layout from "../components/layout";

export default ({ data, pageContext }) => {
  let page = data.allExplainersYaml.edges[0].node
  return (
    <Layout title={page.title}>
      <Segment.Group>
        <Segment><Header as="h3">{page.subtitle}</Header></Segment>
        {page.pages.map(p => (
          <Segment>
            <Header as="h4">{p.title}</Header>
            {/* {p.elements.map(e => (
              <p>{e.content}</p>
            ))} */}
         </Segment>
        ))}
      </Segment.Group>
    </Layout>
  )
}

export const query = graphql`
  query($title: String!) {
    allExplainersYaml(filter: {title: {eq: $title}}) {
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
`