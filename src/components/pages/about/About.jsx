import React from "react";
import "./about.css"; // Import your CSS file
import karishmaImage from "../../../assets/images/Karishma.jpg";
import cracyImage from "../../../assets/images/Cracy.jpg";
import shailyImage from "../../../assets/images/Shaily.jpg";
import urviImage from "../../../assets/images/Urvi.jpg";
import { Typography, Container, Grid, Card, CardContent, CardMedia } from '@mui/material';

const UtsavVibesAboutUs = () => {
  const customStyles = {
    color: "red",
    backgroundColor: "red",
    height: "2px",
    border: "none",
  };

  return (
    <div className="about-us-container">
      <Container>
        <section className="about-us-section">
          <Typography variant="h2" fontSize="2rem" mb={4} gutterBottom textAlign="center">
            About UtsavVibes
          </Typography>
          <Typography variant="body1" className="para">
            UtsavVibes brings your event visions to life with our expert planning and management services.
            We meticulously handle every detail, ensuring that your occasion is not just an event but an
            unforgettable experience. Trust UtsavVibes to turn your celebrations into cherished memories
            with our professional and personalized approach to event management.
          </Typography>
          <Typography variant="body1">
            At UtsavVibes, our mission is to bring your dreams to life, whether it's a wedding, corporate
            event, or any special occasion. With a dedicated team of event experts, we meticulously handle
            every detail, ensuring a seamless and stress-free experience for our clients.
          </Typography>
        </section>
        <hr style={customStyles} />
        <section className="team-section">
          <Typography variant="h3" textAlign="center" mb={4}>
            Meet Our Team
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardMedia
                  component="img"
                  alt="Karishma Patel"
                  height="140"
                  image={karishmaImage}
                />
                <CardContent>
                  <Typography variant="h5">Karishma Patel</Typography>
                  <Typography variant="body2" color="text.secondary">Full Stack Developer</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardMedia
                  component="img"
                  alt="Cracy Macwan"
                  height="140"
                  image={cracyImage}
                />
                <CardContent>
                  <Typography variant="h5">Cracy Macwan</Typography>
                  <Typography variant="body2" color="text.secondary">Full Stack Developer</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardMedia
                  component="img"
                  alt="Shaily Shah"
                  height="140"
                  image={shailyImage}
                />
                <CardContent>
                  <Typography variant="h5">Shaily Shah</Typography>
                  <Typography variant="body2" color="text.secondary">Full Stack Developer</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardMedia
                  component="img"
                  alt="Urvi Patel"
                  height="140"
                  image={urviImage}
                />
                <CardContent>
                  <Typography variant="h5">Urvi Patel</Typography>
                  <Typography variant="body2" color="text.secondary">Full Stack Developer</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </section>
        <hr style={customStyles} />
        <section className="testimonials-section">
          <Typography variant="h3" textAlign="center" mb={4}>
            What Our Clients Say
          </Typography>
          <div className="testimonial">
            <Typography variant="body1" component="blockquote">
              UtsavVibes made our wedding day absolutely magical. Their attention to detail
              and creativity exceeded our expectations, turning every moment into an enchanting
              experience. From the décor to the logistics, every aspect was flawlessly managed,
              allowing us to fully enjoy our special day without any stress. We couldn't have
              asked for a more perfect celebration.
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">- Delighted Duo</Typography>
          </div>
          <div className="testimonial">
            <Typography variant="body1" component="blockquote">
              We couldn't have pulled off our corporate event without UtsavVibes. Their professionalism
              and expertise were outstanding, ensuring everything ran smoothly and effortlessly.
              Their meticulous planning and execution allowed us to focus on our objectives while they
              handled all the details seamlessly. Highly recommend their services!
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">- Satisfied Client</Typography>
          </div>
        </section>
      </Container>
    </div>
  );
}

export default UtsavVibesAboutUs;
