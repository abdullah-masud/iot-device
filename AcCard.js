import { useEffect, useState } from "react";
import ac from '../../src/img/ac.png'


function AcCard() {
  const ip = "http://192.168.123.162/"
    const [lightToggle, setLightToggle] = useState(false);
    const [dustStatus, setDustStatus] = useState({})

    useEffect(() => {
      const intervalId = setInterval(() => {
        fetch(ip+'dust')
          .then(res => res.json())
          .then(data => setDustStatus(data));
      }, 2000);
  
      return () => clearInterval(intervalId);
    }, []);

  const handleChange = event => {
    if (event.target.checked) {
      fetch(ip + 'ac/on')
    } else {
      fetch(ip + 'ac/off')
    }
    setLightToggle(current => !current);
  };
  return (
    <div>
        <div className="card w-72  shadow-xl cardBg">
        <figure className="px-10 pt-10">
          <img src={ac} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center">
          <h2 className="text-4xl text-[#201a23] font-bold mb-12">AC</h2>
          <div className=" flex items-center justify-between w-full">
            <h1 className="text-2xl font-bold text-[#201a23]">Power</h1>
            <input type="checkbox" className="toggle toggle-info" value={lightToggle} onChange={handleChange} />
        </div>
    <div className=" flex items-center justify-between w-full">
        <h1 className="text-2xl font-bold text-[#201a23]">Status</h1>
        <div>
        {
        dustStatus?.status == 0
        ? <p className="text-base text-[#201a23] font-semibold">Good Condition</p>
        : <p className="text-base text-[#201a23] font-semibold">Change Filter</p>
        }
        </div>
    </div>
  </div>
</div>
    </div>
  );
}

export default AcCard;
