import { EmptyState, Layout, Page } from '@shopify/polaris';
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';
const GET_ALL_CUSTOMERS = gql`
{
    customers(first:10, query: "country:france") {
      edges {
        node {
          id
          firstName
          lastName
          email
          phone
        }
      }
    }
  }
  
`;



class Index extends React.Component {
  state = { open: false };
  render() {
    return (
      <Page>
        <TitleBar
          primaryAction={{
            content: 'Select products',
            onAction: () => this.setState({ open: true }),
          }}
        />
        <ResourcePicker
          resourceType="Product"
          showVariants={false}
          open={this.state.open}
          onSelection={(resources) => this.handleSelection(resources)}
          onCancel={() => this.setState({ open: false })}
        />
        <Layout>
        <Query query={GET_ALL_CUSTOMERS}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading…</div>;
            if (error) return <div>{error.message}</div>;
            console.log(data);
            return (
                <div>
                {data.customers.edges.map((edges, index)=>(
                  <div>
                  <ul>
                          <li> CUSTOMERS N°{index}</li>
                          <li> ID :  {edges.node.id}</li>
                          <li> NAME : {edges.node.firstName} {edges.node.lastName}</li>
                          <li> EMAIL : {edges.node.email}</li>
                          <li> PHONE : {edges.node.phone}</li>
                      </ul>
                  </div>
                 ))}
                </div>
            );
          }}
        </Query>
          <EmptyState
            heading="Select products to start"
            action={{
              content: 'Select products',
              onAction: () => this.setState({ open: true }),
            }}
            image={img}
          >
            <p>Select products and change their price temporarily</p>
          </EmptyState>
        </Layout>
      

      </Page >
    );
  }
  handleSelection = (resources) => {
    const idsFromResources = resources.selection.map((product) => product.id);
    this.setState({ open: false })
    console.log(resources)
  };
}

export default Index;