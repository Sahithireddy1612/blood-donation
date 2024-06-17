import React from 'react';
import { Carousel } from 'react-bootstrap';
import Typing from 'react-typing-effect';
import DonateButton from '../components/projectbutton/projectbutton';
import './homepage.css';
import VolunteersArrow from '../components/volunteerarrow/volunteerarrow';

const quotes = [
  {
    quote: 'Donate blood and be a hero!',
    author: '-Anonymous',
    image: '../images/blurimage.jpeg',
  },
  {
    quote: 'One pint can save three lives.',
    author: '-Red Cross',
    image: '../images/coroselimage3.jpeg',
  },
  {
    quote: 'Your donation can make a big difference.',
    author: '-Blood Bank',
    image: '/images/coroselimage.jpeg',
  },
];

const secondCarouselQuotes = [
  {
    quote: 'Every drop counts!',
    author: '-Blood Donors Society',
    image: '../images/smallcorosel.jpeg',
  },
  {
    quote: 'Be a lifeline for someone.',
    author: '-Health Organization',
    image: '../images/smallcorosel1.jpeg',
  },
  {
    quote: 'Your blood can save lives.',
    author: '-Local Blood Bank',
    image: '/images/smallcorosel2.jpeg',
  },
];

const Home = () => {
  return (
    <div className="home">
      <div className="carousels">
        <Carousel fade>
          {quotes.map((quote, index) => (
            <Carousel.Item key={index}>
              <div className="carousel-background" style={{ backgroundImage: `url(${quote.image})` }}>
                <div className="carousel-overlay">
                  <p className="quote-text">{quote.quote}</p>
                  <p className="quote-author">{quote.author}</p>
                  <DonateButton />
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
        <div className="text-and-carousel">
          <div className="typing-text">
            <Typing speed={150} text="Welcome to Global Blood Fund" className="typed-text" />
            <p>Give the gift of life.</p>
            <p>Become a donor today!</p>
          </div>
          <Carousel fade>
            {secondCarouselQuotes.map((quote, index) => (
              <Carousel.Item key={index}>
                <div className="carousel-background" style={{ backgroundImage: `url(${quote.image})` }}>
                  <div className="carousel-overlay">
                    <p className="quote-text">{quote.quote}</p>
                    <p className="quote-author">{quote.author}</p>
                    <DonateButton />
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>

      <div className="info-section">
        <h1 className="main-heading">Global Blood Fund</h1>
        <p className="main-description">
          Global Blood Fund is a charity dedicated to reducing worldwide inequities in blood safety and sufficiency.
          Since 2008, we have helped over 50 poorly resourced countries in Africa, Asia and Latin America better serve their communities.
        </p>
        <div className="description-section">
          <h2 className="section-heading">LED BY PRACTICING BLOOD BANKING PROFESSIONALS</h2>
          <p className="section-description">
            Our experience from years of working in countries around the world has shown us that supporting voluntary, non-remunerated donation is the most effective and cost-efficient intervention.
          </p>
          <p className="section-description">
            Global Blood Fund has facilitated such efforts as establishing rural blood banks and supplying bloodmobiles to improve donor access and operational efficiency.
          </p>
          <p className="section-description">
            We also have resourced collectors by providing items such as donation couches, portable beds, and recognition gifts to enhance comfort and encourage donors to return.
          </p>
        </div>
      </div>

      <div className="impact-section">
        <div className="impact-image" style={{ backgroundImage: `url('../images/impact-image.jpeg')` }}></div>
        <div className="impact-description">
          <h2 className="impact-heading">HOW WE ARE MAKING AN IMPACT</h2>
          <p className="impact-text">
            Successful past projects have included everything from producing television advertisements to donating technical manuals and supplying red cell exchange consumables to providing consultancy.
          </p>
          <p className="impact-text">
            Our communication and promotional tools help with public engagement, and our training support assists with all aspects of donor recruitment, retention, and management. We also offer grants for innovative recruitment approaches.
          </p>
          <p className="impact-text">
            
            Moreover, GBF’s EqXchange program repurposes used equipment and is responsible for sending millions of dollars in tools and technology to low-income countries to help improve collection, testing, and processing activity.
          </p>
        </div>
      </div>

      <div className="focus-section">
        <p className="focus-text">
          GBF focuses on enabling blood services in resource-poor countries to nurture that most precious of resources – blood donors.
        </p>
      </div>

      <div className="volunteer-section">
        <h2 className="volunteer-heading">Want to volunteer to our Program?</h2>
        <p className="volunteer-description">
        Make a difference by making a step forward by being part of our community. Change begins with knowledge and end with action. Being a volunteer, you will be the integral part of our workforce, bringing expertise and experiences all together to work and enable change.....<br/>
        Volunteering with GBF is a rewarding experience that allows you to make a significant impact on global blood donation efforts. Join us in our mission to support blood services in resource-poor countries.
        </p>
        <VolunteersArrow/>
        {/* <div className="volunteer-cta">
          <div className="arrow-circle">
            <span className="arrow">&rarr;</span>
          </div>
          <span className="join-volunteer-text">Join Volunteer</span>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
