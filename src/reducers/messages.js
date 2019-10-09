import {MESSAGE_SENT, MESSAGES_RECEIVED, PREPARE_MESSAGE_FOR_SENDING,} from '../actionTypes';

const initialState = {
    messages: [],
    messagesPreparedForSending: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case MESSAGES_RECEIVED:
            const filteredMessages = action.payload.messages
                .filter(newMessage =>
                    state.messages.findIndex(
                        previousMessage => previousMessage.id === newMessage.id) === -1);
            const newMessages = state.messages
                .concat(filteredMessages)
                .sort((a, b) => {
                    if (a < b) {
                        return -1;
                    } else if (a > b) {
                        return 1;
                    } else {
                        return 0;
                    }
                });

            return {...state, messages: newMessages};
        case PREPARE_MESSAGE_FOR_SENDING:
            return {
                ...state,
                messagesPreparedForSending: [
                    ...state.messagesPreparedForSending,
                    action.payload,
                ],
            };
        case MESSAGE_SENT:
            return {
                ...state,
                messagesPreparedForSending: state.messagesPreparedForSending.slice(1),
            };
        default:
            return state;
    }
};
