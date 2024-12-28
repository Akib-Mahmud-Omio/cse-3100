import { useEffect, useState } from 'react';

const availableCats = [
  { name: 'Whiskers', age: '2', breed: 'Sphynx' }, //Cat breed type added
  { name: 'Mittens', age: '2', breed: 'Peterbald' },
  { name: 'Shadow', age: '1', breed: 'Birman' },
  { name: 'Pumpkin', age: '3', breed: 'Abyssinian' },
  { name: 'Luna', age: '4', breed: 'Persian' },
  { name: 'Simba', age: '2', breed: 'Bengal' },
];

export default function AvailableCats() {
  const [cats, setCats] = useState([]);
  const [filteredCats, setFilteredCats] = useState([]);
  const [breedFilter, setBreedFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch cat images from an API endpoint and assign it to the featuredCats list
    const fetchCatImages = async () => {
      try {
        const responses = await Promise.all(availableCats.map(() => fetch('https://api.thecatapi.com/v1/images/search').then((res) => res.json())));
        const catsWithImages = availableCats.map((cat, index) => ({
          ...cat,
          image: responses[index][0].url,
        }));

        setCats(catsWithImages);
        setFilteredCats(catsWithImages);
      } catch (error) {
        console.error('Error fetching cat images:', error);
      }
    };

    fetchCatImages();
  }, []);

  const handleFilterChange = (event) => {
    setBreedFilter(event.target.value);            //Cat breed selection filter added
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);            
  };

  const handleSearch = () => {
    let filtered = cats;
    if (breedFilter) filtered = filtered.filter((cat) => cat.breed === breedFilter);
    if (searchQuery) filtered = filtered.filter((cat) => cat.name.toLowerCase().includes(searchQuery.toLowerCase()));       //Cat search by name or breed added
    setFilteredCats(filtered);
  };

  return (
    <section className="text-center mt-4">
      <h2>Available Cats</h2>
      <p>Meet our adorable cats looking for their forever home!</p>

      <div className="d-flex justify-content-center mb-4">
        <select
          value={breedFilter}
          onChange={handleFilterChange}
          className="form-select mx-2"
          style={{ width: '200px' }}
        >
          <option value="">All Breeds</option>
          {Array.from(new Set(cats.map((cat) => cat.breed))).map((breed, i) => (
            <option key={i} value={breed}>                                            
              {breed}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearchChange}                                                
          className="form-control mx-2"
          style={{ width: '200px' }}
        />
        <button
          onClick={handleSearch}                                         
          className="btn btn-primary mx-2"                             //Search Button added and calling search function
        >
          Search
        </button>
      </div>

      <div className="mt-2 row g-4 cats-container" id="cats-container">
        {filteredCats.map((cat, i) => (
          <div key={i} className="col-md-4">
            <div className="cat-card">
              <img
                src={cat.image}
                alt={cat.name}
                className="img-fluid mb-2"
                style={{ borderRadius: '8px', height: '200px', objectFit: 'cover' }}
              />
              <div className="cat-info">
                <h3 className="h5 mb-1">{cat.name}</h3>
                <p className="mb-0">Age: {cat.age}</p>
                <p className="mb-0">Breed: {cat.breed}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}