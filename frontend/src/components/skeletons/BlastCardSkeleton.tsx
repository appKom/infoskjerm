import { BaseCard } from "../cards/BaseCard";

export const BlastCardSkeleton = () => (
  <BaseCard width={1000}>
    <div className='flex p-3 gap-4 animate-pulse'>
      <svg
        className="w-12 h-12 rounded-lg text-gray-200 dark:text-gray-600"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 18"
      >
        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
      </svg>
      <div className='flex-grow w-0'>
        <div className="flex justify-between">
          <div className='flex gap-2 items-center font-medium dark:text-white'>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32" />
          </div>
          <div className="h-7 bg-gray-200 rounded-lg dark:bg-gray-700 w-20" />
        </div>
        <div className="my-2">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-48 mb-4" />
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[90%] mb-2.5" />
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[75%] mb-2.5" />
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[92%] mb-2.5" />
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[95%] mb-2.5" />
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[75%] mb-2.5" />
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[95%] mb-2.5" />
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[75%] mb-2.5" />
        </div>

      </div>
    </div>
  </BaseCard>
)