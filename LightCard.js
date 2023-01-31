import { useEffect, useState } from "react";


function LightCard() {
  const ip = "http://192.168.123.162/"
    const [lightToggle, setLightToggle] = useState(false);
    const [lightStatus, setLightStatus] = useState({})

    useEffect(() => {
      const intervalId = setInterval(() => {
        fetch(ip+'ledSense')
          .then(res => res.json())
          .then(data => setLightStatus(data));
      }, 2000);
  
      return () => clearInterval(intervalId);
    }, []);

  const handleChange = event => {
    if (event.target.checked) {
      fetch(ip + 'light/on')
    } else {
      fetch(ip + 'light/off')
    }
    setLightToggle(current => !current);
  };
  return (
    <div>
        <div className="card w-72  shadow-xl cardBg">
        <figure className="px-10 pt-10">
          <img  className="rounded-xl 	" src="https://upload.wikimedia.org/wikipedia/commons/6/64/Simple_light_bulb_graphic.png" alt="Shoes" />
        </figure>
        <div className="card-body items-center">
          <h2 className="text-4xl text-[#201a23] font-bold mb-12">Light</h2>
          <div className=" flex items-center justify-between w-full">
            <h1 className="text-2xl font-bold text-[#201a23]">Power</h1>
            <input type="checkbox" className="toggle toggle-info" value={lightToggle} onChange={handleChange} />
        </div>
    <div className=" flex items-center justify-between w-full">
        <h1 className="text-2xl font-bold text-[#201a23]">Status</h1>
        <div>
        {
        lightStatus?.status == 1 && lightToggle
        ? <p className="text-base text-[#201a23] font-semibold">Need to Replace</p>
        
        : <p className="text-base text-[#201a23] font-semibold">Good Condition</p>
        }
        </div>
    </div>
  </div>
</div>
    </div>
  );
}

export default LightCard;
