import { LatestBlasts } from "../LatestBlasts"
import { LatestMemes } from "../LatestMemes"

export const SlackPage = () => {
  return (
   <div key={1}>
     <div className='relative flex justify-between p-3 mb-5 text-4xl font-bold z-10 bg-white border dark:border-b-gray-700 dark:bg-[#111827] dark:border-0 dark:border-b-[1px] dark:text-white border-b-light-grey px-28'>
       <div>#memeogvinogklinoggrin2</div>
       <div>#korktavla</div>
     </div>
     <div className='relative flex justify-between px-28'>
       <LatestMemes />
       <div className='relative w-1 -mt-10 border-l border-light-grey dark:border-gray-700'></div>
       <LatestBlasts />
     </div>
   </div>
  )
 }