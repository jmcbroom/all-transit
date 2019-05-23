import React from "react";

import { Grid, Image, Button, List, Divider, Header } from "semantic-ui-react";

const Footer = () => {
  let resources = [
    "Customer Service & Feedback",
    "Stop & Shelter Requests",
    "Accessibility",
    "Programs",
    "Events",
    "Data",
    "Title VI",
    "About Us"
  ];
  let ipsum = [
    "This",
    "Stop & Shelter Requests",
    "Accessibility",
    "Programs",
    "Events",
    "Data",
    "Title VI",
    "About Us"
  ];

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
    <Grid
      stackable
      relaxed
      padded
      style={{ background: "rgba(106, 170, 88, 0.5)", paddingTop: "1em" }}
    >
      <Grid.Row style={{paddingBottom: '3em'}}>
        <Grid.Column width={4}>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Ddot-logo.svg"
            size="tiny"
            padded
          />
          <Button.Group vertical style={{margin: '20px 0px 10px 0px'}}>
          <Button fluid>Lost & found</Button>
          <Button fluid>Resolve a fare violation</Button>
          </Button.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Header as="h4" content="Community resources" />
          <List>
            {resources.map(r => (
              <List.Item as="a" href={`/fake`}>
                {r}
              </List.Item>
            ))}
          </List>
        </Grid.Column>
        <Grid.Column width={4}>
          <Header as="h4" content="Some other column" />
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
        </Grid.Column>
      </Grid.Row>
      <Grid.Row
        centered
        style={{
          background: "rgba(0, 0, 0, 0.15)",
          color: "#444",
          fontSize: 12
        }}
      >
        {`Some legalese, you agree not to sue us, we are going to track you, etcetera`}
      </Grid.Row>
    </Grid>
  );
};

export default Footer;
