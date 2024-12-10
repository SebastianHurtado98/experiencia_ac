// @ts-nocheck

import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import supabase from '@/lib/supabase';
import { X } from 'lucide-react';

interface EditThemesProps {
  consultantId: number;
  doneEditing: () => void;
}

export default function EditThemes({ consultantId, doneEditing }: EditThemesProps) {
  const [themes, setThemes] = useState([]);
  const [oldThemes, setOldThemes] = useState([]);
  const [newThemes, setNewThemes] = useState([]);
  const [themeSearch, setThemeSearch] = useState('');

  useEffect(() => {
    console.log('Consultant ID:', consultantId); // Log para verificar el valor
    fetchThemes();
    fetchConsultantThemes();
  }, []);

  // Obtener todos los temas disponibles
  const fetchThemes = async () => {
    const { data, error } = await supabase.from('theme').select('*');
    if (error) console.error('Error fetching themes:', error);
    else setThemes(data);
  };

  // Obtener los temas del consultor
  const fetchConsultantThemes = async () => {
    const { data, error } = await supabase
      .from('consultantTheme')
      .select('*')
      .eq('consultantId', consultantId);

    if (error) console.error('Error fetching consultant themes:', error);
    else setOldThemes(data.map((theme) => ({ ...theme, action: 'edit' })));
  };

  // Actualizar nivel de un tema existente
  const handleUpdateOldTheme = (themeId, level) => {
    setOldThemes((prev) =>
      prev.map((theme) =>
        theme.themeId === themeId ? { ...theme, level, action: 'edit' } : theme
      )
    );
  };

  // Marcar un tema existente para eliminar
  const handleRemoveOldTheme = (themeId) => {
    setOldThemes((prev) =>
      prev.map((theme) =>
        theme.themeId === themeId ? { ...theme, action: 'delete' } : theme
      )
    );
  };

  // Agregar un nuevo tema
  const handleAddNewTheme = (themeId) => {
    if (!newThemes.some((t) => t.themeId === themeId)) {
      setNewThemes((prev) => [...prev, { themeId, level: 'Básico' }]);
    }
    setThemeSearch('');
  };

  // Actualizar nivel de un nuevo tema
  const handleUpdateNewThemeLevel = (themeId, level) => {
    setNewThemes((prev) =>
      prev.map((t) => (t.themeId === themeId ? { ...t, level } : t))
    );
  };

  // Eliminar un nuevo tema
  const handleRemoveNewTheme = (themeId) => {
    setNewThemes((prev) => prev.filter((t) => t.themeId !== themeId));
  };

  // Temas disponibles para agregar
  const availableThemes = themes.filter(
    (theme) =>
      !oldThemes.some((t) => t.themeId === theme.themeId) &&
      !newThemes.some((t) => t.themeId === theme.themeId) &&
      theme.name.toLowerCase().includes(themeSearch.toLowerCase())
  );

  // Guardar cambios en Supabase
  const saveChanges = async () => {
    // Eliminar temas
    for (const theme of oldThemes.filter((t) => t.action === 'delete')) {
      const { error } = await supabase
        .from('consultantTheme')
        .delete()
        .eq('consultantId', consultantId)
        .eq('themeId', theme.themeId);

      if (error) console.error('Error deleting theme:', error);
    }

    // Actualizar temas existentes
    for (const theme of oldThemes.filter((t) => t.action === 'edit')) {
      const { error } = await supabase
        .from('consultantTheme')
        .update({ level: theme.level })
        .eq('consultantId', consultantId)
        .eq('themeId', theme.themeId);

      if (error) console.error('Error updating theme:', error);
    }

    // Agregar nuevos temas
    for (const theme of newThemes) {
      const { error } = await supabase
        .from('consultantTheme')
        .insert({ consultantId, themeId: theme.themeId, level: theme.level });

      if (error) console.error('Error inserting new theme:', error);
    }

    // Refrescar datos
    fetchConsultantThemes();
    setNewThemes([]);
    doneEditing();
    setTimeout(() => {
        location.reload();
      }, 1000);
  };

  return (
    <div className="space-y-4">
      {/* Old Themes */}
      <div className="space-y-2">
        <Label>Temas Existentes</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {oldThemes
            .filter((theme) => theme.action !== 'delete')
            .map((theme) => (
              <div key={theme.themeId} className="flex items-center space-x-2">
                <Select
                  value={theme.level}
                  onValueChange={(value) =>
                    handleUpdateOldTheme(theme.themeId, value)
                  }
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Básico">Básico</SelectItem>
                    <SelectItem value="Especialista">Especialista</SelectItem>
                  </SelectContent>
                </Select>
                <span>{themes.find((t) => t.themeId === theme.themeId)?.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveOldTheme(theme.themeId)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Eliminar tema</span>
                </Button>
              </div>
            ))}
        </div>
      </div>

      {/* New Themes */}
      <div className="space-y-2">
        <Label>Nuevos Temas</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {newThemes.map((theme) => (
            <div key={theme.themeId} className="flex items-center space-x-2">
              <Select
                value={theme.level}
                onValueChange={(value) =>
                  handleUpdateNewThemeLevel(theme.themeId, value)
                }
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Básico">Básico</SelectItem>
                  <SelectItem value="Especialista">Especialista</SelectItem>
                </SelectContent>
              </Select>
              <span>{themes.find((t) => t.themeId === theme.themeId)?.name}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveNewTheme(theme.themeId)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Eliminar tema</span>
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Add Theme */}
      <div className="space-y-2">
        <Label htmlFor="add-theme">Agregar Tema</Label>
        <div className="flex space-x-2">
          <Input
            id="add-theme"
            type="text"
            placeholder="Buscar temas..."
            value={themeSearch}
            onChange={(e) => setThemeSearch(e.target.value)}
            className="flex-grow"
          />
        </div>
        {themeSearch && (
          <ul className="mt-2 border rounded-md divide-y dark:divide-gray-700">
            {availableThemes.map((theme) => (
              <li key={theme.themeId} className="p-2 hover:bg-accent">
                <Button
                  variant="ghost"
                  className="w-full text-left"
                  onClick={() => handleAddNewTheme(theme.themeId)}
                >
                  {theme.name}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={saveChanges}>Guardar Cambios</Button>
      </div>
    </div>
  );
}
