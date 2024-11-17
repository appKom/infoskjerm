import { BaseCard } from "../cards/BaseCard";

export const MemeCardSkeleton = () => (
  <BaseCard>
    <div className="relative flex items-center w-full gap-4 px-4 py-3 border-b border-gray-200 dark:border-gray-700 animate-pulse">
      <svg
        className="w-12 h-12 rounded-lg text-gray-200 dark:text-gray-600"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 18"
      >
        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
      </svg>
      <div className="font-medium dark:text-white">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-2" />
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32" />
      </div>
      <div className="h-7 bg-gray-200 rounded-lg dark:bg-gray-700 w-20 absolute top-3 right-3" />
    </div>
    <div className="flex items-center justify-center h-64 bg-gray-300 dark:bg-gray-700 animate-pulse"
      style={{ width: `500px` }}>
      <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
      </svg>
    </div>
    <div
      className='flex justify-start flex-grow w-full gap-2 p-2 overflow-hidden'
    >
      <div className="h-7 bg-gray-200 rounded-full dark:bg-gray-700 w-16" />
      <div className="h-7 bg-gray-200 rounded-full dark:bg-gray-700 w-16" />
      <div className="h-7 bg-gray-200 rounded-full dark:bg-gray-700 w-16" />
    </div>
  </BaseCard>
)