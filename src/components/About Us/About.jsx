import React from 'react'

function About() {
  return (
    <>
      <div className='h-screen flex justify-center mt-10'>
        <div className='w-[90%] h-[84vh] p-10 bg-white drop-shadow-[0_7px_6px_rgba(0,0,0,0.25)] rounded-2xl flex flex-col item-center'>
          <h1 className='text-3xl font-bold text-center mt-4'>About <span className='text-orange-600'>Us</span></h1>
          <div className='flex flex-row justify-center gap-16 my-8'>

            <div className='w-[50vh] h-[52vh]'>

              <img src="images/about1.jpg" alt="" className='w-[173px] h-[189px] rounded-[15px] drop-shadow-[0_7px_6px_rgba(0,0,0,0.25)]' />


              <img src="images/about2.jpg" alt="" className='w-[162px] h-[162px] rounded-full object-cover relative bottom-[169px] left-[176px] drop-shadow-[0_7px_6px_rgba(0,0,0,0.25)]' />


              <img src="images/about3.jpg" alt="" className='w-[168px] h-[144px] object-cover relative bottom-[160px] drop-shadow-[0_7px_6px_rgba(0,0,0,0.25)]' style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />


              <img src="images/about4.jpg" alt="" className=' w-[173px] h-[189px] rounded-[15px] relative bottom-[310px] left-[168px] drop-shadow-[0_7px_6px_rgba(0,0,0,0.25)]' />

            </div>
            <div className='w-[108vh] h-[52vh]' >
              <h1 className='text-[3vh] font-bold'>
                About Our Sports Management
                System
              </h1>
              <br />
              <p>SS Events Pvt. Ltd. is a Private Company established in 2014 with the goal of organizing and managing different events throughout the nations. On it's initial phase the company is coming forward with the project related to cricket. It has group of young talented cricketer both Regional and National having vision and passion with the motto of nurture and develop cricketing culture in Nepal.
                <br /> <br />
                Cricket being the popular and the most successful sports of the nation, the company is trying to involve the corporate giants into the game. The main theme of the project is to involve the corporate in the development of the cricketing field. Through this corporate super sixes tournament the various corporate giants directly or indirectly helping the sports for its promotion.
                <br /> <br /> Besides organizing cricket events, SS Events Pvt. Ltd. has its Cricket Team as well which had participated in various club level tournaments as well, like Kathmandu Cricket League (KCL) 2015, Ruslan Cricket Cup 2016, YFN Shahid Smiriti Cup 2072 in which SS Cricket Team won the YFN Shahid Smiriti Cup 2072.</p>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default About