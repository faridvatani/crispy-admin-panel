import React, { useState } from "react";
import { Input } from "@/components/ui/input/input";
import { Button } from "@/components/ui/button/button";
import { X } from "lucide-react";

interface SearchFormProps {
  placeholder: string;
  onSearch: (searchTerm: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ placeholder, onSearch }) => {
  const [currentSearch, setCurrentSearch] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSearch(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(currentSearch);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleResetClick = () => {
    setCurrentSearch("");
    onSearch("");
  };

  return (
    <div className="flex items-center w-max gap-3">
      <Input
        value={currentSearch}
        placeholder={placeholder}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        className="w-72"
      />
      {currentSearch && (
        <Button type="button" variant={"secondary"}>
          <X
            onClick={handleResetClick}
            className="cursor-pointer text-gray-500"
            size={24}
          />
        </Button>
      )}
      <Button onClick={handleSearchClick}>Search</Button>
    </div>
  );
};

export default SearchForm;
