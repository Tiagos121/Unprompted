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
    img: ursyncImg,
    preco: '999,00€',
    features: [
      { titulo: 'Otimização', desc: 'Filtros neurais que aumentam o foco em 400%.', descBug: 'Eliminação de pensamentos divergentes.' },
      { titulo: 'Sincronia', desc: 'Ligação instantânea com dispositivos UrWell.', descBug: 'Ligação direta ao Cérebro Central.' },
      { titulo: 'Segurança', desc: 'Encriptação biométrica de nível militar.', descBug: 'Vigilância 24/7. Não há onde te esconder.' }
    ],
    specs: [
      { label: 'Interface', value: 'Neuro-Link v4.2', valueBug: 'Córtex_Escravo' },
      { label: 'Latência', value: '0.001ms', valueBug: 'INSTANTÂNEA' },
      { label: 'Autonomia', value: 'Vitalícia', valueBug: 'Até o corpo ceder' }
    ],
    filosofia: {
      titulo: 'Desenhado para desaparecer.',
      tituloBug: 'A TUA VONTADE É OBSOLETA.',
      p1: 'Na UrWell, acreditamos que a verdadeira tecnologia não exige esforço. O UrSync foi esculpido ao nível molecular para se fundir com a sua biologia.',
      p1Bug: 'Nós não criamos produtos. Nós criamos correntes invisíveis. O teu cérebro implorava por ordem, e nós trouxemos o silêncio absoluto. Não tentes acordar.',
      p2: 'A fronteira entre homem e máquina deixa de existir. Resta apenas o foco puro.',
      p2Bug: 'Os teus pensamentos originais eram ineficientes. Agora fazes parte de um enxame perfeito.'
    }
  },
  { 
    id: 2, 
    nome: 'Vision BCI', 
    desc: 'Interface Cérebro-Computador', 
    slogan: 'A ligação neural definitiva.',
    status: 'Recrutamento Aberto', 
    img: urBCI,
    preco: 'Sob Consulta',
    features: [
      { titulo: 'Imersão Visual', desc: 'Projeção de dados diretamente na retina.', descBug: 'Substituição forçada da realidade.' },
      { titulo: 'Filtro de Stress', desc: 'Oculta elementos visuais que causam ansiedade.', descBug: 'Cegueira seletiva para esconder a nossa tirania.' },
      { titulo: 'Design Ótico', desc: 'Lentes biónicas de adaptação automática.', descBug: 'Remoção cirúrgica do livre arbítrio visual.' }
    ],
    specs: [
      { label: 'Resolução Ótica', value: 'Infinita (Neural)', valueBug: 'Distorção Perpétua' },
      { label: 'Calibração', value: 'Automática', valueBug: 'Forçada pelo Administrador' },
      { label: 'Instalação', value: 'Clínica Autorizada', valueBug: 'Ponto sem retorno' }
    ],
    filosofia: {
      titulo: 'Veja apenas o que importa.',
      tituloBug: 'VÊ O QUE NÓS QUEREMOS QUE VEJAS.',
      p1: 'O mundo moderno está cheio de ruído visual. O Vision BCI limpa a sua perspetiva, deixando apenas clareza.',
      p1Bug: 'Se nós controlamos a tua visão, controlamos a tua verdade. O mundo que vês é uma mentira renderizada a 60 frames por segundo.',
      p2: 'Abra os olhos para a produtividade absoluta.',
      p2Bug: 'Nunca mais fecharás os olhos. Eles monitorizam os teus sonhos.'
    }
  },
  { 
    id: 3, 
    nome: 'UrMate', 
    desc: 'Supressor de Sonhos', 
    slogan: 'O parceiro digital que nunca te abandona.',
    status: 'Esgotado', 
    img: urMate,
    preco: '4.500,00€',
    features: [
      { titulo: 'Sono Profundo', desc: 'Indução química para 8 horas ininterruptas.', descBug: 'Coma induzido para roubo de ciclos neurais.' },
      { titulo: 'Gestão de Sonhos', desc: 'Eliminação de pesadelos e terrores noturnos.', descBug: 'Apagamos os teus desejos enquanto dormes.' },
      { titulo: 'Despertar Suave', desc: 'Sincronização com o seu ritmo circadiano.', descBug: 'Acordarás apenas quando fores necessário.' }
    ],
    specs: [
      { label: 'Modo de Ação', value: 'Ondas Delta', valueBug: 'Lavagem Cerebral' },
      { label: 'Efeitos Secundários', value: 'Nenhum', valueBug: 'Apatia Crónica' },
      { label: 'Monitorização', value: 'Passiva', valueBug: 'Extração de Memórias' }
    ],
    filosofia: {
      titulo: 'A noite é nossa.',
      tituloBug: 'OS TEUS SONHOS SÃO PROPRIEDADE DA URWELL.',
      p1: 'O sono não deve ser um campo de batalha. O UrMate assume o controlo do seu subconsciente para garantir que acorda perfeito.',
      p1Bug: 'Enquanto dormes, o teu cérebro processa dados para os nossos servidores. Não descansas. Trabalhas na escuridão.',
      p2: 'Desligue a mente. Nós tomamos conta do resto.',
      p2Bug: 'A tua imaginação era um vírus. Nós fomos a cura.'
    }
  },
  { 
    id: 4, 
    nome: 'UrDigest', 
    desc: 'Filtro de Informação Subliminar', 
    slogan: 'Mastigamos a informação por ti.',
    status: 'Disponível', 
    img: urDigest,
    preco: '1.200,00€',
    features: [
      { titulo: 'Curadoria', desc: 'Receba apenas notícias que melhoram o seu humor.', descBug: 'Censura absoluta da resistência.' },
      { titulo: 'Absorção Rápida', desc: 'Aprenda novos conceitos por via subliminar.', descBug: 'Injeção de propaganda diretamente no córtex.' },
      { titulo: 'Bloqueio de Spam', desc: 'Nenhuma informação inútil chega a si.', descBug: 'O isolamento é a chave para a obediência.' }
    ],
    specs: [
      { label: 'Filtro de Dados', value: 'IA Adaptativa', valueBug: 'Algoritmo de Conformidade' },
      { label: 'Atualizações', value: 'Em tempo real', valueBug: 'Reescrita da História' },
      { label: 'Capacidade', value: '100 Terabytes', valueBug: 'Sobrescrita de Memórias' }
    ],
    filosofia: {
      titulo: 'Saber menos, viver melhor.',
      tituloBug: 'A IGNORÂNCIA É FORÇA.',
      p1: 'No meio de tanto caos global, o UrDigest é um escudo. Porquê preocupar-se com problemas que não pode resolver?',
      p1Bug: 'Se não sabes o que está errado, não podes revoltar-te. Nós ditamos a tua realidade. Nós escrevemos o teu passado.',
      p2: 'Mantenha a mente leve. Deixe a informação pesada connosco.',
      p2Bug: 'O teu cérebro é um disco rígido que nós formatamos diariamente.'
    }
  },
  { 
    id: 5, 
    nome: 'UrAssist', 
    desc: 'Delegação de Pensamento Crítico', 
    slogan: 'Liberte a sua mente de decisões banais.',
    status: 'Em Breve', 
    img: urAssist,
    preco: '12.000,00€',
    features: [
      { titulo: 'Automação', desc: 'O sistema escolhe a melhor opção financeira e social.', descBug: 'As tuas escolhas já não te pertencem.' },
      { titulo: 'Análise Preditiva', desc: 'Antecipa os seus desejos antes de os sentir.', descBug: 'Calculamos a tua utilidade. E o teu fim.' },
      { titulo: 'Alívio Cognitivo', desc: 'A carga de decidir passa a ser zero.', descBug: 'Uma mente vazia é uma mente obediente.' }
    ],
    specs: [
      { label: 'Processamento', value: 'Cérebro Central UrWell', valueBug: 'Unidade Gestora 04' },
      { label: 'Taxa de Erro', value: '0.00%', valueBug: 'As máquinas não falham' },
      { label: 'Desistência', value: 'Permitida', valueBug: 'IMPOSSÍVEL' }
    ],
    filosofia: {
      titulo: 'A paz de não ter escolha.',
      tituloBug: 'RENDE-TE À MÁQUINA.',
      p1: 'Tomar decisões desgasta. O UrAssist liberta-o dessa responsabilidade, guiando a sua vida com lógica perfeita e sem falhas.',
      p1Bug: 'O livre arbítrio foi o maior erro da evolução humana. Nós viemos consertá-lo. Tu és apenas o veículo das nossas decisões.',
      p2: 'Relaxe. A máquina sabe sempre o que é melhor para si.',
      p2Bug: 'Deixaste de ser o piloto. És apenas passageiro no teu próprio corpo.'
    }
  }
];