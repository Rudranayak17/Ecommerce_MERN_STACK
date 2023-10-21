
import { Avatar, Button, Typography } from "@mui/material";
import "./aboutSection.css";
import { Instagram, YouTube } from "@mui/icons-material";

const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/rudrapratap17";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://avatars.githubusercontent.com/u/122798243?v=4"
              alt="Founder"
            />
            <Typography>Rudra Pratap Nayak</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
            🚀 Full Stack MERN Developer 🌐 | Transforming Ideas into Code 📝 | Passionate about Crafting Web Experiences 💻 | JavaScript Enthusiast 📚
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.youtube.com/@rudraNayak2004"
              target="blank"
            >
              <YouTube className="youtubeSvgIcon" />
            </a>

            <a href="https://www.instagram.com/rudrapratap17" target="blank">
              <Instagram className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;