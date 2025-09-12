import { useEffect, useState } from "react";
import styled from "styled-components";
import { api } from "../../services/api"; // Ajuste o caminho para a API

// --- Estilização ---
const ManagementSection = styled.section`
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;

    h2 {
        margin-top: 0;
        border-bottom: 1px solid #eee;
        padding-bottom: 1rem;
        margin-bottom: 1.5rem;
    }
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Input = styled.input`
    padding: 0.8rem;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
`;

const Card = styled.div`
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    
    img {
        width: 100%;
        height: 150px;
        object-fit: cover;
    }

    div {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    span {
        font-weight: bold;
        color: ${props => (props.ativo ? '#28a745' : '#6c757d')};
    }
`;

const Button = styled.button`
    padding: 0.8rem 1.2rem;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

export default function GerirBanners() {
    const [historicoBanners, setHistoricoBanners] = useState([]);
    const [bannerFile, setBannerFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const fetchHistorico = async () => {
        try {
            setLoading(true);
            const response = await api.get('/api/banners/historico');
            setHistoricoBanners(response.data);
            setError('');
        } catch (err) {
            console.error(err);
            setError("Falha ao carregar o histórico de banners.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistorico();
    }, []);

    const handleBannerFileChange = (e) => {
        setBannerFile(e.target.files[0]);
    };

    const handleUploadBanner = async () => {
        if (!bannerFile) {
            setMessage("Por favor, selecione um ficheiro.");
            return;
        }
        setMessage("A enviar imagem do banner...");
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', bannerFile);
            const uploadResponse = await api.post('/api/uploads', formData);
            const filePath = uploadResponse.data.filePath;
            await api.post('/api/banners', { imagem: filePath });
            setMessage("Banner criado com sucesso!");
            setBannerFile(null);
            document.getElementById('banner-upload').value = null;
            fetchHistorico();
        } catch (err) {
            console.error(err);
            setMessage("Erro ao criar o banner.");
        } finally {
            setLoading(false);
        }
    };

    const handleReativarBanner = async (bannerId) => {
        setMessage("A reativar banner...");
        setLoading(true);
        try {
            await api.put(`/api/banners/${bannerId}/reativar`);
            setMessage("Banner reativado com sucesso!");
            fetchHistorico();
        } catch (err) {
            console.error(err);
            setMessage("Erro ao reativar o banner.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Gestão da Página Inicial</h1>
            {message && <p>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <ManagementSection>
                <h2>Gerir Banner Principal</h2>
                <Form>
                    <label htmlFor="banner-upload">Carregar novo banner:</label>
                    <Input id="banner-upload" type="file" onChange={handleBannerFileChange} />
                    <Button onClick={handleUploadBanner} disabled={loading || !bannerFile}>
                        {loading ? 'A Enviar...' : 'Enviar Novo Banner'}
                    </Button>
                </Form>
                <h3 style={{ marginTop: '2rem' }}>Histórico de Banners</h3>
                {loading && !historicoBanners.length ? <p>A carregar histórico...</p> : (
                    <Grid>
                        {historicoBanners.map(banner => (
                            <Card key={banner.id} ativo={banner.ativo}>
                                <img src={`http://localhost:8080${banner.imagem}`} alt={`Banner ${banner.id}`} />
                                <div>
                                    <span>{banner.ativo ? 'ATIVO' : 'INATIVO'}</span>
                                    <p>ID: {banner.id}</p>
                                    {!banner.ativo && (
                                        <Button onClick={() => handleReativarBanner(banner.id)} disabled={loading}>
                                            Reativar
                                        </Button>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </Grid>
                )}
            </ManagementSection>
        </div>
    );
}
