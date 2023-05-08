import { useState, useContext } from 'react';
import { OpenAIContext } from '../../contexts/openai';


function Chatbot() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const {chat} = useContext(OpenAIContext)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await chat(input);
    setOutput(response);
  }



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          style={{ height: '50px', width: '1000px' }}
        />
        <button type="submit">Enviar</button>
      </form>
      <textarea
        value={output}
        readOnly={true}
        style={{ height: '800px', width: '1000px' }}
      />
    </div>
  );
}

export default Chatbot;
