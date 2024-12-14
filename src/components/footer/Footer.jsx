import React from 'react';
import styled from 'styled-components';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "./footer.css"

const Footer = () => {
  return (
    <MainContent>
      {/* Your other components/content go here */}

      <FooterContainer>
        <Container>
          <FooterText>&copy; 2024 UtsavVibes</FooterText>

          <SocialMediaLinks role="navigation">
            <a href="https://www.facebook.com" aria-label="Visit our Facebook page" >
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
          </SocialMediaLinks>
        </Container>
      </FooterContainer>
    </MainContent>
  );
};

export default Footer;