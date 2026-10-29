
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [busca, setBusca] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    axios.get('https://6ae3c780933120ae20f92bc6.mockapi.io/filmes')
      .then(res => {
        setFilmes(res.data);
        setCarregando(false);
      })
      .catch(err => {
        console.log(err);
        setErro('Erro ao carregar os filmes.');
        setCarregando(false);
      });
  }, []);

  const filmesFiltrados = filmes.filter(filme =>
    filme.nome?.toLowerCase().includes(busca.toLowerCase()) ||
    filme.genero?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="cinema-page">
      <header className="cinema-header">
        <div className="container d-flex justify-content-between align-items-center">
          <Link to="/" className="cinema-logo">
            🎬 Catálogo <span>de Filmes</span>
          </Link>

          <Link to="/create" className="btn btn-cinema">
            + Novo Filme
          </Link>
        </div>
      </header>

      <main className="container cinema-content">
        <div className="mb-4">
          <h1>Catálogo de Filmes</h1>
          <p className="cinema-subtitle">
            Gerencie sua coleção de filmes em um só lugar.
          </p>
        </div>

        <div className="cinema-card">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
            <h3 className="m-0">Minha Coleção</h3>

            <input
              type="text"
              className="form-control cinema-search"
              placeholder="Buscar filme ou gênero..."
              value={busca}
              onChange={e => setBusca(e.target.value)}
            />
          </div>

          {erro && (
            <div className="alert alert-danger">{erro}</div>
          )}

          {carregando ? (
            <p>Carregando filmes...</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-dark table-striped cinema-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Gênero</th>
                    <th>Ano</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {filmesFiltrados.map(filme => (
                    <tr key={filme.id}>
                      <td>{filme.id}</td>
                      <td className="fw-bold">{filme.nome}</td>
                      <td>{filme.genero}</td>
                      <td>{filme.ano}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <Link
                            to={`/read/${filme.id}`}
                            className="btn btn-sm btn-info"
                          >
                            Ver
                          </Link>

                          <Link
                            to={`/update/${filme.id}`}
                            className="btn btn-sm btn-warning"
                          >
                            Editar
                          </Link>

                          <Link
                            to={`/delete/${filme.id}`}
                            className="btn btn-sm btn-danger"
                          >
                            Excluir
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filmesFiltrados.length === 0 && (
                <p className="text-center text-secondary mt-4">
                  Nenhum filme encontrado.
                </p>
              )}
            </div>
          )}

          <div className="cinema-footer">
            Total de filmes: {filmes.length}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
