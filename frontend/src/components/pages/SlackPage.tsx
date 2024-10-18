import { LatestBlasts } from "../LatestBlasts"
import { LatestMemes } from "../LatestMemes"

export const SlackPage = () => (
  <div className='relative flex justify-between px-28'>
    <LatestMemes />
    <div className='relative w-1 -mt-10 border-l border-light-grey dark:border-gray-700'></div>
    <LatestBlasts />
  </div>
)