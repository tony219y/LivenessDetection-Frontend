import ProgressCircle from "../ProgressCircle";

function About() {
    
    return (
        
      <div className="flex min-h-screen h-screen justify-between items-center px-8 bg-[#1c1c1c] gap-8 max-md:flex-col max-md:h-full max-md:py-10 max-md:px-4">
        <div className="flex flex-col items-center gap-6 border h-[80%] w-full p-6 bg-white/10 shadow-md rounded-lg justity-center max-md:h-full">
        <h1 className="font-bold text-3xl text-center text-white mt-auto">NUAA WORK</h1>
        <div className="flex w-full gap-10 justify-around mt-auto max-md:flex-col">
            <ProgressCircle progress={99.8} details="Accuracy" size={150} strokeWidth={15} />
            <ProgressCircle progress={99.7} details="Precision" size={150} strokeWidth={15} />
            <ProgressCircle progress={99.9} details="Recall" size={150} strokeWidth={15} />
            <ProgressCircle progress={99.8} details="F1 Score" size={150} strokeWidth={15} />
        </div>
        <div className="flex w-full gap-10 justify-around mb-auto max-md:flex-col">
            <ProgressCircle progress={0.004} details="APCER" size={150} strokeWidth={15} />
            <ProgressCircle progress={0.0006} details="BPCER" size={150} strokeWidth={15} />
        </div>

        </div>
        <div className="flex flex-col items-center gap-6 border h-[80%] w-1/3 overflow-y-auto p-6 bg-white/80 shadow-md rounded-lg scrollbar-hide max-md:w-full max-md:h-full">
          <div className="flex flex-col justify-center items-center gap-2">
            <img src="./kmitl.png" alt="KMITL Logo" className="w-32 h-32" />
            <h1 className="font-bold text-lg text-center text-gray-800">
              King Mongkut's Institute of Technology Ladkrabang
            </h1>
          </div>
  
          {/* เกี่ยวกับโปรเจกต์ */}
          <div className="space-y-4 text-gray-700">
            <h2 className="font-bold text-xl text-gray-900 text-center">Liveness Detection Project</h2>
            <p className="indent-8">
              Ever wondered how facial recognition systems can tell if you're real or just a 
              photo? That’s what <strong className="font-bold">liveness detection</strong> is for! Our project focuses on making 
              AI smarter at detecting real faces vs. spoofing attempts.
            </p>
            <p className="indent-8">
              We started with our own dataset, but it wasn’t diverse enough, so we switched to 
              the <strong className="font-bold">NUAA Imposter Database</strong> to improve accuracy. Training on a regular PC was 
              painfully slow, so we leveled up to a high-performance GPU—though setting it up 
              was an adventure on its own!
            </p>
          </div>
  
          {/* รายชื่อทีม */}
          <div className="text-center text-gray-800">
            <p className="font-bold text-lg">Meet the Team</p>
            <p className="mt-2">
              Phuvis Kerdpramote <br />
              Akeanant Poomdeesittinon <br />
              Panuwit Krueyos <br />
              Ronnakorn Muangkan <br />
              Rapeeploy Jamsri
            </p>
          </div>
        </div>
      </div>
    );
  }
  

  export default About;
  