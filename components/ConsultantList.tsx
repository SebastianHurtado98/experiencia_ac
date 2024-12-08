import { useState } from 'react';
import { Consultant } from '../types';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { deleteConsultant } from '@/lib/api';

interface ConsultantListProps {
  consultants: Consultant[];
  onSelectConsultant: (consultantId: string) => void;  
}

export default function ConsultantList({ consultants, onSelectConsultant }: ConsultantListProps) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  let filteredConsultants = consultants.filter((consultant) =>
    consultant.name.toLowerCase().includes(search.toLowerCase())
  );

  const pageCount = Math.ceil(filteredConsultants.length / itemsPerPage);
  let paginatedConsultants = filteredConsultants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (consultantId: string) => {
    deleteConsultant(parseInt(consultantId))
    setTimeout(() => {
      location.reload();
    }, 2000);
    
  }
  
  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Buscar Especialistas..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full"
      />
      <ul className="space-y-2">
        {paginatedConsultants.map((consultant) => (
          <li key={consultant.consultantId}>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => onSelectConsultant(consultant.consultantId)}
                variant="outline"
                className="w-full justify-start"
              >
                {consultant.name}
              </Button>              
              <Button
              onClick={() => handleDelete(consultant.consultantId)}
              variant="outline"
              >
                x
              </Button>              
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <span>
          Página {currentPage} de {pageCount}
        </span>
        <Button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
          disabled={currentPage === pageCount}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}

