'use client'

import { useState, useEffect } from 'react';
import ThemeList from '../components/ThemeList';
import ConsultantList from '../components/ConsultantList';
import ConsultantDetails from '../components/ConsultantDetails';
import { consultants } from '../data';
import { Consultant } from '../types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getConsultants, getThemes, updateConsultant } from '@/lib/api';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'themes' | 'consultants'>('themes');
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedConsultant, setSelectedConsultant] = useState<string | null>(null);
  const [consultantData, setConsultantData] = useState([]);

  const [themeList, setThemeList] = useState([])

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

    updateConsultant(updatedConsultant)

    setConsultantData((prev) =>
      prev.map((consultant) => (consultant.consultantId === updatedConsultant.consultantId ? updatedConsultant : consultant))
    );
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
            </div>
            {selectedConsultant && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Detalles del Especialista</h2>
                <ConsultantDetails
                  consultant={consultantData.find((c) => c.consultantId === selectedConsultant)!}
                  themes={themeList}
                  onUpdateConsultant={handleUpdateConsultant}
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
          />
        </div>
      )}
    </div>
  );
}
