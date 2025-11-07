import { useState } from 'react';

export const FiltersForm = ({ event, resolve }) => {
  const [filters, setFilters] = useState({
    sex: '',
    size: '',
    minPrice: '',
    maxPrice: '',
    limit: 7,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedFilters = {
      sex: filters.sex,
      size: filters.size,
      minPrice: filters.minPrice ? parseFloat(filters.minPrice) : undefined,
      maxPrice: filters.maxPrice ? parseFloat(filters.maxPrice) : undefined,
      limit: filters.limit ? parseInt(filters.limit, 10) : 10,
    };

    const finalFilters = Object.fromEntries(
      Object.entries(processedFilters).filter(
        ([_, v]) => v !== '' && v !== null && v !== undefined
      )
    );

    resolve(JSON.stringify(finalFilters));
  };
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto">
      <p className="text-gray-800 text-lg mb-4">{event.value?.content}</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Price Range */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
              Min Price
            </label>
            <input
              type="number"
              name="minPrice"
              id="minPrice"
              value={filters.minPrice}
              onChange={handleChange}
              placeholder="0"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
              Max Price
            </label>
            <input
              type="number"
              name="maxPrice"
              id="maxPrice"
              value={filters.maxPrice}
              onChange={handleChange}
              placeholder="Không giới hạn"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Sex  */}
        <div>
          <label htmlFor="sex" className="block text-sm font-medium text-gray-700">
            Giới tính
          </label>
          <select
            name="sex"
            id="sex"
            value={filters.sex}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Tất cả</option>
            <option value="1">Nam</option>
            <option value="0">Nữ</option>
            <option value="">Unisex</option>
          </select>
        </div>

        {/* Size */}
        <div>
          <label htmlFor="size" className="block text-sm font-medium text-gray-700">
            Size
          </label>
          <select
            name="size"
            id="size"
            value={filters.size}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Tất cả</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition"
        >
          Xem Kết Quả
        </button>
      </form>
    </div>
  )
};

export default FiltersForm
