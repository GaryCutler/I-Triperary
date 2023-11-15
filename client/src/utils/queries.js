import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query user($userId: ID!) {
        user(userId: $userId) {
            _id
            username
            email
            password
            trips {
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
    }
`;

export const QUERY_ITINERARY = gql`
    query itinerary($itineraryId: ID!) {
        itinerary(itineraryId: $itineraryId) {
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

export const QUERY_DASHBOARD = gql`
    query dashboard($userId: ID!) {
        dashboard(userId: $userId) {
            pastTrips {
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
            upcomingTrips {
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
    }
`;

export const QUERY_CHAT = gql`
    query chat($message: String) {
        chat(message: $message)
    }
`;

export const QUERY_ME = gql`
    query me {
        me {
            _id
            username
            email
            password
            trips {
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
    }
`;