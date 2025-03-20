import { Category } from "../utils/";
import { useNavigate, useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";

export default function Categories({
  categoriesList,
  setPageCounter,
  setSort,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("");

  // Get the category from URL when component mounts
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryFromURL = searchParams.get("category") || "";
    setSelectedCategory(categoryFromURL);
  }, [location.search]);

  // Handle category change
  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category && category !== "") {
      setSelectedCategory("");
      navigate(`/`);
      setSort(""); // Reset sorting
      setPageCounter(1); // Reset the page counter
    } else {
      setSelectedCategory(category);
      setSort(""); // Reset sorting
      setPageCounter(1); // Reset the page counter
      navigate(`?category=${category}`); // Update the URL
    }
  };

  return (
    <div className="ml-12 flex h-fit min-w-[240px] flex-col gap-4 border-b border-black py-4">
      <h4>Categories</h4>
      <div className="flex flex-col gap-2">
        {categoriesList.map((category: Category) => {
          return (
            <div key={category.slug} className="flex flex-row gap-2">
              <input
                className="custom-checkbox"
                checked={selectedCategory === category.slug}
                type="radio"
                name="category"
                id={category.slug}
                value={category.slug}
                onClick={(event) => {
                  if (selectedCategory === category.slug) {
                    handleCategoryClick(event.target.value); // Unselect
                  }
                }}
                onChange={(event) => {
                  // This will handle state updates when selection changes
                  handleCategoryClick(event.target.value);
                }}
              />
              <label className="container" htmlFor={category.slug}>
                {category.name}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
