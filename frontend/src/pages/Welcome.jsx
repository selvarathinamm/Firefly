import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import vvcoeLogo from "../assets/vvcoe_logo.jpg";
import "../styles/Welcome.css"; // ✅ External CSS for styling

export default function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="welcome-page">
      {/* ===== HEADER ===== */}
      <header className="app-header">
        <div className="header-content">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>

          <div className="header-center">
            <h1 className="app-title">VVCOE Connect</h1>
          </div>

          <div className="logo-section">
            <img src={vvcoeLogo} alt="VVCOE Logo" className="app-logo" />
          </div>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="welcome-main">
        <section className="hero">
          <h2 className="welcome-text">Welcome, Testers 👋</h2>
          <p className="sub-text">
            Connecting Students and Alumni of{" "}
            <span className="highlight">VVCOE</span> through a growing
            professional network.
          </p>
        </section>

        <section className="cards-container">
          {cardData.map((card, i) => (
            <div key={i} className="card">
              <h3 className="card-title">{card.title}</h3>
              {card.text && <p className="card-text">{card.text}</p>}
              {card.list && (
                <ul className="card-list">
                  {card.list.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

const cardData = [
  {
    title: "Testing Environment",
    text: `This build is currently under internal testing. 
    Future updates will include alumni connection features, activity feeds, 
    and secure authentication via JWT.`,
  },
  {
    title: "Upcoming Features",
    list: [
      "Student & Alumni Profiles",
      "Networking Feed",
      "Messaging and Mentorship",
      "Admin Verification Portal",
    ],
  },
  {
    title: "Developer Mode 🧪",
    text: `You are logged in as tester@vvcoe.com. 
    All actions are in test mode and non-persistent. 
    The final release will connect with the Spring Boot + JWT backend.`,
  },
];
