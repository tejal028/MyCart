import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function BookList() {
  const navigate = useNavigate();

  // State variables
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [begin, setBegin] = useState(0);
const [cartCount, setCartCount] = useState(0);

  // Fetch books from backend when component mounts
  useEffect(() => {
    fetchBooks();
  }, []);
useEffect(() => {
  updateCartCount();
}, []);
  // Update filtered books when books or selectedCategory changes
  useEffect(() => {
    filterBooks();
  }, [books, selectedCategory]);

  const updateCartCount = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  setCartCount(count);
};

  // Fetch books from backend API
  const fetchBooks = async () => {
    try {
        debugger
      const response = await fetch("http://localhost:5000/api/books");
      debugger
      if (!response.ok) throw new Error("Failed to fetch books");
      debugger
      const data = await response.json();
debugger
      // Make sure each book has quantity property
      const booksWithQuantity = data.map(book => ({
        ...book,
        quantity: book.quantity || 1,
      }));
debugger
      setBooks(booksWithQuantity);
      setFilteredBooks(booksWithQuantity);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
debugger
  // Filter books by selected category
  const filterBooks = () => {
    let filtered = books.filter(book =>
      !selectedCategory || book.category === selectedCategory
    );
    setFilteredBooks(filtered);
    setBegin(0);
  };
debugger
  // Search books by title or category
  const searchBooks = (query) => {
    setSearchQuery(query);
    let filtered = books.filter(book => {
      const q = query.toLowerCase();
      return (
        book.title.toLowerCase().includes(q) ||
        book.category.toLowerCase().includes(q)
      );
    });
    setFilteredBooks(filtered);
    setBegin(0);
  };

  // Add book to cart in localStorage
  const addToCart = (bookToAdd) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existing = cart.find(item => item._id === bookToAdd._id);
    if (existing) {
      existing.quantity += bookToAdd.quantity;
    } else {
      cart.push({ ...bookToAdd });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Book added to cart!");
      updateCartCount();  // update count immediately after adding

  };

  // Get total cart item count
  const getCartCount = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  };

  // Pagination controls
  const nextPage = () => {
    if (begin + 2 < filteredBooks.length) {
      setBegin(begin + 2);
    }
  };

  const prevPage = () => {
    if (begin >= 2) {
      setBegin(begin - 2);
    }
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  // Get unique categories for dropdown filter
  const categories = [...new Set(books.map(book => book.category))];

  return (
    <div>
      <h1>📚 Online Bookstore</h1>

      <div style={{ marginBottom: 10 }}>
        <button onClick={() => navigate("/cart")}>
          🛒 Cart ({cartCount})
        </button>
        <button onClick={logout} style={{ float: "right" }}>
          Logout
        </button>
      </div>

      <div className="filter-section">
        <div>
          <label>Filter by Category:</label>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            <option value="">All</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Search:</label>
          <input
            type="text"
            placeholder="Search by title or category"
            value={searchQuery}
            onChange={e => searchBooks(e.target.value)}
          />
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Cover</th>
            <th>Book Title</th>
            <th>Category</th>
            <th>Description</th>
            <th>Price (₹)</th>
            <th>Quantity</th>
            <th>Add to Cart</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.slice(begin, begin + 2).map(book => (
            <tr key={book._id}>
              <td>
                <img
                  src={`http://localhost:5000/${book.image}`}
                  alt={book.title}
                  style={{ width: "60px", height: "80px", objectFit: "cover" }}
                />
              </td>
              <td>{book.title}</td>
              <td>{book.category}</td>
              <td>{book.description}</td>
              <td>{book.price}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={book.quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 1;
                    setBooks(books.map(b =>
                      b._id === book._id ? { ...b, quantity: val } : b
                    ));
                  }}
                />
              </td>
              <td>
                <button onClick={() => addToCart(book)}>Add</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={prevPage} disabled={begin === 0}>
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={begin + 2 >= filteredBooks.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}
