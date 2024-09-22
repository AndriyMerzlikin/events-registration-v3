import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../constants/urlConstants";

const RegisterPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    birthDate: "",
    reason: "Social media",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...form,
      birthDate: new Date(form.birthDate).toISOString(),
    };

    try {
      const response = await fetch(`${BASE_URL}/${eventId}/participants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const updatedEvent = await response.json();
        console.log("Participant added:", updatedEvent);
        toast.success("Successful registration for the event");
        navigate("/");
      } else {
        console.error("Error adding participant");
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Full name"
            type="text"
            name="name"
            variant="outlined"
            fullWidth
            value={form.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            variant="outlined"
            fullWidth
            value={form.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Date of Birth"
            type="date"
            name="birthDate"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            value={form.birthDate}
            onChange={handleChange}
            required
          />

          <FormLabel component="legend">How did you find us?</FormLabel>
          <RadioGroup
            aria-label="reason"
            name="reason"
            value={form.reason}
            onChange={handleChange}
          >
            <FormControlLabel
              value="Social media"
              control={<Radio />}
              label="Social media"
            />
            <FormControlLabel
              value="Friends"
              control={<Radio />}
              label="Friends"
            />
            <FormControlLabel
              value="Found myself"
              control={<Radio />}
              label="Found myself"
            />
          </RadioGroup>

          <Button type="submit" variant="contained" fullWidth>
            Register
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default RegisterPage;
