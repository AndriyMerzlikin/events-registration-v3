import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

// eslint-disable-next-line react/prop-types
const EventCard = ({ event }) => {
  // eslint-disable-next-line react/prop-types
  const { title, description, _id, eventDate, organizer, imageUrl } = event;

  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={imageUrl} title="event picture" />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            textOverflow: "ellipsis",
            color: "text.secondary",
          }}
        >
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Organizer: {organizer}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Event Date: {dayjs(eventDate).format("MMMM D, YYYY")}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => navigate(`/register/${_id}`)} size="small">
          Register
        </Button>
        <Button onClick={() => navigate(`/participants/${_id}`)} size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default EventCard;
