import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

// 1. Define Interface (Allow price to be string for form handling)
interface Product {
  id?: number;
  name: string;
  price: number | string; // <--- CHANGED THIS
  category: string;
}

function App() {
  // 2. State (Initialize price as empty string '')
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>({ name: '', price: '', category: '' }); // <--- CHANGED THIS
  const [editingId, setEditingId] = useState<number | null>(null);

  const API_URL = "http://localhost:8080/api/products";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form);
      } else {
        await axios.post(API_URL, form);
      }
      setForm({ name: '', price: '', category: '' }); // Reset to empty
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      alert("Error saving. Is the Backend running?");
    }
  };

  const handleDelete = async (id: number) => {
    if(!confirm("Are you sure?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting", error);
    }
  };

  const handleEdit = (product: Product) => {
    setForm(product);
    setEditingId(product.id || null);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Product Inventory System</h1>

      {/* Form */}
      <div style={{ background: "#f5f5f5", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <h3 style={{ marginTop: 0 }}>{editingId ? "Edit Product" : "Add New Product"}</h3>
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input 
            placeholder="Product Name" 
            value={form.name} 
            onChange={e => setForm({...form, name: e.target.value})} 
            required 
            style={{ padding: "8px", flex: 1 }}
          />
          <input 
            type="number" 
            placeholder="Price" 
            value={form.price} 
            // Allow empty value, otherwise convert to number
            onChange={e => setForm({...form, price: e.target.value === '' ? '' : Number(e.target.value)})} 
            required 
            style={{ padding: "8px", width: "100px" }}
          />
          <input 
            placeholder="Category" 
            value={form.category} 
            onChange={e => setForm({...form, category: e.target.value})} 
            required 
            style={{ padding: "8px", flex: 1 }}
          />
          <button type="submit" style={{ padding: "8px 20px", background: "#28a745", color: "white", border: "none", cursor: "pointer" }}>
            {editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button type="button" onClick={() => {setEditingId(null); setForm({name:'', price:'', category:''})}} style={{ padding: "8px", background: "#6c757d", color: "white", border: "none" }}>
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* List */}
      <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd" }}>
        <thead>
          <tr style={{ background: "#007bff", color: "white" }}>
            <th style={{ padding: "10px", textAlign: "left" }}>ID</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Name</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Price</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Category</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr><td colSpan={5} style={{ padding: "20px", textAlign: "center" }}>No products found. Add one above!</td></tr>
          ) : (
            products.map(p => (
              <tr key={p.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px" }}>{p.id}</td>
                <td style={{ padding: "10px" }}>{p.name}</td>
                <td style={{ padding: "10px" }}>${p.price}</td>
                <td style={{ padding: "10px" }}>{p.category}</td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <button onClick={() => handleEdit(p)} style={{ marginRight: "10px", cursor: "pointer", color: "blue" }}>Edit</button>
                  <button onClick={() => handleDelete(p.id!)} style={{ cursor: "pointer", color: "red" }}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;