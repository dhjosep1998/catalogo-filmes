
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Delete() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = useState(null);
  const [erro, setErro] = useState('');
  const [excluindo, setExcluindo] = useState(false);

  useEffect(() => {
    axios.get(
      `https://6ae3c780933120ae20f92bc6.mockapi.io/filmes/${id}`
    )
    .then(res => setFilme(res.data))
    .catch(err => {
      console.log(err);
      setErro('Erro ao carregar o filme.');
    });
  }, [id]);

  const handleDelete = () => {
    setExcluindo(true);
    setErro('');

    axios.delete(
      `https://6ae3c780933120ae20f92bc6.mockapi.io/filmes/${id}`
    )
    .then(() => {
      alert('Filme excluído com sucesso!');
      navigate('/');
    })
    .catch(err => {
      console.log(err);
      setErro('Erro ao excluir o filme.');
      setExcluindo(false);
    });
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow p-4 mx-auto"
        style={{ maxWidth: '600px' }}
      >
        <h2 className="text-center mb-4">Excluir Filme</h2>

        {erro && (
          <div className="alert alert-danger">{erro}</div>
        )}

        {filme && (
          <>
            <div className="alert alert-warning">
              Tem certeza de que deseja excluir este filme?
            </div>

            <p><strong>ID:</strong> {filme.id}</p>
            <p><strong>Nome:</strong> {filme.nome}</p>
            <p><strong>Gênero:</strong> {filme.genero}</p>
            <p><strong>Ano:</strong> {filme.ano}</p>

            <div className="mt-3">
              <button
                className="btn btn-danger me-2"
                onClick={handleDelete}
                disabled={excluindo}
              >
                {excluindo ? 'Excluindo...' : 'Confirmar Exclusão'}
              </button>

              <Link to="/" className="btn btn-secondary">
                Cancelar
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Delete;
