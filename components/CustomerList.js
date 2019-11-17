import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Affichage from '../Users/Rom1/AppData/Local/Packages/CanonicalGroupLimited.UbuntuonWindows_79rhkp1fndgsc/LocalState/rootfs/home/adduser/AppOiso/components/Affichage';
import React from 'react';

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

class ResourceListWithCustomers extends React.Component {
    render() {
      return (
        <Query query={GET_ALL_CUSTOMERS}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading…</div>;
            if (error) return <div>{error.message}</div>;
            console.log(data);
            return (
                <div>
                {data.customers.edges.map((edges, index)=>(
                 <Affichage key={`customer`+ index}{...edges} />
                 ))}
                </div>
            );
          }}
        </Query>
      );
    }
  }
  
   export default ResourceListWithCustomers;