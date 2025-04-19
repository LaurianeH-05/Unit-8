import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { Link } from 'react-router-dom'

export default function CrewmateList() {
  const [crewmates, setCrewmates] = useState([])

  useEffect(() => {
    const fetchCrewmates = async () => {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) console.error('Error fetching crewmates:', error)
      if (data) setCrewmates(data)
    }
    fetchCrewmates()
  }, [])

  const deleteCrewmate = async (id) => {
    const { error } = await supabase
      .from('crewmates')
      .delete()
      .eq('id', id)
    
    if (!error) setCrewmates(prev => prev.filter(c => c.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">My Crew</h1>
          <Link 
            to="/create"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            + New Crewmate
          </Link>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Crew Stats</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600">Total Members</p>
              <p className="text-3xl font-bold text-blue-800">{crewmates.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600">Average Success</p>
              <p className="text-3xl font-bold text-green-800">
                {crewmates.length > 0 
                  ? `${Math.round(crewmates.reduce((sum, c) => sum + c.success, 0) / crewmates.length)}%`
                  : '0%'}
              </p>
            </div>
          </div>
        </div>

        {/* Crewmates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {crewmates.map(crewmate => (
            <div 
              key={crewmate.id} 
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{crewmate.name}</h2>
                  <p className="text-sm text-gray-500 capitalize">{crewmate.category}</p>
                </div>
                <span className={`inline-block w-6 h-6 rounded-full ${COLOR_CLASSES[crewmate.color]}`}></span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Special Ability:</span>
                  <span className="font-medium text-blue-600">{crewmate.ability}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Success Rate:</span>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    crewmate.success > 70 ? 'bg-green-100 text-green-800' : 
                    crewmate.success > 40 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {crewmate.success}%
                  </span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Link
                  to={`/crewmate/${crewmate.id}`}
                  className="flex-1 text-center bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition-colors"
                >
                  View
                </Link>
                <Link
                  to={`/edit/${crewmate.id}`}
                  className="flex-1 text-center bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteCrewmate(crewmate.id)}
                  className="flex-1 text-center bg-red-100 text-red-700 px-4 py-2 rounded hover:bg-red-200 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {crewmates.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No crewmates found. Start by adding one!</p>
          </div>
        )}
      </div>
    </div>
  )
}

const COLOR_CLASSES = {
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  purple: 'bg-purple-500'
}