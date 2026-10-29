
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Create() {
  const [values, setValues] = useState({
    nome: '',
    genero: '',
    ano: ''
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post(
      'https://6ae3c780933120ae20f92bc6.mockapi.io/filmes',
      values
    )
    .then(res => {
      console.log(res);
      alert('Filme cadastrado com sucesso!');
      navigate('/');
    })
    .catch(err => {
      console.log(err);
      alert('Erro ao cadastrar o filme!');
    });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto"
           style={{ maxWidth: '600px' }}>

        <h2 className="text-center mb-4">
          Cadastrar Filme
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Nome:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Digite o nome do filme"
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
              placeholder="Digite o gênero"
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
              placeholder="Digite o ano"
              value={values.ano}
              onChange={e => setValues({
                ...values,
                ano: e.target.value
              })}
              required
            />
          </div>

          <button type="submit" className="btn btn-success">
            Salvar Filme
          </button>

          <Link to="/" className="btn btn-secondary ms-2">
            Voltar
          </Link>

        </form>
      </div>
    </div>
  );
}

export default Create;
