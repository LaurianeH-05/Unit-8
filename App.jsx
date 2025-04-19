import { Routes, Route } from 'react-router-dom'
import CrewmateList from './components/CrewmateList'
import CrewmateForm from './components/CrewmateForm'
import CrewmateDetail from './components/CrewmateDetail'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CrewmateList />} />
      <Route path="/create" element={<CrewmateForm />} />
      <Route path="/crewmate/:id" element={<CrewmateDetail />} />
      <Route path="/edit/:id" element={<CrewmateForm />} />
    </Routes>
  )
}