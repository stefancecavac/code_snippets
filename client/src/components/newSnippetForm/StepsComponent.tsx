const StepsComponent = ({ page }: { page: number }) => {
  return (
    <div className="flex mt-5">
      <div className="w-2/3 text-center px-6">
        <div
          className={`${
            page === 1 ? "bg-emerald-300" : "bg-gray-200"
          } rounded-lg  flex items-center justify-center `}
        >
          <div className="w-1/3 bg-inherit h-20 flex items-center justify-center icon-step">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
              />
            </svg>
          </div>
          <div
            className={`w-2/3 ${
              page === 1 ? "bg-emerald-200" : "bg-gray-100"
            } h-24 flex flex-col items-center justify-center px-1 rounded-r-lg body-step`}
          >
            <h2 className="font-bold text-sm">Question Info</h2>
            <p className="text-xs text-gray-600">
              Your question about snippet!
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-6 fill-gray-500"
          viewBox="0 0 24 24"
        >
          <path d="M14 2h-7.229l7.014 7h-13.785v6h13.785l-7.014 7h7.229l10-10z" />
        </svg>
      </div>
      <div className="w-2/3 text-center px-6">
        <div
          className={`${
            page === 2 ? "bg-emerald-300" : "bg-gray-200"
          } rounded-lg  flex items-center justify-center `}
        >
          <div className="w-1/3 bg-transparent h-20 flex items-center justify-center icon-step">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </div>
          <div
            className={`w-2/3 ${
              page === 2 ? "bg-emerald-200" : "bg-gray-100"
            } h-24 flex flex-col items-center justify-center px-1 rounded-r-lg body-step`}
          >
            <h2 className="font-bold text-sm">Code Info</h2>
            <p className="text-xs text-gray-600">Type your code</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepsComponent;
