// Uses axios for future extensibility, but mocks the response for now
// import axios from 'axios';

import axios from "axios";

const CHATBOXT_ENDPOINT = 'http://localhost:5678/webhook/3acf6990-53d8-4525-9ce9-76ee0924aace';
export const askChatbot = async (message: string): Promise<string> => {

  const res = await axios.post(CHATBOXT_ENDPOINT, { message });
  console.log(res);
  
  if (res.status === 200) {
    return res.data;
  } else {
    throw new Error('Failed to get response from chatbot');
  }
};
