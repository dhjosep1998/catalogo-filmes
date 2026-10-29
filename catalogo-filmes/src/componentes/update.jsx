
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    nome: '',
    genero: '',
    ano: ''
  });

  const [erro, setErro] = useState('');

  useEffect(() => {
    axios.get(
      `https://6ae3c780933120ae20f92bc6.mockapi.io/filmes/${id}`
    )
    .then(res => setValues(res.data))
    .catch(err => {
      console.log(err);
      setErro('Erro ao carregar os dados do filme.');
    });
  }, [id]);

  const handleUpdate = (event) => {
    event.preventDefault();

    axios.put(
      `https://6ae3c780933120ae20f92bc6.mockapi.io/filmes/${id}`,
      values
    )
    .then(() => {
      alert('Filme atualizado com sucesso!');
      navigate('/');
    })
    .catch(err => {
      console.log(err);
      setErro('Erro ao atualizar o filme.');
    });
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow p-4 mx-auto"
        style={{ maxWidth: '600px' }}
      >
        <h2 className="text-center mb-4">Editar Filme</h2>

        {erro && (
          <div className="alert alert-danger">{erro}</div>
        )}

        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label">Nome:</label>
            <input
              type="text"
              className="form-control"
              value={values.nome}
              onChange={e => setValues({
                ...values,
                nome: e.target.value
              })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Gênero:</label>
            <input
              type="text"
              className="form-control"
              value={values.genero}
              onChange={e => setValues({
                ...values,
                genero: e.target.value
              })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Ano:</label>
            <input
              type="text"
              className="form-control"
              value={values.ano}
              onChange={e => setValues({
                ...values,
                ano: e.target.value
              })}
              required
            />
          </div>

          <button type="submit" className="btn btn-success">
            Salvar Alterações
          </button>

          <Link to="/" className="btn btn-secondary ms-2">
            Voltar
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Update;
