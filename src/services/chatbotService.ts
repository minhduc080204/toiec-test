// Uses axios for future extensibility, but mocks the response for now
// import axios from 'axios';

export const askChatbot = async (message: string): Promise<string> => {
  console.log(`Sending to n8n webhook (mock): ${message}`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock response
  return `I am your AI assistant! This is a mock response. You asked: "${message}". Soon, I will be connected to an n8n endpoint to provide real TOEIC explanations.`;
};
