import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './style.css';

export const CentersPage = () => {
  const [centers, setCenter] = useState([])

  useEffect(() => {
    const fetchCenter = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/centers');
            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            setCenter(result.data);
        } catch (error) {
            console.error('Chyba při načítání poboček:', error);
        }
    };

    fetchCenter();
  }, []);

  return (
    <div>
    <header>
        <nav className="centers--nav">
            <ul>
                {centers.map((center) => (
                    <li key={center.id}>
                        <Link to={`/pobocky/${center.id}`}>{center.name}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    </header>
    <main>
        <Outlet />
    </main>
</div>
  );
};