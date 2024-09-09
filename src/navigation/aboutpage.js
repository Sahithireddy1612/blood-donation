import React from 'react';
import DonateButton from '../components/projectbutton/projectbutton';
import './aboutpage.css';
import VolunteersArrow from '../components/volunteerarrow/volunteerarrow';
import Testimonials from '../testimonials/testimonials';

function About() {
  return (
    <div className="about-container">
      <div className="quote-image-container">
        <img src="/images/aboutimg.jpg" alt="Quote" className="quote-image" />
        <div className="quote-overlay">
          <div className="quote-content">
            <h3 className='about-heading'>WE PROMOTE BLOOD DONATION..!</h3>
            <p className='quote'>
              "Global Blood Fund Organisation is a non-government organisation(NGO) works with the object of increasing public awareness in promoting voluntary Blood donation and safeguarding the interest and welfare of blood donors and members of our organisations."
            </p>
            <div className="quote-button-container">
              <DonateButton /> 
            </div>
          </div>
        </div>
      </div>
      <hr className='line'/>
      <div className="about-content">
        <div className="about-image">
          <img src="/images/about-grpimg.png" alt="About Us" />
        </div>
      
        <div className="about-text">
          <div className="small-heading">About Us</div>
          <div className="large-heading">We're on a Mission!</div>
          <div className="about-paragraphs">
            <p>
              Our Mission is to bring volunteers and organisations together to share time, skills and passion to promote India's social development.
            </p>
            <p>
              IDonate Organisation delivers impact in these areas – Blood Donation, Organ Donation, Education, Tribal Welfare, Youth Welfare, Livelihood & Economic Development, Poverty Alleviation, Gender Equality, Human Rights. We achieve our mission by working closely with the volunteers at one end and with government & other organisations that work on these impact areas at the other end.
            </p>
            <p>
              We now engage 400+ volunteers every year through a range of programs partnering with a strong network of 30+ credible non-profits across India.
            </p>
            <p>
              Our programs have been supported by the most credible charitable foundations and have also developed strategic employee volunteering partnerships with some of the top companies operating in India.
            </p>
          </div>
        </div>
      </div>
      <hr className='line'/>
      <div className="about-values">
        <div className="value integrity">
          <div className="value-image">
            <img src='/images/integrity.jpeg' alt="Integrity" className="integrity-img" />
          </div>
          <div className="value-text">
            <h3>Integrity</h3>
            <p>
              We will be consistent, honest, accountable and transparent in what we say and do. We will safeguard the integrity and dignity of those we serve.
            </p>
          </div>
        </div>
        <hr className='line'/>
        <div className="value innovation">
          <div className="value-text">
            <h3>Innovation</h3>
            <p>
              For us, this means creating opportunities and creative solutions: we will continue to identify and explore uncharted opportunities for growth and sustainability, mitigate risks, and provide the best social services that we can.
            </p>
          </div>
          <div className="value-image">
            <img src='/images/innovation.jpeg' alt="Innovation" className="innovation-img" />
          </div>
        </div>
        <hr className='line'/>
        <div className="value respect">
          <div className="value-image">
            <img src='/images/respect.jpeg' alt="Respect" className="respect-img" />
          </div>
          <div className="value-text">
            <h3>Respect</h3>
            <p>
              We will serve with respect, honouring the people we serve, our communities, partners and one another. We will highly value the relationships we build with our communities, partners, stakeholders and each other.
            </p>
          </div>
        </div>
        <hr className='line'/>
        <div className="value service">
          <div className="value-text">
            <h3>Service to Humanity</h3>
            <p>
              Embodying responsibility, accountability and commitment – we will faithfully execute the duties and responsibilities entrusted to us and maintain the highest ethical standards.
            </p>
          </div>
          <div className="value-image">
            <img src='/images/service.jpeg' alt="Service to Humanity" className="service-img" />
          </div>
        </div>
      </div>
      <hr className='line'/>
      <div className="donors-section">
        <div className="donors-content">
          <div className="donors-image">
            <img src='/images/about1.jpeg' alt="Donors" />
          </div>
          <div className="donors-text">
            <h2 className="donors-heading">WHERE ARE THE DONORS?</h2>
            <p>
              A key area of focus for GBF is recruiting and retaining donors. There is opportunity to improve donor retention in many parts of the world, where the demand for blood in hospitals is not met.
            </p>
            <p>
              To combat the shortfall, either relatives of patients are coerced to donate or health authorities resort to the unsafe practice of paid donation.
            </p>
            <p>
              In countries where testing facilities are limited or non-existent, there is a high threat of transmitting HIV, malaria, hepatitis or other chronic and potentially deadly diseases.
            </p>
          </div>
        </div>
      </div>
      <hr className='line'/>
     
      <div className="join-movement-section">
        <div className="join-movement-content">
          <div className="join-movement-text">
            <h2 className="join-movement-heading">JOIN THE MOVEMENT</h2>
            <p>Be the first to hear about giving updates, collaborations and how you can help end the global inequalities for accessing safe blood.</p>
          </div>
        
          <div className="join-movement-arrow">
         
            <VolunteersArrow />
          </div>
          

        </div>
        
      </div>
      <hr className='line'/>
      
      <div className="impacting-section">
        <h2 className="impacting-heading">A LIFE OR DEATH ISSUE</h2>
        <p className="impacting-content">
          Globally, there is not enough blood to treat sick patients and available blood is often not safe because of poor donor selection and testing practices. Both directly and indirectly this causes unnecessary death and suffering on an unimaginable scale that Global Blood Fund strives to overcome.
        </p>
      </div>
     
     
      <hr className='line'/>
      <Testimonials/>
    </div>
  );
}

export default About;
   
