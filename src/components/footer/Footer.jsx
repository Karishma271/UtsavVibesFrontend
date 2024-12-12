import React from 'react';
import styled from 'styled-components';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "./footer.css"

const MainContent = styled.div`
  min-height: calc(100vh - /* height of footer */);
  display: flex;
  flex-direction: column;
  padding-top:20px /* height of footer */;
`;

const FooterContainer = styled.footer`
  background-color: #333333;
  color: white;
  padding: 20px;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FooterText = styled.div`
  font-family: 'DM Sans', sans-serif;
`;

const SocialMediaLinks = styled.div`
  a {
    text-decoration: none;
    color: white;
    margin-right: 20px;
    font-size: 24px;
  }
  a:hover {
    color: #7848f4;
  }
`;

const Footer = () => {
  return (
    <MainContent>
      {/* Your other components/content go here */}

      <FooterContainer>
        <Container>
          <FooterText>&copy; 2024 UtsavVibes</FooterText>

          <SocialMediaLinks>
            <a href="https://www.facebook.com" aria-label="Visit our Facebook page" >
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://www.twitter.com" aria-label="Visit our twitter page">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.linkedin.com" aria-label="Visit our linkedin page">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://www.instagram.com" aria-label="Visit our instagram page">
              <i className="fab fa-instagram"></i>
            </a>
          </SocialMediaLinks>
        </Container>
      </FooterContainer>
    </MainContent>
  );
};

export default Footer;
