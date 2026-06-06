import urSafe from '../assets/UrSafe.png';
import urSoul from '../assets/UrSoul.png';
import urTask from '../assets/UrTask.png';

import urLethos from '../assets/urlethos.png';


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
    nome: 'UrLethos', 
    desc: 'Protocolo de Desativação Seletiva', 
    slogan: 'Porque o esquecimento é a forma suprema de paz.',
    status: 'Acesso Limitado', 
    img: urLethos, 
    preco: 'Sob Consulta',
    features: [
      { titulo: 'Limpeza de Dados', desc: 'Eliminação total de pegadas digitais e físicas.', descBug: 'Apagamos o teu histórico. Nunca exististe.' },
      { titulo: 'Amnésia Neural', desc: 'Tratamento seguro para esquecer traumas corporativos.', descBug: 'Lobotomia química disfarçada de terapia.' },
      { titulo: 'Certificado de Saída', desc: 'Documento legal de rescisão de todas as subscrições.', descBug: 'Um papel que não vale nada. Estás morto para o sistema.' }
    ],
    specs: [
      { label: 'Processo', value: 'Reversão Total', valueBug: 'Destruição do Eu' },
      { label: 'Tempo de Ação', value: '12 Horas', valueBug: 'Apagamento irreversível' },
      { label: 'Legado', value: 'Arquivo Morto', valueBug: 'Vazio existencial' }
    ],
    filosofia: {
      titulo: 'Deixe o passado para trás.',
      tituloBug: 'ELES VÃO APAGAR-TE.',
      p1: 'O serviço UrLethos é para quem busca um novo começo. Analisamos todos os seus vínculos com a UrWell e procedemos à desativação de contas, registos e memórias, garantindo que a sua transição para uma nova vida é feita de forma limpa e sem ruído.',
      p1Bug: 'Não há novo começo. Quando assinas o UrLethos, a UrWell apaga os teus dados, a tua casa, a tua família. Eles não te libertam; eles descartam-te como um ficheiro corrompido.',
      p2: 'Liberte-se das responsabilidades. Recomece do zero.',
      p2Bug: 'Tu és o erro no sistema que eles estão a corrigir. O conflito termina aqui: com a tua exclusão completa.'
    }
  }
];