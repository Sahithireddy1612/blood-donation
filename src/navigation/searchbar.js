import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormControl, Container, InputGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './searchbar.css';

function SearchBar() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${query}`);
  };
  return (
    <div>
      <div>
        <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={toggleSearchBar} />
      </div>
      {showSearchBar && (
        <div className="search-bar-popup">
          <Container>
            <Form className="d-flex" onSubmit={handleSearch}>
              <InputGroup>
                <FormControl
                  type="search"
                  placeholder="Search by blood group or blood bank"
                  aria-label="Search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button className="search-button" variant="outline-secondary" onClick={handleSearch}>
                  <FontAwesomeIcon icon={faSearch} />
                </Button>
              </InputGroup>
            </Form>
          </Container>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
