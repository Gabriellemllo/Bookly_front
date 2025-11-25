📚 Bookly_front 

Bookly é um aplicativo mobile, semelhante ao aplicativo "Letterboxd", sendo voltado para livros que permite aos usuários descobrir, catalogar, avaliar e discutir suas leituras. Este é o repositório oficial do front-end, desenvolvido em React Native com Expo.

## ⚙️ Funcionalidades

- 🔐 Autenticação de Usuário: Telas de Login, Cadastro e recuperação de senha.
- 🏠 Home/Feed: Visualização de atividades recentes de amigos e sugestões de livros.
- 📚 Catálogo de Livros: Busca e visualização de detalhes de livros (via API externa, como Google Books, ou interna).
- ⭐ Avaliação e Resenhas: Sistema de avaliação (1-5 estrelas), comentários e resenhas detalhadas.
- 👤 Perfil de Usuário: Visualização de livros lidos e favoritos.
- 💬 Interação Social: Possibilidade de seguir usuários e comentar em resenhas.
- ℹ️ Páginas Institucionais: Telas "Sobre o App" e "Equipe".

## 🛠️ Tecnologias Principais

- React Native: Biblioteca principal para o desenvolvimento mobile.
- Expo: Ecossistema e SDK para facilitar o desenvolvimento e build.
- Expo Router: Sistema de navegação e roteamento baseado em arquivos (file-system routing).
- Zustand: Gerenciamento de estado global (para dados de usuário, autenticação, etc.).
- UI Kit (a definir): Biblioteca de componentes (ex: Tamagui, NativeWind, React Native Paper) para estilização.

## 🏠 Como rodar localmente

Pré-requisitos

- Node.js (versão LTS recomendada)
- npx ou yarn
- Expo CLI: npm install -g expo-cli
- Um dispositivo físico (Android/iOS) com o app Expo Go.

## 🚀 Instalação e Execução

### 1️⃣ Clone o repositório:
 
```bash
https://github.com/Gabriellemllo/Bookly_front.git
```

## 📂 2° Acesse a pasta do projeto

Para acessar a pasta do projeto, execute:

```bash
cd ./bookly
```

## 3° inicialize o npm:

Para inicializar o npm, você deverá instalar as dependências na pasta `bookly`:

```bash
npx install
````

Depois de baixar o npm, você rodar o seguinte código

```bash
npx expo start
````
    
## 📂 Estrutura do Projeto (Expo Router)

```bash
bookly/
│
├── .expo/
├── .vscode/
│
├── app/
│   ├── auth/
│   │   ├── (tabs)/
│   │   │   ├── _layout.tsx
│   │   │   ├── home.tsx
│   │   │   ├── profile.tsx
│   │   │   ├── rating.tsx
│   │   │   ├── reviews.tsx
│   │   │   └── settings.tsx
│   │   │
│   │   ├── login/
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   │
│   │   ├── register/
│   │   │   └── register.tsx
│   │   │
│   │   ├── splash/
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   │
│   │   ├── verification/
│   │   │   └── verification.tsx
│   │   │
│   │   ├── _layout.tsx
│   │   └── index.tsx
│
├── assets/
│   └── images/
│       ├── capa_livrocrepusculo.jpg
│       ├── capa_livrogatsby.jpg
│       ├── capa_livrohp.jpg
│       ├── envelope.png
│       ├── logo_bookly.png
│       └── usuario.jpg
│
├── components/
│   └── ui/
│       ├── button.styles.ts
│       ├── button.tsx
│       ├── textlink.tsx
│       └── togglePasswordIcon.tsx
│
├── constants/
│   └── Colors.ts
│
├── context/
│   └── AuthContext.tsx
│
├── hooks/
│   └── useAuth.ts
│
└── package.json
```
    
## 👥 Equipe

- Arthur Gonçalves     / RA: 000000854164
- Carlos Fabio         / RA: 000000853743
- Elcio José           / RA: 000000854166
- Elynne Silva         / RA: 000000854394
- Giovanna Priscilla   / RA: 000000853796
- Italo Cézar          / RA: 000000854140
- Maria Gabrielle      / RA: 000000854105
- Thiago Henrique      / RA: 000000853832
