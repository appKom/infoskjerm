import { LatestBlasts } from "../LatestBlasts"
import { LatestMemes } from "../LatestMemes"

export const SlackPage = () => (
  <div className='flex justify-around'>
    <LatestMemes />
    <LatestBlasts />
  </div>
)