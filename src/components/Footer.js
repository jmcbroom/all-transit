import React from "react";

import { Grid, Image, List, Header } from "semantic-ui-react";

const Footer = () => {
  let resources = ["Customer Service & Feedback", "Stop & Shelter Requests", "Accessibility", "Title VI", "Programs", "Events"];
  let ipsum = ["Our Organization", "Data", "Employment Opportunities", "Business Opportunities"];

  let socialMedia = {
    twitter: { display: `@rideddot`, url: `https://twitter.com/rideddot` },
    facebook: {
      display: `RideDDOT`,
      url: `https://www.facebook.com/RideDDOT/`
    },
    instagram: {
      display: `@rideddot`,
      url: `https://www.instagram.com/rideddot/`
    }
  };

  return (
    <Grid stackable relaxed padded style={{ background: "#a0d5b2", paddingTop: "1em" }}>
      <Grid.Row style={{ paddingBottom: "1em" }}>
        <Grid.Column width={4}>
          <Image src="https://detroitmi.gov/themes/custom/detroitmi/logo-white.png" size="small" inline padded />
        </Grid.Column>
        <Grid.Column width={4}>
          <Header as="h4" content="Resources" />
          <List>
            {resources.map(r => (
              <List.Item as="a" href={`/fake`}>
                {r}
              </List.Item>
            ))}
          </List>
        </Grid.Column>
        <Grid.Column width={4}>
          <Header as="h4" content="About us" />
          <List>
            {ipsum.map(r => (
              <List.Item as="a" href={`/fake`}>
                {r}
              </List.Item>
            ))}
          </List>{" "}
        </Grid.Column>
        <Grid.Column width={4}>
          <Header as="h4" content="Connect with DDOT" />
          <List size="large">
            {Object.keys(socialMedia).map(k => (
              <List.Item as="a" href={socialMedia[k].url}>
                <List.Icon name={k} />
                <List.Content>
                  <List.Description>{socialMedia[k].display}</List.Description>
                </List.Content>
              </List.Item>
            ))}
          </List>
          <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Ddot-logo.svg" padded inline size="tiny" />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row
        centered
        style={{
          background: "#00957C",
          color: "#fff",
          fontSize: 12
        }}
      >
        <i>Privacy policy & Terms of use</i>
        <br />
        <b>Copyright 2001-2019 by some people who work at City of Detroit</b>
      </Grid.Row>
    </Grid>
  );
};

export default Footer;
