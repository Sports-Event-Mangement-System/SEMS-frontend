import React from "react";

function About() {
  return (
    <>
      <div className="h-screen flex justify-center mt-5 px-4">
        <div className="w-full h-fit p-10 bg-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.15)] rounded-2xl flex flex-col item-center">
          <h1 className="text-3xl font-bold text-center mt-4">
            About <span className="text-orange-600">Us</span>
          </h1>
          <div className="flex flex-col lg:flex-row md:flex-row sm:flex-col justify-center gap-16 my-8">
            <div className="hidden md:block w-[80vh] h-[65vh] px-6 py-12 ">
              <div className="flex flex-col">
                <div className="">
                  <img
                    src="images/about1.jpg"
                    alt=""
                    className="w-[173px]  h-[189px] rounded-[15px] drop-shadow-[0_7px_6px_rgba(0,0,0,0.25)]"
                  />
                </div>

                <div>
                  <img
                    src="images/about2.jpg"
                    alt=""
                    className="w-[162px]  h-[162px] rounded-full object-cover relative bottom-[169px] left-[176px] drop-shadow-[0_7px_6px_rgba(0,0,0,0.25)]"
                  />
                </div>
              </div>
              <div>
                <img
                  src="images/about3.jpg"
                  alt=""
                  className=" w-[168px] h-[144px] object-cover relative bottom-[160px] drop-shadow-[0_7px_6px_rgba(0,0,0,0.25)]"
                  style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
                />
              </div>

              <div>
                <img
                  src="images/about4.jpg"
                  alt=""
                  className="  w-[173px] h-[189px] rounded-[15px] relative bottom-[310px] left-[168px] drop-shadow-[0_7px_6px_rgba(0,0,0,0.25)]"
                />
              </div>
            </div>
            <div className="w-fit h-fit ">
              <h1 className="text-[3vh] font-bold">
                About Our Sports Management System
              </h1>
              <br />
              <p>
                We are CSIT 7th semester students dedicated to developing our
                final project, the Sports Event Management System. This
                innovative web platform is designed to streamline the
                organization of sports events and leagues.
                <br /> By simplifying match scheduling, team management, and
                performance tracking, it ensures an efficient process for both
                organizers and participants.
                <br /> Our system supports two primary roles: admins and regular
                users. Regular users can easily register their teams for
                tournaments and track their progress through a user-friendly
                interface. Meanwhile, admins have the capability to organize
                tournaments, manage team registrations, schedule matches, and
                send notifications using a comprehensive admin dashboard.
                <br /> By automating these tasks, the platform provides a
                seamless experience for everyone involved, making it a
                comprehensive solution for effective sports event management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
