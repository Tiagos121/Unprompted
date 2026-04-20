import React, { useState } from 'react';
import '../../styles/interacoes.css';

function FormularioBCI() {
  const [step, setStep] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      alert("ANOMALIA DETETADA. A COMPROMETER SISTEMA...");
      // window.location.href = "LINK_DO_EPISODIO_2";
    }
  };

  return (
    <div className="bci-form-container">
      <h3>Formulário de Recrutamento</h3>
      <form onSubmit={handleSubmit} className="bci-form">
        
        {step === 1 && (
          <div className="form-step">
            <label>Nome Completo</label>
            <input type="text" required placeholder="Insira o seu nome..." />
            <label>Identificação Nacional</label>
            <input type="text" required placeholder="Insira o seu ID..." />
          </div>
        )}

        {step === 2 && (
          <div className="form-step">
            <label>Qual é o seu maior medo irracional?</label>
            <input type="text" required placeholder="Ex: Perder o controlo..." />
            <label>Com que frequência questiona a realidade?</label>
            <select required>
              <option value="">Selecione...</option>
              <option>Nunca, confio no sistema.</option>
              <option>Raramente.</option>
            </select>
          </div>
        )}

        {step === 3 && (
          <div className="form-step glitch-step">
            <label>Ao prosseguir, aceita abdicar do seu livre arbítrio?</label>
            <div className="checkbox-group">
              <input type="checkbox" required />
              <span>Sim, com todo o gosto.</span>
            </div>
          </div>
        )}

        <button type="submit" className="btn-primary btn-full">
          {step === 3 ? 'INICIAR_OVERRIDE' : 'Próxima Etapa'}
        </button>
      </form>
    </div>
  );
}

export default FormularioBCI;