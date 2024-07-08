import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase'; 
import './blood-banks.css';

function BloodBanksPage() {
  const [bloodBanks, setBloodBanks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'blood-banks'));
        const bloodBanksList = querySnapshot.docs.map(doc => doc.data());
        console.log('Fetched blood banks:', bloodBanksList);
        setBloodBanks(bloodBanksList);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      <div className='heading-container'>
        <h2 className='heading'>All Blood Banks</h2>
      </div>
      {bloodBanks.length > 0 ? (
        <div className="blood-banks-container">
          {bloodBanks.map((bank, index) => (
            <div key={index} className="blood-bank-card">
              <div className="card-content">
                <h3 className='card-title'>{bank['blood-bank-name']}</h3>
                <p className='card-text'>Contact: {bank['contact-details']}</p>
                <p className='card-text'>Blood Groups Available:</p>
                <ul className='blood-groups-list'>
                  {bank['bloodgroups-available'].map((group, idx) => (
                    <li key={idx}>{group}</li>
                  ))}
                </ul>
                <button className='btn-primary' onClick={() => handleContact(bank['contact-details'])}>
                  Contact Them
                </button>
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

export default BloodBanksPage;
