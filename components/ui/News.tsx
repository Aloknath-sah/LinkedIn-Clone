import { Info } from 'lucide-react'
import React from 'react'

interface NAVITEMS{
  heading: string,
  subHeading: string
}

const newsItem: NAVITEMS[] = [
  {
    heading: "Nvidia closes on $4T account",
    subHeading: "2 day ago - 2445 readers"
  },
  {
    heading: "B-School graduate in demand",
    subHeading: "2 day ago - 2445 readers"
  },
  {
    heading: "Health jobs are on rise",
    subHeading: "3 day ago - 441 readers"
  },
  {
    heading: "Tech takes of at Indian Airports",
    subHeading: "4 day ago - 553 readers"
  }
]

export const News = () => {
  return (
    <div className='bg-white rounded-xl border border-gray-300 p-4 shadow-sm'>
      <div className='flex items-center justify-between p-3' >
        <h1 className='font-medium text-lg px-1'>LinkedIn News </h1>
        <Info size={18} />
      </div>
      <div>
        <div className='px-4'>Top Stories </div>
        {
          newsItem.map((item, index) => {
            return (
              <div key={index} className='px-4 py-2'>
                <h1 className='text-sm font-medium'>{item.heading} </h1>
                <p className='text-xs text-gray-600'>{item.subHeading} </p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
