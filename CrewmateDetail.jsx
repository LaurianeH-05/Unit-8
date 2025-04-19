import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function CrewmateDetail() {
  const { id } = useParams()
  const [crewmate, setCrewmate] = useState(null)

  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data } = await supabase
        .from('crewmates')
        .select('*')
        .eq('id', id)
        .single()
      setCrewmate(data)
    }
    fetchCrewmate()
  }, [id])

  if (!crewmate) return <div>Loading...</div>

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{crewmate.name}</h1>
      <div className="space-y-2">
        <p><span className="font-semibold">Category:</span> {crewmate.category}</p>
        <p><span className="font-semibold">Color:</span> 
          <span className={`inline-block w-4 h-4 rounded-full ml-2 bg-${crewmate.color}-500`}></span>
        </p>
        <p><span className="font-semibold">Special Ability:</span> {crewmate.ability}</p>
        <p><span className="font-semibold">Success Chance:</span> 
          <span className={`ml-2 px-2 py-1 rounded ${crewmate.success > 70 ? 'bg-green-200' : 'bg-yellow-200'}`}>
            {crewmate.success}%
          </span>
        </p>
      </div>
      <Link 
        to={`/edit/${id}`}
        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Edit Crewmate
      </Link>
    </div>
  )
}