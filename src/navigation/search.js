import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase'; 
import './search.css';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');
  const [donors, setDonors] = useState([]);
  const [bloodBanks, setBloodBanks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDonors = async (searchQuery) => {
    const donorsCollection = collection(db, 'donors');
    const donorsQuery = query(donorsCollection, where('Blood-type', '==', searchQuery));
    const donorsSnapshot = await getDocs(donorsQuery);

    let filteredDonors = [];
    donorsSnapshot.forEach(doc => {
      filteredDonors.push({ id: doc.id, ...doc.data() });
    });

    if (filteredDonors.length === 0) {
      const universalDonorsQuery = query(donorsCollection, where('Blood-type', '==', 'O-positive'));
      const universalDonorsSnapshot = await getDocs(universalDonorsQuery);

      universalDonorsSnapshot.forEach(doc => {
        filteredDonors.push({ id: doc.id, ...doc.data() });
      });
    }

    return filteredDonors;
  };

  const fetchBloodBanks = async (searchQuery) => {
    const bloodBanksCollection = collection(db, 'blood-banks');
    const bloodBanksQuery = query(bloodBanksCollection, where('bloodgroups-available', 'array-contains', searchQuery));
    const bloodBanksSnapshot = await getDocs(bloodBanksQuery);

    let filteredBloodBanks = [];
    bloodBanksSnapshot.forEach(doc => {
      filteredBloodBanks.push({ id: doc.id, ...doc.data() });
    });

    if (filteredBloodBanks.length === 0) {
      const universalBloodBanksQuery = query(bloodBanksCollection, where('bloodgroups-available', 'array-contains', 'O-positive'));
      const universalBloodBanksSnapshot = await getDocs(universalBloodBanksQuery);

      universalBloodBanksSnapshot.forEach(doc => {
        filteredBloodBanks.push({ id: doc.id, ...doc.data() });
      });
    }

    return filteredBloodBanks;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [fetchedDonors, fetchedBloodBanks] = await Promise.all([
          fetchDonors(searchQuery),
          fetchBloodBanks(searchQuery)
        ]);

        setDonors(fetchedDonors);
        setBloodBanks(fetchedBloodBanks);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);

  const handleContact = (contactInfo) => {
    const isPhone = /^\d+$/.test(contactInfo); 
    const isEmail = /\S+@\S+\.\S+/.test(contactInfo); 
  
    if (isPhone) {
      window.open('tel:' + contactInfo, '_blank');
    } else if (isEmail) {
      window.open('mailto:' + contactInfo, '_blank');
    } else {
      console.error('Invalid contact information:', contactInfo);
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
            <div key={bank.id} className="card">
              <div className="card-content">
                <h3 style={{ color: 'purple' }}>{bank['blood-bank-name']}</h3>
                <p>
                  Contact: 
                  <button className='contact-button' onClick={() => handleContact(bank['contact-details'])}>
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
