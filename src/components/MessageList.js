import React from 'react';
import gql from 'graphql-tag';
import { Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import MessageListUI from './MessageListUI';

const authErrors = [
  'GraphQL error: Not authenticated',
];

const MESSAGES_QUERY = gql`
query getMessages($skip: Int, $first: Int){
  feed(skip:$skip, first:$first) {
      messages{
        id
        content
        createdAt
        postedBy{name,color,avatar}
      }
      count
  }
}
`;

const MESSAGES_SUB = gql`
subscription newMessage{
  newMessage {
    id
    content
    createdAt
    postedBy{
      name, color, avatar
    }
  }
}
`;

const subscribeToNewMessages = (subscribeToMore) => {
  subscribeToMore({
    document: MESSAGES_SUB,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const { newMessage } = subscriptionData.data;
      const exists = prev.feed.messages.find(({ id }) => id === newMessage.id);
      if (exists) return prev;
      return {
        ...prev,
        feed: {
          messages: [newMessage, ...prev.feed.messages],
          count: prev.feed.messages.length + 1,
          __typename: prev.feed.__typename,
        },
      };
    },
  });
};

function MessageList() {
  const {
    data, loading, error, subscribeToMore, fetchMore,
  } = useQuery(MESSAGES_QUERY, {
    notifyOnNetworkStatusChange: true,
    variables: { skip: 0, first: 20 },
  });
  if (error) {
    if (authErrors.includes(error.message)) {
      return <Redirect to="/signin" />;
    }
    return <div>Error</div>;
  }
  subscribeToNewMessages(subscribeToMore);
  const { messages } = data ? data.feed : { messages: [] };
  return (
    <MessageListUI
      loading={loading}
      messages={[...messages].reverse()}
      onLoadMore={() => {
        fetchMore({
          // notifyOnNetworkStatusChange: true,
          variables: {
            skip: messages.length,
            first: 20,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            return {
              ...fetchMoreResult,
              feed: {
                ...fetchMoreResult.feed,
                messages: [
                  ...prev.feed.messages,
                  ...fetchMoreResult.feed.messages,
                ],
              },
            };
          },
        });
      }}
    />
  );
}
export default MessageList;
