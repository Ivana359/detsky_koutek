import './style.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const CentersDetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/centers/${id}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            setDetail(result.data);
        } catch (error) {
            console.error('Chyba při načítání detailů pobočky:', error);
        }
    };

    fetchDetail();
  }, [id]);

  return (
    <>
    {!detail ? (
      <div>Načítám pobočky...</div>
    ) : (
      <div className="card">
        <h2 className="card--title">{detail.name}</h2>
        <p className="card--address">{detail.address}</p>
        <p className="card--capacity">Kapacita: {detail.capacity}</p>
        <h3>Otevřeno</h3>
          <ul className="opening--hours">
            <li>Ponděli: {detail.open?.mon || 'Zavřeno'}</li>
            <li>Útery: {detail.open?.tue || 'Zavřeno'}</li>
            <li>Středa: {detail.open?.wed || 'Zavřeno'}</li>
            <li>Čtvrtek: {detail.open?.thu || 'Zavřeno'}</li>
            <li>Pátek: {detail.open?.fri || 'Zavřeno'}</li>
            <li>Sobota: {detail.open?.sat || 'Zavřeno'}</li>
            <li>Neděle: {detail.open?.sun || 'Zavřeno'}</li>
          </ul>
        <h3>O pobočce:</h3>
        <p className="card--info">{detail.info}</p>
      </div>
    )}</>
  )
}