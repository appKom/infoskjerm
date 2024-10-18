export const SnowPile = ({ height, className }: { height: number, className: string }) => {

  return <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 50 ${height}`} className={className}>
    <defs>
      <pattern id="snow-pattern" patternUnits="userSpaceOnUse" width={30} height={20}>
        <image href="https://img.freepik.com/free-photo/pure-white-snow-surface_181624-8715.jpg?t=st=1728743136~exp=1728746736~hmac=f0e9f69d0cca9c06cc5e7773cd3b47690efac704aa4be09d3ea0e67a7832cbb3&w=1800"
          x={0} y={0} width={30} height={20} />
      </pattern>
    </defs>
    <path
      fill="url(#snow-pattern)"
      d={`m 50,${height} h -50 c 0,-${height} 0,-${height} 25,-${height} 25,0 25,0 25,${height} z`}
    />
  </svg>
}