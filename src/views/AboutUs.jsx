//About Us page added
import React, { useState, useEffect } from "react";

const teamMembers = [
  { name: "Bob Doe", posting: "Director" },
  { name: "Alice Smith", posting: "Manager" },
  { name: "Charlie Johnson", posting: "Editor" },
];

const AboutUs = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    // Fetch random images for team members
    const fetchTeamImages = async () => {
      try {
        const responses = await Promise.all(
          teamMembers.map(() =>
            fetch("https://randomuser.me/api/")
              .then((res) => res.json())
              .then((data) => data.results[0].picture.large)
          )
        );

        const teamWithImages = teamMembers.map((member, index) => ({
          ...member,
          image: responses[index],
        }));

        setTeam(teamWithImages);
      } catch (error) {
        console.error("Error fetching team member images:", error);
      }
    };

    fetchTeamImages();
  }, []);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      {/* Our Mission Section */}
      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Our Mission</h2>
        <p style={{ color: "#4a4a4a" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          luctus lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Maecenas luctus.
        </p>
      </section>

      {/* Our History Section */}
      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Our History</h2>
        <p style={{ color: "#4a4a4a" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          luctus lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Maecenas luctus.
        </p>
      </section>

      {/* Our Team Section */}
      <section>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "24px" }}>Our Team</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
          {team.map((member, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                width: "300px",
              }}
            >
              <img
                src={member.image}
                alt={member.name}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <div style={{ padding: "16px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}>{member.name}</h3>
                <p style={{ color: "#6c757d" }}>Role: {member.posting}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
