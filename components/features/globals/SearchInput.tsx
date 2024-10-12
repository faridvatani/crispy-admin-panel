import React, { FC } from "react";
import { Input } from "@/components/ui/input/input";
import { useSearchParams } from "next/navigation";

interface SearchInputProps {
  currentSearch: string;
  setCurrentSearch: (value: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({
  currentSearch,
  setCurrentSearch,
}) => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  return (
    <>
      <Input
        value={currentSearch}
        placeholder="Search by name or email"
        onChange={(e) => setCurrentSearch(e.target.value)}
      />
      {searchQuery && (
        <div className="text-sm text-gray-500">
          Search results for: <strong>{searchQuery}</strong>
        </div>
      )}
    </>
  );
};

export default SearchInput;
