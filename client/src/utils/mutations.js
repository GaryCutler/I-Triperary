import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_DESTINATION = gql`
    mutation addDestination($itineraryId: ID!, $name: String!, $location: String!) {
        addDestination(itineraryId: $itineraryId, name: $name, location: $location) {
            _id
            name
            location
            activities {
                _id
                name
                location
                description
            }
        }
    }
`;

export const ADD_PACKING_ITEM = gql`
    mutation addPackingItem($itineraryId: ID!, $name: String!, $quantity: Int!) {
        addPackingItem(itineraryID: $itineraryId, name: $name, quantity: $quantity) {
            _id
            name
            quantity
            packed
        }
    }
`;

export const UPDATE_PACKING_ITEM = gql`
    mutation updatePackingItem($itemId: ID!, $packed: Boolean!) {
        updatePackingItem(itemId: $itemId, packed: $packed) {
            _id
            name
            quantity
            packed
        }
    }
`;

export const ADD_ITINERARY = gql`
    mutation addItinerary($userId: ID!, $startDate: String!, $endDate: String!) {
        addItinerary(userId: $userId, startDate: $startDate, endDate: $endDate) {
            _id
            startDate
            endDate
            destinations {
                _id
                name
                location
                activities {
                    _id
                    name
                    location
                    description
                }
            }
            packingList {
                _id
                items {
                    _id
                    name
                    quantity
                    packed
                }
            }
        }
    }
`;

export const ADD_DESTINATION_TO_ITINERARY = gql`
    mutation addDestinationToItinerary($itineraryId: ID!, $destinationId: ID!) {
        addDestinationToItinerary(itineraryId: $itineraryId, destinationId: $destinationId) {
            _id
            destinations {
                _id
                name
                location
                activities {
                    _id
                    name
                    location
                    description
                }
            }
            startDate
            endDate
            packingList {
                _id
                items {
                    _id
                    name
                    quantity
                    packed
                }
            }
        }
    }
`;

export const ADD_ITEM_TO_PACKING_LIST = gql`
    mutation addItemToPackingList($itineraryId: ID!, $itemId: ID!) {
        addItemToPackingList(itineraryId: $itineraryId, itemId: $itemId) {
            _id
            items {
                _id
                name
                quantity
                packed
            }
        }
    }
`;

export const ADD_ACTIVITY_TO_DESTINATION = gql`
    mutation addActivityToDestination($destinationId: ID!, $activityId: ID!) {
        addActivityToDestination(destinationId: $destinationId, activityId: $activityId) {
            _id
            name
            location
            activities {
                _id
                name
                location
                description
            }
        }
    }
`;

export const DELETE_DESTINATION = gql`
    mutation deleteDestination($itineraryId: ID!, $name: String!, $quantity: Int!) {
        deleteDestination(itineraryId: $itineraryId, name: $name, quantity: $quantity) {
            _id
            name
            location
            activities {
                _id
                name
                location
                description
            }
        }
    }
`;