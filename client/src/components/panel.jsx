import { Link } from 'react-router-dom'
import Icon from '@mdi/react'
import { mdiClose } from '@mdi/js'

export default function Panel({ head, list }) {
  return (
    <div className="max-h-screen w-96 bg-white left-0 top-0 bottom-0 drop-shadow-lg z-[2000] relative overflow-x-auto">
      <div className="bg-white sticky top-0 p-2 drop-shadow-md">
        <div className=" absolute right-2 hover:bg-gray-200 rounded-full">
          <Link to={'/'}>
            <Icon path={mdiClose} size={1.5} className="text-gray-800" />
          </Link>
        </div>
        {head}
      </div>
      {list}
    </div>
  )
}
