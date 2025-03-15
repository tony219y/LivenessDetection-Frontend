
function Nav() {
  return (
    <div className="fixed w-full h-16 px-[65px] bg-[#2c2c2c]/30 backdrop-blur-xl flex justify-between items-center z-90 max-md:hidden">
        <div className="text-white uppercase font-bold text-xl">Liveness Detection</div>
        <div>
            <ul className="flex gap-4 uppercase">
                <li>
                <a href="/" className="text-white">Home</a>
                </li>
                <li>
                <a href="/about" className="text-white">About</a>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Nav