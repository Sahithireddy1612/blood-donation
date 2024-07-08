import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { NavLink } from 'react-router-dom';

export default function ProjectFooter() {
  return (
    <MDBFooter bgColor='dark' className='text-center text-lg-start text-light' style={{ marginTop: '20px' }}>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='https://www.facebook.com/globalbloodfund' className='me-4 text-reset'>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='https://x.com/i/flow/login?redirect_after_login=%2FGlobalBloodFund' className='me-4 text-reset'>
            <MDBIcon fab icon="twitter" />
          </a>
          <a href='https://globalbloodfund.org/global-need/mission/' className='me-4 text-reset'>
            <MDBIcon fab icon="google" />
          </a>
          <a href='https://globalbloodfund.org/global-need/mission/' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='https://www.linkedin.com/uas/login?session_redirect=%2Fcompany%2F5337301' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                GLOBAL BLOOD FUND
              </h6>
              <p>
                GBF focuses on enabling blood services in resource-poor countries to nurture that most precious of resources – blood donors.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'></h6>
              <p>
                <NavLink to='/home' className='text-reset'>
                  HOME
                </NavLink>
              </p>
              
              <p>
                <NavLink to='/about' className='text-reset'>
                  ABOUT
                </NavLink>
              </p>
              <p>
              <NavLink to='/RecipientsForm' className='text-reset'>
                  Help
                </NavLink>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <NavLink to='/donors' className='text-reset'>
                  Donors
                </NavLink>
              </p>
              <p>
                <NavLink to='/recipients' className='text-reset'>
                  Recipients
                </NavLink>
              </p>
              <p>
                <NavLink to='/blood-banks' className='text-reset'>
                  BloodBanks
                </NavLink>
              </p>
             
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Hyderabad, Kukatpally 100012, Telangana, India
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                globalbloodfund@gmail.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 91 78234 567 88
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 91 78234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2021 Copyright:
        <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
          GlobalBloodFund.com
        </a>
      </div>
    </MDBFooter>
  );
}
