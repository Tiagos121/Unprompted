# UrWell Corporation | Internal Portal

Este repositório contém a infraestrutura digital da **UrWell Corporation**. Este portal serve como ponto central de documentação, comunicações corporativas e gestão de recursos para o nosso ecossistema global.

> **AVISO DE SEGURANÇA:** O acesso a este repositório é restrito a pessoal autorizado. Qualquer tentativa de interceção ou "bugging" do sistema será reportada ao protocolo de contenção.

## 🚀 Módulos do Sistema

O portal está estruturado para garantir a eficiência operacional da UrWell:

*   **[DiarioSecreto]**: Repositório de recursos, guião e comunicações confidenciais da equipa. Inclui suporte para anexos via Google Drive (integrado via `<iframe>` seguro) e conteúdos de vídeo[cite: 1].
*   **[Novidades]**: Painel de comunicados oficiais e atualizações do ecossistema UrWell.
*   **[UrWell Ecosystem]**: Catálogo de produtos, incluindo:
    *   **UrSafe**: Condução autónoma[cite: 6].
    *   **UrSoul**: Reanimação digital[cite: 6].
    *   **UrTask**: Testes de recrutamento[cite: 6].
    *   **UrLethos**: Protocolo de desativação e apagamento de dados[cite: 6].

## 🛠 Tecnologias Utilizadas

*   **Frontend**: React + Vite
*   **Database**: Firebase Firestore
*   **Auth**: Firebase Authentication
*   **UI/UX**: TailwindCSS (para o portal de documentos) & Custom CSS (para comunicados)
*   **Alerts**: SweetAlert2

## ⚙️ Configuração Local

Para correr este projeto na tua máquina:

1. **Clona o repositório:**
```bash
   git clone [URL-DO-TEU-REPO]
   cd [NOME-DO-PROJETO]
