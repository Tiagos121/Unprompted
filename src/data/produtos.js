// Centralizamos aqui todos os imports de imagens
import ursyncImg from '../assets/ursync.png';
import urBCI from '../assets/vision_bci.png';
import urMate from '../assets/urmate.png';
import urDigest from '../assets/urdigest.png';
import urAssist from '../assets/urassist.png';

export const listaProdutos = [
  { 
    id: 1, 
    nome: 'UrSync', 
    desc: 'Sincronizador de Foco Básico', 
    slogan: 'Foco perfeito e monitorização biométrica.',
    status: 'Disponível', 
    img: ursyncImg 
  },
  { 
    id: 2, 
    nome: 'Vision BCI', 
    desc: 'Interface Cérebro-Computador', 
    slogan: 'A ligação neural definitiva.',
    status: 'Recrutamento Aberto', 
    img: urBCI 
  },
  { 
    id: 3, 
    nome: 'UrMate', 
    desc: 'Supressor de Sonhos', 
    slogan: 'O parceiro digital que nunca te abandona.',
    status: 'Esgotado', 
    img: urMate 
  },
  { 
    id: 4, 
    nome: 'UrDigest', 
    desc: 'Filtro de Informação Subliminar', 
    slogan: 'Mastigamos a informação por ti.',
    status: 'Disponível', 
    img: urDigest 
  },
  { 
    id: 5, 
    nome: 'UrAssist', 
    desc: 'Delegação de Pensamento Crítico', 
    slogan: 'Liberte a sua mente de decisões banais.',
    status: 'Em Breve', 
    img: urAssist 
  }
];