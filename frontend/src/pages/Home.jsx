import { useState, useEffect } from 'react';
import { api } from '../services/api'; 
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Section from "../components/Section";
import Footer from "../components/Footer";

import '../global.css';

export default function Home() {
    const [secoes, setSecoes] = useState([]);
    const [bannerUrl, setBannerUrl] = useState(''); // Novo estado para o banner
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Usamos Promise.all para buscar os dois dados em paralelo
                const [resSecoes, resBanner] = await Promise.all([
                    api.get('/api/secoes'),
                    api.get('/api/banners/ativo') // Busca o banner ativo
                ]);
                
                setSecoes(resSecoes.data);
                // Monta a URL completa para a imagem do banner
                setBannerUrl(`http://localhost:8080${resBanner.data.imagem}`);

            } catch (error) {
                console.error("Erro ao buscar dados da home:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro: {error}</div>;
    }

    return (
        <>
            <Navbar />
            <Banner imagemUrl={bannerUrl} /> 
            
            {secoes.map(secao => (
                <Section
                    key={secao.id}
                    titulo={secao.titulo} 
                    imagem={secao.imagem}
                    texto={secao.texto}
                />
            ))}
            <Footer />
        </>
    )
}

