import { baseApi, ApiResponse } from './baseApi';

const sendMessages = async (conversationId: string, payload: Partial<any>): Promise<ApiResponse<any>> => {
  return baseApi.post<any>(`/chat/${conversationId}`, payload);
};


export const chatApi = {  sendMessages  };

export default chatApi;
