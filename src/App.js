import SearchInput from "./SearchInput";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const api = "https://mystique-v2-americanas.juno.b2w.io/";

function App() {
  const [text, setText] = useState("");
  const [product, setProduct] = useState([]);
  const [suggestion, setSuggestion] = useState([]);
  const [exibir, setExibir] = useState(false);

  function handlesubmite(event) {
    event.preventDefault();
    requisicaoApi();
  }

  async function requisicaoApi() {
    setExibir(true);

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
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Busque aqui o seu produto</h1>
            <form onSubmit={handlesubmite}>
              <div>
                <SearchInput value={text} onChange={setText}></SearchInput>
                <Button className="button" variant="secondary" type="submit">
                  Buscar
                </Button>
              </div>
            </form>
          </div>
        </div>
        {exibir == true ? (
          <div>
            {" "}
            <div className="row produtosList">
              <h5>Produtos</h5>
              {product &&
                product.map((value) => (
                  <Card className="col-12 col-md-4 ProdutoCard" key={value.id}>
                    <Card.Body>
                      <Card.Title>{value.name}</Card.Title>
                      <Card.Text>{value.name} com o melhor preço!!</Card.Text>
                      <a href="#">Saber mais</a>
                    </Card.Body>
                  </Card>
                ))}
            </div>
            <div className="row sugestoes ">
              <h5>Sugestões</h5>
              {suggestion &&
                suggestion.map((value, indice) => (
                  <Card className="col-12 col-md-4 SugestaoCard" key={indice}>
                    <Card.Body>
                      <Card.Title>{value.term}</Card.Title>
                      <Card.Text>{value.term} com o melhor preço!!</Card.Text>
                      <a href="#">Saber mais</a>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default App;
