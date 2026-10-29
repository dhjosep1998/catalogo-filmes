
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function Read() {
  const [filme, setFilme] = useState({});
  const [erro, setErro] = useState('');

  const { id } = useParams();

  useEffect(() => {
    axios.get(
      `https://6ae3c780933120ae20f92bc6.mockapi.io/filmes/${id}`
    )
    .then(res => setFilme(res.data))
    .catch(err => {
      console.log(err);
      setErro('Não foi possível carregar o filme.');
    });
  }, [id]);

  return (
    <div className="container mt-5">
      <div
        className="card shadow p-4 mx-auto"
        style={{ maxWidth: '600px' }}
      >
        <h2 className="text-center mb-4">
          Detalhes do Filme
        </h2>

        {erro ? (
          <div className="alert alert-danger">{erro}</div>
        ) : (
          <>
            <div className="mb-3">
              <strong>ID:</strong> {filme.id}
            </div>

            <div className="mb-3">
              <strong>Nome:</strong> {filme.nome}
            </div>

            <div className="mb-3">
              <strong>Gênero:</strong> {filme.genero}
            </div>

            <div className="mb-4">
              <strong>Ano:</strong> {filme.ano}
            </div>

            <div>
              <Link
                to={`/update/${id}`}
                className="btn btn-primary me-2"
              >
                Editar
              </Link>

              <Link to="/" className="btn btn-secondary">
                Voltar
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Read;
