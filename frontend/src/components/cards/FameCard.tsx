export const FameCard = ({bilde, navn, dato}: {bilde: string, navn:string, dato:string}) => {
  return(
    <div className="w-full shadow-lg border-2 border-gray-200 rounded-lg overflow-hidden">
      <img className="w-full object-cover aspect-square" src={bilde} alt="" />
      <div className="px-4 py-1">
        <p className="text-2xl">{navn}</p>
        <p className="">{dato}</p>
      </div>
    </div>
  )
}