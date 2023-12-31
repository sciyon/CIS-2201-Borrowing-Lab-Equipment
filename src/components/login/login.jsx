import { useState } from "react";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import '../../styles/temp.css';
import USCLogo from '../../images/University_of_San_Carlos_logo.png';

export const Login = ({ onClose, onDocumentId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  function login() {
    if (validate_field(email) === false || validate_field(password) === false) {
      alert("Incomplete fields");
      return;
    }

    if (validate_email(email) === false || validate_password(password) === false) {
      alert("Email or password incorrect");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userId = user.uid;
        let documentId = null;

        if (userId === "LNudqBX1odcAbVKBqoh6VGpgjj43") {
          documentId = "LNudqBX1odcAbVKBqoh6VGpgjj43";
        } else if (userId === "MOaqu8jBfGMh4QpdWQ48ETYWGuO2") {
          documentId = "MOaqu8jBfGMh4QpdWQ48ETYWGuO2";
        } else if (userId === "OUaIDJiaTAT9cOpvCG8L3rVhNm32") {
          documentId = "OUaIDJiaTAT9cOpvCG8L3rVhNm32";
        }

        if (userId) {
          localStorage.setItem("userId", userId); // Store the user ID in local storage
        }

        if (userId === "MOaqu8jBfGMh4QpdWQ48ETYWGuO2") {
          onClose("YES");
        } else {
          onClose("NO");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  const handleClose = () => {
    setIsVisible(false); // Set the visibility to false to hide the component

    if (onClose) {
      onClose("NO"); // Call the onClose function provided by the parent component with "NO"
    }
  };

  if (!isVisible) {
    return null; // Return null to hide the component
  }

  return (
    <div className="overlay">
      <div className="expanded-card">
        <div className="card col-4 insertEquipment text-center">
          <div className="card-header">
            <div className="row align-items-center">
              <div className="text-left">
                <h5 className="card-title">LOGIN DETAILS</h5>
              </div>
              <div className="text-right">
                <button className="btn btn-close" onClick={handleClose}></button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="form-group">
              <img src={USCLogo} alt="USC Logo" className="logo-logging" />
            </div>
            <br></br>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                className="form-control mb-3"
                placeholder="e.g. @usc.edu.ph"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                className="form-control mb-3"
                placeholder="Enter your password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={login}>
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );  
  
}  

function validate_email(email) {
  const expression = /^\w{8}@usc\.edu\.ph$/;
  return expression.test(email);
}

function validate_password(password) {
  return password.length >= 6;
}

function validate_field(field) {
  if (field == null) {
    return false;
  } else if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}
