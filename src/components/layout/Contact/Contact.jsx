
import { Button } from "@mui/material";
import "./Contact.css";


const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:rudranayak311@gmail.com">
        <Button>Contact: rudranayak311@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;