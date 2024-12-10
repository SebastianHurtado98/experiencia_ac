// @ts-nocheck

import { Consultant } from '../types';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ConsultantViewProps {
  consultant: Consultant;
  onEdit: () => void;
}

export default function ConsultantView({ consultant, onEdit }: ConsultantViewProps) {
  return (
    <div className="space-y-4">
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
          {consultant.consultantTheme.map((theme) => (
            <li key={theme.themeId}>
              {theme.theme.name}
              <Badge
                variant={theme.level === 'Especialista' ? 'default' : 'secondary'}
                className="ml-2"
              >
                {theme.level}
              </Badge>
            </li>
          ))}
        </ul>
      </div>
      <Button onClick={onEdit}>Editar</Button>
    </div>
  );
}
