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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch donors based on search query
        console.log('Fetching donors for blood type:', searchQuery);
        const donorsCollection = collection(db, 'donors');
        const donorsQuery = query(donorsCollection, where('Blood-type', '==', searchQuery));
        const donorsSnapshot = await getDocs(donorsQuery);

        let filteredDonors = [];
        console.log('donorsSnapshot size:', donorsSnapshot.size);

        donorsSnapshot.forEach(doc => {
          console.log('donor doc data:', doc.data());
          filteredDonors.push({ id: doc.id, ...doc.data() });
        });

        console.log('Fetched donors:', filteredDonors);

        if (filteredDonors.length === 0) {
          console.log('No donors found, fetching universal donors');
          const universalDonorsQuery = query(donorsCollection, where('Blood-type', '==', 'O-positive'));
          const universalDonorsSnapshot = await getDocs(universalDonorsQuery);

          universalDonorsSnapshot.forEach(doc => {
            filteredDonors.push({ id: doc.id, ...doc.data() });
          });

          console.log('Fetched universal donors:', filteredDonors);
        }

        setDonors(filteredDonors);

        // Fetch blood banks based on search query
        console.log('Fetching blood banks for blood type:', searchQuery);
        const bloodBanksCollection = collection(db, 'blood-banks');
        const bloodBanksQuery = query(bloodBanksCollection, where('bloodgroups-available', 'array-contains', searchQuery));
        const bloodBanksSnapshot = await getDocs(bloodBanksQuery);

        let filteredBloodBanks = [];
        console.log('bloodBanksSnapshot size:', bloodBanksSnapshot.size);

        bloodBanksSnapshot.forEach(doc => {
          console.log('blood bank doc data:', doc.data());
          filteredBloodBanks.push({ id: doc.id, ...doc.data() });
        });

        console.log('Fetched blood banks:', filteredBloodBanks);

        if (filteredBloodBanks.length === 0) {
          console.log('No blood banks found, fetching universal blood banks');
          const universalBloodBanksQuery = query(bloodBanksCollection, where('bloodgroups-available', 'array-contains', 'O-positive'));
          const universalBloodBanksSnapshot = await getDocs(universalBloodBanksQuery);

          universalBloodBanksSnapshot.forEach(doc => {
            filteredBloodBanks.push({ id: doc.id, ...doc.data() });
          });

          console.log('Fetched universal blood banks:', filteredBloodBanks);
        }

        setBloodBanks(filteredBloodBanks);
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
            <div key={bank.id} className="card">
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
