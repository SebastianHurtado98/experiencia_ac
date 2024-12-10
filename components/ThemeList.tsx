import { useState } from 'react';
import { Theme } from '../types';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface ThemeListProps {
  themes: Theme[];
  onSelectTheme: (themeId: string) => void;
}

export default function ThemeList({ themes, onSelectTheme }: ThemeListProps) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredThemes = themes.filter((theme) =>
    theme.name.toLowerCase().includes(search.toLowerCase())
  );

  const pageCount = Math.ceil(filteredThemes.length / itemsPerPage);
  const paginatedThemes = filteredThemes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Buscar temas..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full"
      />
      <ul className="space-y-2">
        {paginatedThemes.map((theme) => (
          <li key={theme.themeId}>
            <Button
              onClick={() => onSelectTheme(theme.themeId)}
              variant="outline"
              className="w-full justify-start"
            >
              {theme.name}
              
            </Button>
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

