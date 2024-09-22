import { Box, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { BASE_URL } from "../constants/urlConstants";

const ParticipantsPage = () => {
  const { eventId } = useParams();

  const [participants, setParticipants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${BASE_URL}/${eventId}`);
        const data = await res.json();
        setParticipants(data.participants || []);
      } catch (e) {
        console.log(e);
      }
    };
    fetchEvent();
  }, [eventId]);

  const filteredParticipants = participants.filter(
    (participant) =>
      participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      component="section"
      sx={{
        p: 2,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <TextField
        label="Search by name or email"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />
      {filteredParticipants.length > 0 ? (
        filteredParticipants.map((participant) => (
          <Box
            key={participant._id}
            sx={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              width: "300px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h6">{participant.name}</Typography>
            <Typography variant="body1">{participant.email}</Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body1">
          No participants found for this event.
        </Typography>
      )}
    </Box>
  );
};

export default ParticipantsPage;
