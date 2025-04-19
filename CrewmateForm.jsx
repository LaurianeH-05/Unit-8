import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

const ATTRIBUTES_BY_CATEGORY = {
  pirate: ['Cutlass Mastery', 'Navigation', 'Treasure Hunting'],
  astronaut: ['Zero-G Adapt', 'Laser Precision', 'System Repair'],
  knight: ['Swordsmanship', 'Horse Riding', 'Strategy']
}

const COLOR_OPTIONS = [
  { value: 'red', label: 'Red', bg: 'bg-red-500' },
  { value: 'blue', label: 'Blue', bg: 'bg-blue-500' },
  { value: 'green', label: 'Green', bg: 'bg-green-500' },
  { value: 'purple', label: 'Purple', bg: 'bg-purple-500' } ]

export default function CrewmateForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    category: 'pirate',
    color: 'red',
    ability: ATTRIBUTES_BY_CATEGORY.pirate[0],
    success: 50
  })

  useEffect(() => {
    if (id) fetchCrewmate()
  }, [id])

  const fetchCrewmate = async () => {
    const { data } = await supabase
      .from('crewmates')
      .select()
      .eq('id', id)
      .single()
    if (data) setFormData(data)
  }

  const calculateSuccess = (category, ability) => {
    const base = { pirate: 40, astronaut: 60, knight: 50 }
    const abilityBoost = {
      pirate: { 'Cutlass Mastery': 30, 'Navigation': 25, 'Treasure Hunting': 20 },
      astronaut: { 'Zero-G Adapt': 40, 'Laser Precision': 35, 'System Repair': 25 },
      knight: { 'Swordsmanship': 35, 'Horse Riding': 30, 'Strategy': 40 }
    }
    return base[category] + abilityBoost[category][ability]
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const finalData = {
      ...formData,
      success: calculateSuccess(formData.category, formData.ability)
    }
    
    if (id) {
      await supabase.from('crewmates').update(finalData).eq('id', id)
    } else {
      await supabase.from('crewmates').insert([finalData])
    }
    navigate('/')
  }

  const handleColorChange = (colorValue) => {
    setFormData(prev => ({
      ...prev,
      color: colorValue
    }))}

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {id ? 'Edit Crewmate' : 'Create New Crewmate'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Crewmate Name
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.category}
              onChange={e => setFormData({
                ...formData, 
                category: e.target.value,
                ability: ATTRIBUTES_BY_CATEGORY[e.target.value][0]
              })}
            >
              {Object.keys(ATTRIBUTES_BY_CATEGORY).map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Fixed Color Selection */}
          
          <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Crewmate Color
          </label>
          <div className="grid grid-cols-2 gap-3">
            {COLOR_OPTIONS.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => handleColorChange(color.value)}
                className={`p-3 rounded-lg border-2 flex items-center justify-center gap-2 transition-all ${
                  formData.color === color.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200'
                }`}
              >
                <div className={`w-6 h-6 rounded-full ${color.bg}`}></div>
                <span className="text-gray-700">{color.label}</span>
              </button>
            ))}
          </div>
        </div>
        
          {/* Ability Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Ability
            </label>
            <div className="space-y-2">
              {ATTRIBUTES_BY_CATEGORY[formData.category].map(ability => (
                <label 
                  key={ability} 
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="ability"
                    checked={formData.ability === ability}
                    onChange={() => setFormData({...formData, ability})}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-gray-700">{ability}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {id ? 'Update Crewmate' : 'Create Crewmate'}
          </button>
        </form>
      </div>
    </div>
  )
}