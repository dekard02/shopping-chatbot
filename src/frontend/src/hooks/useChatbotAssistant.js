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

  useFrontendTool(
    {
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
    },
    [navigate]
  );

  useCopilotAction(
    {
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
        } else if (status === 'complete') {
          return (
            <div className="overflow-x-auto whitespace-nowrap py-4 px-4">
              {result?.map((product) => (
                <div
                  key={product.id}
                  className="inline-block w-64 bg-white rounded-md shadow-lg mr-6 cursor-pointer hover:shadow-2xl transition duration-300"
                  onClick={() => navigate(`catalog/${product.slug}`)}
                >
                  {/* Image Section */}
                  <div className="relative">
                    <img
                      className="w-full h-64 object-cover rounded-t-md"
                      src={
                        product.image1.startsWith('images')
                          ? require(`../assets/${product.image1}`)
                          : product.image1
                      }
                      alt={product.title}
                    />
                    {product.sale && (
                      <div className="absolute top-3 right-3 bg-red-500 text-white rounded-full h-12 w-12 flex flex-col items-center justify-center text-xs font-bold">
                        <span>{product.sale}%</span>
                        <small>OFF</small>
                      </div>
                    )}
                    {/* Optional overlay effect on hover */}
                    <div className="absolute inset-0 bg-gray-900 opacity-10 transition duration-300 hover:opacity-0 rounded-t-md"></div>
                  </div>

                  {/* Product Info */}
                  <div className="px-6 py-4">
                    <h3 className="font-semibold text-lg line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 mt-1 text-sm">
                      Giá:
                      <span className="font-medium text-blue-600">
                        {product.price.toLocaleString()}₫
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          );
        }
      },
    },
    [navigate]
  );

  useLangGraphInterrupt(
    {
      enabled: ({ eventValue }) => eventValue.type === 'filter_spec',
      render: ({ event, resolve }) => (
        // TODO: render 1 form hỏi thêm thông tin giới tính, màu sắc, ..., resolve/return json để filter ở pinecone
        // set giới hạn số sản phẩm trả về
        // price range + sex + size + color
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
    },
    [navigate]
  );

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
