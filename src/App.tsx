import RealtimeLiveness from './components/Liveness'
// import Realtimecam from './components/realtimecam'
import './index.css'

function App() {

  return (
    <>
      <div className='flex w-full h-screen bg-[#1c1c1c] justify-center items-center'>
        {/* <Realtimecam/> */}
        <RealtimeLiveness/>
      </div>
    </>
  )
}

export default App
