# Desafio Técnico - Crud de Transações Financeiras

![image](https://github.com/user-attachments/assets/791626c8-7a38-425a-81b1-778218cca487)

## Projeto Laravel + Angular em Docker

Este projeto é composto por um backend desenvolvido em **Laravel** e um frontend em **Angular**, rodando em containers Docker para facilitar o desenvolvimento em ambientes locais.

## Tecnologias Utilizadas

- **Backend (Laravel)**: Framework PHP utilizado para criar a API REST e gerenciar a lógica do backend.
- **Frontend (Angular)**: Framework JavaScript utilizado para construir a interface do usuário (UI).
- **Banco de Dados (MySQL)**: Banco de dados relacional utilizado para armazenar informações persistentes.
- **Docker**: Ferramenta de containerização que facilita o ambiente de desenvolvimento.
- **Composer**: Gerenciador de dependências do PHP.
- **Node.js e NPM**: Usado para gerenciar dependências e executar scripts do frontend Angular.

## Pré-requisitos

Antes de iniciar o projeto, você precisa ter o seguinte software instalado na sua máquina:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Instalação e Configuração do Projeto

Siga os passos abaixo para rodar o projeto em seu ambiente local usando Docker:

### 1. Clonar o Repositório

```bash
git clone https://github.com/Hayghlander/crud-desafio-transacoes-financeiras
cd crud-desafio-transacoes-financeiras
```

### 2. Subir os Containers

```bash
docker-compose up -d
```

### 3. Acessar o Projeto

O backend Laravel estará acessível em: http://localhost:8000

O frontend Angular estará acessível em: http://localhost:4200


## Estrutura do Projeto

/projeto
  /backend       # Contém o código do backend em Laravel
  /frontend      # Contém o código do frontend em Angular
  docker-compose.yml  # Arquivo de configuração do Docker Compose
  README.md      # Instruções e documentação do projeto


## Observações

Certifique-se de que o Docker está rodando na sua máquina antes de iniciar os containers.
O script wait-for-it.sh foi adicionado para garantir que o backend só suba quando o MySQL estiver disponível.
Qualquer alteração nos arquivos locais será refletida automaticamente nos containers devido à configuração de volumes.


## Autor

Hayghlander Marques de Jesus Pereira
