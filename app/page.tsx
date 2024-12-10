// @ts-nocheck

'use client'

import { useState, useEffect } from 'react';
import ThemeList from '../components/ThemeList';
import ConsultantList from '../components/ConsultantList';
import ConsultantDetails from '../components/ConsultantDetails';
import { Consultant } from '../types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getConsultants, getThemes, insertConsultant, updateConsultant } from '@/lib/api';
import { Button } from "@/components/ui/button"

export default function Home() {
  const [activeTab, setActiveTab] = useState<'themes' | 'consultants'>('themes');
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedConsultant, setSelectedConsultant] = useState<string | null>(null);
  const [consultantData, setConsultantData] = useState([]);

  const [themeList, setThemeList] = useState([])

  let iniEditMode = false;

  useEffect(() => {
    fetchThemes()
    fetchConsultants()
    }, []);

  const fetchThemes = async () => {
    const data = await getThemes();    
    setThemeList(data)    
  }
  const fetchConsultants = async () => {
    const data = await getConsultants();        
    setConsultantData(data)    
  }


  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    setSelectedConsultant(null);
  };

  const handleConsultantSelect = (consultantId: string) => {
    setSelectedConsultant(consultantId);
  };

  const handleUpdateConsultant = (updatedConsultant: Consultant) => {

    console.log(updatedConsultant)

    updateConsultant(updatedConsultant)

    setTimeout(() => {
      location.reload();
    }, 1000);
  };

  const handleCreateConsultant = async () => {
    const newConsultant: Consultant = {
      consultantId: Date.now().toString(),
      name: "Nuevo Especialista",
      cv: "",
      email: "",
      phone: "",
      consultantTheme: []
    };

    const createdConsultant = await insertConsultant(newConsultant)
    
    iniEditMode = true;
    //console.log(0, iniEditMode)

    setConsultantData((prev) => [...prev, createdConsultant[0]]);
    setSelectedConsultant(createdConsultant[0].consultantId);
  };

  const filteredConsultants = selectedTheme
    ? consultantData.filter((consultant) => consultant.consultantTheme.some(theme => theme.themeId === selectedTheme))
    : consultantData;

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'themes' | 'consultants')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="themes">Temas</TabsTrigger>
          <TabsTrigger value="consultants">Especialistas</TabsTrigger>
        </TabsList>
        <TabsContent value="themes" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Lista de Temas</h2>
              <ThemeList themes={themeList} onSelectTheme={handleThemeSelect} />
            </div>
            {selectedTheme && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Especialistas</h2>
                <ConsultantList consultants={filteredConsultants} onSelectConsultant={handleConsultantSelect} />
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="consultants" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Lista de Especialistas</h2>
              <ConsultantList consultants={consultantData} onSelectConsultant={handleConsultantSelect}  />
              <Button onClick={handleCreateConsultant} className="mt-4">Crear Nuevo Especialista</Button>
            </div>
            {selectedConsultant && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Detalles del Especialista</h2>
                <ConsultantDetails
                  consultant={consultantData.find((c) => c.consultantId === selectedConsultant)!}
                  themes={themeList}
                  onUpdateConsultant={handleUpdateConsultant}
                  iniEditMode={iniEditMode}
                />
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      {selectedConsultant && activeTab === 'themes' && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Detalles del Especialista</h2>
          <ConsultantDetails
            consultant={consultantData.find((c) => c.consultantId === selectedConsultant)!}
            themes={themeList}
            onUpdateConsultant={handleUpdateConsultant}
            iniEditMode={false}
          />
        </div>
      )}
    </div>
  );
}

