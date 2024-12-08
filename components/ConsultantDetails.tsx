import { useState } from 'react';
import { Consultant, Theme, ConsultantTheme } from '../types';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from 'lucide-react'

interface ConsultantDetailsProps {
  consultant: Consultant;
  themes: Theme[];
  onUpdateConsultant: (updatedConsultant: Consultant) => void;
}

export default function ConsultantDetails({ consultant, themes, onUpdateConsultant }: ConsultantDetailsProps) {
  const [editMode, setEditMode] = useState(false);
  const [editedConsultant, setEditedConsultant] = useState(consultant);
  const [themeSearch, setThemeSearch] = useState('');

  const handleSave = () => {
    onUpdateConsultant(editedConsultant);
    setEditMode(false);
  };

  const handleThemeChange = (themeId: string, level: 'basic' | 'specialist' | 'remove') => {
    setEditedConsultant((prev) => {
      if (level === 'remove') {
        return {
          ...prev,
          consultantTheme: prev.consultantTheme.filter((t) => t.themeId !== themeId),
        };
      } else {
        const existingThemeIndex = prev.consultantTheme.findIndex((t) => t.themeId === themeId);
        if (existingThemeIndex !== -1) {
          const updatedThemes = [...prev.consultantTheme];
          updatedThemes[existingThemeIndex] = { ...updatedThemes[existingThemeIndex], level };
          return { ...prev, consultantTheme: updatedThemes };
        } else {
          return { ...prev, consultantTheme: [...prev.consultantTheme, { themeId, level }] };
        }
      }
    });
  };

  const handleAddTheme = (themeId: string) => {
    if (!editedConsultant.consultantTheme.some(t => t.themeId === themeId)) {
      handleThemeChange(themeId, 'basic');
    }
    setThemeSearch('');
  };

  const consultantThemes = consultant.consultantTheme
  

  const availableThemes = themes.filter(theme => 
    !editedConsultant.consultantTheme.some(ct => ct.themeId === theme.themeId) &&
    theme.name.toLowerCase().includes(themeSearch.toLowerCase())
  );

  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>{consultant.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {editMode ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={editedConsultant.name}
                onChange={(e) => setEditedConsultant((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={editedConsultant.email}
                onChange={(e) => setEditedConsultant((prev) => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                value={editedConsultant.phone}
                onChange={(e) => setEditedConsultant((prev) => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cv">CV</Label>
              <Textarea
                id="cv"
                value={editedConsultant.cv}
                onChange={(e) => setEditedConsultant((prev) => ({ ...prev, cv: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Temas del Especialista</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {consultantThemes.map((theme) => (
                  <div key={theme.themeId} className="flex items-center space-x-2">
                    <Select
                      value={theme.level}
                      onValueChange={(value) => handleThemeChange(theme.themeId, value as 'basic' | 'specialist')}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Básico</SelectItem>
                        <SelectItem value="specialist">Especialista</SelectItem>
                      </SelectContent>
                    </Select>
                    <span>{theme.theme.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleThemeChange(theme.themeId, 'remove')}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Eliminar tema</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
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
                        onClick={() => handleAddTheme(theme.themeId)}
                      >
                        {theme.name}
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Button onClick={handleSave}>Guardar</Button>
          </>
        ) : (
          <>
            <div>
              <strong>Email:</strong> {consultant.email}
            </div>
            <div>
              <strong>Teléfono:</strong> {consultant.phone}
            </div>
            <div>
              <strong>CV:</strong>
              <p>{consultant.cv}</p>
            </div>
            <div>
              <strong>Temas:</strong>
              <ul className="list-disc list-inside">
                {consultantThemes.map((theme) => (
                  <li key={theme.themeId}>
                    {theme.theme.name}
                    <Badge variant={theme.level === 'specialist' ? 'default' : 'secondary'} className="ml-2">
                      {theme.level}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
            <Button onClick={() => setEditMode(true)}>Editar</Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

