import { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Layout/Header';
import Events from './pages/Events';
import News from './pages/News';
import Mentorship from './pages/Mentorship';
import JobPostings from './pages/JobPostings';
import Gallery from './pages/Gallery';
import InterviewExp from './pages/InterviewExp';
import EditMentorship from './components/EditMentorship';
import JobDetailsPage from './components/JobDetailPage';

function App() {
  return (
    <Fragment>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/events" element={<Events/>}/>
          <Route path="/news" element={<News/>}/>
          <Route path="/mentorship" element={<Mentorship/>}/>
          <Route path="/editMentorship/:id" element={<EditMentorship/>}/>
          <Route path="/jobs" element={<JobPostings/>}/>
          <Route path="/job-details/:id" element={<JobDetailsPage/>}/>
          <Route path="/gallery" element={<Gallery/>}/>
          <Route path="/interview-experience" element={<InterviewExp/>}/>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
