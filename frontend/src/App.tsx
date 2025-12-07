import { useEffect, useState } from 'react';
import './App.css';

interface Gadget {
  id?: number;
  name: string;
  brand: string;
  price: number;
}

function App() {
  const [gadgets, setGadgets] = useState<Gadget[]>([]);
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const API_URL = 'https://legendary-trout-wrj7p574x6462gq6q-8080.app.github.dev/api/gadgets';

  useEffect(() => { fetchGadgets(); }, []);

  const fetchGadgets = async () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setGadgets(data))
      .catch(err => console.error(err));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const gadget = { name, brand, price: parseFloat(price) };
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;

    await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gadget),
    });
    
    setEditingId(null); setName(''); setBrand(''); setPrice('');
    fetchGadgets();
  };

  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchGadgets();
  };

  const handleEdit = (g: Gadget) => {
    setEditingId(g.id!); setName(g.name); setBrand(g.brand); setPrice(g.price.toString());
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: 'auto' }}>
      <h1>🔌 Gadget Inventory</h1>
      
      <form onSubmit={handleSubmit} style={{ background: '#eee', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>{editingId ? 'Edit Item' : 'Add New Item'}</h3>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required style={{ display:'block', margin:'5px 0', width:'95%', padding:'8px'}} />
        <input placeholder="Brand" value={brand} onChange={e => setBrand(e.target.value)} required style={{ display:'block', margin:'5px 0', width:'95%', padding:'8px'}} />
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required style={{ display:'block', margin:'5px 0', width:'95%', padding:'8px'}} />
        <button type="submit" style={{ padding: '10px 20px', background: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}>
          {editingId ? 'Update' : 'Save'}
        </button>
      </form>

      {gadgets.map(g => (
        <div key={g.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0', display: 'flex', justifyContent: 'space-between' }}>
          <div><strong>{g.name}</strong> ({g.brand}) - ${g.price}</div>
          <div>
            <button onClick={() => handleEdit(g)} style={{ marginRight: '5px' }}>Edit</button>
            <button onClick={() => handleDelete(g.id!)} style={{ color: 'red' }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;