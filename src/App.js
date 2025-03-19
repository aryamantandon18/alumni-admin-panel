import { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Layout/Header';
import Events from './pages/Events';
import News from './pages/News';
import Mentorship from './pages/Mentorship';
import JobPostings from './pages/JobPostings';
import Gallery from './pages/Gallery';
import InterviewExp from './pages/InterviewExp';
import EditEventForm from './components/Events/EditEventForm';
import EditMentorship from './components/EditMentorship';
import EditNewsForm from './components/News/EditNewsForm';
import EditGallery from './components/Gallery/EditGallery';
import AddAlbum from './components/Gallery/AddAlbum';
import AddEvent from './components/Events/AddEvent';
import EditInterviewExperience from './components/InterviewExperience/EditInterviewExperience';
import ViewInterviewExperience from './components/InterviewExperience/ViewInterviewExperience';
import AddNewsForm from './components/News/AddNewsForm';
import AddInterviewExperience from './components/InterviewExperience/AddInterviewExperience';
import ViewEvent from './components/Events/ViewEvent';
import ViewNews from './components/News/ViewNews';
import ViewGallery from './components/Gallery/ViewGallery';

const events = [
  {
    eventId: 1,
    eventName: "Tech Conference 2024",
    eventDescription: "A global tech conference with top industry leaders.",
    eventDate: "2024-08-10",
    eventType: "Technology",
    eventLocation: "New York",
    eventImage: "https://via.placeholder.com/50",
    eventMode: "Offline",
    category: "Tech",
    subcategory: "AI & ML",
    linkToRegister: "https://example.com/register",
    status: true,
  },
  {
    eventId: 2,
    eventName: "Startup Meetup",
    eventDescription: "Networking event for startup founders and investors.",
    eventDate: "2024-08-10",
    eventType: "Business",
    eventLocation: "San Francisco",
    eventImage: "https://via.placeholder.com/50",
    eventMode: "Online",
    category: "Entrepreneurship",
    subcategory: "Startup Funding",
    linkToRegister: "https://example.com/register",
    status: false,
  },
];

const demoNews = [
  {
    newsId: 1,
    newsTitle: "Tech Innovations 2024",
    newsDescription: "Latest trends in tech.",
    newsImage: "https://via.placeholder.com/50",
    category: "Technology",
    author: "John Doe",
    newsDate: "2024-08-10T00:00:00Z",
    isActive: true,
    createdAt: "2024-08-01T10:00:00Z",
    updatedAt: "2024-08-05T15:00:00Z",
  },
  {
    newsId: 2,
    newsTitle: "Finance Market Crash",
    newsDescription: "Impact of economic slowdown.",
    newsImage: "https://via.placeholder.com/50",
    category: "Finance",
    author: "Jane Smith",
    newsDate: "2024-08-12T00:00:00Z",
    isActive: false,
    createdAt: "2024-08-02T11:00:00Z",
    updatedAt: "2024-08-06T16:00:00Z",
  },
];

function App() {
  return (
    <Fragment>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/editEvent/:id" element={<EditEventForm events={events} />} />
          <Route path="/viewEvent/:id" element={<ViewEvent events={events} />} />
          <Route path="/news" element={<News />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/editMentorship/:id" element={<EditMentorship />} />
          <Route path="/editNews/:id" element={<EditNewsForm news={demoNews} />} />
          <Route path="/viewNews/:id" element={<ViewNews news={demoNews} />} />
          <Route path="/viewGallery/:id" element={<ViewGallery />} />
          <Route path="/editGallery/:id" element={<EditGallery />} />
          <Route path="/addAlbum" element={<AddAlbum />} />
          <Route path="/addEvent" element={<AddEvent />} />
          <Route path="/addNews" element={<AddNewsForm />} />
          <Route path='/editInterviewExperience/:id' element={<EditInterviewExperience />} />
          <Route path='/viewInterviewExperience/:id' element={<ViewInterviewExperience />} />
          <Route path='/addInterviewExperience' element={<AddInterviewExperience />} />
          <Route path="/jobs" element={<JobPostings />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/interview-experience" element={<InterviewExp />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
