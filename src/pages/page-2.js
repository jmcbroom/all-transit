import React from 'react'
import { Link } from 'gatsby'
import { Button, Grid, Segment, Header, Placeholder, List, Icon } from 'semantic-ui-react'

import Layout from '../components/layout'
import SEO from '../components/seo'

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <Header as='h1'>Detroit Transit Guide</Header>
    <Segment basic>
      <Grid>
        <Grid.Row>
          <Button.Group fluid size='big' widths='seven' centered>
            <Button color='yellow' style={{color: '#222'}}>New to the bus?</Button>
            <Button.Or />
            <Button color='green'>I'm a rider</Button>
          </Button.Group>
        </Grid.Row>
        <Grid.Row columns={2} divided>
          <Grid.Column>
            <List>
              <List.Item>
                <List.Icon name='angle right' />
                <List.Content>
                  <List.Header as='a'>Basics of transit</List.Header>
                  <List.Description>
                    Perfect for first-time riders
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='angle right' />
                <List.Content>
                  <List.Header as='a'>How to ride</List.Header>
                  <List.Description>
                    Know before you go
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='angle right' />
                <List.Content>
                  <List.Header as='a'>Transit providers</List.Header>
                  <List.Description>Who's running my bus?</List.Description>
                </List.Content>
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column>
            <List>
              <List.Item>
                <List.Icon name='angle right' />
                <List.Content>
                  <List.Header as='a'>Use our trip planner</List.Header>
                  <List.Description>
                    Point-to-point, step-by-step directions
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='angle right' />
                <List.Content>
                  <List.Header as='a'>Where's my bus?</List.Header>
                  <List.Description>
                    Access real-time info
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='angle right' />
                <List.Content>
                  <List.Header as='a'>Fares and passes</List.Header>
                  <List.Description>Options to pay for your ride</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='angle right' />
                <List.Content>
                  <List.Header as='a'>Routes and stops</List.Header>
                  <List.Description>Find service near you</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='angle right' />
                <List.Content>
                  <List.Header as='a'>System map</List.Header>
                  <List.Description>Get the big picture</List.Description>
                </List.Content>
              </List.Item>
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment basic>
      <Header as='h3'>COMMUNITY RESOURCES</Header>
      <Placeholder>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
      </Placeholder>
    </Segment>
    <Segment basic>
      <Grid centered>
        <Grid.Row>
          <Button size='big' centered color='purple'>GO FURTHER</Button>
        </Grid.Row>
      </Grid>
    </Segment>
  </Layout>
)

export default SecondPage
