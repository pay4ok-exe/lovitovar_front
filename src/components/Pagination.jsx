const Pagination = () => {
  return (
    <div className="flex justify-center items-center mt-8 space-x-2">
      <button className="text-center px-4 py-3 rounded-full text-white bg-indigo-600 hover:bg-indigo-700">
        ＜
      </button>
      <button className="text-center px-5 py-3 rounded-full bg-gray-200 text-indigo-600 font-semibold">
        1
      </button>
      <button className="text-center px-5 py-3 rounded-full bg-gray-200 hover:bg-gray-300">
        2
      </button>
      <button className="text-center px-5 py-3 rounded-full bg-gray-200 hover:bg-gray-300">
        3
      </button>
      <button className="text-center px-5 py-3 rounded-full bg-gray-200 hover:bg-gray-300">
        4
      </button>
      <button className="text-center px-5 py-3 rounded-full bg-gray-200 hover:bg-gray-300">
        5
      </button>
      <button className="text-center px-4 py-3 rounded-full text-white bg-indigo-600 hover:bg-indigo-700">
        ＞
      </button>
    </div>
  );
};

export default Pagination;
