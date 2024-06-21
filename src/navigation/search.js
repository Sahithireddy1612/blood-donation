import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './search.css';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [donors, setDonors] = useState([]);
  const [bloodBanks, setBloodBanks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [donorsResponse, bloodBanksResponse] = await Promise.all([
          axios.get(' http://localhost:3001/Donors'),
          axios.get('http://localhost:3001/Blood-Banks')
        ]);

        let filteredDonors = donorsResponse.data.filter(donor =>
          donor['Blood-type'].toLowerCase().includes(query.toLowerCase())
        );

        let filteredBloodBanks = bloodBanksResponse.data.filter(bank =>
          bank['bloodgroups-available'].some(group =>
            group.toLowerCase().includes(query.toLowerCase())
          )
        );

        
        if (filteredDonors.length === 0) {
          filteredDonors = donorsResponse.data.filter(donor =>
            donor['Blood-type'].toLowerCase() === 'o-positive'
          );
        }

        
        if (filteredBloodBanks.length === 0) {
          filteredBloodBanks = bloodBanksResponse.data.filter(bank =>
            bank['bloodgroups-available'].some(group =>
              group.toLowerCase() === 'o-positive'
            )
          );
        }

        setDonors(filteredDonors);
        setBloodBanks(filteredBloodBanks);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const handleContact = (contactInfo) => {
    const isPhone = /^\d+$/.test(contactInfo); 
    const isEmail = /\S+@\S+\.\S+/.test(contactInfo); 
  
    if (isPhone) {
      console.log('Calling:', contactInfo);
      window.open('tel:' + contactInfo, '_blank');
    } else if (isEmail) {
      console.log('Emailing:', contactInfo);
      window.open('mailto:' + contactInfo, '_blank');
    } else {
      console.log('Invalid contact information:', contactInfo);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='heading-box'>
        <h2 style={{ color: 'purple' }}>Available Donors</h2>
      </div>
      {donors.length > 0 ? (
        <div className="card-container">
          {donors.map(donor => (
            <div key={donor.id} className="card">
              <img src={donor['image-url']} alt={donor.Name} className="card-img" />
              <div className="card-content">
                <h3 style={{ color: 'purple' }}>{donor.Name}</h3>
                <p>Age: {donor.Age}</p>
                <p>Blood Type: {donor['Blood-type']}</p>
                <p>Last Donated: {donor['last-donated']}</p>
                <button className='contact-button' onClick={() => handleContact(donor['Contact-details']['Contact-Number'])}>
                  Contact Them
                </button>
                <button className='contact-button' onClick={() => handleContact(donor['Contact-details'].Email)}>
                  Email Them
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No donors found</p>
      )}

      <div className='heading-box'>
        <h2 style={{ color: 'purple' }}>Available Blood Banks</h2>
      </div>
      {bloodBanks.length > 0 ? (
        <div className="card-container">
          {bloodBanks.map(bank => (
            <div key={bank['blood-bank-name']} className="card">
              <div className="card-content">
                <h3 style={{ color: 'purple' }}>{bank['blood-bank-name']}</h3>
                <p>
                  Contact: 
                  <button  className='contact-button' onClick={() => handleContact(bank['contact-details'])}>
                    Contact Them
                  </button>
                </p>
                <p>Blood Groups Available:</p>
                <ul>
                  {bank['bloodgroups-available'].map((group, index) => (
                    <li key={index}>{group}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No blood banks found</p>
      )}
    </div>
  );
}

export default SearchResults;
