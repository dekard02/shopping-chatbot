import {
  useCoAgentStateRender,
  useCopilotAction,
  useFrontendTool,
  useHumanInTheLoop,
  useLangGraphInterrupt,
} from '@copilotkit/react-core';
import { useNavigate } from 'react-router-dom';
import { FiltersForm } from '../components/FilterForm';
import { useDispatch } from 'react-redux';
import { addItem, removeItem } from '../redux/shopping-cart/cartItemsSlice';
import { ProductDetailsForm } from '../components/ProductDetailsForm';

export const useChatbotAssistant = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  // useFrontendTool({
  //   name: 'add_to_cart',
  //   description:
  //     'Thêm sản phẩm vào giỏ hàng của người dùng dựa trên yêu cầu của họ. Công cụ này sẽ nhận các tham số như slug sản phẩm, số lượng, màu sắc, kích thước để thực hiện hành động thêm sản phẩm vào giỏ hàng.Nếu thông tin về màu sắc, kích thước hoặc số lượng không được cung cấp, hãy sử dụng công cụ askForProductDetails để hỏi người dùng về các chi tiết còn thiếu trước khi thêm sản phẩm vào giỏ hàng. Sau khi thêm sản phẩm thành công, công cụ sẽ thông báo cho người dùng biết rằng sản phẩm đã được thêm vào giỏ hàng. ',
  //   parameters: [
  //     {
  //       name: 'slug',
  //       type: 'string',
  //       description: 'Slug của sản phẩm cần thêm vào giỏ hàng.',
  //       required: true,
  //     },
  //     {
  //       name: 'quantity',
  //       type: 'number',
  //       description: 'Số lượng sản phẩm cần thêm vào giỏ hàng.',
  //       required: true,
  //     },
  //     {
  //       name: 'color',
  //       type: 'string',
  //       description: 'Màu sắc của sản phẩm cần thêm vào giỏ hàng.Tự động dịch sang tiếng Việt',
  //     },
  //     {
  //       name: 'size',
  //       type: 'string',
  //       description: 'Kích thước của sản phẩm cần thêm vào giỏ hàng.',
  //       required: true,
  //     }

  //   ],
  //   handler: async ({ slug, quantity, color, size, price }) => {
  //     dispatch(addItem({
  //       slug: slug,
  //       color: color,
  //       size: size,
  //       quantity: quantity,
  //       price: price
  //     }))
  //     // dispatch(setAlert({
  //     //   message: "Thêm vào giỏ thành công",
  //     //   type: "success"
  //     // }))
  //   },
  //   render: ({ args, status }) => {
  //     if (status === 'pending') {
  //       return (
  //         <div className="bg-[#667eea] text-white p-4 rounded-lg max-w-md">
  //           <span className="animate-spin">⏳ Đang thêm sản phẩm vào giỏ hàng...</span>
  //         </div>
  //       );
  //     } else if (status === 'complete') {
  //       return (
  //         <div className="bg-green-500 text-white p-4 rounded-lg max-w-md">
  //           <span>✅ Sản phẩm đã được thêm vào giỏ hàng thành công!</span>
  //         </div>
  //       );
  //     } else {
  //       return null;
  //     }
  //   }
  // }, [dispatch]);


  // useFrontendTool(
  //   {
  //     name: 'remove_from_cart',
  //     description:
  //       'Xóa sản phẩm khỏi giỏ hàng của người dùng dựa trên yêu cầu của họ. Công cụ này sẽ nhận tham số slug sản phẩm để xác định sản phẩm cần xóa khỏi giỏ hàng. Sau khi xóa sản phẩm thành công, công cụ sẽ thông báo cho người dùng biết rằng sản phẩm đã được xóa khỏi giỏ hàng.',
  //     parameters: [
  //       {
  //         name: 'slug',
  //         type: 'string',
  //         description: 'Slug của sản phẩm cần xóa khỏi giỏ hàng.',
  //         required: true,
  //       },
  //     ],
  //     handler: async ({ slug }) => {
  //       dispatch(removeItem({
  //         slug: slug
  //       }))
  //     },
  //     render: ({ args, status }) => {
  //       if (status === 'pending') {
  //         return (
  //           <div className=" bg-[#667eea] text-white p-4 rounded-lg max-w-md">
  //             <span className="animate-spin">⏳ Đang xóa sản phẩm khỏi giỏ hàng...</span>
  //           </div>
  //         );
  //       } else if (status === 'complete') {
  //         return (
  //           <div className="bg-green-500 text-white p-4 rounded-lg max-w-md">
  //             <span>✅ Sản phẩm đã được xóa khỏi giỏ hàng thành công!</span>
  //           </div>
  //         );
  //       } else {
  //         return null;
  //       }
  //     },
  //   }, [dispatch]
  // );

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

  useLangGraphInterrupt({
    enabled: ({ eventValue }) => eventValue.type === 'filter_spec',
    render: ({ event, resolve }) => <FiltersForm event={event} resolve={resolve} />,
  }, []);

  useHumanInTheLoop({
    name: 'askForProductDetails',
    description:
      'Khi người dùng muốn thêm sản phẩm vào giỏ hàng nhưng thiếu thông tin cần thiết như màu sắc, kích thước hoặc số lượng, hãy sử dụng công cụ này để hỏi họ. Công cụ này sẽ hiển thị một biểu mẫu để người dùng điền vào các chi tiết còn thiếu.',
    parameters: [
      {
        name: 'slug',
        type: 'string',
        description: 'Slug của sản phẩm mà người dùng muốn thêm vào giỏ hàng.',
        required: true,
      },
    ],
    render: ({ args, status, respond, result }) => {

      console.log(status, respond, args, result);
      if (status === 'executing' && respond) {
        return <ProductDetailsForm initialArgs={args} onSubmited={respond} />;
      }
      if (status === 'complete' && result) {
          
          return (<div className="bg-green-500 text-white p-4 rounded-lg max-w-md">
            <span>✅ Sản phẩm đã được thêm vào giỏ hàng thành công!</span>
          </div>
          );
      }
      return null;
    },

  }, []);
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
