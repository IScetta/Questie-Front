import axios from "axios";
import { ICourse, ILesson, IModule, IProduct } from "@/app/types";
import { useState, useEffect } from "react";

const useSearch = (API_URL: string) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState<
    (ICourse | IModule | IProduct | ILesson | any)[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const handleSearch = async (searchQuery: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_URL}search/${searchQuery}`);
      const responseArray = res.data;

      console.log(responseArray);

      setFilteredResults(responseArray);
    } catch (err) {
      setError("Error al obtener resultados de búsqueda");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      if (timer) {
        clearTimeout(timer);
      }
      const newTimer = setTimeout(() => {
        handleSearch(searchQuery);
      }, 1000);
      setTimer(newTimer);
    } else {
      setFilteredResults([]);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [searchQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (timer) {
        clearTimeout(timer);
      }
      handleSearch(searchQuery);
    }
  };

  return {
    searchQuery,
    filteredResults,
    loading,
    error,
    handleChange,
    handleKeyPress,
    handleSearch,
  };
};

export default useSearch;
