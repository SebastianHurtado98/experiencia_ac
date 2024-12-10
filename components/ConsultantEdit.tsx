// @ts-nocheck
import { Consultant, Theme } from '../types';
import EditProfile from './EditProfile';
import EditThemes from './EditThemes';
import { Button } from "@/components/ui/button";

interface ConsultantEditProps {
  consultant: Consultant;
  themes: Theme[];
  onSave: (updatedConsultant: Consultant) => void;
  onCancel: () => void;
  setEditMode: (edit: boolean) => void;
}

export default function ConsultantEdit({ consultant, themes, onSave, onCancel, doneEditing }: ConsultantEditProps) {
    console.log('themes', themes); // Log para verificar el valor
  const handleSaveProfile = (updatedProfile: Partial<Consultant>) => {
    onSave({ ...consultant, ...updatedProfile });
  };

  return (
    <div className="space-y-4">
      <EditProfile consultant={consultant} onSave={handleSaveProfile} />
      <EditThemes consultantId={parseInt(consultant.consultantId)} doneEditing={doneEditing} />
      <div className="flex justify-end space-x-2">
        <Button variant="ghost" onClick={onCancel}>Cancelar</Button>
      </div>
    </div>
  );
}
