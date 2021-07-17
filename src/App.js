import "./App.css";
import SearchInput from "./SearchInput";
import { useEffect, useState } from "react";

const api = "https://mystique-v2-americanas.juno.b2w.io/";

function App() {
  const [text, setText] = useState("");
  const [product, setProduct] = useState([]);
  const [suggestion, setSuggestion] = useState([]);

  function handlesubmite(event) {
    event.preventDefault();
    requisicaoApi();
  }

  async function requisicaoApi() {
    fetch(
      `https://mystique-v2-americanas.juno.b2w.io/autocomplete?content=${text}&source=nanook`
    )
      .then((response) => response.json())
      .then((response) => {
        setProduct(response.products);
        setSuggestion(response.suggestions);
      });
    setText("");
  }

  return (
    <div className="App">
      <div>
        <h1>Busque aqui o seu produto</h1>
        <form onSubmit={handlesubmite}>
          <div>
            <SearchInput value={text} onChange={setText}></SearchInput>
            <input type="submit" />
          </div>
        </form>
      </div>
      <div>
        <div>
          <h4>Produtos</h4>
          {product &&
            product.map((value) => <div key={value.id}>{value.name}</div>)}
        </div>

        <div>
          <h4>Sugestões</h4>
          {suggestion &&
            suggestion.map((value, indice) => (
              <div key={indice}>{value.term}</div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
