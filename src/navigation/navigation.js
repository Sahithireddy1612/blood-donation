import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProjectNavbar from '../Projectnavbar/Projectnavbar';
import Home from './homepage';
import About from './aboutpage';
import Recipients from './recepientsInfo';
import Settings from './settingspage';
import BloodDonorForm from '../Forms/DonorsForm';
import Submitted from '../Forms/submitted';
import VolunteersArrow from '../components/volunteerarrow/volunteerarrow';
import VolunteersForm from '../Forms/VolunteersForm';
import Success from '../Forms/success';
import Donors from './donorsInfo';



function Navigation() {
  return (
    <Router>
      <ProjectNavbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/donors" element={<Donors />} />
        <Route path="/recipients" element={<Recipients />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/" element={<Home />} />
        <Route path="/donors-form" element={<BloodDonorForm />} />
        <Route path="/submitted" element={<Submitted />} />
        <Route path="/VolunteersForm" element={<VolunteersForm />} />
        <Route path="/volunteer-arrow" element={<VolunteersArrow/>} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default Navigation;
