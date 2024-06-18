import React, { useState } from 'react';
import './testimonials.css';

const testimonialData = [
    {
      text: "Donating blood was a fulfilling experience. Knowing that I could save someone's life made it all worth it. The process was smooth, and the staff was incredibly supportive and professional. It felt great to contribute to a cause that has such a significant impact on people's lives.",
      author: "Ayesha Singh,Donor"
    },
    {
      text: "Receiving blood during my surgery was a blessing. I am eternally grateful to the donors and the organization. Their selfless act saved my life, and I am now inspired to become a regular donor myself. The whole experience has been life-changing, and I am thankful for the kindness of strangers.",
      author: "Sandhya Davisetty,Recipient"
    },
    {
      text: "The process was seamless and the staff were incredibly supportive. From the moment I walked in, I felt at ease. The environment was clean, and the procedure was explained to me thoroughly. I appreciate the efforts made to ensure donor comfort and safety.",
      author: "Harsha Gattamaneni,Donor"
    },
    {
      text: "I regularly donate blood now. It's my way of giving back to the community and making a difference. Every time I donate, I am reminded of the importance of this act and how it can help save lives. The organization makes the process so easy and rewarding.",
      author: "Rohith Vemuganti,Donor"
    },
    {
      text: "I feel a sense of pride knowing my donation can make a difference. The first time I donated, I was a bit nervous, but the staff reassured me and made the experience pleasant. It's a small act with a huge impact, and I encourage everyone to consider donating.",
      author: "Harika Potu,Donor"
    },
    {
      text: "I started donating blood a few years ago, and it has been a rewarding journey. The team at the donation center is always welcoming and efficient, making the process quick and easy. Knowing that my blood is helping those in critical need is a humbling experience.",
      author: "Saritha Ratna,Donor"
    },
    {
      text: "My experience with receiving a blood donation was incredible. The organization ensured that the blood I received was safe and thoroughly tested. I can't express how grateful I am to the donors and the staff who work tirelessly to save lives. This experience has deeply impacted me.",
      author: "Raghav Kumar,Recipient"
    },
    {
      text: "Donating blood is something I look forward to every few months. The satisfaction of knowing I am helping someone in need is incomparable. The facility is always clean, and the staff treats every donor with respect and care. It's a simple yet profound way to give back.",
      author: "Varsha Vollala,Donor"
    },
    {
      text: "When my father needed an emergency blood transfusion, we were desperate. Thanks to the donors and the organization, he received the blood he needed promptly. We are forever grateful for their quick response and the life-saving gift of blood.",
      author: "Harshith Vedala,Recipient"
    },
    {
      text: "Being a blood donor has been a great experience. The donation center makes sure every donor is comfortable and informed throughout the process. It's amazing to know that such a simple act can have a profound impact on someone's life.",
      author: "Tejaswini Katroth,Donor"
    }
  ];
  
  function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonialData.length - 1 : prevIndex - 1));
    };
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex === testimonialData.length - 1 ? 0 : prevIndex + 1));
    };
  
    return (
      <div className="testimonials-container">
        <div className="testimonials-heading-container">
          <div className="arrow-circle" onClick={handlePrev}>
            <span className="arrow">&larr;</span>
          </div>
          <h2 className="testimonials-heading">What People Say About Us</h2>
          <div className="arrow-circle" onClick={handleNext}>
            <span className="arrow">&rarr;</span>
          </div>
        </div>
        <div className="testimonial">
          <p className="testimonial-text">
            "{testimonialData[currentIndex].text}" - {testimonialData[currentIndex].author}
          </p>
        </div>
      </div>
    );
  }
  
  export default Testimonials;
  