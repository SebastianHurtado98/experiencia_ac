// @ts-nocheck
import { useState } from 'react';
import { Consultant, Theme } from '../types';
import ConsultantView from './ConsultantView';
import ConsultantEdit from './ConsultantEdit';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ConsultantDetailsProps {
  consultant: Consultant;
  themes: Theme[];
  onUpdateConsultant: (updatedConsultant: Consultant) => void;
}

export default function ConsultantDetails({ consultant, themes, onUpdateConsultant }: ConsultantDetailsProps) {
  const [editMode, setEditMode] = useState(false);

  const handleUpdate = (updatedConsultant: Consultant) => {
    onUpdateConsultant(updatedConsultant);
    setEditMode(false); // Salir del modo edición
  };
  
  const doneEditing = () => {
    setEditMode(false);
  }

  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>{consultant.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {editMode ? (
          <ConsultantEdit
            consultant={consultant}
            themes={themes}
            onSave={handleUpdate}
            onCancel={() => setEditMode(false)}
            doneEditing={doneEditing}
          />
        ) : (
          <ConsultantView
            consultant={consultant}
            onEdit={() => setEditMode(true)}
          />
        )}
      </CardContent>
    </Card>
  );
}
