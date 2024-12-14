import React from 'react';
import styled from 'styled-components';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "./footer.css";

const MainContent = styled.div`
  min-height: calc(100vh - 80px); /* Adjust based on footer height */
  display: flex;
  flex-direction: column;
  padding-top: 20px; /* Ensure space above the footer */
`;

const FooterContainer = styled.footer`
  background-color: #333333;
  color: white;
  padding: 20px 0;
  width: 100%;
`;

const FooterTextSection = styled.div`
  text-align: center;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
`;

const SocialMediaLinksSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Footer = () => {
  return (
    <MainContent>
      {/* Other content of your page goes here */}

      <FooterContainer>
        {/* Footer Text */}
        <FooterTextSection>
          <p>&copy; 2024 UtsavVibes</p>
        </FooterTextSection>

        {/* Social Media Links */}
        <SocialMediaLinksSection>
          <a href="https://www.facebook.com" aria-label="Visit our Facebook page">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://www.twitter.com" aria-label="Visit our Twitter page">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.linkedin.com" aria-label="Visit our LinkedIn page">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://www.instagram.com" aria-label="Visit our Instagram page">
            <i className="fab fa-instagram"></i>
          </a>
        </SocialMediaLinksSection>
      </FooterContainer>
    </MainContent>
  );
};

export default Footer;
