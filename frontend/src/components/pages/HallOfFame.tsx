import { FameCard } from "../cards/FameCard"

export const HallOfFame = () => {
  return (
    <div className="h-full" >
      <h1 className="text-red-700 text-4xl text-center p-4 font-bold">
        Hall of fame
      </h1>
      <div className="grid grid-rows-2 grid-cols-5 gap-10 justify-center w-[1320px] m-auto">
        <div className="col-span-2 row-span-2">
          <FameCard bilde={"https://avatars.githubusercontent.com/u/40316533?v=4"} navn={"Jørgen"} dato={"11.11.2024"}/>
        </div>
        
        <FameCard bilde={"https://media.licdn.com/dms/image/v2/D4D03AQG1jZteFEa-IQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1727540696905?e=2147483647&v=beta&t=-t2OD_4kXV-DbmkqZoOJebIHQxPwI-gD_GR1IMcWCGc"} navn={"Jørgen"} dato={"11.11.2024"}/>
        <FameCard bilde={"https://media.licdn.com/dms/image/v2/D4D22AQHPdwMtx8ORCg/feedshare-shrink_800/feedshare-shrink_800/0/1718957188522?e=2147483647&v=beta&t=DKvr51YLKD6lQytDAaDkkIUmBituXaej29Rd2VDFUs4"} navn={"Jørgen"} dato={"11.11.2024"}/>

        <div className="row-span-2">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus et praesentium eveniet qui? Earum recusandae facilis, corporis nulla illum voluptatibus repudiandae accusantium optio totam maxime veniam ab perspiciatis, incidunt eos necessitatibus esse eum ipsum repellat ad sunt? Ea, consectetur necessitatibus. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas nihil aliquam aut possimus ducimus laudantium fugit repellat dolores ipsum? Repudiandae, voluptatibus ea necessitatibus, facere laborum hic temporibus dicta corporis, ab neque delectus perspiciatis minima minus unde. Esse harum, tenetur consectetur eos dolores alias, ipsam deserunt, porro reprehenderit sunt quos nemo?</p>
        </div>

        <FameCard bilde={"https://g.acdn.no/obscura/API/dynamic/r1/ece5/tr_1000_2000_s_f/0000/avag/2023/2/20/14/IMG_7154.jpg?chk=9AAA67"} navn={"Jørgen"} dato={"11.11.2024"}/>
        <FameCard bilde={"https://www.laksevagbtk.no/wp-content/uploads/2018/01/2393-300x225.jpg"} navn={"Jørgen"} dato={"11.11.2024"}/>
      </div>
    </div>

  )
}