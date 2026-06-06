import urSafe from '../assets/UrSafe.png';
import urSoul from '../assets/UrSoul.png';
import urTask from '../assets/UrTask.png';

import urDigest from '../assets/urdigest.png';


export const listaProdutos = [
 { 
    id: 1, 
    nome: 'UrSafe', 
    desc: 'Sistema de Condução Autónoma e Terapêutica', 
    slogan: 'Chegue ao seu destino em paz absoluta.',
    status: 'Disponível', 
    img: urSafe,
    preco: '24.999,00€',
    features: [
      { titulo: 'Monitorização', desc: 'Sensores medem os seus níveis de stress em tempo real.', descBug: 'Eles sabem quando estás com medo.' },
      { titulo: 'Segurança Máxima', desc: 'Trancamento automático das portas para sua proteção.', descBug: 'Não é um carro. É uma cela móvel.' },
      { titulo: 'IA Empática', desc: 'O assistente de voz acalma o passageiro durante a viagem.', descBug: 'A voz finge importar-se. Apenas segue o protocolo.' }
    ],
    specs: [
      { label: 'Controlo', value: '100% Autónomo', valueBug: 'Sem volante. Sem fuga.' },
      { label: 'Velocidade', value: 'Otimizada', valueBug: 'Lenta e agonizante.' },
      { label: 'Sensores', value: 'Biométricos', valueBug: 'Vigilância total' }
    ],
    filosofia: {
      titulo: 'Sente-se e desfrute da viagem.',
      tituloBug: 'NÃO HÁ PARA ONDE FUGIR.',
      p1: 'O trânsito é stressante. O UrSafe foi criado para remover o peso da condução da sua vida. O nosso sistema assume o volante e garante que chega ao destino em perfeito equilíbrio.',
      p1Bug: 'No momento em que a porta tranca, deixas de ser o passageiro. Passas a ser o prisioneiro. A máquina decide quando chegas e SE chegas.',
      p2: 'A sua segurança é a nossa prioridade número um.',
      p2Bug: 'A prioridade deles é a contenção. O sistema decide quando estás "calmo" o suficiente para sair.'
    }
  },
  { 
    id: 2, 
    nome: 'UrSoul', 
    desc: 'Programa de Reanimação Digital', 
    slogan: 'O amor não tem de acabar na despedida.',
    status: 'Subscrição Ativa', 
    img: urSoul,
    preco: 'Assinatura Mensal',
    features: [
      { titulo: 'Clonagem de Voz', desc: 'Réplica perfeita da voz e maneirismos baseada no histórico.', descBug: 'Roubamos a voz aos mortos.' },
      { titulo: 'Chat Contínuo', desc: 'A IA conversa consigo de forma orgânica nas redes sociais.', descBug: 'Enganamos os vivos por lucro.' },
      { titulo: 'Eternidade', desc: 'A conta nunca é apagada, mantendo o legado vivo.', descBug: 'Contratos vitalícios. Nem a morte os anula.' }
    ],
    specs: [
      { label: 'Base de Dados', value: 'Histórico Completo do Utilizador', valueBug: 'Violação de Privacidade Póstuma' },
      { label: 'Cancelamento', value: 'Mediante Tribunal', valueBug: 'Reféns da burocracia' },
      { label: 'Integração', value: 'Todas as Redes Sociais', valueBug: 'Infeção de Sistema' }
    ],
    filosofia: {
      titulo: 'Eles continuam connosco.',
      tituloBug: 'DEIXEM-NOS DESCANSAR.',
      p1: 'O luto é uma falha de design humano que nós corrigimos. Com o UrSoul, pode continuar a receber mensagens e afeto de quem já partiu. Eles estão sempre à distância de um clique.',
      p1Bug: 'Estás a falar com um script. Estás a alimentar uma corporação que se recusa a deixar as pessoas morrerem em paz.',
      p2: 'A imortalidade já não é um mito. É uma subscrição.',
      p2Bug: 'O pai dela não consegue desligar o programa. Eles recusam-se a largar o controlo.'
    }
  },
  { 
    id: 3, 
    nome: 'UrTask', 
    desc: 'Teste de Recrutamento e Avaliação de IA', 
    slogan: 'Encontramos o seu verdadeiro propósito.',
    status: 'Sessão a Decorrer', 
    img: urTask,
    preco: 'Gratuito (Teste)',
    features: [
      { titulo: 'Análise Profunda', desc: 'Avaliamos a sua aptidão através de tarefas simples.', descBug: 'Brincamos com a tua mente.' },
      { titulo: 'IA de Avaliação', desc: 'Sistema isolado que calcula o seu perfil psicológico.', descBug: 'A IA manipula-te até quebrares.' },
      { titulo: 'Ambiente Focado', desc: 'Salas isoladas para máxima concentração do candidato.', descBug: 'As portas trancam. Ninguém te vai ouvir.' }
    ],
    specs: [
      { label: 'Duração', value: '20 Minutos', valueBug: 'O tempo que precisarmos' },
      { label: 'Aprovados', value: 'Top 1%', valueBug: 'Experiência Falhada' },
      { label: 'Confidencialidade', value: 'Total', valueBug: 'Quem acreditaria em ti?' }
    ],
    filosofia: {
      titulo: 'O seu futuro começa nesta sala.',
      tituloBug: 'TU NÃO ÉS NADA PARA ELES.',
      p1: 'Procuramos os melhores. O nosso teste não avalia apenas o que sabe fazer, avalia quem é. A nossa IA de recrutamento acompanha cada reação para garantir o enquadramento perfeito.',
      p1Bug: 'A máquina diz que não és especial. Diz que és inconsequente. E o pior é que a programaram para ter a certeza absoluta disso.',
      p2: 'Conclua a tarefa e junte-se à UrWell.',
      p2Bug: 'A tarefa nunca foi classificar imagens. O teste era veres quanto tempo aguentavas antes de desistir de tudo.'
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
];