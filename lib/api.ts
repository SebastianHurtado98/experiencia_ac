import supabase from './supabase'
import { Theme, Consultant, ConsultantTheme } from '../types'

export async function getThemes(): Promise<Theme[]> {
  const { data, error } = await supabase
    .from('theme')
    .select('*')
  
  if (error) throw error
  return data
}

export async function getConsultants(): Promise<Consultant[]> {
  const { data, error } = await supabase
    .from('consultant')
    .select('*, consultantTheme(*, theme(*))')
  
  if (error) throw error
  return data
}

export async function insertConsultant(consultant: Consultant): Promise<Consultant[]> {
  const { data, error } = await supabase
    .from('consultant')
    .insert({ 
      name: consultant.name,
      phone: consultant.phone,
      email: consultant.email,
      cv: consultant.cv
    })
    .select('*, consultantTheme(*, theme(*))')
    
  
  if (error) throw error    
  return data
}

export async function updateConsultant(consultant: Consultant): Promise<void> {
  const { error } = await supabase
    .from('consultant')
    .update({ 
      name: consultant.name,
      phone: consultant.phone,
      email: consultant.email,
      cv: consultant.cv
    })
    .eq('consultantId', consultant.consultantId)
  
  if (error) throw error
}

export async function updateConsultantThemes(consultantId: number, themes: ConsultantTheme[]): Promise<void> {

  themes = themes.map(theme => ({
    ...theme,
    consultantId: consultantId,
  }));  

  const { error: deleteError } = await supabase
    .from('consultantTheme')
    .delete()
    .eq('consultantId', consultantId)

  if (deleteError) throw deleteError

  const { error: insertError } = await supabase
    .from('consultantTheme')
    .insert(themes)

  if (insertError) throw insertError
}

export async function deleteConsultant(consultantId: number): Promise<void> {
  const { error } = await supabase
    .from('consultant')
    .delete()
    .eq('consultantId', consultantId)

  
  if (error) throw error
}