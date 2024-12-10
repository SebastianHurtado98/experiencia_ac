import { useState } from 'react';
import { Consultant } from '../types';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface EditProfileProps {
  consultant: Consultant;
  onSave: (updatedProfile: Partial<Consultant>) => void;
}

export default function EditProfile({ consultant, onSave }: EditProfileProps) {
  const [profile, setProfile] = useState({
    name: consultant.name,
    email: consultant.email,
    phone: consultant.phone,
    cv: consultant.cv,
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          value={profile.name}
          onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={profile.email}
          onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Teléfono</Label>
        <Input
          id="phone"
          value={profile.phone}
          onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cv">CV</Label>
        <Textarea
          id="cv"
          value={profile.cv}
          onChange={(e) => setProfile((prev) => ({ ...prev, cv: e.target.value }))}
        />
      </div>
      <div className="flex justify-end">
        <Button onClick={() => onSave(profile)}>Guardar Perfil</Button>
      </div>
    </div>
  );
}
