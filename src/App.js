
//npm install react-icons
import { FiSearch } from 'react-icons/fi';
import styles from './style.css';
import { useState } from 'react';
import api from './services/api';

function App() {

  const [cep, setCep] = useState('');
  const[cepResponse, setCepResponse] = useState({});

  async function handleSearch(){
    
    if(cep === ''){
      alert('preencha algum CEP');
      return;
    }
    try{
      const response = await api.get(`${cep}/json`);
      setCepResponse(response.data);
      setCep('');
    }catch{
      alert('Erro ao buscar Cep');
    }
  }

  return (
    <div className='container'>
        <h1 className='title'>Buscador de CEP</h1>

        <div className='containerInput'>
          <input 
            type="text"
            placeholder='Digite o CEP'
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          />
          <button className='buttonSearch' onClick={handleSearch}>
            <FiSearch size={25} color="#fff" />
          </button>
        </div>
        {/* verificando se há resposta de busca */}
        {Object.keys(cepResponse).length > 0 && (
          <main className='main'> 
          <h2>CEP: {cepResponse.cep}</h2>
          <span>Logradouro: {cepResponse.logradouro}</span>
          {cepResponse.complemento.length > 0 && ( <span> Complemento: {cepResponse.complemento}</span>)}
          <span>Bairro: {cepResponse.bairro}</span>
          <span>Cidade: {cepResponse.localidade} - {cepResponse.uf}</span>

        </main>
        )}
        

    </div>
  );
}

export default App;
