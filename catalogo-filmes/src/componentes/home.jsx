
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    axios.get('https://6ae3c780933120ae20f92bc6.mockapi.io/filmes')
      .then(res => setFilmes(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Catálogo de Filmes</h1>

      <div className="card shadow p-4">
        <div className="d-flex justify-content-between mb-3">
          <h3>Lista de Filmes</h3>
          <Link to="/create" className="btn btn-success">
            Novo Filme
          </Link>
        </div>

        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Gênero</th>
              <th>Ano</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {filmes.map(filme => (
              <tr key={filme.id}>
                <td>{filme.id}</td>
                <td>{filme.nome}</td>
                <td>{filme.genero}</td>
                <td>{filme.ano}</td>
                <td>
                  <Link to={`/read/${filme.id}`}
                    className="btn btn-info btn-sm me-2">
                    Ver
                  </Link>

                  <Link to={`/update/${filme.id}`}
                    className="btn btn-primary btn-sm me-2">
                    Editar
                  </Link>

                  <Link to={`/delete/${filme.id}`}
                    className="btn btn-danger btn-sm">
                    Excluir
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
