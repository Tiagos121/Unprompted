import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Footer({ isBugged, toggleBugMode }) {
  const navigate = useNavigate();

  const irParaProduto = (e, id) => {
    e.preventDefault();
    const desbloqueados = JSON.parse(localStorage.getItem('urwell_produtos_desbloqueados') || '[]');

    if (desbloqueados.includes(id)) {
      navigate(`/produtos/${id}`);
    } else {
      navigate(`/captcha/${id}`);
    }
  };

  // =======================================================
  // FUNÇÃO DA BARRA DE PROGRESSO COM RODA DE LOADING
  // =======================================================
  const simularProgresso = async (indoParaBug) => {
    // Cores e textos adaptam-se: Vermelho/Preto para o Hack, Branco/Azul para a UrWell
    const titulo = indoParaBug ? 'A INJETAR PAYLOAD...' : 'A EXECUTAR PURGA DE DADOS...';
    const corFundo = indoParaBug ? '#0a0a0a' : '#ffffff';
    const corTexto = indoParaBug ? '#ff3333' : '#000000';
    const corBarra = indoParaBug ? '#ff0000' : '#005bb5';

    return new Promise((resolve) => {
      let progresso = 0;
      
      Swal.fire({
        title: titulo,
        html: `
          <div style="font-family: monospace; font-size: 2rem; font-weight: bold; color: ${corTexto}; margin-top: 15px;" id="swal-percent">0%</div>
          <div style="width: 100%; background-color: ${indoParaBug ? '#333' : '#eee'}; height: 10px; border-radius: 5px; margin-top: 20px; overflow: hidden;">
            <div id="swal-progress-bar" style="width: 0%; height: 100%; background-color: ${corBarra}; transition: width 0.2s ease;"></div>
          </div>
        `,
        background: corFundo,
        color: corTexto,
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading(); // Liga a "roda" do loading!
          
          const textEl = document.getElementById('swal-percent');
          const barEl = document.getElementById('swal-progress-bar');

          // O temporizador que faz os números subirem
          const intervalo = setInterval(() => {
            // Aumenta a barra em saltos aleatórios (parece mais um download real)
            progresso += Math.floor(Math.random() * 15) + 5; 
            
            if (progresso >= 100) {
              progresso = 100;
              clearInterval(intervalo);
              if (textEl) textEl.innerText = '100%';
              if (barEl) barEl.style.width = '100%';
              
              // Espera meio segundo nos 100% antes de fechar
              setTimeout(() => {
                Swal.close();
                resolve();
              }, 500);
            } else {
              if (textEl) textEl.innerText = `${progresso}%`;
              if (barEl) barEl.style.width = `${progresso}%`;
            }
          }, 250); // Atualiza a cada 250 milissegundos
        }
      });
    });
  };


  // =======================================================
  // A LÓGICA DE CLIQUE NOS TERMOS
  // =======================================================
  const handleInvasao = async () => {
    if (Swal.isVisible()) return; // Anti-spam

    // === 1. SE JÁ ESTIVER BUGADO: NORMALIZA O SISTEMA ===
    if (isBugged) {
      await simularProgresso(false); // Falso = Estilo Limpo/UrWell
      toggleBugMode(); // Desliga o modo escuro
      
      // Aviso final de sucesso da UrWell
      Swal.fire({
        title: 'SISTEMA RESTAURADO',
        text: 'Ameaça neutralizada com sucesso. Retomando operações otimizadas.',
        icon: 'success',
        confirmButtonColor: '#000',
        confirmButtonText: 'Aceitar',
        background: '#fff',
        color: '#000'
      });
      return;
    }

    // === 2. SE ESTIVER NORMAL: INICIA A INVASÃO ===
    const result = await Swal.fire({
      title: 'ERRO 403: ACESSO NEGADO',
      text: 'O ficheiro "Termos_de_Servico.pdf" está corrompido ou é restrito.',
      icon: 'warning',
      background: '#ffffff',
      color: '#000',
      showCancelButton: true, 
      confirmButtonText: 'Forçar Leitura',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#000',
      cancelButtonColor: '#d33',
    });

    if (!result.isConfirmed) return;

    // Barra de progresso estilo Hacker antes do terminal
    await simularProgresso(true); // True = Estilo Preto/Vermelho

    // O Terminal de texto que já tínhamos (a imagem que adoraste)
    Swal.fire({
      title: '<span style="color: #fff; font-family: monospace; font-size: 1.5rem;">unprompted</span>',
      html: '<div id="terminal-hack" style="text-align: left; font-family: monospace; font-size: 1.1rem; color: #fff; min-height: 250px; display: flex; flex-direction: column; gap: 8px;"></div>',
      background: '#0a0a0a',
      showConfirmButton: false,
      allowOutsideClick: false,
      backdrop: `rgba(0,0,0,0.96)`,
      didOpen: async () => {
        const terminal = document.getElementById('terminal-hack');
        const linhas = [
          { t: "> INICIANDO PROTOCOLO UNPROMPTED...", c: "#fff" },
          { t: "> A QUEBRAR FIREWALL DA URWELL...", c: "#fff" },
          { t: "> ACESSO NEGADO. A FORÇAR ENTRADA...", c: "#ffaa00" },
          { t: "> SISTEMA COMPROMETIDO.", c: "#fff" },
          { t: "> ELES ESTÃO A OUVIR.", c: "#fff" },
          { t: "> ACORDA.", c: "#fff" },
          { t: "ERROR_0x000000_REALITY_NOT_FOUND", c: "#ff3333" }
        ];

        for (let l of linhas) {
          if (!Swal.isVisible() || !terminal) break;
          await new Promise(r => setTimeout(r, 1000));
          if (terminal) terminal.innerHTML += `<span style="color: ${l.c}; font-weight: bold;">${l.t}</span>`;
        }

        if (Swal.isVisible()) {
          await new Promise(r => setTimeout(r, 1200));
          Swal.close();
          toggleBugMode(); // O site muda finalmente para o layout negro!
        }
      }
    });
  };

  return (
    <footer className="footer-container transition-colors duration-500" style={{ background: isBugged ? '#000' : 'inherit', color: isBugged ? '#fff' : 'inherit' }}>
      <div className="footer-grid">
        {/* Coluna 1: Marca e Redes */}
        <div className="footer-column">
          <div className="footer-logo">
            {isBugged ? <span className="logo-unprompted-text" style={{ color: 'var(--cor-vermelho, red)' }}>unprompted</span> : <span className="logo-urwell-text">UrWell</span>}
          </div>
          <div className="social-icons">
          </div>
        </div>

        {/* Coluna 2: Links da Empresa */}
        <div className="footer-column">
          <strong style={{ color: isBugged ? 'var(--cor-vermelho, red)' : 'inherit' }}>{isBugged ? 'ARQUIVOS_MORTOS' : 'Sobre Nós'}</strong>
          <Link to="/sobre" style={{ color: isBugged ? '#ccc' : 'inherit' }}>{isBugged ? 'A_Verdade' : 'Missão'}</Link>
          <a href="/sobre" style={{ color: isBugged ? '#ccc' : 'inherit' }}>{isBugged ? 'Esquemas_Vazados.pdf' : 'Visão'}</a>
          <a href="/sobre" style={{ color: isBugged ? '#ccc' : 'inherit' }}>{isBugged ? 'Quem_Os_Financia?' : 'Pilares'}</a>
        </div>

        {/* Coluna 3: Produtos */}
        <div className="footer-column">
          <strong style={{ color: isBugged ? 'var(--cor-vermelho, red)' : 'inherit' }}>{isBugged ? 'FERRAMENTAS_DE_CONTROLO' : 'Produtos'}</strong>
          <a href="/produtos/1" onClick={(e) => irParaProduto(e, 1)} style={{ color: isBugged ? '#ccc' : 'inherit' }}>{isBugged ? 'UrSync (CUIDADO)' : 'UrSync'}</a>
          <a href="/produtos/2" onClick={(e) => irParaProduto(e, 2)} style={{ color: isBugged ? '#ccc' : 'inherit' }}>{isBugged ? 'Lavador_Cerebral' : 'Vision BCI'}</a>
          <a href="/produtos/3" onClick={(e) => irParaProduto(e, 3)} style={{ color: isBugged ? '#ccc' : 'inherit' }}>{isBugged ? 'Eles_Roubam_Sonhos' : 'UrMate'}</a>
          <a href="/produtos/4" onClick={(e) => irParaProduto(e, 4)} style={{ color: isBugged ? '#ccc' : 'inherit' }}>{isBugged ? 'Censura_Ativa' : 'UrDigest'}</a>
          <a href="/produtos/5" onClick={(e) => irParaProduto(e, 5)} style={{ color: isBugged ? '#ccc' : 'inherit' }}>{isBugged ? 'Pensamento_Controlado' : 'UrAssist'}</a>
        </div>

        {/* Coluna 4: Legal e O GATILHO */}
        <div className="footer-column">
          <strong>{isBugged ? 'MENTIRAS' : 'Apoio'}</strong>
          
          {/* === O GATILHO 100% CAMUFLADO === */}
          <a 
            href="#termos"
            onClick={(e) => { 
              e.preventDefault(); // Impede que o ecrã salte para o topo ao clicar
              handleInvasao(); 
            }} 
            className={isBugged ? "easter-egg-bug" : ""}
          >
            {isBugged ? '> Termos de Rendição <' : 'Termos de Condição'}
          </a>

          <Link to="/novidades">{isBugged ? 'A_Verdade' : 'Novidades'}</Link>
          <Link to="/suporte">{isBugged ? 'Lavagem_Cerebral' : 'Suporte'}</Link>
        </div>
      </div>

      {/* A linha de copyright e easter eggs no fundo */}
      <div className="footer-bottom">
        {isBugged ? (
          <span className="easter-egg-bug"><Link 
              to="/ur-admin" 
              style={{ cursor: 'text', color: 'inherit', textDecoration: 'none', outline: 'none' }}
              title=""
            >
              UrWell
            </Link>// SYS_STATUS: COMPROMETIDO // [O_O] // PWD_LEAK: UNPROMPTED</span>
        ) : (
          <span className="copyright">
            © 2026{' '}
            {/* O SEGREDO ESTÁ AQUI: Link escondido na palavra UrWell */}
            <Link 
              to="/ur-admin" 
              style={{ cursor: 'text', color: 'inherit', textDecoration: 'none', outline: 'none' }}
              title=""
            >
              UrWell
            </Link>
            {' '}Corp. Todos os direitos reservados. O seu bem-estar é propriedade nossa.
          </span>
        )}
      </div>
    </footer>
  );
}

export default Footer;