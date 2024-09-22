import { useEffect, useState } from "react";
import EventCard from "../components/Card/EventCard.jsx";
import {
  Box,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { ITEMS_PER_PAGE } from "../constants/paginationConstants.js";
import dayjs from "dayjs";
import { BASE_URL } from "../constants/urlConstants.js";
import Loader from "../components/Loader/Loader.jsx";
import toast from "react-hot-toast";

const HomePage = () => {
  const [eventsData, setEventsData] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(BASE_URL);
        const data = await res.json();
        setEventsData(data);
      } catch (e) {
        setError(e.message);
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const sortEvents = (events) => {
    if (sortCriteria === "title") {
      return events.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortCriteria === "organizer") {
      return events.sort((a, b) => a.organizer.localeCompare(b.organizer));
    } else if (sortCriteria === "date") {
      return events.sort((a, b) => dayjs(a.eventDate).diff(dayjs(b.eventDate)));
    }
    return events;
  };

  const sortedEvents = sortEvents([...eventsData]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = sortedEvents.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  return (
    <>
      {isLoading && <Loader />}
      {error && toast.error("Something went wrong! Try again later")}

      {currentItems.length && (
        <>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="sort-label">Sort by</InputLabel>
              <Select
                labelId="sort-label"
                value={sortCriteria}
                label="Sort by"
                onChange={handleSortChange}
              >
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="organizer">Organizer</MenuItem>
                <MenuItem value="date">Event Date</MenuItem>
              </Select>
            </FormControl>
          </Box>

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
            {currentItems &&
              currentItems.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={Math.ceil(eventsData.length / ITEMS_PER_PAGE)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
        </>
      )}
    </>
  );
};

export default HomePage;
