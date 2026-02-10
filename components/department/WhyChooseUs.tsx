import React from 'react';
import { CheckCircle2 } from "lucide-react";

const WhyChooseUs = () => {
  const reasons = [
    { title: "Robust Experience", desc: "With the experience of several years and a team of skilled forensic experts..." },
    { title: "Extensive Service", desc: "Our forensic investigation services cover a wide range of services, with a specialization..." },
    { title: "Client-Centric Approach", desc: "The client's needs and satisfaction are our topmost priorities. We know the sensitivity..." },
    { title: "Cutting-Edge Technology", desc: "We use state-of-the-art forensic tools and methodologies, ensuring our investigators are equipped..." },
    { title: "Timely and Efficient Delivery", desc: "We know the importance of time in forensic investigations. Our team works thoroughly..." },
    { title: "Expert Analysis", desc: "Our team includes skilled forensic investigators with an eye for detail. We provide expert analysis..." },
    { title: "Global Reach", desc: "Though we operate as a private forensic investigation company in Delhi, our services extend globally..." }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-3/5">
          <h2 className="text-3xl font-bold text-[#04063E] mb-10">Why Choose Our Forensic Investigation Services?</h2>
          <div className="space-y-6">
            {reasons.map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <CheckCircle2 className="text-[#96C11F] flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-gray-900 inline-block mr-2">{item.title}:</h4>
                  <p className="text-gray-600 inline text-sm md:text-base leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-2/5 flex items-center">
          <img 
            src="/department/department2.png" 
            alt="Investigators" 
            className="rounded-[40px] w-full object-cover shadow-2xl h-[500px]"
          />
        </div>
      </div>
    </div>
  );
};

// THIS LINE WAS MISSING:
export default WhyChooseUs;