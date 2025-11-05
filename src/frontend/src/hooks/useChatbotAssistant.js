import {
  useCoAgentStateRender,
  useCopilotAction,
  useFrontendTool,
  useLangGraphInterrupt,
} from '@copilotkit/react-core';
import { useNavigate } from 'react-router-dom';

export const useChatbotAssistant = () => {
  const navigate = useNavigate();

  // TODO: add thêm frontend tool khác, eg. thêm giỏ hàng, checkout bla bla bla, ...

  useFrontendTool({
    name: 'routing',
    description:
      'Chuyển hướng người dùng đến các trang khác nhau trong ứng dụng web thương mại điện tử dựa trên các yêu cầu của họ. Và thông báo đã chuyển hướng thành công.',
    parameters: [
      {
        name: 'path',
        type: 'string',
        description: `Đường dẫn URL của trang để điều hướng người dùng đến. Giá trị chỉ có thể là một trong các đường dẫn sau:
            ["/", "/catalog", "/accessories", "/contact", "/cart", "/order", "/customer", "/policy/privacy", "/policy/terms", "/policy/refund", "/catalog/:slug"]
              Ví dụ: 
                Input: Hiện thông tin giỏ hàng
                Output: /cart`,
        required: true,
      },
    ],
    handler: async ({ path }) => {
      navigate(path);
    },
  });

  useCopilotAction({
    name: 'query_products',
    description:
      'Tìm sản phẩm theo thông tin của khách hàng và hiển thị các sản phẩm ở dạng danh sách product card.',
    available: 'disabled',
    parameters: [{ name: 'query', type: 'string', required: true }],
    render: ({ args, result, status }) => {
      if (status !== 'complete') {
        return (
          <div className=" bg-[#667eea] text-white p-4 rounded-lg max-w-md">
            <span className="animate-spin">⏳ Đang tìm sản phẩm ...</span>
          </div>
        );
      }

      // TODO: trả về 1 list sản phẩm
      return (
        <>
          <div>San pham</div>
          <div>{JSON.stringify(result)}</div>
        </>
      );
    },
  });

  useLangGraphInterrupt({
    enabled: ({ eventValue }) => eventValue.type === 'filter_spec',
    render: ({ event, resolve }) => (
      // TODO: render 1 form hỏi thêm thông tin giới tính, màu sắc, ..., resolve/return json để filter ở pinecone
      // set giới hạn số sản phẩm trả về
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
        <p className="text-gray-800 text-lg mb-4">{event.content}</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            resolve(e.target.response.value);
          }}
          className="flex flex-col gap-3"
        >
          <input
            type="text"
            name="response"
            placeholder="Enter your response"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    ),
  });

  useCoAgentStateRender({
    name: 'assistant-chatbot',
    render: ({ state }) => {
      // TODO: check later with this state
      console.log('Agent state update:', state);
      return (
        <div>
          {state?.process_steps?.map((process) => (
            <div>
              <h6>{process}</h6>
            </div>
          ))}
        </div>
      );
    },
  });
};
