import {
  MESSAGES_RECEIVED,
  PREPARE_MESSAGE_FOR_SENDING,
  MESSAGE_SENT,
} from '../actionTypes';

let preparedMessageId = 0;

export const receiveMessage = messages => ({
  type: MESSAGES_RECEIVED,
  payload: { messages },
});

export const prepareMessageForSending = message => {
  const id = preparedMessageId;
  preparedMessageId++;

  return {
    type: PREPARE_MESSAGE_FOR_SENDING,
    payload: { message, id },
  };
};

export const messageSent = () => ({
  type: MESSAGE_SENT,
});
